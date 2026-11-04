import React from 'react';
import { Smartphone, Mail, Copy, Check, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface DevOtpHelperProps {
  phoneCode?: string | null;
  emailCode?: string | null;
  onAutofillPhone?: (code: string) => void;
  onAutofillEmail?: (code: string) => void;
  title?: string;
}

export const DevOtpHelper: React.FC<DevOtpHelperProps> = ({
  phoneCode,
  emailCode,
  onAutofillPhone,
  onAutofillEmail,
  title = 'Active Verification Codes (Simulator)'
}) => {
  const { showToast } = useToast();
  const [copiedPhone, setCopiedPhone] = React.useState(false);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  if (!phoneCode && !emailCode) return null;

  const copyCode = (code: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(code);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
    showToast(`Copied ${code} to clipboard!`, 'info');
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-4 my-4 shadow-sm animate-in fade-in duration-200">
      <div className="flex items-center gap-2 mb-2.5">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
          {title}
        </h4>
        <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-extrabold uppercase ml-auto">
          Demo Helper
        </span>
      </div>
      <p className="text-[11px] text-amber-800/80 mb-3">
        In local preview mode, incoming SMS and Email codes are surfaced below for instant one-click testing:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {phoneCode && (
          <div className="bg-white rounded-lg p-2.5 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-neutral-500 uppercase">SMS Phone OTP</p>
                <p className="text-sm font-mono font-bold text-neutral-900 tracking-wider">{phoneCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => copyCode(phoneCode, 'phone')}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100"
                title="Copy code"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {onAutofillPhone && (
                <button
                  type="button"
                  onClick={() => onAutofillPhone(phoneCode)}
                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded shadow-xs"
                >
                  Autofill
                </button>
              )}
            </div>
          </div>
        )}

        {emailCode && (
          <div className="bg-white rounded-lg p-2.5 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-neutral-500 uppercase">Email Confirmation</p>
                <p className="text-sm font-mono font-bold text-neutral-900 tracking-wider">{emailCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => copyCode(emailCode, 'email')}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100"
                title="Copy code"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-sky-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {onAutofillEmail && (
                <button
                  type="button"
                  onClick={() => onAutofillEmail(emailCode)}
                  className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold rounded shadow-xs"
                >
                  Autofill
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
