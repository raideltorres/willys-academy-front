'use client';

import { useState, type FormEvent } from 'react';

import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';
import { useUpdateProfileMutation, useUpdatePreferencesMutation } from '@/store/api/authApi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/authSlice';
import type { User } from '@/types/auth';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [updatePreferences, { isLoading: isUpdatingPrefs }] = useUpdatePreferencesMutation();
  const [message, setMessage] = useState<string | null>(null);

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const profile = await updateProfile({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        displayName: (formData.get('displayName') as string) || null,
        timezone: (formData.get('timezone') as string) || null,
      }).unwrap();

      if (user && profile) {
        dispatch(setUser({ ...user, profile } as User));
      }

      setMessage('Profile updated successfully');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  const handlePreferenceChange = async (key: string, value: boolean) => {
    try {
      const preference = await updatePreferences({ [key]: value }).unwrap();
      if (user && preference) {
        dispatch(setUser({ ...user, preference } as User));
      }
    } catch {
      // silently fail for preference toggle
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="mt-1 text-slate-400">{user?.email}</p>

        {message && (
          <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {message}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-white">Personal Information</h2>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="First Name"
              name="firstName"
              defaultValue={user?.profile?.firstName ?? ''}
              required
            />
            <FormField
              label="Last Name"
              name="lastName"
              defaultValue={user?.profile?.lastName ?? ''}
              required
            />
          </div>
          <FormField
            label="Display Name"
            name="displayName"
            defaultValue={user?.profile?.displayName ?? ''}
            placeholder="Optional display name"
          />
          <FormField
            label="Timezone"
            name="timezone"
            defaultValue={user?.profile?.timezone ?? ''}
            placeholder="e.g. America/New_York"
          />
          <Button type="submit" isLoading={isUpdatingProfile}>
            Save Changes
          </Button>
        </form>

        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
          {[
            { key: 'emailNotifications', label: 'Email Notifications' },
            { key: 'pushNotifications', label: 'Push Notifications' },
            { key: 'technicalEvaluations', label: 'Technical Evaluations' },
            { key: 'educationalReflections', label: 'Educational Reflections' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <span className="text-sm text-slate-300">{label}</span>
              <input
                type="checkbox"
                defaultChecked={user?.preference?.[key as keyof NonNullable<User['preference']>] as boolean}
                onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                disabled={isUpdatingPrefs}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
