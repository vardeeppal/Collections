import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  Mail,
  UserCheck,
  Sliders,
  History,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
  Flame,
  Info,
  Check
} from 'lucide-react';
import { SiteContent } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { showToast } = useToast();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');
  const [copiedAdminCreds, setCopiedAdminCreds] = useState(false);

  useEffect(() => {
    fetch('/api/public/content')
      .then(res => res.json())
      .then(data => {
        if (data.content) setContent(data.content);
      })
      .catch(err => console.error('Error loading public content:', err));
  }, []);

  const copyCreds = () => {
    navigator.clipboard.writeText('ID: admin\nPassword: Admin@2026!');
    setCopiedAdminCreds(true);
    setTimeout(() => setCopiedAdminCreds(false), 2000);
    showToast('Admin credentials copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Dynamic Announcement Banner */}
      {content?.announcement?.enabled && (
        <div
          className={`py-2.5 px-4 text-xs font-semibold text-center border-b flex items-center justify-center gap-2 ${
            content.announcement.variant === 'alert'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : content.announcement.variant === 'warning'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : content.announcement.variant === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-neutral-900 text-white border-neutral-800'
          }`}
        >
          <Info className="w-4 h-4 text-pink-500 shrink-0" />
          <span>{content.announcement.text}</span>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200/80 text-pink-700 text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>{content?.hero?.badge || 'Enterprise Role-Based Access Control'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
              {content?.hero?.headline || 'Unified Identity, Dual OTP & Root Admin Authority'}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {content?.hero?.subheadline ||
                'Full-stack security architecture featuring telephone SMS verification, email activation, passwordless phone login, brute-force lockout defense, and authoritative administrative control.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Go to My Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="w-full sm:w-auto px-6 py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-sm shadow-md shadow-pink-600/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Sliders className="w-4 h-4" />
                      <span>Admin Control Panel</span>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-7 py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{content?.hero?.primaryCtaText || 'Register New Account'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-xl font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4 text-pink-600" />
                    <span>{content?.hero?.secondaryCtaText || 'Sign In to Portal'}</span>
                  </Link>
                </>
              )}
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="pt-6 max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-md text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Pre-Seeded Root Admin Account
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Log in with ID: <code className="bg-neutral-100 text-pink-700 px-1.5 py-0.5 rounded font-bold font-mono">admin</code> &bull; Password: <code className="bg-neutral-100 text-pink-700 px-1.5 py-0.5 rounded font-bold font-mono">Admin@2026!</code>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyCreds}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    {copiedAdminCreds ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <KeyRound className="w-3.5 h-3.5 text-neutral-600" />}
                    <span>{copiedAdminCreds ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <Link
                    to="/login?autofill=admin"
                    className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    Instant Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Architecture Pillars */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Comprehensive Security & RBAC Capabilities
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Built from the ground up for strict role separation, identity verification, and administrative auditability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Root Admin Authority (ID: &ldquo;admin&rdquo;)</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              One special master account with root control. Only the main admin can promote users to administrators, demote roles, suspend or delete accounts, and configure system rules.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Dual-Channel OTP Verification</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Every registration verifies both phone number (via real SMS or built-in OTP simulator) and email address (via verification link and 6-digit passcode) ensuring authentic users.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Flexible Multi-Method Login</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Sign in with Email + Password, Phone Number + Password, or passwordless instant SMS OTP login. Includes self-service password recovery flow with one-time passcodes.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Brute-Force Rate Limiting</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Failed authentication attempts are dynamically tracked. Accounts exceeding 5 failed logins are locked out for 15 minutes, with full telemetry logged to the admin audit log.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Admin Control Panel</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Comprehensive web dashboard for searching, filtering, editing, suspending, and managing users, plus live website content updates (announcements, hero, FAQs) and security thresholds.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Immutable Activity Audit Trail</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Complete logging for all registrations, login events, password modifications, role assignments, suspensions, and content edits, complete with timestamps and IP addresses.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Live FAQ Section */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            These questions are managed in real-time from the Admin Content Control Panel.
          </p>
        </div>

        <div className="space-y-3">
          {content?.faqs?.map(faq => {
            const isOpen = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-neutral-900 hover:text-pink-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-pink-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Support & Contact Information */}
      {content?.contactInfo && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
                Security Operations Center
              </span>
              <h3 className="text-xl font-bold mt-1">Need assistance or reporting an incident?</h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-md">
                Our security engineering team operates 24/7 to safeguard accounts and monitor activity.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-neutral-200">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-pink-400" />
                  <span>{content.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-pink-400" />
                  <span>{content.contactInfo.phone}</span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Link
                to="/register"
                className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors inline-block"
              >
                Create Account &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
