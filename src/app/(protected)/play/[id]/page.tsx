'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/atoms/Button';
import { GameStatusBadge } from '@/components/molecules/GameStatusBadge';
import { ChessBoardComponent } from '@/components/organisms/ChessBoard';
import { GameControls } from '@/components/organisms/GameControls';
import { MoveList } from '@/components/organisms/MoveList';
import { GameTemplate } from '@/components/templates/GameTemplate';
import {
  useGetGameQuery,
  useMakeMoveMutation,
  useResignGameMutation,
  useDrawGameMutation,
  useLazyExportPgnQuery,
} from '@/store/api/chessApi';
import { useAppDispatch } from '@/store/hooks';
import { setThinking } from '@/store/slices/chessBoardSlice';

export default function GamePage() {
  const params = useParams();
  const gameId = params.id as string;
  const dispatch = useAppDispatch();

  const { data: game, isLoading: isLoadingGame } = useGetGameQuery(gameId, {
    pollingInterval: 0,
  });
  const [makeMove, { isLoading: isMoving }] = useMakeMoveMutation();
  const [resignGame] = useResignGameMutation();
  const [drawGame] = useDrawGameMutation();
  const [triggerExportPgn] = useLazyExportPgnQuery();

  const handleMove = useCallback(
    async (from: string, to: string, promotion?: string) => {
      if (!game) return;

      dispatch(setThinking(true));
      try {
        await makeMove({
          gameId: game.id,
          move: { from, to, promotion: promotion as 'q' | 'r' | 'b' | 'n' | undefined },
        }).unwrap();
      } finally {
        dispatch(setThinking(false));
      }
    },
    [game, makeMove, dispatch],
  );

  const handleResign = useCallback(async () => {
    if (!game || !confirm('Are you sure you want to resign?')) return;
    await resignGame(game.id);
  }, [game, resignGame]);

  const handleDraw = useCallback(async () => {
    if (!game) return;
    await drawGame(game.id);
  }, [game, drawGame]);

  const handleExportPgn = useCallback(async () => {
    if (!game) return;
    const result = await triggerExportPgn(game.id);
    if (result.data) {
      const blob = new Blob([result.data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `game-${game.id.slice(0, 8)}.pgn`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [game, triggerExportPgn]);

  if (isLoadingGame || !game) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
      </div>
    );
  }

  const levelLabels: Record<number, string> = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/games" className="text-sm text-slate-400 hover:text-slate-300">
              &larr; Games
            </Link>
            <GameStatusBadge status={game.status} result={game.result} />
          </div>
          <div className="text-sm text-slate-400">
            vs Stockfish ({levelLabels[game.engineLevel ?? 2]})
          </div>
        </div>
      </div>

      <GameTemplate
        board={
          <ChessBoardComponent
            game={game}
            onMove={handleMove}
            disabled={isMoving}
          />
        }
        sidebar={
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-400">Moves</h3>
            <MoveList moves={game.moves} />
            {game.status === 'COMPLETED' && (
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center">
                <p className="text-sm font-medium text-slate-300">
                  {game.result === 'DRAW'
                    ? 'Draw'
                    : game.result === 'WHITE_WIN'
                      ? 'White wins'
                      : 'Black wins'}
                </p>
                {game.resultReason && (
                  <p className="text-xs text-slate-500">by {game.resultReason}</p>
                )}
              </div>
            )}
            {game.status === 'COMPLETED' && (
              <Link href="/play">
                <Button className="w-full" size="sm">
                  New Game
                </Button>
              </Link>
            )}
          </div>
        }
        controls={
          <GameControls
            game={game}
            onResign={handleResign}
            onDraw={handleDraw}
            onExportPgn={handleExportPgn}
            isLoading={isMoving}
          />
        }
      />
    </div>
  );
}
