import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['User', 'Course', 'ChessGame', 'Analysis', 'Evaluation'],
  endpoints: () => ({}),
});
