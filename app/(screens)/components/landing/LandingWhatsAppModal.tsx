"use client";

import { useState, useEffect } from "react";
import { WhatsappLogo, Copy, Check, X, ArrowSquareOut } from "@phosphor-icons/react";

interface LandingWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
}

export default function LandingWhatsAppModal({
  isOpen,
  onClose,
  phoneNumber = "9000266832",
}: LandingWhatsAppModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`+91${phoneNumber}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${phoneNumber}&text=${encodeURIComponent("Hi, I want to know more about GK- Gym Life Powered Gyms")}&type=phone_number&app_absent=0`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-[#0E1118] border-2 border-[#D4FF32] rounded-2xl shadow-[0_0_35px_rgba(212,255,50,0.25),0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#D4FF32]/20 bg-[#131722] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shadow-[0_0_12px_rgba(37,211,102,0.2)] shrink-0">
              <WhatsappLogo size={22} weight="fill" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                WhatsApp GK-Gym Life
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Direct Contact &amp; Support
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-5 bg-gradient-to-b from-[#131722]/50 to-transparent flex flex-col gap-3.5">
          <div className="bg-[#080A0F] border border-[#D4FF32]/35 rounded-xl p-4 flex items-center justify-between gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[11px] font-bold text-[#D4FF32] uppercase tracking-wider">
                Phone Number
              </span>
              <a
                href={`tel:+91${phoneNumber}`}
                className="text-lg sm:text-xl font-black text-white hover:text-[#25D366] transition-colors tracking-wide truncate"
              >
                +91 {phoneNumber}
              </a>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="h-10 px-3.5 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/30 hover:bg-[#D4FF32]/20 text-[#D4FF32] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={16} weight="bold" className="text-[#D4FF32]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={16} weight="bold" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] active:scale-[0.98] cursor-pointer"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>Chat on WhatsApp</span>
            <ArrowSquareOut size={16} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}
