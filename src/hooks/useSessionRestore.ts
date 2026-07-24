'use client';

import { useEffect } from 'react';

import { useGetMeQuery } from '@/store/api/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

export function useSessionRestore() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated && user) {
      dispatch(setCredentials({ accessToken: '', user }));
    }
  }, [isAuthenticated, user, dispatch]);

  return {
    isAuthenticated: isAuthenticated || !!user,
    isLoading: !isAuthenticated && isLoading,
  };
}
