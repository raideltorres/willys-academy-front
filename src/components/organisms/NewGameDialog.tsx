'use client';

import { useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';
import type { PlayerColor } from '@/types/chess';

interface NewGameDialogProps {
  onStart: (color: PlayerColor, level: number) => void;
  isLoading?: boolean;
}

const LEVELS = [
  { value: 1, label: 'Beginner', description: 'Casual play' },
  { value: 2, label: 'Intermediate', description: 'Moderate challenge' },
  { value: 3, label: 'Advanced', description: 'Strong opponent' },
];

export function NewGameDialog({ onStart, isLoading }: NewGameDialogProps) {
  const [color, setColor] = useState<PlayerColor>('WHITE');
  const [level, setLevel] = useState(2);

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Play as</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(['WHITE', 'BLACK'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                'rounded-lg border p-4 text-center transition-colors',
                color === c
                  ? 'border-indigo-500 bg-indigo-500/10 text-white'
                  : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600',
              )}
            >
              <span className="text-3xl">{c === 'WHITE' ? '♔' : '♚'}</span>
              <p className="mt-1 text-sm font-medium">{c === 'WHITE' ? 'White' : 'Black'}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">Difficulty</h2>
        <div className="mt-3 space-y-2">
          {LEVELS.map((l) => (
            <button
              key={l.value}
              onClick={() => setLevel(l.value)}
              className={cn(
                'w-full rounded-lg border p-3 text-left transition-colors',
                level === l.value
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
              )}
            >
              <p className={cn('text-sm font-medium', level === l.value ? 'text-white' : 'text-slate-300')}>
                {l.label}
              </p>
              <p className="text-xs text-slate-500">{l.description}</p>
            </button>
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={() => onStart(color, level)}
        isLoading={isLoading}
      >
        Start Game
      </Button>
    </div>
  );
}
