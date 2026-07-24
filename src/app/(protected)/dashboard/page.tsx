'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms/Button';
import { useLogoutMutation } from '@/store/api/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCredentials } from '@/store/slices/authSlice';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearCredentials());
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-slate-400">
              Welcome back{user?.profile?.firstName ? `, ${user.profile.firstName}` : ''}!
            </p>
          </div>
          <Button variant="ghost" onClick={handleLogout} isLoading={isLoading}>
            Sign Out
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-sm font-medium text-slate-400">Account Status</h3>
            <p className="mt-2 text-2xl font-bold text-white">{user?.status ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-sm font-medium text-slate-400">Role</h3>
            <p className="mt-2 text-2xl font-bold text-white">{user?.role ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-sm font-medium text-slate-400">Onboarding</h3>
            <p className="mt-2 text-2xl font-bold text-white">
              {user?.onboardingStatus?.replace('_', ' ') ?? '—'}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold text-white">Getting Started</h2>
          <p className="mt-2 text-sm text-slate-400">
            Course content, chess games, and AI evaluations will be available in upcoming phases.
            Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
