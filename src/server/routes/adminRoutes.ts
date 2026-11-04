import { Router, Response } from 'express';
import {
  getDb,
  saveDb,
  sanitizeUser,
  addActivityLog,
  UserRole
} from '../db';
import {
  requireAuth,
  requireAdmin,
  requireMainAdmin,
  AuthenticatedRequest
} from '../middleware/authMiddleware';

export const adminRouter = Router();

// Protect all admin routes with authentication & admin role check
adminRouter.use(requireAuth);
adminRouter.use(requireAdmin);

/**
 * 1. ADMIN DASHBOARD STATS
 */
adminRouter.get('/stats', (_req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const totalUsers = db.users.length;
  const activeUsers = db.users.filter(u => u.status === 'active').length;
  const suspendedUsers = db.users.filter(u => u.status === 'suspended').length;
  const adminUsers = db.users.filter(u => u.role === 'admin').length;
  const phoneVerifiedCount = db.users.filter(u => u.phoneVerified).length;
  const emailVerifiedCount = db.users.filter(u => u.emailVerified).length;
  const totalLogs = db.activityLogs.length;

  const activeLockouts = Object.values(db.failedAttempts).filter(
    fa => fa.lockedUntil && fa.lockedUntil > Date.now()
  ).length;

  res.json({
    totalUsers,
    activeUsers,
    suspendedUsers,
    adminUsers,
    phoneVerifiedCount,
    emailVerifiedCount,
    totalLogs,
    activeLockouts,
    maintenanceMode: db.settings.maintenanceMode,
    allowRegistrations: db.settings.allowNewRegistrations
  });
});

/**
 * 2. USER MANAGEMENT: LIST USERS WITH SEARCH & FILTERS
 */
adminRouter.get('/users', (req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  const roleFilter = req.query.role as string;
  const statusFilter = req.query.status as string;

  let users = db.users.map(sanitizeUser);

  if (q) {
    users = users.filter(
      u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }

  if (roleFilter && roleFilter !== 'all') {
    users = users.filter(u => u.role === roleFilter);
  }

  if (statusFilter && statusFilter !== 'all') {
    users = users.filter(u => u.status === statusFilter);
  }

  res.json({ users, count: users.length });
});

/**
 * 3. GET SINGLE USER DETAILS WITH LOGS
 */
adminRouter.get('/users/:id', (req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const user = db.users.find(u => u.id === req.params.id);

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  const userLogs = db.activityLogs.filter(
    l => l.targetUserId === user.id || l.actorId === user.id
  ).slice(0, 50);

  res.json({
    user: sanitizeUser(user),
    activityLogs: userLogs
  });
});

/**
 * 4. EDIT USER BY ADMIN
 */
adminRouter.put('/users/:id', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const db = getDb();
    const user = db.users.find(u => u.id === req.params.id);

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    const { name, email, phone, phoneVerified, emailVerified } = req.body;

    if (name) user.name = name.trim();

    if (email && email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const cleanEmail = email.trim().toLowerCase();
      const existing = db.users.find(u => u.email.toLowerCase() === cleanEmail && u.id !== user.id);
      if (existing) {
        res.status(409).json({ error: 'Email address is already in use by another account.' });
        return;
      }
      user.email = cleanEmail;
    }

    if (phone && phone.trim().replace(/\s+/g, '') !== user.phone) {
      const cleanPhone = phone.trim().replace(/\s+/g, '');
      const existing = db.users.find(u => u.phone === cleanPhone && u.id !== user.id);
      if (existing) {
        res.status(409).json({ error: 'Phone number is already in use by another account.' });
        return;
      }
      user.phone = cleanPhone;
    }

    if (typeof phoneVerified === 'boolean') user.phoneVerified = phoneVerified;
    if (typeof emailVerified === 'boolean') user.emailVerified = emailVerified;

    user.updatedAt = new Date().toISOString();
    saveDb(db);

    addActivityLog(
      { id: req.user!.id, name: req.user!.name, role: req.user!.role },
      'USER_UPDATED_BY_ADMIN',
      `Administrator updated account profile for ${user.email}.`,
      { targetUserId: user.id, targetUserEmail: user.email }
    );

    res.json({
      message: 'User updated successfully.',
      user: sanitizeUser(user)
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

/**
 * 5. SUSPEND OR UNSUSPEND USER
 */
adminRouter.post('/users/:id/toggle-status', (req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const targetUser = db.users.find(u => u.id === req.params.id);

  if (!targetUser) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  // Prevent suspending the main admin account
  if (targetUser.id === 'admin' || targetUser.isMainAdmin) {
    res.status(400).json({ error: 'The primary system administrator account cannot be suspended.' });
    return;
  }

  const { reason } = req.body;
  const isSuspending = targetUser.status === 'active';

  targetUser.status = isSuspending ? 'suspended' : 'active';
  targetUser.suspendedAt = isSuspending ? new Date().toISOString() : undefined;
  targetUser.suspendedReason = isSuspending ? reason || 'Suspended by administrator' : undefined;
  targetUser.updatedAt = new Date().toISOString();
  saveDb(db);

  addActivityLog(
    { id: req.user!.id, name: req.user!.name, role: req.user!.role },
    isSuspending ? 'USER_SUSPENDED' : 'USER_UNSUSPENDED',
    isSuspending
      ? `Account suspended. Reason: "${targetUser.suspendedReason}".`
      : 'Account suspension lifted.',
    { targetUserId: targetUser.id, targetUserEmail: targetUser.email }
  );

  res.json({
    message: isSuspending ? 'User suspended successfully.' : 'User account reinstated.',
    user: sanitizeUser(targetUser)
  });
});

/**
 * 6. DELETE USER
 */
adminRouter.delete('/users/:id', (req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const targetIndex = db.users.findIndex(u => u.id === req.params.id);

  if (targetIndex === -1) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  const targetUser = db.users[targetIndex];

  // Prevent deleting the main admin
  if (targetUser.id === 'admin' || targetUser.isMainAdmin) {
    res.status(400).json({ error: 'The primary system administrator account cannot be deleted.' });
    return;
  }

  db.users.splice(targetIndex, 1);
  saveDb(db);

  addActivityLog(
    { id: req.user!.id, name: req.user!.name, role: req.user!.role },
    'USER_DELETED',
    `Permanently deleted user account ${targetUser.email} (ID: ${targetUser.id}).`,
    { targetUserId: targetUser.id, targetUserEmail: targetUser.email }
  );

  res.json({ message: 'User deleted permanently.' });
});

/**
 * 7. ASSIGN OR REMOVE ADMIN PRIVILEGES
 * CRITICAL REQUIREMENT: "Assigning or removing admin privileges (only the main admin can do this)"
 */
adminRouter.post('/users/:id/role', requireMainAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const targetUser = db.users.find(u => u.id === req.params.id);

  if (!targetUser) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  // Prevent modifying the role of the root admin
  if (targetUser.id === 'admin') {
    res.status(400).json({ error: 'The primary root admin role cannot be altered.' });
    return;
  }

  const { role } = req.body;
  if (role !== 'admin' && role !== 'user') {
    res.status(400).json({ error: 'Role must be either "admin" or "user".' });
    return;
  }

  const previousRole = targetUser.role;
  targetUser.role = role as UserRole;
  targetUser.updatedAt = new Date().toISOString();
  saveDb(db);

  addActivityLog(
    { id: req.user!.id, name: req.user!.name, role: req.user!.role },
    'ROLE_CHANGED',
    `Main administrator changed role of ${targetUser.email} from "${previousRole}" to "${role}".`,
    { targetUserId: targetUser.id, targetUserEmail: targetUser.email }
  );

  res.json({
    message: `User privileges updated to ${role}.`,
    user: sanitizeUser(targetUser)
  });
});

/**
 * 8. GET & UPDATE WEBSITE CONTENT
 */
adminRouter.get('/content', (_req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  res.json({ content: db.content });
});

adminRouter.put('/content', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const db = getDb();
    const newContent = req.body.content;

    if (!newContent) {
      res.status(400).json({ error: 'Content payload is required.' });
      return;
    }

    db.content = { ...db.content, ...newContent };
    saveDb(db);

    addActivityLog(
      { id: req.user!.id, name: req.user!.name, role: req.user!.role },
      'CONTENT_UPDATED',
      'Administrator published updates to website announcements, hero copy, or FAQs.'
    );

    res.json({ message: 'Website content updated and published successfully.', content: db.content });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update content.' });
  }
});

/**
 * 9. GET & UPDATE SYSTEM SETTINGS
 */
adminRouter.get('/settings', (_req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  res.json({ settings: db.settings });
});

adminRouter.put('/settings', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const db = getDb();
    const { maxFailedAttempts, lockoutDurationMinutes, otpExpirySeconds, allowNewRegistrations, maintenanceMode } = req.body;

    if (typeof maxFailedAttempts === 'number' && maxFailedAttempts > 0) {
      db.settings.maxFailedAttempts = maxFailedAttempts;
    }
    if (typeof lockoutDurationMinutes === 'number' && lockoutDurationMinutes > 0) {
      db.settings.lockoutDurationMinutes = lockoutDurationMinutes;
    }
    if (typeof otpExpirySeconds === 'number' && otpExpirySeconds >= 60) {
      db.settings.otpExpirySeconds = otpExpirySeconds;
    }
    if (typeof allowNewRegistrations === 'boolean') {
      db.settings.allowNewRegistrations = allowNewRegistrations;
    }
    if (typeof maintenanceMode === 'boolean') {
      db.settings.maintenanceMode = maintenanceMode;
    }

    saveDb(db);

    addActivityLog(
      { id: req.user!.id, name: req.user!.name, role: req.user!.role },
      'SETTINGS_UPDATED',
      'Administrator modified system security thresholds and operational settings.'
    );

    res.json({ message: 'System settings saved successfully.', settings: db.settings });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update system settings.' });
  }
});

/**
 * 10. GET AUDIT ACTIVITY LOGS
 */
adminRouter.get('/logs', (req: AuthenticatedRequest, res: Response): void => {
  const db = getDb();
  const q = ((req.query.q as string) || '').toLowerCase().trim();
  const actionFilter = req.query.action as string;

  let logs = [...db.activityLogs];

  if (actionFilter && actionFilter !== 'all') {
    logs = logs.filter(l => l.action === actionFilter);
  }

  if (q) {
    logs = logs.filter(
      l =>
        l.details.toLowerCase().includes(q) ||
        l.actorName.toLowerCase().includes(q) ||
        (l.targetUserEmail && l.targetUserEmail.toLowerCase().includes(q)) ||
        (l.ip && l.ip.includes(q))
    );
  }

  res.json({ logs: logs.slice(0, 200), total: logs.length });
});
