'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { useVerifyEmailMutation } from '@/store/api/authApi';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    verifyEmail({ token })
      .unwrap()
      .then(() => {
        setStatus('success');
        setMessage('Email verified successfully!');
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. The link may have expired.');
      });
  }, [token, verifyEmail]);

  return (
    <AuthTemplate>
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
            <p className="mt-4 text-sm text-slate-400">Verifying your email...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">Email Verified</h1>
            <p className="mt-2 text-sm text-slate-400">{message}</p>
            <Link
              href="/auth/login?verified=true"
              className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300"
            >
              Continue to login
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">Verification Failed</h1>
            <p className="mt-2 text-sm text-slate-400">{message}</p>
            <Link
              href="/auth/login"
              className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </AuthTemplate>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
