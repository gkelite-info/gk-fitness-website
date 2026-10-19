import {
  Link as LinkIcon,
  CurrencyInr,
  ArrowsLeftRight,
  Check,
  Clock,
  XCircle,
} from "@phosphor-icons/react";
import { FinanceTransactionRecord } from "./types";

interface TransactionRightCardsProps {
  transaction: FinanceTransactionRecord;
}

export default function TransactionRightCards({
  transaction,
}: TransactionRightCardsProps) {
  const isPaid = transaction.status === "Paid";
  const isPending = transaction.status === "Pending";

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 240"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-40 180 C 80 80, 220 260, 440 60"
              stroke="rgba(34, 197, 94, 0.25)"
              strokeWidth="2.5"
            />
            <path
              d="M-40 220 C 100 120, 260 220, 440 120"
              stroke="rgba(34, 197, 94, 0.15)"
              strokeWidth="2"
            />
            <radialGradient
              id="greenGlow"
              cx="0%"
              cy="0%"
              r="80%"
              fx="0%"
              fy="0%"
            >
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#greenGlow)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0D261C] border border-[#164E37]/60 flex items-center justify-center shrink-0">
            <CurrencyInr size={22} weight="bold" className="text-[#22C55E]" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-[#94A3B8] font-medium">
              Transaction Amount
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              {transaction.amount}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mt-6">
          <div className="bg-[#181D26] border border-[#262F3E] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#0E1520] border border-[#222E42] flex items-center justify-center shrink-0">
              <ArrowsLeftRight
                size={16}
                weight="bold"
                className="text-[#D4FF32]"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#94A3B8] font-medium whitespace-nowrap">
                Type
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#D4FF32] whitespace-nowrap">
                {transaction.typeDisplay || transaction.type}
              </span>
            </div>
          </div>

          <div className="bg-[#181D26] border border-[#262F3E] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                isPaid
                  ? "bg-[#0D261C] border-[#164E37] text-[#10B981]"
                  : isPending
                  ? "bg-[#2D1F0E] border-[#593D15] text-[#F59E0B]"
                  : "bg-[#2D1111] border-[#591C1C] text-[#F87171]"
              }`}
            >
              {isPaid ? (
                <Check size={16} weight="bold" />
              ) : isPending ? (
                <Clock size={16} weight="bold" />
              ) : (
                <XCircle size={16} weight="bold" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#94A3B8] font-medium whitespace-nowrap">
                Status
              </span>
              <span
                className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${
                  isPaid
                    ? "text-[#10B981]"
                    : isPending
                    ? "text-[#F59E0B]"
                    : "text-[#F87171]"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#1E222D]">
          <div className="w-10 h-10 rounded-xl bg-[#0D261C] border border-[#164E37]/50 flex items-center justify-center shrink-0">
            <LinkIcon size={20} weight="bold" className="text-[#10B981]" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Related To
          </h2>
        </div>

        <div className="flex flex-col text-xs sm:text-sm">
          <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
            <span className="text-[#94A3B8] font-medium whitespace-nowrap">
              {transaction.relatedNameLabel || "Gym Name"}
            </span>
            <span className="text-white font-medium text-right break-words">
              {transaction.relatedName}
            </span>
          </div>

          <div className="flex items-center justify-between py-3.5 gap-4">
            <span className="text-[#94A3B8] font-medium whitespace-nowrap">
              {transaction.relatedPlanLabel || "Plan"}
            </span>
            <span className="text-white font-medium text-right break-words">
              {transaction.relatedPlan}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
