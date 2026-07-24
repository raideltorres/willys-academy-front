'use client';

import type { ReactNode } from 'react';

interface GameTemplateProps {
  board: ReactNode;
  sidebar: ReactNode;
  controls: ReactNode;
}

export function GameTemplate({ board, sidebar, controls }: GameTemplateProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col items-center gap-4 lg:flex-1">
          {board}
          <div className="w-full max-w-lg">{controls}</div>
        </div>
        <div className="w-full lg:w-80">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">{sidebar}</div>
        </div>
      </div>
    </div>
  );
}
