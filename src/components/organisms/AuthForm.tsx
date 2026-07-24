'use client';

import type { FormEvent, ReactNode } from 'react';

import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';

export interface AuthFormProps {
  title: string;
  subtitle?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  isLoading?: boolean;
  error?: string | null;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AuthForm({
  title,
  subtitle,
  onSubmit,
  submitLabel,
  isLoading,
  error,
  children,
  footer,
  className,
}: AuthFormProps) {
  return (
    <div className={cn('w-full max-w-md', className)}>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {children}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {submitLabel}
        </Button>
      </form>

      {footer && <div className="mt-6 text-center text-sm text-slate-400">{footer}</div>}
    </div>
  );
}
