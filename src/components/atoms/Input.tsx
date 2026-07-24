'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-slate-800/50 px-3 py-2 text-sm text-slate-200',
          'placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors duration-200',
          error
            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
            : 'border-slate-700',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
