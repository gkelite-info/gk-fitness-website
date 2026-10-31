"use client";

import { useState } from "react";
import { CheckCircle, Copy, Check, X } from "@phosphor-icons/react";
import toast from "react-hot-toast";

interface CredentialsSuccessModalProps {
  isOpen: boolean;
  userType: "customer" | "trainer";
  email: string;
  temporaryPassword?: string;
  onClose: () => void;
}

export default function CredentialsSuccessModal({
  isOpen,
  userType,
  email,
  temporaryPassword,
  onClose,
}: CredentialsSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !temporaryPassword) return null;

  const handleCopy = async () => {
    try {
      const text = `Email: ${email}\nTemporary Password: ${temporaryPassword}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Credentials copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy credentials");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#161B22] border border-[#232A35] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-[#9CA3AF] hover:text-white transition-colors"
        >
          <X size={20} weight="bold" />
        </button>

        <div className="w-14 h-14 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32] mb-4">
          <CheckCircle size={32} weight="fill" />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {userType === "trainer" ? "Trainer" : "Customer"} Registered!
        </h3>
        <p className="text-xs text-[#9CA3AF] mb-5 max-w-xs">
          A temporary password has been generated and securely hashed into the database. Please share these credentials.
        </p>

        <div className="w-full bg-[#0D1117] border border-[#232A35] rounded-xl p-4 flex flex-col gap-3 text-left mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">Email Address</span>
            <span className="text-sm font-semibold text-white break-all">{email}</span>
          </div>

          <div className="h-[1px] w-full bg-[#232A35]" />

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">Temporary Password</span>
            <div className="flex items-center justify-between bg-[#161B22] border border-[#303744] rounded-lg px-3 py-2">
              <span className="font-mono text-sm font-bold text-[#D4FF32] tracking-wider select-all">
                {temporaryPassword}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer flex items-center gap-1 text-xs text-[#D1D5DB] hover:text-white transition-colors pl-2"
              >
                {copied ? <Check size={16} weight="bold" className="text-[#D4FF32]" /> : <Copy size={16} weight="bold" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="cursor-pointer flex-1 h-11 bg-[#232A35] hover:bg-[#303744] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Copy size={16} weight="bold" /> Copy Credentials
          </button>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex-1 h-11 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold text-xs rounded-xl flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(212,255,50,0.2)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

