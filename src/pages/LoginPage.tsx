import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  KeyRound,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Lock,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { DevOtpHelper } from '../components/DevOtpHelper';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithPassword, loginWithOtp, requestPhoneLoginOtp, isAuthenticated, isAdmin } = useAuth();
  const { showToast } = useToast();

  // Mode: 'password' (Email/Phone/Admin ID) vs 'otp' (Phone + SMS OTP)
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  // Sub-toggle for password login
  const [identifierType, setIdentifierType] = useState<'email' | 'phone' | 'admin'>('admin');

  // Form states
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('Admin@2026!');
  const [showPassword, setShowPassword] = useState(false);

  // Phone OTP states
  const [phoneForOtp, setPhoneForOtp] = useState('+14155552671');
  const [otpCode, setOtpCode] = useState('');
  const [otpDispatched, setOtpDispatched] = useState(false);
  const [simulatedSmsCode, setSimulatedSmsCode] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Handle autofill query parameter
  useEffect(() => {
    const autofill = searchParams.get('autofill');
    if (autofill === 'admin') {
      setAuthMode('password');
      setIdentifierType('admin');
      setIdentifier('admin');
      setPassword('Admin@2026!');
    } else if (autofill === 'user') {
      setAuthMode('password');
      setIdentifierType('email');
      setIdentifier('sarah.connor@example.com');
      setPassword('User@12345');
    }
  }, [searchParams]);

  // Password Login Handler
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const res = await loginWithPassword(identifier.trim(), password);
    setIsLoading(false);

    if (res.success) {
      showToast(res.message || 'Logged in successfully!', 'success');
      navigate(identifier.trim() === 'admin' ? '/admin' : '/dashboard');
    } else {
      setErrorMessage(res.error || 'Invalid credentials.');
    }
  };

  // Request SMS OTP for Phone-based login
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!phoneForOtp.trim()) {
      setErrorMessage('Please enter your registered phone number with country code.');
      return;
    }

    setIsLoading(true);
    const res = await requestPhoneLoginOtp(phoneForOtp.trim());
    setIsLoading(false);

    if (res.success) {
      setOtpDispatched(true);
      if (res.simulatedCode) {
        setSimulatedSmsCode(res.simulatedCode);
        setOtpCode(res.simulatedCode);
      }
      showToast(res.message || 'SMS OTP dispatched!', 'info');
    } else {
      setErrorMessage(res.error || 'Failed to dispatch OTP.');
    }
  };

  // Submit Phone OTP for Login
  const handleVerifyOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit code received via SMS.');
      return;
    }

    setIsLoading(true);
    const res = await loginWithOtp(phoneForOtp.trim(), otpCode.trim());
    setIsLoading(false);

    if (res.success) {
      showToast('Authenticated via SMS OTP!', 'success');
      navigate('/dashboard');
    } else {
      setErrorMessage(res.error || 'Invalid OTP code.');
    }
  };

  const setDemoRole = (type: 'admin' | 'user') => {
    setAuthMode('password');
    if (type === 'admin') {
      setIdentifierType('admin');
      setIdentifier('admin');
      setPassword('Admin@2026!');
    } else {
      setIdentifierType('email');
      setIdentifier('sarah.connor@example.com');
      setPassword('User@12345');
    }
    setErrorMessage(null);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Top Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Portal Authentication</h1>
          <p className="text-xs text-neutral-500 mt-1">Sign in with password or phone-based SMS passcode</p>
        </div>

        {/* Quick Demo Autofill Pills */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setDemoRole('admin')}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
              identifier === 'admin'
                ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            👑 Admin &ldquo;admin&rdquo;
          </button>
          <button
            type="button"
            onClick={() => setDemoRole('user')}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
              identifier === 'sarah.connor@example.com'
                ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-xs'
                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            👤 Demo User
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setPhoneForOtp('+14155552671');
              setOtpDispatched(false);
              setErrorMessage(null);
            }}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
              authMode === 'otp'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs'
                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            📱 SMS OTP
          </button>
        </div>

        {/* Primary Auth Mode Toggle */}
        <div className="flex rounded-lg p-1 bg-neutral-100 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'password' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-pink-600" />
            <span>Password Login</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'otp' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>SMS OTP Login</span>
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* MODE 1: PASSWORD LOGIN */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            {/* Sub-toggle: Admin ID vs Email vs Phone */}
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 px-0.5">
              <span>Sign In With:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIdentifierType('admin');
                    setIdentifier('admin');
                  }}
                  className={`hover:underline ${identifierType === 'admin' ? 'text-pink-600 underline font-extrabold' : ''}`}
                >
                  Admin ID
                </button>
                <span>&bull;</span>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifierType('email');
                    setIdentifier('');
                  }}
                  className={`hover:underline ${identifierType === 'email' ? 'text-pink-600 underline font-extrabold' : ''}`}
                >
                  Email
                </button>
                <span>&bull;</span>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifierType('phone');
                    setIdentifier('');
                  }}
                  className={`hover:underline ${identifierType === 'phone' ? 'text-pink-600 underline font-extrabold' : ''}`}
                >
                  Phone
                </button>
              </div>
            </div>

            {/* Identifier Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                {identifierType === 'admin'
                  ? 'Administrator ID'
                  : identifierType === 'phone'
                  ? 'Registered Phone Number'
                  : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type={identifierType === 'email' ? 'email' : 'text'}
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={
                    identifierType === 'admin'
                      ? 'admin'
                      : identifierType === 'phone'
                      ? '+14155552671'
                      : 'name@example.com'
                  }
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
                />
                {identifierType === 'admin' && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200">
                    ROOT
                  </span>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-pink-600 hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm pl-4 pr-10 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm shadow-md shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* MODE 2: PHONE NUMBER + SMS OTP LOGIN */}
        {authMode === 'otp' && (
          <div className="space-y-4">
            {!otpDispatched ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Mobile Phone Number (With Country Code)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phoneForOtp}
                      onChange={e => setPhoneForOtp(e.target.value)}
                      placeholder="+14155552671"
                      className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
                    />
                    <Smartphone className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    We will send a 6-digit one-time passcode via SMS to this number.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? <span>Dispatching SMS...</span> : <span>Send One-Time SMS Passcode</span>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtpLogin} className="space-y-4">
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span>Passcode sent to: <strong>{phoneForOtp}</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtpDispatched(false)}
                    className="text-[11px] text-emerald-700 underline font-bold"
                  >
                    Change
                  </button>
                </div>

                {/* Dev OTP Helper */}
                {simulatedSmsCode && (
                  <DevOtpHelper
                    phoneCode={simulatedSmsCode}
                    onAutofillPhone={code => setOtpCode(code)}
                    title="SMS OTP Code Simulator"
                  />
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Enter 6-Digit SMS Passcode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full text-center tracking-[8px] font-mono font-bold text-xl bg-neutral-50 text-neutral-900 py-3 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? <span>Verifying OTP...</span> : <span>Verify & Log In</span>}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Don&rsquo;t have an account yet?{' '}
            <Link to="/register" className="text-pink-600 font-bold hover:underline">
              Create an account &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
