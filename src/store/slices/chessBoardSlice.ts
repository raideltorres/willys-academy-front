'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ChessBoardState {
  boardOrientation: 'white' | 'black';
  isThinking: boolean;
  lastMoveSquares: { from: string; to: string } | null;
}

const initialState: ChessBoardState = {
  boardOrientation: 'white',
  isThinking: false,
  lastMoveSquares: null,
};

export const chessBoardSlice = createSlice({
  name: 'chessBoard',
  initialState,
  reducers: {
    setBoardOrientation: (state, action: PayloadAction<'white' | 'black'>) => {
      state.boardOrientation = action.payload;
    },
    flipBoard: (state) => {
      state.boardOrientation = state.boardOrientation === 'white' ? 'black' : 'white';
    },
    setThinking: (state, action: PayloadAction<boolean>) => {
      state.isThinking = action.payload;
    },
    setLastMove: (state, action: PayloadAction<{ from: string; to: string } | null>) => {
      state.lastMoveSquares = action.payload;
    },
    resetBoard: () => initialState,
  },
});

export const { setBoardOrientation, flipBoard, setThinking, setLastMove, resetBoard } =
  chessBoardSlice.actions;
export default chessBoardSlice.reducer;
