'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: { container: 'gap-1', dot: 'h-1.5 w-1.5' },
  md: { container: 'gap-1.5', dot: 'h-2.5 w-2.5' },
  lg: { container: 'gap-2', dot: 'h-3 w-3' },
};

export function Loader({ size = 'md', className, fullScreen }: LoaderProps) {
  const { container, dot } = sizeMap[size];

  const content = (
    <div className={cn('flex items-center', container, className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(dot, 'rounded-full bg-indigo-400')}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
}
