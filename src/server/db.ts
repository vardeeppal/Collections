import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: string; // "admin" for main admin, or UUID / nanoID for others
  name: string;
  email: string;
  phone: string; // E.164 formatted, e.g. +14155552671
  passwordHash: string;
  role: UserRole;
  isMainAdmin?: boolean; // Only the special "admin" account has this true
  status: UserStatus;
  phoneVerified: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  suspendedAt?: string;
  suspendedReason?: string;
}

export interface OtpRecord {
  id: string;
  target: string; // phone number or email address
  type: 'phone_verification' | 'email_verification' | 'phone_login' | 'password_reset';
  code: string;
  expiresAt: number; // timestamp in ms
  attempts: number;
  verified: boolean;
  createdAt: string;
}

export interface FailedAttempt {
  identifier: string; // IP or username/phone/email
  attempts: number;
  lastAttemptAt: number;
  lockedUntil?: number;
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
  maxFailedAttempts: number; // e.g. 5 failed logins before lockout
  lockoutDurationMinutes: number; // e.g. 15 minutes lockout
  otpExpirySeconds: number; // e.g. 300 seconds (5 mins)
  allowNewRegistrations: boolean; // toggle user registrations
  maintenanceMode: boolean; // non-admins see maintenance notice
  providers: {
    smsProvider: 'twilio' | 'firebase' | 'simulator';
    emailProvider: 'sendgrid' | 'smtp' | 'simulator';
  };
}

export interface DatabaseSchema {
  users: User[];
  otps: OtpRecord[];
  failedAttempts: Record<string, FailedAttempt>;
  activityLogs: ActivityLog[];
  content: SiteContent;
  settings: SystemSettings;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.resolve(DATA_DIR, 'auth_db.json');

// Default initial state
const defaultContent: SiteContent = {
  announcement: {
    enabled: true,
    text: 'System Update: Role-Based Access Control and Dual OTP Security are active.',
    variant: 'info'
  },
  hero: {
    badge: 'Enterprise Security Platform',
    headline: 'Unified Identity, Role-Based Access & Admin Control',
    subheadline:
      'Engineered with dual-channel SMS and Email verification, bcrypt credential security, brute-force shielding, and granular admin authority.',
    primaryCtaText: 'Register New Account',
    secondaryCtaText: 'Sign In to Portal'
  },
  faqs: [
    {
      id: 'faq-1',
      question: 'How does dual-channel verification work?',
      answer:
        'Upon registration, a 6-digit one-time passcode (OTP) is dispatched via SMS to your registered mobile phone, and a confirmation code is dispatched to your email address. Both must be confirmed to complete verification.'
    },
    {
      id: 'faq-2',
      question: 'What privileges does the main Admin account have?',
      answer:
        'The primary admin account (ID: "admin") holds root administrative permissions. Only this account can promote users to administrators or demote them, suspend or delete any account, and manage system-wide settings.'
    },
    {
      id: 'faq-3',
      question: 'Can I log in using just my phone number?',
      answer:
        'Yes. In addition to password-based login, you can switch to "Login via SMS OTP" to receive a temporary one-time login passcode without entering your password.'
    },
    {
      id: 'faq-4',
      question: 'How are failed logins and brute-force attempts handled?',
      answer:
        'The platform tracks failed attempts per identifier. After reaching the configured limit (default: 5 attempts), the account is locked for 15 minutes, and all incidents are recorded in the security audit logs.'
    }
  ],
  contactInfo: {
    email: 'security-team@platform.internal',
    phone: '+1 (800) 555-0199',
    address: 'Enterprise Security HQ, 500 Silicon Vista, Suite 400',
    hours: '24/7 Security Operations Center'
  }
};

const defaultSettings: SystemSettings = {
  maxFailedAttempts: 5,
  lockoutDurationMinutes: 15,
  otpExpirySeconds: 300, // 5 minutes
  allowNewRegistrations: true,
  maintenanceMode: false,
  providers: {
    smsProvider: 'simulator',
    emailProvider: 'simulator'
  }
};

let cacheDb: DatabaseSchema | null = null;

export function getDb(): DatabaseSchema {
  if (cacheDb) return cacheDb;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    // Seed database
    const initialDb = createInitialDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    cacheDb = initialDb;
    return cacheDb;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    cacheDb = JSON.parse(raw);
    ensureMainAdmin(cacheDb!);
    return cacheDb!;
  } catch (err) {
    console.error('Error reading auth_db.json, recreating initial db:', err);
    const initialDb = createInitialDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    cacheDb = initialDb;
    return cacheDb;
  }
}

export function saveDb(db: DatabaseSchema): void {
  cacheDb = db;
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

/**
 * Creates the initial database, ensuring the special "admin" account is seeded with a bcrypt hash.
 */
function createInitialDatabase(): DatabaseSchema {
  // Admin password can be set via ADMIN_PASSWORD environment variable, or defaults to Admin@2026!
  const adminPassword = process.cwd() ? (process.env.ADMIN_PASSWORD || 'Admin@2026!') : 'Admin@2026!';
  const adminSalt = bcrypt.genSaltSync(10);
  const adminHash = bcrypt.hashSync(adminPassword, adminSalt);

  const mainAdminUser: User = {
    id: 'admin',
    name: 'System Administrator',
    email: 'admin@platform.internal',
    phone: '+18005550100',
    passwordHash: adminHash,
    role: 'admin',
    isMainAdmin: true,
    status: 'active',
    phoneVerified: true,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };

  // Seed two sample users for immediate testing
  const sampleUserSalt = bcrypt.genSaltSync(10);
  const sampleUserHash = bcrypt.hashSync('User@12345', sampleUserSalt);

  const sampleUser1: User = {
    id: 'usr-101',
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com',
    phone: '+14155552671',
    passwordHash: sampleUserHash,
    role: 'user',
    status: 'active',
    phoneVerified: true,
    emailVerified: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastLoginAt: new Date(Date.now() - 3600000 * 4).toISOString()
  };

  const sampleUser2: User = {
    id: 'usr-102',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+14155558832',
    passwordHash: sampleUserHash,
    role: 'user',
    status: 'suspended',
    suspendedReason: 'Suspended by admin for investigation of policy violation',
    suspendedAt: new Date(Date.now() - 86400000).toISOString(),
    phoneVerified: true,
    emailVerified: false,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  };

  const initialLogs: ActivityLog[] = [
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 86400000 * 12).toISOString(),
      actorId: 'system',
      actorName: 'System Bootstrapper',
      actorRole: 'admin',
      action: 'USER_REGISTERED',
      targetUserId: 'admin',
      targetUserEmail: 'admin@platform.internal',
      details: 'Root admin account "admin" provisioned with full system permissions.'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      actorId: 'usr-101',
      actorName: 'Sarah Connor',
      actorRole: 'user',
      action: 'USER_REGISTERED',
      targetUserId: 'usr-101',
      targetUserEmail: 'sarah.connor@example.com',
      details: 'User registered with verified phone (+14155552671) and email.'
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      actorId: 'admin',
      actorName: 'System Administrator',
      actorRole: 'admin',
      action: 'USER_SUSPENDED',
      targetUserId: 'usr-102',
      targetUserEmail: 'marcus.vance@example.com',
      details: 'Account suspended by administrator.'
    }
  ];

  return {
    users: [mainAdminUser, sampleUser1, sampleUser2],
    otps: [],
    failedAttempts: {},
    activityLogs: initialLogs,
    content: defaultContent,
    settings: defaultSettings
  };
}

/**
 * Ensures the main admin exists in the database.
 */
function ensureMainAdmin(db: DatabaseSchema) {
  let admin = db.users.find(u => u.id === 'admin');
  if (!admin) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026!';
    const adminHash = bcrypt.hashSync(adminPassword, 10);
    admin = {
      id: 'admin',
      name: 'System Administrator',
      email: 'admin@platform.internal',
      phone: '+18005550100',
      passwordHash: adminHash,
      role: 'admin',
      isMainAdmin: true,
      status: 'active',
      phoneVerified: true,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.unshift(admin);
    saveDb(db);
  }
}

/**
 * Sanitizes user object before returning to client (removes passwordHash).
 */
export function sanitizeUser(user: User): Omit<User, 'passwordHash'> {
  const { passwordHash: _discard, ...safeUser } = user;
  return safeUser;
}

/**
 * Appends an audit log entry.
 */
export function addActivityLog(
  actor: { id: string; name: string; role: UserRole },
  action: ActivityLog['action'],
  details: string,
  extra?: { targetUserId?: string; targetUserEmail?: string; ip?: string; userAgent?: string }
): ActivityLog {
  const db = getDb();
  const logEntry: ActivityLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action,
    details,
    targetUserId: extra?.targetUserId,
    targetUserEmail: extra?.targetUserEmail,
    ip: extra?.ip,
    userAgent: extra?.userAgent
  };

  db.activityLogs.unshift(logEntry);
  // Keep the most recent 500 logs
  if (db.activityLogs.length > 500) {
    db.activityLogs = db.activityLogs.slice(0, 500);
  }
  saveDb(db);
  return logEntry;
}
