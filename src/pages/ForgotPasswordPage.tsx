import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KeyRound,
  Mail,
  Smartphone,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { DevOtpHelper } from '../components/DevOtpHelper';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<'request' | 'reset' | 'done'>('request');
  const [target, setTarget] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [simulatedCode, setSimulatedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Request Recovery Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!target.trim()) {
      setErrorMessage('Please enter your registered email address or phone number.');
      return;
    }

    setIsLoading(true);
    const res = await forgotPassword(target.trim());
    setIsLoading(false);

    if (res.success) {
      if (res.simulatedCode) {
        setSimulatedCode(res.simulatedCode);
        setCode(res.simulatedCode);
      }
      showToast(res.message || 'Recovery code dispatched!', 'info');
      setStep('reset');
    } else {
      setErrorMessage(res.error || 'Failed to request recovery code.');
    }
  };

  // Submit Password Reset
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    setIsLoading(true);
    const res = await resetPassword(target.trim(), code.trim(), newPassword);
    setIsLoading(false);

    if (res.success) {
      showToast('Password updated successfully! Please sign in with your new password.', 'success');
      setStep('done');
    } else {
      setErrorMessage(res.error || 'Failed to reset password. Please check the code.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Password Recovery</h1>
          <p className="text-xs text-neutral-500 mt-1">
            {step === 'request' && 'Enter your registered email or phone to receive a recovery code'}
            {step === 'reset' && 'Enter the verification code and set your new password'}
            {step === 'done' && 'Your password has been successfully reset'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* STEP 1: REQUEST CODE */}
        {step === 'request' && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Registered Email or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={target}
                  onChange={e => setTarget(e.target.value)}
                  placeholder="e.g. sarah@example.com or +14155552671"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
                />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                A 6-digit one-time recovery code will be dispatched to this destination.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm shadow-md shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <span>Sending Code...</span> : <span>Send Recovery Code</span>}
            </button>
          </form>
        )}

        {/* STEP 2: ENTER CODE & NEW PASSWORD */}
        {step === 'reset' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            {simulatedCode && (
              <DevOtpHelper
                phoneCode={target.includes('@') ? undefined : simulatedCode}
                emailCode={target.includes('@') ? simulatedCode : undefined}
                onAutofillPhone={c => setCode(c)}
                onAutofillEmail={c => setCode(c)}
                title="Recovery Code Simulator"
              />
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                6-Digit Recovery Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center tracking-[8px] font-mono font-bold text-xl bg-neutral-50 text-neutral-900 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
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
                  placeholder="Minimum 8 chars, 1 letter, 1 number"
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
                placeholder="Re-enter password"
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm shadow-md shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <span>Updating Password...</span> : <span>Reset Password & Sign In</span>}
            </button>
          </form>
        )}

        {/* STEP 3: COMPLETED */}
        {step === 'done' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Password Changed!</h2>
            <p className="text-xs text-neutral-600">
              Your password has been successfully updated. You can now use your new credentials.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                <span>Go to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
          <Link to="/login" className="text-xs font-bold text-neutral-600 hover:text-pink-600">
            &larr; Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
