"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Receipt,
  Buildings,
  Copy,
  Check,
  Coins,
  CheckCircle,
} from "@phosphor-icons/react";
import { RevenueTransaction } from "./types";

interface RevenueDetailsViewProps {
  transaction: RevenueTransaction;
  onBack: () => void;
}

function UpiEmblem({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M4 18L10 12L4 6H8L14 12L8 18H4Z" fill="#00B386" />
      <path d="M11 18L17 12L11 6H15L21 12L15 18H11Z" fill="#F47920" />
    </svg>
  );
}

export default function RevenueDetailsView({
  transaction,
  onBack,
}: RevenueDetailsViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(transaction.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-7 w-full max-w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Revenue Details
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          View complete payment information and related revenue details.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        <div className="flex-[2] flex flex-col gap-5 sm:gap-6 w-full min-w-0">
          <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1E222D]">
              <div className="w-9 h-9 rounded-xl bg-[#242A16] border border-[#3E491A] flex items-center justify-center shrink-0 text-[#D4FF32]">
                <Receipt size={18} weight="fill" />
              </div>
              <h2 className="text-base font-bold text-white">
                Transaction Information
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-[#181B24]">
              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Transaction ID
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                    {transaction.id}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    aria-label="Copy Transaction ID"
                    className="p-1 rounded-md text-[#64748B] hover:text-[#D4FF32] hover:bg-[#1C202C] transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Payment Date
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {transaction.paymentDate}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Source
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D4FF32]">
                  <Receipt size={15} weight="fill" />
                  <span>{transaction.source}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Paid By
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {transaction.paidBy}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Amount
                </span>
                <span className="text-sm sm:text-base font-bold text-white">
                  {transaction.amount}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Payment Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#0D261C] text-[#10B981] border border-[#164E37]/50">
                  <CheckCircle size={14} weight="fill" />
                  <span>{transaction.status}</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Payment Method
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white">
                  <span>{transaction.paymentMethod}</span>
                  <UpiEmblem className="w-4 h-4 shrink-0 inline-block" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1E222D]">
              <div className="w-9 h-9 rounded-xl bg-[#242A16] border border-[#3E491A] flex items-center justify-center shrink-0 text-[#D4FF32]">
                <Buildings size={18} weight="fill" />
              </div>
              <h2 className="text-base font-bold text-white">
                Source Details
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-[#181B24]">
              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Gym Name
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {transaction.gymName || transaction.paidBy}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Gym Plan
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {transaction.gymPlan || transaction.reference}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 bg-[#12141A] border border-[#232631] rounded-2xl p-6 flex flex-col items-center gap-5 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#242A16] border border-[#3E491A] flex items-center justify-center text-[#D4FF32] shadow-[0_0_20px_rgba(212,255,50,0.15)] mt-2">
            <Coins size={32} weight="fill" />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-medium text-[#94A3B8]">
              Revenue Amount
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {transaction.amount}
            </span>
          </div>

          <div className="w-full border-t border-[#1E222D] my-1" />

          <div className="w-full flex flex-col gap-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8] font-medium">Payment Status</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-bold bg-[#0D261C] text-[#10B981] border border-[#164E37]/50">
                <CheckCircle size={12} weight="fill" />
                <span>{transaction.status}</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8] font-medium">Payment Method</span>
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <span>{transaction.paymentMethod}</span>
                <UpiEmblem className="w-4 h-4 shrink-0 inline-block" />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 mt-3 rounded-xl border border-[#D4FF32] text-[#D4FF32] hover:bg-[#D4FF32]/10 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Revenue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
