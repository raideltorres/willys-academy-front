'use client';

import { cn } from '@/lib/utils';
import type { GameResult, GameStatus } from '@/types/chess';

interface GameStatusBadgeProps {
  status: GameStatus;
  result?: GameResult;
  className?: string;
}

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
  COMPLETED: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  ABANDONED: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const resultLabels: Record<string, string> = {
  WHITE_WIN: 'White wins',
  BLACK_WIN: 'Black wins',
  DRAW: 'Draw',
  ONGOING: 'In progress',
};

export function GameStatusBadge({ status, result, className }: GameStatusBadgeProps) {
  const label = status === 'COMPLETED' && result ? resultLabels[result] : status;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
