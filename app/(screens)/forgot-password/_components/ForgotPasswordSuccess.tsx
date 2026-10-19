"use client";

import Link from "next/link";
import { CheckCircle, ArrowClockwise, CaretLeft } from "@phosphor-icons/react";

interface ForgotPasswordSuccessProps {
  email: string;
  onResend: () => void;
  resendLoading: boolean;
  cooldown: number;
}

export default function ForgotPasswordSuccess({
  email,
  onResend,
  resendLoading,
  cooldown,
}: ForgotPasswordSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1D2218] border border-[#D4FF32]/30 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(212,255,50,0.2)]">
        <CheckCircle size={36} weight="fill" className="text-[#D4FF32]" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
        Reset Link Sent!
      </h2>

      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mb-2 break-words">
        We have sent password reset instructions to{" "}
        <span className="font-semibold text-white">{email}</span>.
      </p>

      <p className="text-[11px] sm:text-xs text-[#64748B] max-w-xs mb-8">
        Please check your inbox and click the link to reset your password. Be sure to check your spam or junk folder if you don&apos;t see it.
      </p>

      <div className="flex flex-col gap-3 w-full">
        <button
          type="button"
          onClick={onResend}
          disabled={resendLoading || cooldown > 0}
          className="cursor-pointer w-full h-12 sm:h-14 bg-[#15161C] hover:bg-[#1A1C23] border border-[#232631] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
        >
          <ArrowClockwise
            size={18}
            weight="bold"
            className={resendLoading ? "animate-spin" : ""}
          />
          <span>
            {resendLoading
              ? "Resending..."
              : cooldown > 0
              ? `Resend available in ${cooldown}s`
              : "Resend Reset Link"}
          </span>
        </button>

        <Link
          href="/login"
          className="cursor-pointer w-full h-12 sm:h-14 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] touch-manipulation"
        >
          <CaretLeft size={18} weight="bold" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
}
