'use client';

import { useCallback, useMemo, useState } from 'react';
import { Chess } from 'chess.js';
import type { Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';

import { useAppSelector } from '@/store/hooks';
import type { ChessGame } from '@/types/chess';

interface ChessBoardProps {
  game: ChessGame;
  onMove: (from: string, to: string, promotion?: string) => void;
  disabled?: boolean;
}

export function ChessBoardComponent({ game, onMove, disabled }: ChessBoardProps) {
  const boardOrientation = useAppSelector((state) => state.chessBoard.boardOrientation);
  const isThinking = useAppSelector((state) => state.chessBoard.isThinking);
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});

  const chess = useMemo(() => new Chess(game.currentFen), [game.currentFen]);

  const isPlayerTurn = useMemo(() => {
    if (game.status !== 'ACTIVE') return false;
    const turnColor = chess.turn() === 'w' ? 'WHITE' : 'BLACK';
    return turnColor === game.playerColor;
  }, [chess, game.status, game.playerColor]);

  const canInteract = isPlayerTurn && !disabled && !isThinking;

  const getMoveOptions = useCallback(
    (square: string) => {
      const moves = chess.moves({ square: square as Square, verbose: true });
      if (moves.length === 0) return {};

      const newSquares: Record<string, React.CSSProperties> = {};
      moves.forEach((move) => {
        const targetPiece = chess.get(move.to as Square);
        const sourcePiece = chess.get(square as Square);
        newSquares[move.to] = {
          background:
            targetPiece && sourcePiece && targetPiece.color !== sourcePiece.color
              ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
              : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          borderRadius: '50%',
        };
      });

      newSquares[square] = { background: 'rgba(255, 255, 0, 0.4)' };
      return newSquares;
    },
    [chess],
  );

  const onSquareClick = useCallback(
    ({ square }: { piece: unknown; square: string }) => {
      if (!canInteract) return;

      if (!moveFrom) {
        const piece = chess.get(square as Square);
        if (piece && piece.color === chess.turn()) {
          setMoveFrom(square);
          setOptionSquares(getMoveOptions(square));
        }
        return;
      }

      const moves = chess.moves({ square: moveFrom as Square, verbose: true });
      const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

      if (!foundMove) {
        const piece = chess.get(square as Square);
        if (piece && piece.color === chess.turn()) {
          setMoveFrom(square);
          setOptionSquares(getMoveOptions(square));
        } else {
          setMoveFrom(null);
          setOptionSquares({});
        }
        return;
      }

      const promotion = foundMove.promotion ? 'q' : undefined;
      onMove(moveFrom, square, promotion);
      setMoveFrom(null);
      setOptionSquares({});
    },
    [canInteract, chess, moveFrom, getMoveOptions, onMove],
  );

  const onPieceDrop = useCallback(
    ({ sourceSquare, targetSquare, piece }: { piece: { pieceType: string }; sourceSquare: string; targetSquare: string | null }) => {
      if (!canInteract || !targetSquare) return false;

      try {
        const isPawn = piece.pieceType.toLowerCase() === 'p';
        const promotion =
          isPawn && (targetSquare[1] === '8' || targetSquare[1] === '1')
            ? 'q'
            : undefined;
        const move = chess.move({ from: sourceSquare, to: targetSquare, promotion });
        if (!move) return false;

        chess.undo();
        onMove(sourceSquare, targetSquare, promotion);
        return true;
      } catch {
        return false;
      }
    },
    [canInteract, chess, onMove],
  );

  const lastMove = game.moves.length > 0 ? game.moves[game.moves.length - 1] : null;
  const highlightSquares: Record<string, React.CSSProperties> = {};

  if (lastMove) {
    const from = lastMove.uci.slice(0, 2);
    const to = lastMove.uci.slice(2, 4);
    highlightSquares[from] = { background: 'rgba(255, 255, 0, 0.2)' };
    highlightSquares[to] = { background: 'rgba(255, 255, 0, 0.3)' };
  }

  return (
    <div className="relative aspect-square w-full max-w-lg">
      <Chessboard
        options={{
          position: game.currentFen,
          boardOrientation,
          onPieceDrop,
          onSquareClick,
          boardStyle: {
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          },
          darkSquareStyle: { backgroundColor: '#4a5568' },
          lightSquareStyle: { backgroundColor: '#a0aec0' },
          squareStyles: { ...highlightSquares, ...optionSquares },
          allowDragging: canInteract,
          animationDurationInMs: 200,
        }}
      />
      {isThinking && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
          <div className="flex items-center gap-2 rounded-lg bg-slate-900/90 px-4 py-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
            <span className="text-sm text-slate-300">Thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
}
