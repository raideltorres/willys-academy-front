'use client';

import { useEffect, useRef } from 'react';

import type { ChessMove } from '@/types/chess';

interface MoveListProps {
  moves: ChessMove[];
}

export function MoveList({ moves }: MoveListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [moves.length]);

  const pairs: { number: number; white?: ChessMove; black?: ChessMove }[] = [];

  for (const move of moves) {
    const pairIndex = Math.ceil(move.moveNumber / 2) - 1;
    if (!pairs[pairIndex]) {
      pairs[pairIndex] = { number: pairIndex + 1 };
    }
    if (move.color === 'WHITE') {
      pairs[pairIndex]!.white = move;
    } else {
      pairs[pairIndex]!.black = move;
    }
  }

  if (moves.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        No moves yet
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="max-h-80 overflow-y-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-slate-500">
            <th className="w-10 py-1 text-left">#</th>
            <th className="py-1 text-left">White</th>
            <th className="py-1 text-left">Black</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => (
            <tr key={pair.number} className="border-t border-slate-800/50">
              <td className="py-1 text-slate-500">{pair.number}.</td>
              <td className="py-1 font-mono text-slate-200">{pair.white?.san ?? ''}</td>
              <td className="py-1 font-mono text-slate-200">{pair.black?.san ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
