"use client";

import { useState } from "react";
import { LockKey, Eye, EyeSlash, CircleNotch, ArrowRight, Check, X } from "@phosphor-icons/react";

interface ResetPasswordFormProps {
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ResetPasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  onSubmit,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 6;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="new-password"
          className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wide ml-1 whitespace-nowrap"
        >
          New Password
        </label>
        <div className="relative group w-full">
          <LockKey
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#D4FF32] transition-colors shrink-0"
            weight="fill"
          />
          <input
            id="new-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            disabled={loading}
            className="w-full h-12 sm:h-14 bg-[#15161C] border border-[#232631] rounded-xl pl-12 pr-12 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:bg-[#1A1C23] transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors flex items-center justify-center p-1"
          >
            {showPassword ? <EyeSlash size={20} weight="fill" /> : <Eye size={20} weight="fill" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="confirm-password"
          className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wide ml-1 whitespace-nowrap"
        >
          Confirm Password
        </label>
        <div className="relative group w-full">
          <LockKey
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#D4FF32] transition-colors shrink-0"
            weight="fill"
          />
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            disabled={loading}
            className="w-full h-12 sm:h-14 bg-[#15161C] border border-[#232631] rounded-xl pl-12 pr-12 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:bg-[#1A1C23] transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors flex items-center justify-center p-1"
          >
            {showConfirmPassword ? <EyeSlash size={20} weight="fill" /> : <Eye size={20} weight="fill" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#0F1014] border border-[#232631]">
        <div className="flex items-center gap-2 text-xs">
          {hasMinLength ? (
            <Check size={14} weight="bold" className="text-[#D4FF32] shrink-0" />
          ) : (
            <X size={14} weight="bold" className="text-[#64748B] shrink-0" />
          )}
          <span className={hasMinLength ? "text-white" : "text-[#64748B]"}>
            At least 6 characters
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {passwordsMatch ? (
            <Check size={14} weight="bold" className="text-[#D4FF32] shrink-0" />
          ) : (
            <X size={14} weight="bold" className="text-[#64748B] shrink-0" />
          )}
          <span className={passwordsMatch ? "text-white" : "text-[#64748B]"}>
            Passwords match
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !hasMinLength || !passwordsMatch}
        className="cursor-pointer w-full h-12 sm:h-14 mt-1 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
      >
        {loading ? (
          <>
            <CircleNotch size={20} weight="bold" className="animate-spin shrink-0" />
            <span>Updating Password...</span>
          </>
        ) : (
          <>
            <span>Reset Password</span>
            <ArrowRight size={20} weight="bold" className="shrink-0" />
          </>
        )}
      </button>
    </form>
  );
}
