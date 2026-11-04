import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { DevOtpHelper } from '../components/DevOtpHelper';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, verifyPhoneOtp, verifyEmailCode, resendOtp, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // Wizard Step: 'form' | 'verify' | 'completed'
  const [step, setStep] = useState<'form' | 'verify' | 'completed'>('form');

  // Registration Form
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Verification Form
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Simulator Codes
  const [simPhoneCode, setSimPhoneCode] = useState<string | null>(null);
  const [simEmailCode, setSimEmailCode] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendingType, setResendingType] = useState<'phone' | 'email' | null>(null);

  // Password Policy Checks
  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber;

  const fullPhone = `${countryCode}${phoneNumber.replace(/\D/g, '')}`;

  // Step 1: Submit Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isPasswordValid) {
      setErrorMessage('Password must be at least 8 characters and include at least one letter and one number.');
      return;
    }

    if (!phoneNumber || phoneNumber.trim().length < 7) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setIsLoading(true);
    const res = await register({
      name: name.trim() || email.split('@')[0],
      phone: fullPhone,
      email: email.trim(),
      password
    });
    setIsLoading(false);

    if (res.success) {
      showToast('Registration initiated! Please verify your phone and email.', 'success');
      if (res.devSimulation) {
        setSimPhoneCode(res.devSimulation.phoneCode || null);
        setSimEmailCode(res.devSimulation.emailCode || null);
      }
      setStep('verify');
    } else {
      setErrorMessage(res.error || 'Registration failed.');
    }
  };

  // Step 2A: Verify Phone OTP
  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!phoneOtp.trim() || phoneOtp.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit SMS OTP.');
      return;
    }

    setIsLoading(true);
    const res = await verifyPhoneOtp(fullPhone, phoneOtp.trim());
    setIsLoading(false);

    if (res.success) {
      setIsPhoneVerified(true);
      showToast('Phone number verified successfully!', 'success');
      if (isEmailVerified) {
        setStep('completed');
      }
    } else {
      setErrorMessage(res.error || 'Incorrect phone verification code.');
    }
  };

  // Step 2B: Verify Email Code
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!emailOtp.trim() || emailOtp.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit confirmation code.');
      return;
    }

    setIsLoading(true);
    const res = await verifyEmailCode(email.trim(), emailOtp.trim());
    setIsLoading(false);

    if (res.success) {
      setIsEmailVerified(true);
      showToast('Email address verified successfully!', 'success');
      if (isPhoneVerified) {
        setStep('completed');
      }
    } else {
      setErrorMessage(res.error || 'Incorrect email verification code.');
    }
  };

  // Resend code helper
  const handleResend = async (type: 'phone' | 'email') => {
    setResendingType(type);
    const target = type === 'phone' ? fullPhone : email.trim();
    const res = await resendOtp(target, type);
    setResendingType(null);

    if (res.success) {
      showToast(res.message || 'Fresh code dispatched!', 'info');
      if (res.simulatedCode) {
        if (type === 'phone') setSimPhoneCode(res.simulatedCode);
        else setSimEmailCode(res.simulatedCode);
      }
    } else {
      showToast(res.error || 'Failed to resend code.', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            {step === 'form' && 'Create Your Account'}
            {step === 'verify' && 'Dual-Channel Verification'}
            {step === 'completed' && 'Account Activated!'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {step === 'form' && 'Register with your phone number, email address, and strong password'}
            {step === 'verify' && 'Verify your mobile phone and email address with one-time passcodes'}
            {step === 'completed' && 'Your credentials and contact channels are verified'}
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between max-w-xs mx-auto mb-8">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 'form'
                  ? 'bg-pink-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {step === 'form' ? '1' : '✓'}
            </div>
            <span className="text-[10px] font-bold text-neutral-600 mt-1">Credentials</span>
          </div>
          <div
            className={`flex-1 h-0.5 mx-2 ${
              step !== 'form' ? 'bg-emerald-600' : 'bg-neutral-200'
            }`}
          />
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 'verify'
                  ? 'bg-pink-600 text-white ring-4 ring-pink-100'
                  : step === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              {step === 'completed' ? '✓' : '2'}
            </div>
            <span className="text-[10px] font-bold text-neutral-600 mt-1">OTP Verification</span>
          </div>
          <div
            className={`flex-1 h-0.5 mx-2 ${
              step === 'completed' ? 'bg-emerald-600' : 'bg-neutral-200'
            }`}
          />
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              3
            </div>
            <span className="text-[10px] font-bold text-neutral-600 mt-1">Activated</span>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: INITIAL REGISTRATION FORM */}
        {/* ========================================================================= */}
        {step === 'form' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Sarah Connor"
                className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Phone Number (Required with Country Code)
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  className="bg-neutral-100 text-neutral-900 text-xs font-bold px-3 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:outline-hidden shrink-0"
                >
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+61">+61 (AU)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+33">+33 (FR)</option>
                  <option value="+81">+81 (JP)</option>
                </select>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="415 555 2671"
                    className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
                  />
                  <Smartphone className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                A one-time SMS verification code will be sent to: <span className="font-mono font-bold text-neutral-700">{fullPhone}</span>
              </p>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Email Address (Must be unique)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="sarah.connor@example.com"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-400"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password with Strength Indicators */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a strong password"
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

              {/* Security Policy Requirements Meter */}
              <div className="mt-2.5 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 space-y-1 text-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Password Requirements:
                </p>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${hasMinLength ? 'text-emerald-600' : 'text-neutral-300'}`}
                  />
                  <span className={hasMinLength ? 'text-neutral-800 font-semibold' : 'text-neutral-400'}>
                    Minimum 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${hasLetter ? 'text-emerald-600' : 'text-neutral-300'}`}
                  />
                  <span className={hasLetter ? 'text-neutral-800 font-semibold' : 'text-neutral-400'}>
                    At least one letter (a-z, A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${hasNumber ? 'text-emerald-600' : 'text-neutral-300'}`}
                  />
                  <span className={hasNumber ? 'text-neutral-800 font-semibold' : 'text-neutral-400'}>
                    At least one number (0-9)
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isPasswordValid}
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm shadow-md shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: DUAL-CHANNEL OTP VERIFICATION SCREEN */}
        {/* ========================================================================= */}
        {step === 'verify' && (
          <div className="space-y-6">
            {/* Dev Simulator Helper Banner */}
            <DevOtpHelper
              phoneCode={simPhoneCode}
              emailCode={simEmailCode}
              onAutofillPhone={code => setPhoneOtp(code)}
              onAutofillEmail={code => setEmailOtp(code)}
              title="Verification Code Assistant (Simulator Active)"
            />

            {/* Card 1: Phone SMS Verification */}
            <div
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                isPhoneVerified
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-white border-neutral-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isPhoneVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-pink-50 text-pink-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Phone SMS OTP</h3>
                    <p className="text-[11px] text-neutral-500 font-mono">{fullPhone}</p>
                  </div>
                </div>
                {isPhoneVerified ? (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleResend('phone')}
                    disabled={resendingType === 'phone'}
                    className="text-xs text-pink-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${resendingType === 'phone' ? 'animate-spin' : ''}`} />
                    <span>Resend SMS</span>
                  </button>
                )}
              </div>

              {!isPhoneVerified ? (
                <form onSubmit={handleVerifyPhone} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={phoneOtp}
                      onChange={e => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-digit SMS code"
                      className="flex-1 text-center tracking-[6px] font-mono font-bold text-lg bg-neutral-50 text-neutral-900 px-3 py-2 rounded-lg border border-neutral-300 focus:border-pink-600 focus:bg-white focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || phoneOtp.length !== 6}
                      className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                    >
                      Verify Phone
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-xs text-emerald-800 font-medium">
                  Mobile phone number is confirmed and linked to your account.
                </p>
              )}
            </div>

            {/* Card 2: Email Code Verification */}
            <div
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                isEmailVerified
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-white border-neutral-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isEmailVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-50 text-sky-600'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Email Confirmation Code</h3>
                    <p className="text-[11px] text-neutral-500">{email}</p>
                  </div>
                </div>
                {isEmailVerified ? (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleResend('email')}
                    disabled={resendingType === 'email'}
                    className="text-xs text-sky-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${resendingType === 'email' ? 'animate-spin' : ''}`} />
                    <span>Resend Email</span>
                  </button>
                )}
              </div>

              {!isEmailVerified ? (
                <form onSubmit={handleVerifyEmail} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={emailOtp}
                      onChange={e => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-digit email code"
                      className="flex-1 text-center tracking-[6px] font-mono font-bold text-lg bg-neutral-50 text-neutral-900 px-3 py-2 rounded-lg border border-neutral-300 focus:border-sky-600 focus:bg-white focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || emailOtp.length !== 6}
                      className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                    >
                      Verify Email
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-xs text-emerald-800 font-medium">
                  Email address confirmed and activated.
                </p>
              )}
            </div>

            {/* Finalize Button */}
            {(isPhoneVerified || isEmailVerified) && (
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to User Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: ACTIVATION SUCCESS */}
        {/* ========================================================================= */}
        {step === 'completed' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Registration & Verification Complete!</h2>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Both your phone number and email address have been verified. Your session is now securely authenticated.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <span>Enter User Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-600 font-bold hover:underline">
              Sign In here &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
