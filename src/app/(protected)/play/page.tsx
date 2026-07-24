'use client';

import { useRouter } from 'next/navigation';

import { NewGameDialog } from '@/components/organisms/NewGameDialog';
import { useCreateGameMutation } from '@/store/api/chessApi';
import { useAppDispatch } from '@/store/hooks';
import { setBoardOrientation, resetBoard } from '@/store/slices/chessBoardSlice';
import type { PlayerColor } from '@/types/chess';

export default function PlayPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createGame, { isLoading }] = useCreateGameMutation();

  const handleStart = async (color: PlayerColor, level: number) => {
    try {
      dispatch(resetBoard());
      dispatch(setBoardOrientation(color === 'WHITE' ? 'white' : 'black'));

      const game = await createGame({
        opponentType: 'ENGINE',
        playerColor: color,
        engineLevel: level,
      }).unwrap();

      router.push(`/play/${game.id}`);
    } catch {
      // Error handled by RTK Query
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl" />
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">New Game</h1>
          <NewGameDialog onStart={handleStart} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
