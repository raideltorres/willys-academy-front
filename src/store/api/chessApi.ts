import type {
  ChessGame,
  CreateGameRequest,
  GamesListResponse,
  ImportGameRequest,
  MakeMoveRequest,
} from '@/types/chess';

import { baseApi } from './baseApi';

export const chessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation<ChessGame, CreateGameRequest>({
      query: (body) => ({ url: '/chess/games', method: 'POST', body }),
      invalidatesTags: ['ChessGame'],
    }),

    getGames: builder.query<GamesListResponse, { status?: string; page?: number; pageSize?: number }>({
      query: ({ status, page = 1, pageSize = 20 }) => ({
        url: '/chess/games',
        params: { status, page, pageSize },
      }),
      providesTags: ['ChessGame'],
    }),

    getGame: builder.query<ChessGame, string>({
      query: (id) => `/chess/games/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'ChessGame', id }],
    }),

    makeMove: builder.mutation<ChessGame, { gameId: string; move: MakeMoveRequest }>({
      query: ({ gameId, move }) => ({
        url: `/chess/games/${gameId}/moves`,
        method: 'POST',
        body: move,
      }),
      invalidatesTags: (_result, _err, { gameId }) => [{ type: 'ChessGame', id: gameId }],
    }),

    resignGame: builder.mutation<ChessGame, string>({
      query: (gameId) => ({ url: `/chess/games/${gameId}/resign`, method: 'POST' }),
      invalidatesTags: (_result, _err, gameId) => [{ type: 'ChessGame', id: gameId }, 'ChessGame'],
    }),

    drawGame: builder.mutation<ChessGame, string>({
      query: (gameId) => ({ url: `/chess/games/${gameId}/draw`, method: 'POST' }),
      invalidatesTags: (_result, _err, gameId) => [{ type: 'ChessGame', id: gameId }, 'ChessGame'],
    }),

    importGame: builder.mutation<ChessGame, ImportGameRequest>({
      query: (body) => ({ url: '/chess/games/import', method: 'POST', body }),
      invalidatesTags: ['ChessGame'],
    }),

    exportPgn: builder.query<string, string>({
      query: (gameId) => ({
        url: `/chess/games/${gameId}/pgn`,
        responseHandler: 'text',
      }),
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGamesQuery,
  useGetGameQuery,
  useMakeMoveMutation,
  useResignGameMutation,
  useDrawGameMutation,
  useImportGameMutation,
  useLazyExportPgnQuery,
} = chessApi;
