'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface AuthTemplateProps {
  children: ReactNode;
  className?: string;
}

export function AuthTemplate({ children, className }: AuthTemplateProps) {
  return (
    <div
      className={cn(
        'flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12',
        className,
      )}
    >
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl" />
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
