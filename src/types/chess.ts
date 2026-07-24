export type OpponentType = 'ENGINE' | 'LOCAL' | 'IMPORT';
export type PlayerColor = 'WHITE' | 'BLACK';
export type GameResult = 'WHITE_WIN' | 'BLACK_WIN' | 'DRAW' | 'ONGOING';
export type GameStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
export type PieceColor = 'WHITE' | 'BLACK';

export interface ChessMove {
  id: string;
  gameId: string;
  moveNumber: number;
  color: PieceColor;
  san: string;
  uci: string;
  fen: string;
  timeSpentMs: number | null;
  createdAt: string;
}

export interface ChessGame {
  id: string;
  userId: string;
  opponentType: OpponentType;
  engineLevel: number | null;
  engineName: string | null;
  playerColor: PlayerColor;
  result: GameResult;
  resultReason: string | null;
  pgn: string | null;
  startingFen: string;
  currentFen: string;
  moveCount: number;
  opening: string | null;
  openingEco: string | null;
  status: GameStatus;
  startedAt: string;
  completedAt: string | null;
  moves: ChessMove[];
}

export interface ChessGameSummary {
  id: string;
  opponentType: OpponentType;
  engineLevel: number | null;
  playerColor: PlayerColor;
  result: GameResult;
  resultReason: string | null;
  moveCount: number;
  opening: string | null;
  status: GameStatus;
  startedAt: string;
  completedAt: string | null;
}

export interface GamesListResponse {
  games: ChessGameSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateGameRequest {
  opponentType?: OpponentType;
  playerColor?: PlayerColor;
  engineLevel?: number;
}

export interface MakeMoveRequest {
  from: string;
  to: string;
  promotion?: 'q' | 'r' | 'b' | 'n';
}

export interface ImportGameRequest {
  pgn: string;
}
