import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDb, saveDb, User, addActivityLog } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'trendora-super-secure-jwt-secret-key-2026';
const JWT_EXPIRES_IN = '7d';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * Generates signed JWT session token.
 */
export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isMainAdmin: !!user.isMainAdmin
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Middleware: Requires a valid authenticated session.
 * Rejects suspended accounts immediately.
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  let token: string | undefined;

  // Check Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if ((req as any).cookies?.auth_token) {
    token = (req as any).cookies.auth_token;
  }

  if (!token) {
    res.status(401).json({ error: 'Authentication required. No session token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const db = getDb();
    const user = db.users.find(u => u.id === decoded.id);

    if (!user) {
      res.status(401).json({ error: 'User session expired or user no longer exists.' });
      return;
    }

    if (user.status === 'suspended') {
      res.status(403).json({
        error: 'Your account has been suspended by an administrator.',
        reason: user.suspendedReason || 'Policy violation'
      });
      return;
    }

    req.user = user;
    next();
  } catch (err: any) {
    res.status(401).json({ error: 'Invalid or expired authentication session.' });
  }
}

/**
 * Middleware: Requires admin privileges.
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    return;
  }

  next();
}

/**
 * Middleware: Requires the special Root/Main Admin ("admin" account).
 * Only the main admin is permitted to assign or revoke admin roles.
 */
export function requireMainAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  if (req.user.id !== 'admin' && !req.user.isMainAdmin) {
    res.status(403).json({
      error: 'Access denied. Only the primary administrator (ID: "admin") can modify administrative privileges.'
    });
    return;
  }

  next();
}

/**
 * Rate Limiter and Brute-Force Shield for login routes.
 */
export function checkBruteForce(req: Request, res: Response, next: NextFunction): void {
  const db = getDb();
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const identifier = ((req.body?.identifier || req.body?.phone || req.body?.email || '') as string).toLowerCase().trim() || ip;

  const key = `${ip}_${identifier}`;
  const record = db.failedAttempts[key];

  if (record && record.lockedUntil && record.lockedUntil > Date.now()) {
    const minutesLeft = Math.ceil((record.lockedUntil - Date.now()) / 60000);
    res.status(429).json({
      error: `Too many failed login attempts. This account/IP is temporarily locked for security. Please try again in ${minutesLeft} minute(s).`,
      lockedUntil: record.lockedUntil,
      minutesLeft
    });
    return;
  }

  next();
}

/**
 * Records a failed login attempt and locks account if threshold exceeded.
 */
export function recordFailedAttempt(req: Request, identifier: string): { locked: boolean; attemptsLeft: number } {
  const db = getDb();
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const key = `${ip}_${identifier.toLowerCase().trim()}`;
  const settings = db.settings;

  const existing = db.failedAttempts[key] || {
    identifier: key,
    attempts: 0,
    lastAttemptAt: Date.now()
  };

  existing.attempts += 1;
  existing.lastAttemptAt = Date.now();

  const maxAttempts = settings.maxFailedAttempts || 5;
  const lockoutMs = (settings.lockoutDurationMinutes || 15) * 60 * 1000;

  let locked = false;
  if (existing.attempts >= maxAttempts) {
    existing.lockedUntil = Date.now() + lockoutMs;
    locked = true;

    // Log security alert
    addActivityLog(
      { id: 'system', name: 'Security Shield', role: 'admin' },
      'ACCOUNT_LOCKED',
      `Locked after ${existing.attempts} consecutive failed login attempts on identifier: "${identifier}".`,
      { ip, targetUserEmail: identifier }
    );
  }

  db.failedAttempts[key] = existing;
  saveDb(db);

  return {
    locked,
    attemptsLeft: Math.max(0, maxAttempts - existing.attempts)
  };
}

/**
 * Resets failed login attempts after successful authentication.
 */
export function resetFailedAttempts(req: Request, identifier: string): void {
  const db = getDb();
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const key = `${ip}_${identifier.toLowerCase().trim()}`;

  if (db.failedAttempts[key]) {
    delete db.failedAttempts[key];
    saveDb(db);
  }
}
