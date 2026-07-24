import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  ResetPasswordRequest,
  User,
} from '@/types/auth';

import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponse, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),

    logout: builder.mutation<MessageResponse, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),

    verifyEmail: builder.mutation<MessageResponse, { token: string }>({
      query: (body) => ({ url: '/auth/verify-email', method: 'POST', body }),
    }),

    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),

    resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
      query: (body) => ({ url: '/auth/reset-password', method: 'POST', body }),
    }),

    getMe: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<User['profile'], Partial<NonNullable<User['profile']>>>({
      query: (body) => ({ url: '/users/me/profile', method: 'PATCH', body }),
      invalidatesTags: ['User'],
    }),

    updatePreferences: builder.mutation<
      User['preference'],
      Partial<NonNullable<User['preference']>>
    >({
      query: (body) => ({ url: '/users/me/preferences', method: 'PATCH', body }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePreferencesMutation,
} = authApi;
