'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getGlowTexture } from './glowTexture';
import { damp, viewport } from '@/lib/viewport';

type Props = {
  /** Node count. Lowered on weaker devices. */
  nodeCount?: number;
  /** Number of light pulses travelling the graph at once. */
  signalCount?: number;
};

const COLOR_CYAN = new THREE.Color('#22d3ee');
const COLOR_IRIS = new THREE.Color('#7c5cff');
const COLOR_MINT = new THREE.Color('#34d399');

/** Even-ish point distribution on a sphere via the golden-angle spiral. */
function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    // Jitter the radius so the shell reads as an organic cloud, not a ball.
    const r = radius * (0.82 + Math.random() * 0.28);
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * ringRadius * r,
        y * r,
        Math.sin(theta) * ringRadius * r
      )
    );
  }

  return points;
}

export default function NeuralCore({
  nodeCount = 130,
  signalCount = 46,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const signalsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const scratchColor = useMemo(() => new THREE.Color(), []);
  const glow = useMemo(() => getGlowTexture(), []);

  /**
   * The graph is built once: node positions, which pairs are connected, and
   * the per-node/per-edge randomness that drives the animation. Everything the
   * frame loop needs is precomputed into typed arrays.
   */
  const graph = useMemo(() => {
    const radius = 2.15;
    const nodes = fibonacciSphere(nodeCount, radius);

    // Connect every node to its nearby neighbours, capped so hub nodes don't
    // explode the edge count.
    const maxDist = radius * 0.62;
    const maxDegree = 5;
    const pairs: [number, number][] = [];
    const degree = new Array(nodeCount).fill(0);

    for (let i = 0; i < nodeCount; i++) {
      const candidates: { j: number; d: number }[] = [];
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < maxDist) candidates.push({ j, d });
      }
      candidates.sort((a, b) => a.d - b.d);

      for (const c of candidates) {
        if (degree[i] >= maxDegree || degree[c.j] >= maxDegree) continue;
        pairs.push([i, c.j]);
        degree[i]++;
        degree[c.j]++;
      }
    }

    // Edge geometry: two vertices per edge, colour animated per frame.
    const edgePositions = new Float32Array(pairs.length * 6);
    const edgeColors = new Float32Array(pairs.length * 6);
    const edgePhase = new Float32Array(pairs.length);

    pairs.forEach(([a, b], e) => {
      edgePositions.set([nodes[a].x, nodes[a].y, nodes[a].z], e * 6);
      edgePositions.set([nodes[b].x, nodes[b].y, nodes[b].z], e * 6 + 3);
      edgePhase[e] = Math.random() * Math.PI * 2;
    });

    // Signals ride a random edge from one end to the other, then respawn.
    const signals = Array.from({ length: signalCount }, () => ({
      edge: Math.floor(Math.random() * Math.max(1, pairs.length)),
      t: Math.random(),
      speed: 0.35 + Math.random() * 0.75,
      flip: Math.random() > 0.5,
    }));

    const nodePhase = new Float32Array(nodeCount);
    const nodeScale = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      nodePhase[i] = Math.random() * Math.PI * 2;
      // A handful of oversized "hub" nodes give the cloud a visual hierarchy.
      nodeScale[i] = Math.random() > 0.88 ? 1.9 : 0.75 + Math.random() * 0.5;
    }

    return {
      nodes,
      pairs,
      edgePositions,
      edgeColors,
      edgePhase,
      signals,
      nodePhase,
      nodeScale,
      signalPositions: new Float32Array(signalCount * 3),
      signalColors: new Float32Array(signalCount * 3),
    };
  }, [nodeCount, signalCount]);

  // Static per-instance colour: cyan through iris, with mint on the hubs.
  const nodeGeometryReady = useRef(false);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // --- Pointer parallax + scroll recede -------------------------------
    viewport.smoothX = damp(viewport.smoothX, viewport.pointerX, 3.2, dt);
    viewport.smoothY = damp(viewport.smoothY, viewport.pointerY, 3.2, dt);

    const p = viewport.heroProgress;
    const dim = 1 - p * 0.55;

    if (group.current) {
      group.current.rotation.y = t * 0.075 + viewport.smoothX * 0.42;
      group.current.rotation.x = -viewport.smoothY * 0.3 + Math.sin(t * 0.2) * 0.06;
      group.current.position.y = p * 1.4 + Math.sin(t * 0.4) * 0.06;
      const s = 1 - p * 0.45;
      group.current.scale.setScalar(s);
    }

    // --- Nodes ----------------------------------------------------------
    const mesh = nodesRef.current;
    if (mesh) {
      for (let i = 0; i < graph.nodes.length; i++) {
        const n = graph.nodes[i];
        const pulse = 0.75 + Math.sin(t * 1.6 + graph.nodePhase[i]) * 0.25;
        dummy.position.copy(n);
        dummy.scale.setScalar(0.035 * graph.nodeScale[i] * pulse);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        if (!nodeGeometryReady.current) {
          const mix = (n.y + 2.2) / 4.4;
          scratchColor.copy(COLOR_CYAN).lerp(COLOR_IRIS, mix);
          if (graph.nodeScale[i] > 1.5) scratchColor.lerp(COLOR_MINT, 0.55);
          mesh.setColorAt(i, scratchColor);
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (!nodeGeometryReady.current && mesh.instanceColor) {
        mesh.instanceColor.needsUpdate = true;
        nodeGeometryReady.current = true;
      }
    }

    // --- Edges: a brightness wave sweeps around the graph ----------------
    const lines = linesRef.current;
    if (lines) {
      const colors = graph.edgeColors;
      for (let e = 0; e < graph.pairs.length; e++) {
        const wave = Math.sin(t * 0.9 + graph.edgePhase[e]);
        const intensity = (0.06 + Math.max(0, wave) * 0.34) * dim;
        const [a] = graph.pairs[e];
        const mix = (graph.nodes[a].y + 2.2) / 4.4;
        scratchColor.copy(COLOR_CYAN).lerp(COLOR_IRIS, mix);

        const r = scratchColor.r * intensity;
        const g = scratchColor.g * intensity;
        const b = scratchColor.b * intensity;
        colors[e * 6] = r;
        colors[e * 6 + 1] = g;
        colors[e * 6 + 2] = b;
        colors[e * 6 + 3] = r;
        colors[e * 6 + 4] = g;
        colors[e * 6 + 5] = b;
      }
      const attr = lines.geometry.getAttribute('color') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // --- Signals travelling along edges ---------------------------------
    const signals = signalsRef.current;
    if (signals && graph.pairs.length) {
      const pos = graph.signalPositions;
      const col = graph.signalColors;

      for (let i = 0; i < graph.signals.length; i++) {
        const s = graph.signals[i];
        s.t += dt * s.speed;

        if (s.t >= 1) {
          // Respawn on a fresh edge — keeps traffic looking non-repeating.
          s.t = 0;
          s.edge = Math.floor(Math.random() * graph.pairs.length);
          s.speed = 0.35 + Math.random() * 0.75;
          s.flip = Math.random() > 0.5;
        }

        const [a, b] = graph.pairs[s.edge];
        const from = s.flip ? graph.nodes[b] : graph.nodes[a];
        const to = s.flip ? graph.nodes[a] : graph.nodes[b];

        pos[i * 3] = from.x + (to.x - from.x) * s.t;
        pos[i * 3 + 1] = from.y + (to.y - from.y) * s.t;
        pos[i * 3 + 2] = from.z + (to.z - from.z) * s.t;

        // Fade in and out at the ends so pulses don't pop.
        const fade = Math.sin(s.t * Math.PI) * dim;
        scratchColor.copy(COLOR_CYAN).lerp(COLOR_MINT, (i % 5) / 5);
        col[i * 3] = scratchColor.r * fade;
        col[i * 3 + 1] = scratchColor.g * fade;
        col[i * 3 + 2] = scratchColor.b * fade;
      }

      const posAttr = signals.geometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;
      const colAttr = signals.geometry.getAttribute(
        'color'
      ) as THREE.BufferAttribute;
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // --- Inner core -----------------------------------------------------
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uDim.value = dim;
      coreRef.current.rotation.y = -t * 0.14;
      coreRef.current.rotation.z = t * 0.05;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.1;
      shellRef.current.rotation.x = -t * 0.06;
      const mat = shellRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (0.055 + Math.sin(t * 0.8) * 0.02) * dim;
    }
  });

  const coreMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uDim: { value: 1 },
          uColorA: { value: new THREE.Color('#22d3ee') },
          uColorB: { value: new THREE.Color('#7c5cff') },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uDim;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec3 vNormal;
          varying vec3 vView;

          void main() {
            // Fresnel: bright where the surface turns away from the camera,
            // which reads as a glowing energy shell rather than a solid ball.
            float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
            float breathe = 0.5 + 0.5 * sin(uTime * 0.5);
            vec3 color = mix(uColorA, uColorB, breathe);
            gl_FragColor = vec4(color, fresnel * 0.85 * uDim);
          }
        `,
      }),
    []
  );

  return (
    <group ref={group}>
      {/* Connections */}
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.edgePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[graph.edgeColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, graph.nodes.length]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* Travelling signals */}
      <points ref={signalsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.signalPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[graph.signalColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.17}
          map={glow}
          vertexColors
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      {/* Glowing inner core */}
      <mesh ref={coreRef} material={coreMaterial}>
        <icosahedronGeometry args={[0.92, 3]} />
      </mesh>

      {/* Faint outer wireframe shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[2.55, 1]} />
        <meshBasicMaterial
          color="#7c5cff"
          wireframe
          transparent
          opacity={0.06}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
