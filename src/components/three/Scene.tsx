'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import NeuralCore from './NeuralCore';
import ParticleField from './ParticleField';
import { startViewportTracking } from '@/lib/viewport';
import type { MotionTier } from '@/hooks/useMotionPrefs';

/**
 * Anchors the neural graph to the right-hand column on wide screens and
 * centres it behind the copy on narrow ones, in world units so it tracks the
 * camera rather than guessing at pixels.
 */
function PlacedCore({ lite }: { lite: boolean }) {
  const width = useThree((state) => state.viewport.width);
  const isNarrow = width < 9;

  const x = isNarrow ? 0 : width * 0.23;
  const scale = isNarrow ? 0.82 : 1;

  return (
    <group position={[x, isNarrow ? 0.6 : 0, 0]} scale={scale}>
      <NeuralCore
        nodeCount={lite ? 70 : 130}
        signalCount={lite ? 22 : 46}
      />
    </group>
  );
}

export default function Scene({ tier }: { tier: Exclude<MotionTier, 'none'> }) {
  const lite = tier === 'lite';
  const [dpr, setDpr] = useState(lite ? 1 : 1.5);

  useEffect(() => startViewportTracking(), []);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 100 }}
      // The scene is decoration — never let it eat pointer events.
      style={{ pointerEvents: 'none' }}
    >
      {/* Step the resolution down instead of dropping frames on weak GPUs. */}
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(lite ? 1 : 1.5)}
      />

      <Suspense fallback={null}>
        <ParticleField count={lite ? 550 : 1400} />
        <PlacedCore lite={lite} />

        {!lite && (
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <Bloom
              intensity={1.15}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.35}
              mipmapBlur
              radius={0.72}
            />
            <Vignette offset={0.28} darkness={0.62} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
