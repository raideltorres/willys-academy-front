'use client';

import { Button } from '@/components/atoms/Button';
import { useAppDispatch } from '@/store/hooks';
import { flipBoard } from '@/store/slices/chessBoardSlice';
import type { ChessGame } from '@/types/chess';

interface GameControlsProps {
  game: ChessGame;
  onResign: () => void;
  onDraw: () => void;
  onExportPgn: () => void;
  isLoading?: boolean;
}

export function GameControls({ game, onResign, onDraw, onExportPgn, isLoading }: GameControlsProps) {
  const dispatch = useAppDispatch();
  const isActive = game.status === 'ACTIVE';

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => dispatch(flipBoard())}
      >
        Flip Board
      </Button>

      {isActive && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDraw}
            disabled={isLoading}
          >
            Offer Draw
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onResign}
            disabled={isLoading}
          >
            Resign
          </Button>
        </>
      )}

      <Button variant="ghost" size="sm" onClick={onExportPgn}>
        Export PGN
      </Button>
    </div>
  );
}
