"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import toast from "react-hot-toast";

interface GymSuccessCredentialsSectionProps {
  loginIdentifier: string;
  temporaryPassword: string;
}

export default function GymSuccessCredentialsSection({
  loginIdentifier,
  temporaryPassword,
}: GymSuccessCredentialsSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(temporaryPassword);
      setCopied(true);
      toast.success("Temporary password copied to clipboard!", {
        id: "copy-temp-pw",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy password");
    }
  };

  return (
    <div className="flex flex-col min-w-0">
      <h4 className="text-[11px] sm:text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-2.5 sm:mb-3">
        LOGIN CREDENTIALS
      </h4>

      <div className="flex flex-col justify-between flex-1 gap-3 sm:gap-3.5">
        <div>
          <label className="block text-[10px] sm:text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
            EMAIL OR PHONE
          </label>
          <div className="w-full h-11 sm:h-12 px-3.5 rounded-xl bg-[#141B26] border border-[#1F2A3D] text-xs sm:text-sm text-[#CBD5E1] flex items-center">
            <span title={loginIdentifier || "info@powerhousegym.com"} className="truncate">
              {loginIdentifier || "info@powerhousegym.com"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] sm:text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
            TEMPORARY PASSWORD
          </label>
          <div className="w-full h-11 sm:h-12 px-3.5 rounded-xl bg-[#141B26] border border-[#1F2A3D] flex items-center justify-between gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#D4FF32] tracking-wider select-all">
              {temporaryPassword}
            </span>
            <button
              type="button"
              onClick={handleCopyPassword}
              aria-label="Copy temporary password"
              className="p-1.5 rounded-lg text-[#D4FF32] hover:bg-[#1F2A3D] transition-all cursor-pointer active:scale-90 shrink-0"
            >
              {copied ? (
                <Check size={18} weight="bold" className="text-[#D4FF32]" />
              ) : (
                <Copy size={18} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
