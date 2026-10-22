"use client";

import { useEffect, useRef } from "react";
import { X, CheckCircle, Clock } from "@phosphor-icons/react";
import { RecentTransactionItem } from "./recentTransactionsTypes";

interface RecentTransactionDetailModalProps {
  transaction: RecentTransactionItem | null;
  onClose: () => void;
}

export default function RecentTransactionDetailModal({
  transaction,
  onClose,
}: RecentTransactionDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (transaction) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [transaction, onClose]);

  if (!transaction) return null;

  const isPayment = transaction.type === "Payment Received";
  const isPaid = transaction.status === "Paid";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#12141A] border border-[#232631] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#1E222D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#181F2E] border border-[#263145] flex items-center justify-center text-[#D4FF32]">
              {isPaid ? (
                <CheckCircle size={22} weight="fill" className="text-[#10B981]" />
              ) : (
                <Clock size={22} weight="fill" className="text-[#FBBF24]" />
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-white tracking-tight">
                Transaction Details
              </h3>
              <span className="text-xs text-[#94A3B8]">{transaction.id}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#181D26] hover:bg-[#202735] border border-[#262F3E] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-4 rounded-xl bg-[#0E1015] border border-[#1E222D]">
            <span className="text-xs text-[#94A3B8]">Transaction Amount</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {transaction.amount}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isPaid
                    ? "bg-[#0D261C] text-[#10B981] border-[#164E37]/50"
                    : "bg-[#2B1F0E] text-[#FBBF24] border-[#543A14]/50"
                }`}
              >
                {transaction.status}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isPayment
                    ? "bg-[#0D261C] text-[#10B981] border-[#164E37]/50"
                    : "bg-[#2D151B] text-[#F87171] border-[#522222]/50"
                }`}
              >
                {transaction.type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#181D26] border border-[#232938] flex flex-col gap-1">
              <span className="text-[#94A3B8] font-medium">Date & Time</span>
              <span className="text-white font-semibold">{transaction.dateTime}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181D26] border border-[#232938] flex flex-col gap-1">
              <span className="text-[#94A3B8] font-medium">Source</span>
              <span className="text-white font-semibold">{transaction.source}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181D26] border border-[#232938] flex flex-col gap-1">
              <span className="text-[#94A3B8] font-medium">Customer / Recipient</span>
              <span className="text-white font-semibold">{transaction.customerName}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181D26] border border-[#232938] flex flex-col gap-1">
              <span className="text-[#94A3B8] font-medium">Payment Method</span>
              <span className="text-white font-semibold">{transaction.paymentMethod}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181D26] border border-[#232938] flex flex-col gap-1 sm:col-span-2">
              <span className="text-[#94A3B8] font-medium">Reference ID</span>
              <span className="text-white font-mono font-medium">{transaction.referenceId}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#1E222D] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#181D26] hover:bg-[#222938] border border-[#262F3E] text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
