'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { FormField } from '@/components/molecules/FormField';
import { AuthForm } from '@/components/organisms/AuthForm';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { useForgotPasswordMutation } from '@/store/api/authApi';

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string).trim();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setSent(true);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError.data?.message ?? 'Something went wrong. Please try again.');
    }
  };

  if (sent) {
    return (
      <AuthTemplate>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Check your email</h1>
          <p className="mt-4 text-sm text-slate-400">
            If an account exists with that email, we&apos;ve sent a password reset link.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300"
          >
            Back to login
          </Link>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate>
      <AuthForm
        title="Forgot password?"
        subtitle="Enter your email and we'll send a reset link"
        onSubmit={handleSubmit}
        submitLabel="Send Reset Link"
        isLoading={isLoading}
        error={error}
        footer={
          <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300">
            Back to login
          </Link>
        }
      >
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </AuthForm>
    </AuthTemplate>
  );
}
