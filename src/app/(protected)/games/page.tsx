'use client';

import Link from 'next/link';

import { Button } from '@/components/atoms/Button';
import { Loader } from '@/components/ui/loader';
import { GameStatusBadge } from '@/components/molecules/GameStatusBadge';
import { useGetGamesQuery } from '@/store/api/chessApi';

export default function GamesPage() {
  const { data, isLoading } = useGetGamesQuery({ page: 1, pageSize: 50 });

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Game History</h1>
            <p className="mt-1 text-slate-400">
              {data ? `${String(data.total)} games played` : 'Loading...'}
            </p>
          </div>
          <Link href="/play">
            <Button>New Game</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-16 flex justify-center">
            <Loader />
          </div>
        ) : data && data.games.length > 0 ? (
          <div className="mt-8 space-y-3">
            {data.games.map((game) => (
              <Link
                key={game.id}
                href={game.status === 'ACTIVE' ? `/play/${game.id}` : `/play/${game.id}`}
                className="block rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {game.playerColor === 'WHITE' ? '♔' : '♚'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-200">
                          vs {game.opponentType === 'ENGINE' ? 'Stockfish' : game.opponentType}
                        </span>
                        {game.engineLevel && (
                          <span className="text-xs text-slate-500">
                            Level {game.engineLevel}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {game.moveCount} moves &middot;{' '}
                        {new Date(game.startedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <GameStatusBadge status={game.status} result={game.result} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg text-slate-400">No games yet</p>
            <p className="mt-2 text-sm text-slate-500">Start your first game to see it here</p>
            <Link href="/play" className="mt-4 inline-block">
              <Button>Play Now</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
