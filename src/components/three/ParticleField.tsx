'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { viewport } from '@/lib/viewport';

type Props = {
  count?: number;
};

const PALETTE = ['#22d3ee', '#7c5cff', '#34d399', '#a78bfa', '#e9edfa'];

/**
 * Ambient drifting light field behind the whole page.
 *
 * All the per-particle motion and twinkle happens in the vertex shader, so the
 * frame loop only writes two uniforms no matter how many particles there are.
 */
export default function ParticleField({ count = 1400 }: Props) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Distributed through a wide, shallow slab so parallax has depth to work
      // with but nothing drifts in front of the hero content.
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22 - 6;

      color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      // Most particles sit dim; a few burn bright.
      const brightness = Math.random() > 0.9 ? 1 : 0.28 + Math.random() * 0.35;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;

      scales[i] = 0.4 + Math.random() * 1.6;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 26 },
        uPixelRatio: {
          value:
            typeof window !== 'undefined'
              ? Math.min(window.devicePixelRatio, 2)
              : 1,
        },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aScale;
        attribute float aPhase;

        uniform float uTime;
        uniform float uSize;
        uniform float uPixelRatio;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;

          vec3 p = position;
          p.y += sin(uTime * 0.22 + aPhase) * 0.45;
          p.x += cos(uTime * 0.16 + aPhase * 1.3) * 0.4;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);

          // Perspective-correct size, clamped so near particles stay tidy.
          gl_PointSize = min(uSize * aScale * uPixelRatio / max(-mv.z, 0.1), 42.0);

          vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * 1.1 + aPhase * 3.0));

          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float mask = smoothstep(0.5, 0.02, d);
          if (mask < 0.01) discard;
          gl_FragColor = vec4(vColor, mask * vAlpha);
        }
      `,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;

    if (group.current) {
      group.current.rotation.y = t * 0.012 + viewport.smoothX * 0.06;
      group.current.rotation.x = viewport.smoothY * 0.045;
      // Field slides upward as the page scrolls — cheap depth cue.
      group.current.position.y = viewport.scrollProgress * 5;
    }
  });

  return (
    <group ref={group}>
      <points
        ref={points}
        geometry={geometry}
        material={material}
        frustumCulled={false}
      />
    </group>
  );
}
