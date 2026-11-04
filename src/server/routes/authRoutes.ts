import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
  getDb,
  saveDb,
  User,
  OtpRecord,
  sanitizeUser,
  addActivityLog
} from '../db';
import {
  generateToken,
  requireAuth,
  checkBruteForce,
  recordFailedAttempt,
  resetFailedAttempts,
  AuthenticatedRequest
} from '../middleware/authMiddleware';
import { sendSmsOtp } from '../services/smsService';
import { sendEmailVerification } from '../services/emailService';

export const authRouter = Router();

// Helper to generate a 6-digit numeric OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 1. USER REGISTRATION
 * Requires Phone (+country code), Email (unique), Password (min 8 chars, 1 letter, 1 number)
 */
authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, password } = req.body;
    const db = getDb();

    // Check if new registrations are allowed by admin
    if (db.settings.allowNewRegistrations === false) {
      res.status(403).json({
        error: 'New account registrations are temporarily paused by the system administrator.'
      });
      return;
    }

    // Validate inputs
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      res.status(400).json({ error: 'Valid phone number with country code is required (e.g., +14155552671).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'A valid email address is required.' });
      return;
    }

    // Password policy: min 8 characters, at least 1 letter and 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      res.status(400).json({
        error: 'Password must be at least 8 characters long and contain at least one letter and one number.'
      });
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const cleanEmail = email.trim().toLowerCase();

    // Check uniqueness across users
    const existingPhone = db.users.find(u => u.phone === cleanPhone);
    if (existingPhone) {
      res.status(409).json({ error: 'This phone number is already registered to another account.' });
      return;
    }

    const existingEmail = db.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existingEmail) {
      res.status(409).json({ error: 'This email address is already registered to another account.' });
      return;
    }

    // Hash password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUserId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    const newUser: User = {
      id: newUserId,
      name: name?.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: cleanPhone,
      passwordHash,
      role: 'user', // standard user role
      status: 'active',
      phoneVerified: false,
      emailVerified: false,
      createdAt: nowIso,
      updatedAt: nowIso
    };

    db.users.push(newUser);

    // Generate SMS OTP and Email confirmation code
    const phoneOtp = generateOtp();
    const emailOtp = generateOtp();
    const expiryMs = (db.settings.otpExpirySeconds || 300) * 1000;
    const expiresAt = Date.now() + expiryMs;

    const phoneOtpRecord: OtpRecord = {
      id: `otp-phone-${Date.now()}`,
      target: cleanPhone,
      type: 'phone_verification',
      code: phoneOtp,
      expiresAt,
      attempts: 0,
      verified: false,
      createdAt: nowIso
    };

    const emailOtpRecord: OtpRecord = {
      id: `otp-email-${Date.now()}`,
      target: cleanEmail,
      type: 'email_verification',
      code: emailOtp,
      expiresAt,
      attempts: 0,
      verified: false,
      createdAt: nowIso
    };

    db.otps.push(phoneOtpRecord, emailOtpRecord);
    saveDb(db);

    // Dispatch SMS and Email
    const smsPromise = sendSmsOtp(cleanPhone, phoneOtp, 'verification');
    const emailPromise = sendEmailVerification(cleanEmail, emailOtp, newUser.name, 'verification');

    const [smsRes, emailRes] = await Promise.all([smsPromise, emailPromise]);

    // Log registration
    addActivityLog(
      { id: newUser.id, name: newUser.name, role: newUser.role },
      'USER_REGISTERED',
      `Registered with phone ${cleanPhone} and email ${cleanEmail}. Verification pending.`,
      {
        targetUserId: newUser.id,
        targetUserEmail: cleanEmail,
        ip: req.ip || req.socket.remoteAddress
      }
    );

    res.status(201).json({
      message: 'Account created successfully! Please verify your phone number and email address.',
      user: sanitizeUser(newUser),
      phoneOtpRequired: true,
      emailOtpRequired: true,
      // Provide simulated codes for seamless testing in development/preview
      devSimulation: {
        phoneCode: smsRes.simulatedCode,
        emailCode: emailRes.simulatedCode,
        providerSms: smsRes.provider,
        providerEmail: emailRes.provider
      }
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed due to a server error.' });
  }
});

/**
 * 2. VERIFY PHONE OTP
 */
authRouter.post('/verify-phone-otp', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) {
      res.status(400).json({ error: 'Phone number and verification code are required.' });
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const cleanCode = code.trim();
    const db = getDb();

    // Look for active OTP
    const otp = db.otps
      .filter(o => o.target === cleanPhone && o.type === 'phone_verification' && !o.verified)
      .sort((a, b) => b.expiresAt - a.expiresAt)[0];

    if (!otp) {
      res.status(400).json({ error: 'No active OTP verification code found for this phone number. Please request a new code.' });
      return;
    }

    if (Date.now() > otp.expiresAt) {
      res.status(400).json({ error: 'The verification code has expired. Please request a fresh one.' });
      return;
    }

    if (otp.code !== cleanCode) {
      otp.attempts += 1;
      saveDb(db);
      res.status(400).json({ error: 'Incorrect verification code. Please check and try again.' });
      return;
    }

    // Mark OTP verified
    otp.verified = true;

    // Update user
    const user = db.users.find(u => u.phone === cleanPhone);
    if (!user) {
      res.status(404).json({ error: 'Associated user account not found.' });
      return;
    }

    user.phoneVerified = true;
    user.updatedAt = new Date().toISOString();
    saveDb(db);

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'PHONE_VERIFIED',
      `Phone number ${cleanPhone} verified successfully.`,
      { targetUserId: user.id, targetUserEmail: user.email }
    );

    const token = generateToken(user);

    res.json({
      message: 'Phone number verified successfully!',
      user: sanitizeUser(user),
      token,
      fullyVerified: user.phoneVerified && user.emailVerified
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to verify phone OTP.' });
  }
});

/**
 * 3. VERIFY EMAIL CODE
 */
authRouter.post('/verify-email-code', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      res.status(400).json({ error: 'Email and confirmation code are required.' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();
    const db = getDb();

    const otp = db.otps
      .filter(o => o.target.toLowerCase() === cleanEmail && o.type === 'email_verification' && !o.verified)
      .sort((a, b) => b.expiresAt - a.expiresAt)[0];

    if (!otp) {
      res.status(400).json({ error: 'No active confirmation code found for this email. Please request a new code.' });
      return;
    }

    if (Date.now() > otp.expiresAt) {
      res.status(400).json({ error: 'The confirmation code has expired. Please request a fresh one.' });
      return;
    }

    if (otp.code !== cleanCode) {
      otp.attempts += 1;
      saveDb(db);
      res.status(400).json({ error: 'Incorrect confirmation code.' });
      return;
    }

    otp.verified = true;

    const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      res.status(404).json({ error: 'User account not found.' });
      return;
    }

    user.emailVerified = true;
    user.updatedAt = new Date().toISOString();
    saveDb(db);

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'EMAIL_VERIFIED',
      `Email address ${cleanEmail} verified successfully.`,
      { targetUserId: user.id, targetUserEmail: cleanEmail }
    );

    const token = generateToken(user);

    res.json({
      message: 'Email address verified successfully!',
      user: sanitizeUser(user),
      token,
      fullyVerified: user.phoneVerified && user.emailVerified
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to verify email code.' });
  }
});

/**
 * 4. RESEND OTP
 */
authRouter.post('/resend-otp', async (req: Request, res: Response): Promise<void> => {
  try {
    const { target, type } = req.body; // target: phone or email; type: 'phone' | 'email'
    if (!target) {
      res.status(400).json({ error: 'Target (phone or email) is required.' });
      return;
    }

    const db = getDb();
    const newCode = generateOtp();
    const expiryMs = (db.settings.otpExpirySeconds || 300) * 1000;
    const expiresAt = Date.now() + expiryMs;
    const nowIso = new Date().toISOString();

    if (type === 'email' || target.includes('@')) {
      const cleanEmail = target.trim().toLowerCase();
      const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

      const otpRecord: OtpRecord = {
        id: `otp-email-${Date.now()}`,
        target: cleanEmail,
        type: 'email_verification',
        code: newCode,
        expiresAt,
        attempts: 0,
        verified: false,
        createdAt: nowIso
      };
      db.otps.push(otpRecord);
      saveDb(db);

      const emailRes = await sendEmailVerification(cleanEmail, newCode, user?.name || 'User');
      res.json({
        message: `Fresh verification code dispatched to ${cleanEmail}`,
        simulatedCode: emailRes.simulatedCode,
        provider: emailRes.provider
      });
    } else {
      const cleanPhone = target.trim().replace(/\s+/g, '');
      const otpRecord: OtpRecord = {
        id: `otp-phone-${Date.now()}`,
        target: cleanPhone,
        type: 'phone_verification',
        code: newCode,
        expiresAt,
        attempts: 0,
        verified: false,
        createdAt: nowIso
      };
      db.otps.push(otpRecord);
      saveDb(db);

      const smsRes = await sendSmsOtp(cleanPhone, newCode, 'verification');
      res.json({
        message: `Fresh SMS OTP dispatched to ${cleanPhone}`,
        simulatedCode: smsRes.simulatedCode,
        provider: smsRes.provider
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to resend code.' });
  }
});

/**
 * 5. USER LOGIN
 * Supports:
 * - Admin login with ID "admin" and password
 * - Email + password
 * - Phone number + password
 * - Phone number + one-time SMS code
 */
authRouter.post('/login', checkBruteForce, async (req: Request, res: Response): Promise<void> => {
  try {
    const { loginMethod = 'password', identifier, password, phone, otpCode } = req.body;
    const db = getDb();

    // ------------------------------------------------------------------
    // Method A: Phone Number + SMS OTP Login
    // ------------------------------------------------------------------
    if (loginMethod === 'otp') {
      if (!phone || !otpCode) {
        res.status(400).json({ error: 'Phone number and SMS code are required for OTP login.' });
        return;
      }

      const cleanPhone = phone.trim().replace(/\s+/g, '');
      const user = db.users.find(u => u.phone === cleanPhone);

      if (!user) {
        recordFailedAttempt(req, cleanPhone);
        res.status(404).json({ error: 'No account registered with this phone number.' });
        return;
      }

      if (user.status === 'suspended') {
        res.status(403).json({
          error: 'Your account has been suspended by an administrator.',
          reason: user.suspendedReason || 'Administrative suspension'
        });
        return;
      }

      const activeOtp = db.otps
        .filter(o => o.target === cleanPhone && o.type === 'phone_login' && !o.verified)
        .sort((a, b) => b.expiresAt - a.expiresAt)[0];

      if (!activeOtp || Date.now() > activeOtp.expiresAt || activeOtp.code !== otpCode.trim()) {
        const { locked, attemptsLeft } = recordFailedAttempt(req, cleanPhone);
        res.status(400).json({
          error: locked
            ? 'Account locked due to too many failed attempts.'
            : `Invalid or expired OTP code. ${attemptsLeft} attempts remaining before lockout.`
        });
        return;
      }

      activeOtp.verified = true;
      resetFailedAttempts(req, cleanPhone);

      user.lastLoginAt = new Date().toISOString();
      saveDb(db);

      const token = generateToken(user);

      addActivityLog(
        { id: user.id, name: user.name, role: user.role },
        'LOGIN_SUCCESS',
        `Logged in via SMS OTP passcode from IP ${req.ip || 'unknown'}.`,
        { targetUserId: user.id, targetUserEmail: user.email, ip: req.ip }
      );

      res.json({
        message: 'Logged in successfully via SMS OTP.',
        user: sanitizeUser(user),
        token
      });
      return;
    }

    // ------------------------------------------------------------------
    // Method B: Password Login (Admin ID "admin", Email, or Phone)
    // ------------------------------------------------------------------
    if (!identifier || !password) {
      res.status(400).json({ error: 'Identifier (Admin ID, email, or phone) and password are required.' });
      return;
    }

    const cleanIdentifier = identifier.trim();
    let user: User | undefined;

    // Check 1: Special Root Admin Login by ID "admin"
    if (cleanIdentifier.toLowerCase() === 'admin') {
      user = db.users.find(u => u.id === 'admin');
    }

    // Check 2: Email Match
    if (!user && cleanIdentifier.includes('@')) {
      user = db.users.find(u => u.email.toLowerCase() === cleanIdentifier.toLowerCase());
    }

    // Check 3: Phone Match
    if (!user) {
      const normalizedPhone = cleanIdentifier.replace(/\s+/g, '');
      user = db.users.find(u => u.phone === normalizedPhone);
    }

    // Check 4: ID Match for other accounts
    if (!user) {
      user = db.users.find(u => u.id === cleanIdentifier);
    }

    // If user not found OR password mismatch
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      const { locked, attemptsLeft } = recordFailedAttempt(req, cleanIdentifier);

      addActivityLog(
        { id: 'anonymous', name: 'Unknown', role: 'user' },
        'LOGIN_FAILED',
        `Failed password login attempt for "${cleanIdentifier}". Remaining attempts: ${attemptsLeft}.`,
        { ip: req.ip, targetUserEmail: cleanIdentifier }
      );

      if (locked) {
        res.status(429).json({
          error: 'Maximum login attempts exceeded. Your account/IP is locked for 15 minutes.'
        });
        return;
      }

      res.status(401).json({
        error: `Invalid credentials. Please verify your password. (${attemptsLeft} attempt(s) remaining)`
      });
      return;
    }

    // Check suspended status
    if (user.status === 'suspended') {
      addActivityLog(
        { id: user.id, name: user.name, role: user.role },
        'LOGIN_FAILED',
        `Suspended user attempted login. Access blocked.`,
        { targetUserId: user.id, targetUserEmail: user.email, ip: req.ip }
      );

      res.status(403).json({
        error: 'Your account has been suspended by an administrator.',
        reason: user.suspendedReason || 'Please contact security support for assistance.'
      });
      return;
    }

    // Check maintenance mode: if active and user is not admin, deny access
    if (db.settings.maintenanceMode && user.role !== 'admin') {
      res.status(503).json({
        error: 'System is currently undergoing scheduled maintenance. Only administrators can access the system at this time.'
      });
      return;
    }

    // Reset failed counter
    resetFailedAttempts(req, cleanIdentifier);

    user.lastLoginAt = new Date().toISOString();
    saveDb(db);

    const token = generateToken(user);

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'LOGIN_SUCCESS',
      `User authenticated successfully (${user.role === 'admin' ? 'Admin Access' : 'Standard User'}).`,
      { targetUserId: user.id, targetUserEmail: user.email, ip: req.ip }
    );

    res.json({
      message: `Welcome back, ${user.name}!`,
      user: sanitizeUser(user),
      token
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed due to a server error.' });
  }
});

/**
 * 6. REQUEST SMS OTP FOR PHONE LOGIN
 */
authRouter.post('/request-phone-login-otp', checkBruteForce, async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ error: 'Phone number is required.' });
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const db = getDb();
    const user = db.users.find(u => u.phone === cleanPhone);

    if (!user) {
      res.status(404).json({ error: 'No registered user found with this phone number.' });
      return;
    }

    if (user.status === 'suspended') {
      res.status(403).json({
        error: 'This account has been suspended by an administrator.',
        reason: user.suspendedReason
      });
      return;
    }

    const otpCode = generateOtp();
    const expiryMs = (db.settings.otpExpirySeconds || 300) * 1000;
    const expiresAt = Date.now() + expiryMs;

    const otpRecord: OtpRecord = {
      id: `otp-login-${Date.now()}`,
      target: cleanPhone,
      type: 'phone_login',
      code: otpCode,
      expiresAt,
      attempts: 0,
      verified: false,
      createdAt: new Date().toISOString()
    };

    db.otps.push(otpRecord);
    saveDb(db);

    const smsRes = await sendSmsOtp(cleanPhone, otpCode, 'login');

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'LOGIN_OTP_REQUESTED',
      `Requested temporary SMS login passcode for phone ${cleanPhone}.`,
      { targetUserId: user.id, ip: req.ip }
    );

    res.json({
      message: `SMS login code dispatched to ${cleanPhone}.`,
      simulatedCode: smsRes.simulatedCode,
      provider: smsRes.provider
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to dispatch phone login OTP.' });
  }
});

/**
 * 7. FORGOT PASSWORD (REQUEST RECOVERY OTP)
 */
authRouter.post('/forgot-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { target } = req.body; // email or phone
    if (!target) {
      res.status(400).json({ error: 'Registered email or phone number is required.' });
      return;
    }

    const db = getDb();
    const cleanTarget = target.trim();
    const isEmail = cleanTarget.includes('@');

    const user = isEmail
      ? db.users.find(u => u.email.toLowerCase() === cleanTarget.toLowerCase())
      : db.users.find(u => u.phone === cleanTarget.replace(/\s+/g, ''));

    if (!user) {
      // Security practice: Return success-like response so attackers cannot probe existing emails
      res.json({
        message: 'If an account matches your details, a password recovery code has been dispatched.',
        simulatedCode: null
      });
      return;
    }

    const resetCode = generateOtp();
    const expiryMs = (db.settings.otpExpirySeconds || 300) * 1000;
    const expiresAt = Date.now() + expiryMs;

    const otpRecord: OtpRecord = {
      id: `otp-reset-${Date.now()}`,
      target: isEmail ? user.email : user.phone,
      type: 'password_reset',
      code: resetCode,
      expiresAt,
      attempts: 0,
      verified: false,
      createdAt: new Date().toISOString()
    };

    db.otps.push(otpRecord);
    saveDb(db);

    let simulatedCode: string | undefined;
    let provider = 'simulator';

    if (isEmail) {
      const emailRes = await sendEmailVerification(user.email, resetCode, user.name, 'reset');
      simulatedCode = emailRes.simulatedCode;
      provider = emailRes.provider;
    } else {
      const smsRes = await sendSmsOtp(user.phone, resetCode, 'reset');
      simulatedCode = smsRes.simulatedCode;
      provider = smsRes.provider;
    }

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'PASSWORD_RESET_REQUESTED',
      `Password recovery requested via ${isEmail ? 'email' : 'SMS'}.`,
      { targetUserId: user.id, targetUserEmail: user.email, ip: req.ip }
    );

    res.json({
      message: `Recovery code dispatched to registered ${isEmail ? 'email' : 'phone number'}.`,
      target: isEmail ? user.email : user.phone,
      simulatedCode,
      provider
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process forgot password request.' });
  }
});

/**
 * 8. RESET PASSWORD (VERIFY RECOVERY CODE & SET NEW PASSWORD)
 */
authRouter.post('/reset-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { target, code, newPassword } = req.body;
    if (!target || !code || !newPassword) {
      res.status(400).json({ error: 'Target, verification code, and new password are required.' });
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      res.status(400).json({
        error: 'New password must be at least 8 characters long and contain at least one letter and one number.'
      });
      return;
    }

    const db = getDb();
    const cleanTarget = target.trim();
    const isEmail = cleanTarget.includes('@');

    const user = isEmail
      ? db.users.find(u => u.email.toLowerCase() === cleanTarget.toLowerCase())
      : db.users.find(u => u.phone === cleanTarget.replace(/\s+/g, ''));

    if (!user) {
      res.status(404).json({ error: 'User account not found.' });
      return;
    }

    const lookupTarget = isEmail ? user.email : user.phone;
    const activeOtp = db.otps
      .filter(o => o.target.toLowerCase() === lookupTarget.toLowerCase() && o.type === 'password_reset' && !o.verified)
      .sort((a, b) => b.expiresAt - a.expiresAt)[0];

    if (!activeOtp || Date.now() > activeOtp.expiresAt || activeOtp.code !== code.trim()) {
      res.status(400).json({ error: 'Invalid or expired recovery code. Please request a new code.' });
      return;
    }

    activeOtp.verified = true;

    // Hash new password
    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(newPassword, salt);
    user.updatedAt = new Date().toISOString();
    saveDb(db);

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'PASSWORD_RESET_SUCCESS',
      `Password was reset successfully using OTP recovery.`,
      { targetUserId: user.id, targetUserEmail: user.email, ip: req.ip }
    );

    res.json({
      message: 'Your password has been successfully reset. You may now log in with your new credentials.'
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to reset password.' });
  }
});

/**
 * 9. GET CURRENT USER PROFILE
 */
authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  res.json({ user: sanitizeUser(req.user!) });
});

/**
 * 10. UPDATE CURRENT USER PROFILE
 */
authRouter.put('/profile', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { name, email, phone } = req.body;
    const db = getDb();
    const user = db.users.find(u => u.id === req.user!.id);

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    if (name && typeof name === 'string') {
      user.name = name.trim();
    }

    // If email is changing, verify uniqueness and require re-verification
    if (email && email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const cleanEmail = email.trim().toLowerCase();
      const existing = db.users.find(u => u.email.toLowerCase() === cleanEmail && u.id !== user.id);
      if (existing) {
        res.status(409).json({ error: 'Email address is already in use by another account.' });
        return;
      }
      user.email = cleanEmail;
      user.emailVerified = false; // Requires re-verification
    }

    // If phone is changing, verify uniqueness and require re-verification
    if (phone && phone.trim().replace(/\s+/g, '') !== user.phone) {
      const cleanPhone = phone.trim().replace(/\s+/g, '');
      const existing = db.users.find(u => u.phone === cleanPhone && u.id !== user.id);
      if (existing) {
        res.status(409).json({ error: 'Phone number is already in use by another account.' });
        return;
      }
      user.phone = cleanPhone;
      user.phoneVerified = false; // Requires re-verification
    }

    user.updatedAt = new Date().toISOString();
    saveDb(db);

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'PROFILE_UPDATED',
      `Profile information updated by user.`,
      { targetUserId: user.id, targetUserEmail: user.email }
    );

    res.json({
      message: 'Profile updated successfully.',
      user: sanitizeUser(user)
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

/**
 * 11. CHANGE PASSWORD (AUTHENTICATED)
 */
authRouter.put('/change-password', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'Current password and new password are required.' });
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      res.status(400).json({
        error: 'New password must be at least 8 characters long and contain at least one letter and one number.'
      });
      return;
    }

    const db = getDb();
    const user = db.users.find(u => u.id === req.user!.id);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    if (!bcrypt.compareSync(currentPassword, user.passwordHash)) {
      res.status(401).json({ error: 'Current password is incorrect.' });
      return;
    }

    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    user.updatedAt = new Date().toISOString();
    saveDb(db);

    addActivityLog(
      { id: user.id, name: user.name, role: user.role },
      'PASSWORD_CHANGED',
      `Password changed by user in account settings.`,
      { targetUserId: user.id, targetUserEmail: user.email }
    );

    res.json({ message: 'Password changed successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to change password.' });
  }
});
