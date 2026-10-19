"use client";

import { EnvelopeSimple, CircleNotch, ArrowRight } from "@phosphor-icons/react";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (value: string) => void;
  loading: boolean;
  cooldown?: number;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ForgotPasswordForm({
  email,
  setEmail,
  loading,
  cooldown = 0,
  onSubmit,
}: ForgotPasswordFormProps) {
  const isButtonDisabled = loading || cooldown > 0;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="forgot-password-email"
          className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wide ml-1 whitespace-nowrap"
        >
          Email Address
        </label>
        <div className="relative group w-full">
          <EnvelopeSimple
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#D4FF32] transition-colors shrink-0"
            weight="fill"
          />
          <input
            id="forgot-password-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@gkgymlife.com"
            disabled={loading}
            autoFocus
            className="w-full h-12 sm:h-14 bg-[#15161C] border border-[#232631] rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:bg-[#1A1C23] transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled}
        className="cursor-pointer w-full h-12 sm:h-14 mt-1 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
      >
        {loading ? (
          <>
            <CircleNotch size={20} weight="bold" className="animate-spin shrink-0" />
            <span>Sending Link...</span>
          </>
        ) : cooldown > 0 ? (
          <span>Please wait {cooldown}s</span>
        ) : (
          <>
            <span>Send Reset Link</span>
            <ArrowRight size={20} weight="bold" className="shrink-0" />
          </>
        )}
      </button>
    </form>
  );
}
