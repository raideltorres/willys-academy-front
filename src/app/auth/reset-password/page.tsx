'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, type FormEvent, Suspense } from 'react';

import { FormField } from '@/components/molecules/FormField';
import { AuthForm } from '@/components/organisms/AuthForm';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { useResetPasswordMutation } from '@/store/api/authApi';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <AuthTemplate>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Invalid Link</h1>
          <p className="mt-4 text-sm text-slate-400">
            This password reset link is invalid or has expired.
          </p>
          <Link
            href="/auth/forgot-password"
            className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300"
          >
            Request a new link
          </Link>
        </div>
      </AuthTemplate>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await resetPassword({ token, newPassword }).unwrap();
      router.push('/auth/login?reset=true');
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError.data?.message ?? 'Failed to reset password. Please try again.');
    }
  };

  return (
    <AuthTemplate>
      <AuthForm
        title="Set new password"
        subtitle="Choose a strong password for your account"
        onSubmit={handleSubmit}
        submitLabel="Reset Password"
        isLoading={isLoading}
        error={error}
      >
        <FormField
          label="New Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          hint="At least 8 characters, one uppercase, one lowercase, one number"
        />
        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
        />
      </AuthForm>
    </AuthTemplate>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
