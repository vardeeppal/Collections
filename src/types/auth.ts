export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isMainAdmin?: boolean;
  status: UserStatus;
  phoneVerified: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  suspendedAt?: string;
  suspendedReason?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action:
    | 'USER_REGISTERED'
    | 'PHONE_VERIFIED'
    | 'EMAIL_VERIFIED'
    | 'LOGIN_SUCCESS'
    | 'LOGIN_FAILED'
    | 'LOGIN_OTP_REQUESTED'
    | 'ACCOUNT_LOCKED'
    | 'PASSWORD_RESET_REQUESTED'
    | 'PASSWORD_RESET_SUCCESS'
    | 'PROFILE_UPDATED'
    | 'PASSWORD_CHANGED'
    | 'USER_SUSPENDED'
    | 'USER_UNSUSPENDED'
    | 'USER_DELETED'
    | 'USER_UPDATED_BY_ADMIN'
    | 'ROLE_CHANGED'
    | 'CONTENT_UPDATED'
    | 'SETTINGS_UPDATED';
  targetUserId?: string;
  targetUserEmail?: string;
  details: string;
  ip?: string;
  userAgent?: string;
}

export interface SiteContent {
  announcement: {
    enabled: boolean;
    text: string;
    variant: 'info' | 'warning' | 'success' | 'alert';
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
}

export interface SystemSettings {
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
  otpExpirySeconds: number;
  allowNewRegistrations: boolean;
  maintenanceMode: boolean;
  providers: {
    smsProvider: 'twilio' | 'firebase' | 'simulator';
    emailProvider: 'sendgrid' | 'smtp' | 'simulator';
  };
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  adminUsers: number;
  phoneVerifiedCount: number;
  emailVerifiedCount: number;
  totalLogs: number;
  activeLockouts: number;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
}
