import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Shield,
  Smartphone,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Calendar,
  Clock,
  KeyRound,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const UserDashboardPage: React.FC = () => {
  const { user, isAdmin, isMainAdmin, updateProfile, changePassword } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Update Profile Info
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    const res = await updateProfile({ name, email, phone });
    setIsUpdatingProfile(false);

    if (res.success) {
      showToast('Profile information updated successfully!', 'success');
    } else {
      showToast(res.error || 'Failed to update profile.', 'error');
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      showToast('Password must be at least 8 characters long and contain at least one letter and one number.', 'error');
      return;
    }

    setIsChangingPassword(true);
    const res = await changePassword(currentPassword, newPassword);
    setIsChangingPassword(false);

    if (res.success) {
      showToast('Password updated successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(res.error || 'Failed to change password.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Admin Quick Callout Banner */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-rose-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  Administrator Privileges Active
                </h3>
                <span className="text-[10px] bg-rose-600 text-white font-black px-2 py-0.5 rounded uppercase">
                  {isMainAdmin ? 'Super Root' : 'Admin'}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-0.5">
                You have full access to User Management, Content Publishing, and Security Audit Logs.
              </p>
            </div>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors self-start sm:self-auto shrink-0"
          >
            Launch Admin Console &rarr;
          </Link>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white text-2xl font-black flex items-center justify-center shadow-md">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900">{user?.name}</h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  user?.role === 'admin'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {user?.isMainAdmin ? 'Master Root Admin' : `${user?.role} Account`}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Active
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-3 flex-wrap">
              <span>Account ID: <code className="font-mono font-bold text-neutral-700">{user?.id}</code></span>
              {user?.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Verification Pill Tags */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs">
            <Smartphone className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-700 font-mono text-[11px]">{user?.phone}</span>
            {user?.phoneVerified ? (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-bold ml-auto">
                Verified
              </span>
            ) : (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded font-bold ml-auto">
                Pending
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs">
            <Mail className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-700 text-[11px] truncate max-w-[140px]">{user?.email}</span>
            {user?.emailVerified ? (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-bold ml-auto">
                Verified
              </span>
            ) : (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded font-bold ml-auto">
                Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 gap-8 text-sm font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Contact Details</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'security'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Security & Password</span>
        </button>
      </div>

      {/* TAB 1: PROFILE EDIT */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs max-w-2xl">
          <h2 className="text-lg font-bold text-neutral-900 mb-1">Personal & Contact Settings</h2>
          <p className="text-xs text-neutral-500 mb-6">
            Keep your registered name, phone number, and email address updated.
          </p>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Full Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Phone Number (E.164 with Country Code)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden font-mono"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Changing your phone number requires verifying a new one-time SMS code.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUpdatingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: CHANGE PASSWORD */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs max-w-2xl">
          <h2 className="text-lg font-bold text-neutral-900 mb-1">Change Account Password</h2>
          <p className="text-xs text-neutral-500 mb-6">
            Ensure your account is protected with a secure password containing letters and numbers.
          </p>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Current Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters with 1 letter & 1 number"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm pl-4 pr-10 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isChangingPassword ? 'Updating Password...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
