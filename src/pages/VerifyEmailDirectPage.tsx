import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const VerifyEmailDirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmailCode } = useAuth();
  const { showToast } = useToast();

  const code = searchParams.get('code');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function verify() {
      if (!code || !email) {
        setStatus('error');
        setErrorMessage('Invalid verification link. Missing code or email address.');
        return;
      }

      const res = await verifyEmailCode(email, code);
      if (res.success) {
        setStatus('success');
        showToast('Email address verified successfully!', 'success');
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Failed to verify email address.');
      }
    }
    verify();
  }, [code, email]);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl p-8 text-center space-y-4">
        {status === 'verifying' && (
          <div className="py-6 space-y-3">
            <Loader2 className="w-10 h-10 text-pink-600 animate-spin mx-auto" />
            <h2 className="text-lg font-bold text-neutral-900">Confirming Email Address...</h2>
            <p className="text-xs text-neutral-500">Validating your one-time verification link.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Email Address Confirmed!</h2>
            <p className="text-xs text-neutral-600">
              Your email <strong>{email}</strong> is now verified and active.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-md inline-flex items-center gap-1.5"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Verification Failed</h2>
            <p className="text-xs text-rose-600">{errorMessage}</p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                to="/register"
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-700"
              >
                Registration
              </Link>
              <Link
                to="/login"
                className="px-5 py-2 bg-pink-600 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
