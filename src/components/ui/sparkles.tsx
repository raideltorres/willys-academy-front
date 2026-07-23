'use client';

import { useId } from 'react';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'framer-motion';
import type { Container } from '@tsparticles/engine';

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

function SparklesInner(props: SparklesProps) {
  const { id, className, background, minSize, maxSize, speed, particleColor, particleDensity } =
    props;

  const controls = useAnimation();
  const generatedId = useId();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      await controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  return (
    <motion.div animate={controls} className={cn('opacity-0', className)}>
      <Particles
        id={id ?? generatedId}
        className={cn('h-full w-full')}
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: background ?? 'transparent',
            },
          },
          fullScreen: {
            enable: false,
            zIndex: 1,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: 'push' },
              onHover: { enable: false, mode: 'repulse' },
              resize: true as unknown as { delay: number; enable: boolean },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: {
              value: particleColor ?? '#ffffff',
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'out' },
              random: false,
              speed: { min: 0.1, max: 1 },
              straight: false,
            },
            number: {
              density: { enable: true, width: 400, height: 400 },
              value: particleDensity ?? 120,
            },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: true,
                speed: speed ?? 4,
                sync: false,
                mode: 'auto' as const,
                startValue: 'random' as const,
                destroy: 'none' as const,
              },
            },
            shape: { type: 'circle' },
            size: {
              value: { min: minSize ?? 1, max: maxSize ?? 3 },
            },
            links: { enable: false },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
}

export function SparklesCore(props: SparklesProps) {
  return (
    <ParticlesProvider init={async (engine) => await loadSlim(engine)}>
      <SparklesInner {...props} />
    </ParticlesProvider>
  );
}
