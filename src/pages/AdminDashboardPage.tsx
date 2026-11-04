import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Shield,
  ShieldAlert,
  Sliders,
  FileText,
  Activity,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Trash2,
  UserX,
  UserCheck,
  Crown,
  Edit,
  Plus,
  RefreshCw,
  Save,
  Download,
  Smartphone,
  Mail,
  Lock,
  Clock,
  Sparkles,
  AlertTriangle,
  X,
  Check
} from 'lucide-react';
import { User, ActivityLog, SiteContent, SystemSettings, DashboardStats } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser, isAdmin, isMainAdmin, authFetch } = useAuth();
  const { showToast } = useToast();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings' | 'logs'>('users');

  // Stats
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Users State
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', phoneVerified: false, emailVerified: false });
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToSuspend, setUserToSuspend] = useState<User | null>(null);
  const [suspendReason, setSuspendReason] = useState('');

  // Content State
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Logs State
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [logSearch, setLogSearch] = useState('');
  const [logActionFilter, setLogActionFilter] = useState('all');

  const [isLoading, setIsLoading] = useState(true);

  // Guard: Redirect non-admins
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // Fetch initial data
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes, contentRes, settingsRes, logsRes] = await Promise.all([
        authFetch('/api/admin/stats'),
        authFetch('/api/admin/users'),
        authFetch('/api/admin/content'),
        authFetch('/api/admin/settings'),
        authFetch('/api/admin/logs')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (usersRes.ok) {
        const uData = await usersRes.json();
        setUsers(uData.users);
      }
      if (contentRes.ok) {
        const cData = await contentRes.json();
        setContent(cData.content);
      }
      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        setSettings(sData.settings);
      }
      if (logsRes.ok) {
        const lData = await logsRes.json();
        setLogs(lData.logs);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('Failed to load admin dashboard data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.phone.includes(userSearch) ||
        u.id.toLowerCase().includes(userSearch.toLowerCase());

      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, userSearch, roleFilter, statusFilter]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter(l => {
      const matchesAction = logActionFilter === 'all' || l.action === logActionFilter;
      const matchesSearch =
        l.details.toLowerCase().includes(logSearch.toLowerCase()) ||
        l.actorName.toLowerCase().includes(logSearch.toLowerCase()) ||
        (l.targetUserEmail && l.targetUserEmail.toLowerCase().includes(logSearch.toLowerCase())) ||
        (l.ip && l.ip.includes(logSearch));
      return matchesAction && matchesSearch;
    });
  }, [logs, logSearch, logActionFilter]);

  // 1. Suspend/Unsuspend User
  const handleToggleSuspend = async () => {
    if (!userToSuspend) return;

    try {
      const res = await authFetch(`/api/admin/users/${userToSuspend.id}/toggle-status`, {
        method: 'POST',
        body: JSON.stringify({ reason: suspendReason })
      });
      const data = await res.json();

      if (res.ok) {
        showToast(data.message, 'success');
        setUserToSuspend(null);
        setSuspendReason('');
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to update user status', 'error');
      }
    } catch {
      showToast('Network error updating status.', 'error');
    }
  };

  // 2. Delete User
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const res = await authFetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (res.ok) {
        showToast(data.message || 'User deleted permanently', 'success');
        setUserToDelete(null);
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to delete user', 'error');
      }
    } catch {
      showToast('Network error deleting user.', 'error');
    }
  };

  // 3. Assign / Remove Admin Privileges (Main Admin Only!)
  const handleToggleAdminRole = async (targetUser: User) => {
    if (!isMainAdmin) {
      showToast('Only the primary administrator (ID: "admin") can modify administrative privileges.', 'error');
      return;
    }

    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    const actionVerb = newRole === 'admin' ? 'promote this user to Administrator' : 'demote this user to regular User';

    if (!window.confirm(`Are you sure you want to ${actionVerb}?`)) {
      return;
    }

    try {
      const res = await authFetch(`/api/admin/users/${targetUser.id}/role`, {
        method: 'POST',
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();

      if (res.ok) {
        showToast(data.message, 'success');
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to update role', 'error');
      }
    } catch {
      showToast('Network error updating role.', 'error');
    }
  };

  // 4. Edit User
  const openEditModal = (u: User) => {
    setSelectedUserForEdit(u);
    setEditFormData({
      name: u.name,
      email: u.email,
      phone: u.phone,
      phoneVerified: u.phoneVerified,
      emailVerified: u.emailVerified
    });
  };

  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;

    try {
      const res = await authFetch(`/api/admin/users/${selectedUserForEdit.id}`, {
        method: 'PUT',
        body: JSON.stringify(editFormData)
      });
      const data = await res.json();

      if (res.ok) {
        showToast('User profile updated successfully!', 'success');
        setSelectedUserForEdit(null);
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to update user', 'error');
      }
    } catch {
      showToast('Network error saving user changes.', 'error');
    }
  };

  // 5. Save Website Content
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsSavingContent(true);
    try {
      const res = await authFetch('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ content })
      });
      const data = await res.json();

      if (res.ok) {
        showToast('Website content published live!', 'success');
      } else {
        showToast(data.error || 'Failed to save content', 'error');
      }
    } catch {
      showToast('Network error saving content.', 'error');
    } finally {
      setIsSavingContent(false);
    }
  };

  // 6. Save System Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSavingSettings(true);
    try {
      const res = await authFetch('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      const data = await res.json();

      if (res.ok) {
        showToast('System security settings updated successfully!', 'success');
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to update settings', 'error');
      }
    } catch {
      showToast('Network error updating settings.', 'error');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Add FAQ
  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim() || !content) return;
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim()
    };
    setContent({
      ...content,
      faqs: [...content.faqs, newFaq]
    });
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    setShowAddFaqModal(false);
    showToast('FAQ added. Click "Publish All Changes" to save permanently.', 'info');
  };

  // Delete FAQ
  const handleDeleteFaq = (id: string) => {
    if (!content) return;
    setContent({
      ...content,
      faqs: content.faqs.filter(f => f.id !== id)
    });
    showToast('FAQ removed. Remember to click "Publish All Changes".', 'info');
  };

  // Export Logs to JSON
  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `security_audit_logs_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Audit logs exported successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Console Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Admin Control Panel</h1>
                <span className="text-[10px] font-black uppercase bg-neutral-900 text-white px-2 py-0.5 rounded">
                  {isMainAdmin ? 'Super Root Authority' : 'Administrator'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Full authority over user accounts, website content, security policies, and activity logs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Top Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Users */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Users</p>
          <p className="text-2xl font-black text-neutral-900 mt-1">{stats?.totalUsers ?? '...'}</p>
          <span className="text-[10px] text-neutral-500 font-semibold">Registered Accounts</span>
        </div>

        {/* Active Accounts */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Active</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{stats?.activeUsers ?? '...'}</p>
          <span className="text-[10px] text-emerald-700 font-semibold">In Good Standing</span>
        </div>

        {/* Suspended Accounts */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Suspended</p>
          <p className="text-2xl font-black text-rose-600 mt-1">{stats?.suspendedUsers ?? '...'}</p>
          <span className="text-[10px] text-rose-700 font-semibold">Access Blocked</span>
        </div>

        {/* Admins */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Administrators</p>
          <p className="text-2xl font-black text-purple-600 mt-1">{stats?.adminUsers ?? '...'}</p>
          <span className="text-[10px] text-purple-700 font-semibold">Privileged Roles</span>
        </div>

        {/* Phone Verified */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Phone Verified</p>
          <p className="text-2xl font-black text-sky-600 mt-1">{stats?.phoneVerifiedCount ?? '...'}</p>
          <span className="text-[10px] text-sky-700 font-semibold">SMS Confirmed</span>
        </div>

        {/* Audit Logs */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Audit Logs</p>
          <p className="text-2xl font-black text-neutral-900 mt-1">{stats?.totalLogs ?? '...'}</p>
          <span className="text-[10px] text-neutral-500 font-semibold">Recorded Events</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-neutral-200 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-bold no-scrollbar">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'users'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Management ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'content'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Website Content Management</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'settings'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Settings & Security Policies</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'logs'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Activity Logs ({logs.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: USER MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by name, email, phone, ID..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="w-full bg-neutral-50 text-xs text-neutral-900 pl-8 pr-3 py-2 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="bg-neutral-50 text-neutral-700 text-xs font-semibold px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrators</option>
                <option value="user">Regular Users</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-neutral-50 text-neutral-700 text-xs font-semibold px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">User & ID</th>
                    <th className="px-4 py-3">Contact Details</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Verification</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-neutral-500">
                        No users found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-neutral-50/70 transition-colors">
                        {/* User & ID */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-neutral-900">{u.name}</p>
                              <code className="text-[10px] text-neutral-400 font-mono">ID: {u.id}</code>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-neutral-700">
                              <Mail className="w-3 h-3 text-neutral-400 shrink-0" />
                              <span className="truncate max-w-xs">{u.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-600 font-mono text-[11px]">
                              <Smartphone className="w-3 h-3 text-neutral-400 shrink-0" />
                              <span>{u.phone}</span>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-4 py-3.5">
                          {u.isMainAdmin || u.id === 'admin' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
                              <Crown className="w-3 h-3 text-rose-600" /> Root Admin
                            </span>
                          ) : u.role === 'admin' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700">
                              User
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          {u.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200"
                              title={u.suspendedReason || 'Suspended'}
                            >
                              <XCircle className="w-3 h-3" /> Suspended
                            </span>
                          )}
                        </td>

                        {/* Verification */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span
                              title={`Phone: ${u.phoneVerified ? 'Verified' : 'Pending'}`}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                u.phoneVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-500'
                              }`}
                            >
                              SMS {u.phoneVerified ? '✓' : '—'}
                            </span>
                            <span
                              title={`Email: ${u.emailVerified ? 'Verified' : 'Pending'}`}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                u.emailVerified ? 'bg-sky-100 text-sky-800' : 'bg-neutral-100 text-neutral-500'
                              }`}
                            >
                              Email {u.emailVerified ? '✓' : '—'}
                            </span>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="px-4 py-3.5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => openEditModal(u)}
                              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100"
                              title="Edit User Details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Assign/Remove Admin Role (Main Admin Only) */}
                            {u.id !== 'admin' && (
                              <button
                                type="button"
                                onClick={() => handleToggleAdminRole(u)}
                                disabled={!isMainAdmin}
                                className={`p-1.5 rounded transition-colors ${
                                  !isMainAdmin
                                    ? 'text-neutral-300 cursor-not-allowed'
                                    : u.role === 'admin'
                                    ? 'text-purple-600 hover:bg-purple-50'
                                    : 'text-neutral-500 hover:text-purple-600 hover:bg-purple-50'
                                }`}
                                title={
                                  !isMainAdmin
                                    ? 'Only Root Admin "admin" can modify admin privileges'
                                    : u.role === 'admin'
                                    ? 'Demote from Admin'
                                    : 'Promote to Admin'
                                }
                              >
                                <Crown className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Suspend / Unsuspend */}
                            {u.id !== 'admin' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setUserToSuspend(u);
                                  setSuspendReason(u.suspendedReason || '');
                                }}
                                className={`p-1.5 rounded transition-colors ${
                                  u.status === 'active'
                                    ? 'text-amber-600 hover:bg-amber-50'
                                    : 'text-emerald-600 hover:bg-emerald-50'
                                }`}
                                title={u.status === 'active' ? 'Suspend User' : 'Unsuspend User'}
                              >
                                {u.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                              </button>
                            )}

                            {/* Delete User */}
                            {u.id !== 'admin' && (
                              <button
                                type="button"
                                onClick={() => setUserToDelete(u)}
                                className="p-1.5 text-neutral-400 hover:text-rose-600 rounded hover:bg-rose-50"
                                title="Delete User Permanently"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: WEBSITE CONTENT MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'content' && content && (
        <form onSubmit={handleSaveContent} className="space-y-6">
          {/* Announcement Banner Box */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Announcement Bar</h3>
                <p className="text-xs text-neutral-500">Global banner displayed at the very top of all public pages</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input
                  type="checkbox"
                  checked={content.announcement.enabled}
                  onChange={e =>
                    setContent({
                      ...content,
                      announcement: { ...content.announcement, enabled: e.target.checked }
                    })
                  }
                  className="w-4 h-4 text-pink-600 rounded accent-pink-600"
                />
                <span>Banner Active</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Banner Text
                </label>
                <input
                  type="text"
                  value={content.announcement.text}
                  onChange={e =>
                    setContent({
                      ...content,
                      announcement: { ...content.announcement, text: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Color Variant
                </label>
                <select
                  value={content.announcement.variant}
                  onChange={e =>
                    setContent({
                      ...content,
                      announcement: { ...content.announcement, variant: e.target.value as any }
                    })
                  }
                  className="w-full bg-neutral-50 text-xs px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden font-bold"
                >
                  <option value="info">Dark Neutral / Info</option>
                  <option value="alert">Rose Alert</option>
                  <option value="warning">Amber Warning</option>
                  <option value="success">Emerald Success</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hero Section Copy */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-100">
              Landing Page Hero Content
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={e =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={e =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headline: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Subheadline / Description
                </label>
                <textarea
                  rows={3}
                  value={content.hero.subheadline}
                  onChange={e =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subheadline: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaText}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText: e.target.value }
                      })
                    }
                    className="w-full bg-neutral-50 text-xs px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText: e.target.value }
                      })
                    }
                    className="w-full bg-neutral-50 text-xs px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Manager */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Frequently Asked Questions ({content.faqs.length})</h3>
                <p className="text-xs text-neutral-500">Add, edit, or delete questions displayed on the landing page</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddFaqModal(true)}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {content.faqs.map(faq => (
                <div key={faq.id} className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => {
                        const updated = content.faqs.map(f => f.id === faq.id ? { ...f, question: e.target.value } : f);
                        setContent({ ...content, faqs: updated });
                      }}
                      className="font-bold text-xs bg-white text-neutral-900 w-full px-2.5 py-1.5 rounded border border-neutral-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 rounded"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={e => {
                      const updated = content.faqs.map(f => f.id === faq.id ? { ...f, answer: e.target.value } : f);
                      setContent({ ...content, faqs: updated });
                    }}
                    className="text-xs bg-white text-neutral-700 w-full px-2.5 py-1.5 rounded border border-neutral-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="sticky bottom-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-neutral-300 shadow-xl flex items-center justify-between">
            <span className="text-xs text-neutral-600 font-medium">Changes take effect immediately upon publishing.</span>
            <button
              type="submit"
              disabled={isSavingContent}
              className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingContent ? 'Publishing Live...' : 'Publish All Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SYSTEM SETTINGS & SECURITY POLICIES */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && settings && (
        <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
          {/* Brute Force Protection Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
              <Lock className="w-5 h-5 text-rose-600" />
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Brute-Force & Lockout Thresholds</h3>
                <p className="text-xs text-neutral-500">Prevent credential stuffing and automated password guessing</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Max Failed Login Attempts
                </label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={settings.maxFailedAttempts}
                  onChange={e => setSettings({ ...settings, maxFailedAttempts: Number(e.target.value) })}
                  className="w-full bg-neutral-50 text-xs font-bold px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Default: 5 consecutive failures</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Lockout Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  max={1440}
                  value={settings.lockoutDurationMinutes}
                  onChange={e => setSettings({ ...settings, lockoutDurationMinutes: Number(e.target.value) })}
                  className="w-full bg-neutral-50 text-xs font-bold px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Default: 15 minutes</p>
              </div>
            </div>
          </div>

          {/* OTP Expiry Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-neutral-900">OTP Lifespan</h3>
                <p className="text-xs text-neutral-500">Validity period for SMS and email one-time verification passcodes</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                OTP Expiry (Seconds)
              </label>
              <input
                type="number"
                min={60}
                max={1800}
                value={settings.otpExpirySeconds}
                onChange={e => setSettings({ ...settings, otpExpirySeconds: Number(e.target.value) })}
                className="w-full sm:w-60 bg-neutral-50 text-xs font-bold px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
              />
              <p className="text-[11px] text-neutral-500 mt-1">300 seconds = 5 minutes</p>
            </div>
          </div>

          {/* Operational Switches */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-100">
              System Operations
            </h3>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowNewRegistrations}
                  onChange={e => setSettings({ ...settings, allowNewRegistrations: e.target.checked })}
                  className="mt-1 w-4 h-4 text-pink-600 rounded accent-pink-600"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-900">Allow New User Registrations</p>
                  <p className="text-[11px] text-neutral-500">When disabled, public sign-ups are paused.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={e => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="mt-1 w-4 h-4 text-pink-600 rounded accent-pink-600"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-900">Maintenance Mode</p>
                  <p className="text-[11px] text-neutral-500">When enabled, only administrators can access the system.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Provider Overview Card */}
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 text-xs text-neutral-600 space-y-2">
            <h4 className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">Provider Dispatch Status</h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span><strong>SMS Service:</strong> Real Twilio SMS active if keys present, else OTP Simulator active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span><strong>Email Service:</strong> Real SendGrid active if keys present, else Email Simulator active</span>
            </div>
            <p className="text-[11px] text-neutral-400 pt-1">
              Configure credentials in <code className="bg-neutral-200 text-neutral-800 px-1 rounded">.env</code> to switch to live production telephony.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSavingSettings}
            className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSavingSettings ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ACTIVITY LOGS & AUDIT TRAIL */}
      {/* ========================================================================= */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search logs by actor, details, IP..."
                value={logSearch}
                onChange={e => setLogSearch(e.target.value)}
                className="w-full bg-neutral-50 text-xs text-neutral-900 pl-8 pr-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={logActionFilter}
                onChange={e => setLogActionFilter(e.target.value)}
                className="bg-neutral-50 text-neutral-700 text-xs font-semibold px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
              >
                <option value="all">All Events</option>
                <option value="USER_REGISTERED">User Registered</option>
                <option value="LOGIN_SUCCESS">Login Success</option>
                <option value="LOGIN_FAILED">Login Failed</option>
                <option value="ACCOUNT_LOCKED">Account Locked</option>
                <option value="USER_SUSPENDED">User Suspended</option>
                <option value="USER_DELETED">User Deleted</option>
                <option value="ROLE_CHANGED">Role Changed</option>
                <option value="SETTINGS_UPDATED">Settings Updated</option>
              </select>

              <button
                type="button"
                onClick={handleExportLogs}
                className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Event Type</th>
                    <th className="px-4 py-3">Actor</th>
                    <th className="px-4 py-3">Details & Target</th>
                    <th className="px-4 py-3">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800 font-mono text-[11px]">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-neutral-500 font-sans text-xs">
                        No logs match current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map(l => (
                      <tr key={l.id} className="hover:bg-neutral-50/70">
                        <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                          {new Date(l.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-sans ${
                              l.action === 'LOGIN_FAILED' || l.action === 'ACCOUNT_LOCKED' || l.action === 'USER_SUSPENDED'
                                ? 'bg-rose-100 text-rose-800'
                                : l.action === 'LOGIN_SUCCESS' || l.action === 'PHONE_VERIFIED' || l.action === 'EMAIL_VERIFIED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : l.action === 'ROLE_CHANGED'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {l.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-900 font-sans font-bold">
                          {l.actorName} ({l.actorRole})
                        </td>
                        <td className="px-4 py-3 font-sans text-neutral-700 max-w-sm truncate">
                          {l.details}
                        </td>
                        <td className="px-4 py-3 text-neutral-400">
                          {l.ip || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT USER */}
      {/* ========================================================================= */}
      {selectedUserForEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="font-bold text-neutral-900">Edit User Profile</h3>
              <button
                type="button"
                onClick={() => setSelectedUserForEdit(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editFormData.email}
                  onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={editFormData.phone}
                  onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden font-mono"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.phoneVerified}
                    onChange={e => setEditFormData({ ...editFormData, phoneVerified: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded accent-emerald-600"
                  />
                  <span>Phone Verified</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.emailVerified}
                    onChange={e => setEditFormData({ ...editFormData, emailVerified: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded accent-sky-600"
                  />
                  <span>Email Verified</span>
                </label>
              </div>

              <div className="pt-4 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedUserForEdit(null)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SUSPEND USER REASON */}
      {/* ========================================================================= */}
      {userToSuspend && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-neutral-900 text-base">
                {userToSuspend.status === 'active' ? 'Suspend User Account' : 'Lift Suspension'}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 mb-4">
              {userToSuspend.status === 'active'
                ? `Suspending ${userToSuspend.email} will immediately revoke active sessions and block all login attempts.`
                : `Reinstate ${userToSuspend.email} to active status allowing login again.`}
            </p>

            {userToSuspend.status === 'active' && (
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Reason for Suspension
                </label>
                <textarea
                  rows={2}
                  value={suspendReason}
                  onChange={e => setSuspendReason(e.target.value)}
                  placeholder="e.g., Investigation of suspicious login attempts"
                  className="w-full bg-neutral-50 text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setUserToSuspend(null)}
                className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleSuspend}
                className={`px-5 py-2 text-white rounded-lg text-xs font-bold shadow-xs ${
                  userToSuspend.status === 'active'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {userToSuspend.status === 'active' ? 'Confirm Suspension' : 'Confirm Reinstatement'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: DELETE USER CONFIRMATION */}
      {/* ========================================================================= */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <Trash2 className="w-6 h-6" />
              <h3 className="font-bold text-neutral-900 text-base">Permanently Delete User?</h3>
            </div>
            <p className="text-xs text-neutral-600 mb-4">
              Are you sure you want to permanently delete account for <strong className="text-neutral-900">{userToDelete.name}</strong> ({userToDelete.email})? This action cannot be undone.
            </p>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ADD FAQ */}
      {/* ========================================================================= */}
      {showAddFaqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-4">
              <h3 className="font-bold text-neutral-900">Add New FAQ</h3>
              <button
                type="button"
                onClick={() => setShowAddFaqModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={newFaqQuestion}
                  onChange={e => setNewFaqQuestion(e.target.value)}
                  placeholder="e.g. Can I reset my password using SMS?"
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Answer
                </label>
                <textarea
                  rows={3}
                  required
                  value={newFaqAnswer}
                  onChange={e => setNewFaqAnswer(e.target.value)}
                  placeholder="Provide the clear explanation..."
                  className="w-full bg-neutral-50 text-xs px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-hidden"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFaqModal(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Add FAQ Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
