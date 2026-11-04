import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Smartphone, Sliders, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-12 pb-12 text-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Security Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-neutral-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">BCrypt Password Hashing</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Salted 10-round key derivation for zero plaintext exposure</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Dual-Channel OTP</h4>
              <p className="text-xs text-neutral-500 mt-0.5">SMS one-time codes and email activation tokens</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Brute-Force Shield</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Automated lockout defense after 5 consecutive failures</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Root Admin Authority</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Privileged user suspension, deletion, and role delegation</p>
            </div>
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-neutral-900 text-sm tracking-tight">NEXUS AUTH & RBAC</span>
              <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded font-mono">v2.0.0</span>
            </div>
            <p className="mt-1 text-neutral-400">
              Enterprise Role-Based Authentication & Administrative Control Engine.
            </p>
          </div>

          <div className="flex items-center gap-6 font-semibold text-neutral-600">
            <Link to="/login" className="hover:text-pink-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-pink-600 transition-colors">
              Register
            </Link>
            <Link to="/forgot-password" className="hover:text-pink-600 transition-colors">
              Recovery
            </Link>
            <Link to="/admin" className="hover:text-pink-600 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
