"use client";

import { useEffect } from "react";
import { X, Receipt, CheckCircle, Clock } from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { GlobalSessionPayment } from "./globalSessionsRevenueTypes";

interface GlobalSessionsRevenueDetailModalProps {
  payment: GlobalSessionPayment | null;
  onClose: () => void;
}

export default function GlobalSessionsRevenueDetailModal({
  payment,
  onClose,
}: GlobalSessionsRevenueDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (payment) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [payment, onClose]);

  if (!payment) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] bg-[#12141A] border border-[#232631] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#1E222D]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1C202C] border border-[#282F40] flex items-center justify-center text-[#D4FF32]">
              <Receipt size={18} weight="bold" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Session Payment Details
              </h2>
              <p className="text-xs text-[#94A3B8]">
                {payment.sessionId}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1A1D27] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5 overflow-y-auto">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#181A22] border border-[#232631]">
            <div className="flex items-center gap-3">
              <Avatar
                src={payment.customerAvatar}
                alt={payment.customerName}
                className="w-11 h-11 rounded-full shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  {payment.customerName}
                </span>
                <span className="text-xs text-[#94A3B8]">
                  Trainer: {payment.trainerName}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-white">
                {payment.amount}
              </span>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                {payment.status === "Paid" ? (
                  <>
                    <CheckCircle size={14} weight="fill" className="text-[#10B981]" />
                    <span className="text-xs font-semibold text-[#10B981]">Paid</span>
                  </>
                ) : (
                  <>
                    <Clock size={14} weight="fill" className="text-[#FB923C]" />
                    <span className="text-xs font-semibold text-[#FB923C]">Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#181A22] border border-[#232631] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#64748B]">Session Type</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{payment.sessionType || "1-on-1 Coaching"}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181A22] border border-[#232631] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#64748B]">Duration</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{payment.duration || "60 mins"}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181A22] border border-[#232631] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#64748B]">Payment Date</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{payment.date}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181A22] border border-[#232631] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#64748B]">Payment Method</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{payment.paymentMethod}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#181A22] border border-[#232631] flex flex-col gap-1">
            <span className="text-[11px] font-medium text-[#64748B]">Session ID</span>
            <span className="text-xs sm:text-sm font-semibold text-white font-mono">{payment.sessionId}</span>
          </div>
        </div>

        <div className="p-4 border-t border-[#1E222D] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#181A22] hover:bg-[#202430] border border-[#242836] text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
