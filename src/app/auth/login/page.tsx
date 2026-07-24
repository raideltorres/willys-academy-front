'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent, Suspense } from 'react';

import { FormField } from '@/components/molecules/FormField';
import { AuthForm } from '@/components/organisms/AuthForm';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { useLoginMutation, useGetMeQuery } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slices/authSlice';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const registered = searchParams.get('registered') === 'true';
  const verified = searchParams.get('verified') === 'true';

  useGetMeQuery(undefined, {
    skip: !accessToken,
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string).trim();
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken: result.accessToken }));
      setAccessToken(result.accessToken);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1'}/users/me`,
        {
          headers: { Authorization: `Bearer ${result.accessToken}` },
          credentials: 'include',
        },
      );

      if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
      }

      router.push('/dashboard');
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError.data?.message ?? 'Login failed. Please try again.');
    }
  };

  return (
    <AuthTemplate>
      <AuthForm
        title="Welcome back"
        subtitle="Sign in to your account"
        onSubmit={handleSubmit}
        submitLabel="Sign In"
        isLoading={isLoading}
        error={error}
        footer={
          <span>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300">
              Create one
            </Link>
          </span>
        }
      >
        {registered && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Registration successful! Please check your email to verify your account.
          </div>
        )}
        {verified && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Email verified! You can now sign in.
          </div>
        )}
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-slate-400 hover:text-indigo-400"
          >
            Forgot password?
          </Link>
        </div>
      </AuthForm>
    </AuthTemplate>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
