"use client";

import { ShieldCheck, ArrowClockwise, XCircle, CheckCircle } from "@phosphor-icons/react";

interface PaymentRecoveryBannerProps {
  planName: string;
  amount: number;
  onResume: () => void;
  onCancel: () => void;
  isChecking: boolean;
}

export default function PaymentRecoveryBanner({
  planName,
  amount,
  onResume,
  onCancel,
  isChecking,
}: PaymentRecoveryBannerProps) {
  return (
    <div className="bg-[#1D2218] border border-[#D7FF00]/40 rounded-2xl p-4 sm:p-5 mb-5 shadow-lg animate-in fade-in duration-300">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#D7FF00]/20 flex items-center justify-center shrink-0">
          <ShieldCheck size={24} className="text-[#D7FF00]" weight="fill" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[#D7FF00] font-bold text-xs uppercase tracking-wider">
              Payment In Progress
            </span>
            <span className="bg-[#D7FF00]/10 text-[#D7FF00] text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Session Preserved
            </span>
          </div>
          <h4 className="text-white text-sm sm:text-base font-bold truncate">
            {planName} - ₹{amount}
          </h4>
          <p className="text-[#A1A1AA] text-xs leading-relaxed mt-1">
            You have an active payment session. If you refreshed while entering OTP or verifying, you can resume right away without paying twice.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-4">
            <button
              onClick={onResume}
              disabled={isChecking}
              className="bg-[#D7FF00] hover:bg-[#cbf500] text-black font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isChecking ? (
                <>
                  <ArrowClockwise size={15} className="animate-spin" />
                  Verifying Status...
                </>
              ) : (
                <>
                  <CheckCircle size={16} weight="bold" />
                  Resume Payment / Enter OTP
                </>
              )}
            </button>

            <button
              onClick={onCancel}
              disabled={isChecking}
              className="bg-[#2A2A2E] hover:bg-[#323236] text-[#A1A1AA] hover:text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <XCircle size={15} />
              Cancel & Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
