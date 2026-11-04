import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMainAdmin: boolean;
  isLoading: boolean;
  loginWithPassword: (identifier: string, password: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  loginWithOtp: (phone: string, otpCode: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  requestPhoneLoginOtp: (phone: string) => Promise<{ success: boolean; simulatedCode?: string; message?: string; error?: string }>;
  register: (data: { name: string; phone: string; email: string; password: string }) => Promise<{
    success: boolean;
    user?: User;
    phoneOtpRequired?: boolean;
    emailOtpRequired?: boolean;
    devSimulation?: { phoneCode?: string; emailCode?: string; providerSms?: string; providerEmail?: string };
    error?: string;
  }>;
  verifyPhoneOtp: (phone: string, code: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  verifyEmailCode: (email: string, code: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  resendOtp: (target: string, type: 'phone' | 'email') => Promise<{ success: boolean; simulatedCode?: string; message?: string; error?: string }>;
  forgotPassword: (target: string) => Promise<{ success: boolean; simulatedCode?: string; message?: string; error?: string }>;
  resetPassword: (target: string, code: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateProfile: (data: { name?: string; email?: string; phone?: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'security_portal_jwt';
const USER_KEY = 'security_portal_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync token & user to localStorage
  const saveSession = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  // Authenticated fetch wrapper
  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      clearSession();
    } else if (response.status === 403) {
      try {
        const data = await response.clone().json();
        if (data.error && data.error.includes('suspended')) {
          clearSession();
        }
      } catch {}
    }

    return response;
  };

  // Verify session on mount
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        } else {
          clearSession();
        }
      } catch (err) {
        console.error('Session verification error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [token]);

  // Login with identifier (admin, email, phone) + password
  const loginWithPassword = async (identifier: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginMethod: 'password', identifier, password })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      saveSession(data.token, data.user);
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error during login.' };
    }
  };

  // Login with phone + SMS OTP
  const loginWithOtp = async (phone: string, otpCode: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginMethod: 'otp', phone, otpCode })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'OTP login failed' };
      }

      saveSession(data.token, data.user);
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error during OTP login.' };
    }
  };

  // Request SMS OTP for phone login
  const requestPhoneLoginOtp = async (phone: string) => {
    try {
      const res = await fetch('/api/auth/request-phone-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to dispatch login OTP' };
      }

      return {
        success: true,
        message: data.message,
        simulatedCode: data.simulatedCode
      };
    } catch (err: any) {
      return { success: false, error: 'Network error dispatching OTP.' };
    }
  };

  // Register user
  const register = async (formData: { name: string; phone: string; email: string; password: string }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      return {
        success: true,
        user: data.user,
        phoneOtpRequired: data.phoneOtpRequired,
        emailOtpRequired: data.emailOtpRequired,
        devSimulation: data.devSimulation
      };
    } catch (err: any) {
      return { success: false, error: 'Network error during registration.' };
    }
  };

  // Verify Phone OTP
  const verifyPhoneOtp = async (phone: string, code: string) => {
    try {
      const res = await fetch('/api/auth/verify-phone-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to verify phone' };
      }

      if (data.token && data.user) {
        saveSession(data.token, data.user);
      } else if (data.user) {
        setUser(data.user);
      }

      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error verifying phone OTP.' };
    }
  };

  // Verify Email Code
  const verifyEmailCode = async (email: string, code: string) => {
    try {
      const res = await fetch('/api/auth/verify-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to verify email' };
      }

      if (data.token && data.user) {
        saveSession(data.token, data.user);
      } else if (data.user) {
        setUser(data.user);
      }

      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error verifying email code.' };
    }
  };

  // Resend OTP
  const resendOtp = async (target: string, type: 'phone' | 'email') => {
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, type })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to resend code' };
      }

      return { success: true, message: data.message, simulatedCode: data.simulatedCode };
    } catch (err: any) {
      return { success: false, error: 'Network error resending code.' };
    }
  };

  // Forgot password
  const forgotPassword = async (target: string) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to process request' };
      }

      return {
        success: true,
        message: data.message,
        simulatedCode: data.simulatedCode
      };
    } catch (err: any) {
      return { success: false, error: 'Network error processing recovery request.' };
    }
  };

  // Reset password
  const resetPassword = async (target: string, code: string, newPassword: string) => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to reset password' };
      }

      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error resetting password.' };
    }
  };

  // Update profile
  const updateProfile = async (formData: { name?: string; email?: string; phone?: string }) => {
    try {
      const res = await authFetch('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to update profile' };
      }

      setUser(data.user);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error updating profile.' };
    }
  };

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const res = await authFetch('/api/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to change password' };
      }

      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: 'Network error changing password.' };
    }
  };

  const logout = () => {
    clearSession();
    window.location.href = '/login';
  };

  const isAuthenticated = !!token && !!user && user.status === 'active';
  const isAdmin = isAuthenticated && user.role === 'admin';
  const isMainAdmin = isAdmin && (user.id === 'admin' || !!user.isMainAdmin);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isMainAdmin,
        isLoading,
        loginWithPassword,
        loginWithOtp,
        requestPhoneLoginOtp,
        register,
        verifyPhoneOtp,
        verifyEmailCode,
        resendOtp,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
        logout,
        authFetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
