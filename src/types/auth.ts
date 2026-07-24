export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  role: 'USER' | 'INSTRUCTOR' | 'ADMIN' | 'SUPER_ADMIN';
  onboardingStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  profile: UserProfile | null;
  preference: UserPreference | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  phone: string | null;
  country: string | null;
  timezone: string | null;
  locale: string;
  avatarUrl: string | null;
}

export interface UserPreference {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  technicalEvaluations: boolean;
  educationalReflections: boolean;
  theme: 'LIGHT' | 'DARK' | 'SYSTEM';
}

export interface UserSession {
  id: string;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
  expiresAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface MessageResponse {
  message: string;
}
