"use client";

import { useEffect } from "react";
import { CheckCircle, ShieldCheck, ArrowRight, UserCheck, Sparkle } from "@phosphor-icons/react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  itemName: string;
  amount: number;
  transactionId?: string;
  type: "trainer" | "plan";
  onClose: () => void;
}

export default function PaymentSuccessModal({
  isOpen,
  itemName,
  amount,
  transactionId,
  type,
  onClose,
}: PaymentSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#D7FF00]/40 rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D7FF00]/15 border-2 border-[#D7FF00] flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-[#D7FF00]/20">
          <CheckCircle size={44} className="text-[#D7FF00]" weight="fill" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7FF00]/10 border border-[#D7FF00]/30 text-[#D7FF00] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkle size={13} weight="fill" />
          <span>Payment Verified & Confirmed</span>
        </div>

        <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
          {type === "trainer" ? "Trainer Booking Confirmed!" : "Membership Activated!"}
        </h2>
        <p className="text-[#8E8E93] text-xs sm:text-sm mt-1 max-w-xs leading-relaxed">
          Your payment of ₹{amount} has been successfully processed and recorded.
        </p>

        <div className="w-full bg-[#1C1C1E] border border-[#27272A] rounded-2xl p-4 my-5 text-left flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8E8E93] font-medium">
              {type === "trainer" ? "Assigned Coach" : "Plan Name"}
            </span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              {type === "trainer" && <UserCheck size={14} className="text-[#D7FF00]" weight="bold" />}
              {itemName}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8E8E93] font-medium">Subscription Status</span>
            <span className="bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Active Coaching
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8E8E93] font-medium">Duration Validity</span>
            <span className="text-[#CCCCCC] font-semibold">1 Month (30 Days)</span>
          </div>

          {transactionId && (
            <div className="border-t border-[#262626] pt-2 flex items-center justify-between text-[11px]">
              <span className="text-[#8E8E93] font-medium flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#D7FF00]" /> Transaction ID
              </span>
              <span className="text-[#8E8E93] font-mono truncate max-w-[150px]">
                {transactionId}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#D7FF00] hover:bg-[#cbf200] text-black font-bold py-3.5 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-lg shadow-[#D7FF00]/15"
        >
          <span>Go to Dashboard</span>
          <ArrowRight size={16} weight="bold" />
        </button>

        <p className="text-[#666666] text-[10px] mt-3">
          Redirecting automatically in a few seconds...
        </p>
      </div>
    </div>
  );
}
