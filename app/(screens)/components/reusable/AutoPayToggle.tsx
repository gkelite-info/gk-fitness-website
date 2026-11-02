"use client";

import { ArrowsClockwise, ShieldCheck } from "@phosphor-icons/react";

interface AutoPayToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export default function AutoPayToggle({
  enabled,
  onChange,
  disabled = false,
}: AutoPayToggleProps) {
  return (
    <div className="bg-[#1C1C1E] border border-[#2A2A2A] rounded-2xl p-3.5 mb-4 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              enabled
                ? "bg-[#D7FF00]/15 text-[#D7FF00] border border-[#D7FF00]/30"
                : "bg-[#27272A] text-[#8E8E93] border border-[#333333]"
            }`}
          >
            <ArrowsClockwise size={18} weight={enabled ? "bold" : "regular"} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white text-xs font-semibold">
                Auto-Renew with AutoPay
              </span>
              <span className="bg-[#D7FF00]/15 border border-[#D7FF00]/30 text-[#D7FF00] text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                UPI / Card
              </span>
            </div>
            <p className="text-[#8E8E93] text-[11px] leading-tight mt-0.5 break-words">
              {enabled
                ? "Hassle-free monthly renewal via UPI / Card e-mandate. Cancel anytime."
                : "Manual one-time payment for 1 month only. No recurring charges."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#27272A]">
          <span className="text-[11px] font-medium text-[#8E8E93] sm:hidden">
            {enabled ? "AutoPay Active" : "One-Time"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={disabled}
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              enabled ? "bg-[#D7FF00]" : "bg-[#27272A]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {enabled && (
        <div className="mt-2.5 pt-2 border-t border-[#27272A]/70 flex items-center gap-1.5 text-[10px] text-[#A1A1AA]">
          <ShieldCheck size={13} color="#D7FF00" weight="fill" className="shrink-0" />
          <span>Secured via Razorpay e-mandate. You can pause or cancel anytime from dashboard.</span>
        </div>
      )}
    </div>
  );
}

