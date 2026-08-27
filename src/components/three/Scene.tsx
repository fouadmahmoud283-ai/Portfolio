'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import NeuralCore from './NeuralCore';
import DataCenterScene from './DataCenterScene';
import ParticleField from './ParticleField';
import { startViewportTracking } from '@/lib/viewport';
import type { MotionTier } from '@/hooks/useMotionPrefs';
import type { ThemeDef } from '@/lib/themes';

/**
 * Anchors the neural graph to the right-hand column on wide screens and
 * centres it behind the copy on narrow ones, in world units so it tracks the
 * camera rather than guessing at pixels.
 */
function PlacedCore({
  lite,
  active,
  theme,
}: {
  lite: boolean;
  active: boolean;
  theme: ThemeDef;
}) {
  const width = useThree((state) => state.viewport.width);
  const isNarrow = width < 9;

  return (
    <group
      // Beside the copy on wide screens; lifted behind the headline and
      // faded well back on narrow ones, where it would otherwise sit on top
      // of the body text.
      position={[isNarrow ? 0 : width * 0.23, isNarrow ? 1.9 : 0, 0]}
      scale={isNarrow ? 0.7 : 1}
    >
      <NeuralCore
        active={active}
        primary={theme.primary}
        secondary={theme.secondary}
        accent={theme.accent}
        nodeCount={lite ? 70 : 130}
        signalCount={lite ? 22 : 46}
        intensity={isNarrow ? 0.42 : 1}
      />
    </group>
  );
}

export default function Scene({
  tier,
  theme,
}: {
  tier: Exclude<MotionTier, 'none'>;
  theme: ThemeDef;
}) {
  const lite = tier === 'lite';
  const [dpr, setDpr] = useState(lite ? 1 : 1.5);

  useEffect(() => startViewportTracking(), []);

  // Both scenes stay mounted and crossfade; whichever is inactive fades to
  // zero and stops drawing, which is cheaper than tearing down GPU buffers on
  // every scroll-driven theme change.
  const showDatacenter = theme.scene === 'datacenter';

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

        <PlacedCore lite={lite} active={!showDatacenter} theme={theme} />
        <DataCenterScene active={showDatacenter} lite={lite} />

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
