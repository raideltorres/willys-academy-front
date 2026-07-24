'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { FormField } from '@/components/molecules/FormField';
import { AuthForm } from '@/components/organisms/AuthForm';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { useRegisterMutation } from '@/store/api/authApi';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get('firstName') as string).trim();
    const lastName = (formData.get('lastName') as string).trim();
    const email = (formData.get('email') as string).trim();
    const password = formData.get('password') as string;

    const errors: FormErrors = {};
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await register({ email, password, firstName, lastName }).unwrap();
      router.push('/auth/login?registered=true');
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError.data?.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthTemplate>
      <AuthForm
        title="Create your account"
        subtitle="Start your learning journey"
        onSubmit={handleSubmit}
        submitLabel="Create Account"
        isLoading={isLoading}
        error={error}
        footer={
          <span>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </span>
        }
      >
        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="John"
            required
            error={fieldErrors.firstName}
          />
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            required
            error={fieldErrors.lastName}
          />
        </div>
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          error={fieldErrors.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          error={fieldErrors.password}
          hint="At least 8 characters, one uppercase, one lowercase, one number"
        />
      </AuthForm>
    </AuthTemplate>
  );
}
