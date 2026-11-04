import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Sliders,
  Menu,
  X,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isMainAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Security Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-neutral-900 tracking-tight leading-none group-hover:text-pink-600 transition-colors">
                    NEXUS AUTH
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-pink-100 text-pink-700 tracking-wider">
                    RBAC
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 font-medium hidden sm:block mt-0.5">
                  Role-Based Security & Control Hub
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'text-pink-600 font-bold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Overview
            </Link>
            <a
              href="/#features"
              className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Security Features
            </a>
            <a
              href="/#faqs"
              className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              FAQs
            </a>

            {/* If Admin, show link to Admin Control Panel */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-neutral-900 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-rose-500" />
                <span>Admin Console</span>
                {isMainAdmin && (
                  <span className="ml-1 text-[9px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-black">
                    ROOT
                  </span>
                )}
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-full border border-neutral-200 hover:border-pink-300 bg-neutral-50/80 hover:bg-white transition-all cursor-pointer"
                  aria-label="User menu"
                >
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-neutral-900 line-clamp-1">{user?.name}</p>
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          user?.role === 'admin' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                      />
                      <span className="text-[10px] text-neutral-500 capitalize font-medium">
                        {user?.isMainAdmin ? 'Super Admin' : user?.role}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-neutral-100">
                      <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-neutral-900 truncate">{user?.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            user?.role === 'admin'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {user?.isMainAdmin ? 'Root Admin' : user?.role}
                        </span>
                        {user?.phoneVerified && (
                          <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5 text-emerald-600" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-neutral-400 group-hover:text-pink-600" />
                        <span>User Dashboard & Settings</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Sliders className="w-4 h-4 text-rose-500" />
                          <span>Admin Control Panel</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs sm:text-sm font-bold text-neutral-700 hover:text-pink-600 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs sm:text-sm font-bold bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-sm shadow-pink-600/30 transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-neutral-800 py-1"
          >
            Overview
          </Link>
          <a
            href="/#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-neutral-800 py-1"
          >
            Security Features
          </a>
          <a
            href="/#faqs"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-neutral-800 py-1"
          >
            FAQs
          </a>

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-bold text-rose-600 py-1.5"
            >
              Admin Control Panel &rarr;
            </Link>
          )}

          {isAuthenticated ? (
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-semibold text-neutral-800"
              >
                My Account Settings
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left text-sm font-bold text-rose-600 py-1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-neutral-200 flex gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold border border-neutral-300 rounded-lg text-neutral-800"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold bg-pink-600 text-white rounded-lg shadow-xs"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
