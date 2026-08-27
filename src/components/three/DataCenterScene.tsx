'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getGlowTexture } from './glowTexture';
import { damp, viewport } from '@/lib/viewport';

type Props = {
  /** Whether this scene currently owns the stage. */
  active: boolean;
  lite?: boolean;
};

const ROW_X = 2.75;
const RACK_W = 1.05;
const RACK_H = 2.5;
const RACK_D = 0.75;

/** Utilisation heatmap: idle green -> busy amber -> saturated rose. */
const COLD = new THREE.Color('#34d399');
const WARM = new THREE.Color('#fbbf24');
const HOT = new THREE.Color('#fb7185');
const LINK = new THREE.Color('#22d3ee');

/**
 * A GPU datacenter aisle: two rows of racks receding into the dark, their
 * front panels alive with per-GPU utilisation LEDs, and interconnect traffic
 * streaming overhead.
 *
 * Stands in for the infrastructure work — multi-tenant GPU clusters, NVLink
 * telemetry, and the heatmaps you actually stare at when running them.
 */
export default function DataCenterScene({ active, lite = false }: Props) {
  const group = useRef<THREE.Group>(null);
  const racksRef = useRef<THREE.InstancedMesh>(null);
  const ledsRef = useRef<THREE.InstancedMesh>(null);
  const trafficRef = useRef<THREE.Points>(null);
  const floorRef = useRef<THREE.Mesh>(null);

  const fade = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const scratch = useMemo(() => new THREE.Color(), []);
  const glow = useMemo(() => getGlowTexture(), []);

  const depth = lite ? 11 : 17;
  const ledRows = lite ? 4 : 6;
  const ledCols = 2;
  const trafficCount = lite ? 90 : 220;

  /** Rack placement plus the per-LED randomness the frame loop animates. */
  const layout = useMemo(() => {
    const racks: { x: number; z: number }[] = [];

    for (let row = 0; row < 2; row++) {
      const x = row === 0 ? -ROW_X : ROW_X;
      for (let i = 0; i < depth; i++) {
        racks.push({ x, z: 3.2 - i * 1.45 });
      }
    }

    const ledsPerRack = ledRows * ledCols;
    const ledCount = racks.length * ledsPerRack;

    const ledPhase = new Float32Array(ledCount);
    const ledSpeed = new Float32Array(ledCount);
    const ledBias = new Float32Array(ledCount);

    for (let i = 0; i < ledCount; i++) {
      ledPhase[i] = Math.random() * Math.PI * 2;
      ledSpeed[i] = 0.35 + Math.random() * 1.5;
      // Per-node baseline load, so some racks read hotter than others.
      ledBias[i] = Math.random();
    }

    // Interconnect traffic running the length of the aisle, near the ceiling.
    const traffic = new Float32Array(trafficCount * 3);
    const trafficColor = new Float32Array(trafficCount * 3);
    const trafficSpeed = new Float32Array(trafficCount);

    for (let i = 0; i < trafficCount; i++) {
      traffic[i * 3] = (Math.random() - 0.5) * ROW_X * 2.1;
      traffic[i * 3 + 1] = 1.5 + Math.random() * 1.1;
      traffic[i * 3 + 2] = 4 - Math.random() * (depth * 1.45 + 6);
      trafficSpeed[i] = 2.6 + Math.random() * 5.5;

      scratch.copy(LINK).lerp(COLD, Math.random() * 0.5);
      trafficColor[i * 3] = scratch.r;
      trafficColor[i * 3 + 1] = scratch.g;
      trafficColor[i * 3 + 2] = scratch.b;
    }

    return {
      racks,
      ledsPerRack,
      ledCount,
      ledPhase,
      ledSpeed,
      ledBias,
      traffic,
      trafficColor,
      trafficSpeed,
      minZ: 4 - (depth * 1.45 + 6),
    };
  }, [depth, ledRows, trafficCount, scratch]);

  const placedRacks = useRef(false);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Ease in and out of frame rather than popping between scenes.
    fade.current = damp(fade.current, active ? 1 : 0, 2.6, dt);
    const f = fade.current;
    const visible = f > 0.004;

    if (group.current) {
      group.current.visible = visible;
      if (!visible) return;

      group.current.position.y = -0.35 + (1 - f) * -1.6;
      group.current.rotation.y = viewport.smoothX * 0.09;
      group.current.rotation.x = -0.03 + viewport.smoothY * 0.05;
      // Slow dolly down the aisle.
      group.current.position.z = Math.sin(t * 0.12) * 0.7;
    }

    if (!visible) return;

    // --- Racks: static transforms, written once ---------------------------
    const racks = racksRef.current;
    if (racks) {
      if (!placedRacks.current) {
        layout.racks.forEach((rack, i) => {
          dummy.position.set(rack.x, 0, rack.z);
          dummy.scale.set(1, 1, 1);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          racks.setMatrixAt(i, dummy.matrix);
        });
        racks.instanceMatrix.needsUpdate = true;
      }
      (racks.material as THREE.MeshBasicMaterial).opacity = f * 0.75;
    }

    // --- LEDs: the utilisation heatmap ------------------------------------
    const leds = ledsRef.current;
    if (leds) {
      let i = 0;

      for (const rack of layout.racks) {
        // Panels face the aisle, so LEDs sit just proud of the inner surface.
        const inward = rack.x > 0 ? -1 : 1;
        const faceX = rack.x + inward * (RACK_D / 2 + 0.012);

        for (let r = 0; r < ledRows; r++) {
          for (let c = 0; c < ledCols; c++) {
            const y = RACK_H / 2 - 0.34 - r * (RACK_H - 0.75) / (ledRows - 1);
            const z = rack.z + (c === 0 ? -0.2 : 0.2);

            dummy.position.set(faceX, y, z);
            dummy.rotation.set(0, inward > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
            dummy.scale.set(0.3, 0.075, 1);
            dummy.updateMatrix();
            leds.setMatrixAt(i, dummy.matrix);

            // Load oscillates around each node's baseline; hot nodes flicker
            // harder, which is what a saturated GPU actually looks like.
            const wave =
              0.5 + 0.5 * Math.sin(t * layout.ledSpeed[i] + layout.ledPhase[i]);
            const load = Math.min(1, layout.ledBias[i] * 0.58 + wave * 0.34);

            if (load < 0.5) {
              scratch.copy(COLD).lerp(WARM, load / 0.5);
            } else {
              scratch.copy(WARM).lerp(HOT, (load - 0.5) / 0.5);
            }

            const brightness = (0.18 + load * 0.5) * f;
            scratch.multiplyScalar(brightness);
            leds.setColorAt(i, scratch);

            i++;
          }
        }
      }

      leds.instanceMatrix.needsUpdate = true;
      if (leds.instanceColor) leds.instanceColor.needsUpdate = true;
      placedRacks.current = true;
    }

    // --- Interconnect traffic ---------------------------------------------
    const traffic = trafficRef.current;
    if (traffic) {
      const pos = layout.traffic;
      for (let i = 0; i < trafficCount; i++) {
        pos[i * 3 + 2] += layout.trafficSpeed[i] * dt;
        // Wrap back to the far end of the hall.
        if (pos[i * 3 + 2] > 4.5) pos[i * 3 + 2] = layout.minZ;
      }
      (
        traffic.geometry.getAttribute('position') as THREE.BufferAttribute
      ).needsUpdate = true;
      (traffic.material as THREE.PointsMaterial).opacity = f * 0.6;
    }

    // --- Floor -------------------------------------------------------------
    if (floorRef.current) {
      const mat = floorRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uOpacity.value = f;
    }
  });

  const floorMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uColor: { value: new THREE.Color('#22d3ee') },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uOpacity;
          uniform vec3 uColor;
          varying vec2 vUv;

          void main() {
            // Grid lines via distance to the nearest cell edge.
            vec2 grid = abs(fract(vUv * vec2(26.0, 44.0)) - 0.5);
            float line = min(grid.x, grid.y);
            float mask = smoothstep(0.045, 0.0, line);

            // Fade out toward the far end so the hall has no visible seam.
            float depthFade = smoothstep(0.02, 0.42, vUv.y) *
                              smoothstep(1.0, 0.55, vUv.y);

            // A pulse sweeping down the aisle, like a health check passing.
            float sweep = smoothstep(0.14, 0.0, abs(fract(vUv.y - uTime * 0.06) - 0.5));

            float alpha = mask * depthFade * (0.10 + sweep * 0.24) * uOpacity;
            if (alpha < 0.004) discard;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    []
  );

  return (
    <group ref={group}>
      {/* Racks */}
      <instancedMesh
        ref={racksRef}
        args={[undefined, undefined, layout.racks.length]}
        frustumCulled={false}
      >
        <boxGeometry args={[RACK_D, RACK_H, RACK_W]} />
        <meshBasicMaterial
          color="#070a12"
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Per-GPU status LEDs */}
      <instancedMesh
        ref={ledsRef}
        args={[undefined, undefined, layout.ledCount]}
        frustumCulled={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Interconnect traffic overhead */}
      <points ref={trafficRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[layout.traffic, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[layout.trafficColor, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          map={glow}
          vertexColors
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      {/* Hall floor */}
      <mesh
        ref={floorRef}
        material={floorMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.3, -8]}
      >
        <planeGeometry args={[26, 46]} />
      </mesh>
    </group>
  );
}
