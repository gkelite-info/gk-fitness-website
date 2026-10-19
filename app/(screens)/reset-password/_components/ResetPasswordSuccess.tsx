"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

export default function ResetPasswordSuccess() {
  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1D2218] border border-[#D4FF32]/30 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(212,255,50,0.2)]">
        <CheckCircle size={36} weight="fill" className="text-[#D4FF32]" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
        Password Reset Complete!
      </h2>

      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mb-8">
        Your password has been successfully updated. You can now access your account with your new credentials.
      </p>

      <Link
        href="/login"
        className="cursor-pointer w-full h-12 sm:h-14 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] touch-manipulation"
      >
        <span>Proceed to Login</span>
        <ArrowRight size={18} weight="bold" />
      </Link>
    </div>
  );
}
