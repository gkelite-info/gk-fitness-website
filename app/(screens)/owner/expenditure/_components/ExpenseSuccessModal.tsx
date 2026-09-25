"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Check, 
  Receipt, 
  Info
} from "@phosphor-icons/react";
import { ExpenseData } from "./AddExpenseModal";

interface ExpenseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseData: ExpenseData | null;
  onAddAnother: () => void;
}

export default function ExpenseSuccessModal({ isOpen, onClose, expenseData, onAddAnother }: ExpenseSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="flex flex-col relative w-full max-w-[420px] max-h-[92vh] sm:max-h-[85vh] bg-[#0F141C] shadow-[0px_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-[22px] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[rgba(255,255,255,0.002)] before:pointer-events-none"
        >
          {/* Header - Fixed top section */}
          <div className="flex flex-col items-center w-full shrink-0 relative pt-6 sm:pt-8 pb-2 sm:pb-4 z-10 bg-[#0F141C]">
            {/* Close button */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
              <button 
                onClick={onClose}
                className="flex justify-center items-center p-2 w-8 h-8 rounded-full bg-black/20 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X size={16} className="text-[#94A3B8]" />
              </button>
            </div>
            
            {/* Success Icon */}
            <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[2px] border-[#CCFF00] shadow-[0_0_30px_rgba(204,255,0,0.2)] bg-[rgba(204,255,0,0.05)]">
              <Check weight="bold" className="text-[#CCFF00] w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center mt-2 sm:mt-3">
              <h2 className="font-sans font-bold text-lg sm:text-xl leading-6 sm:leading-7 text-white m-0 px-4">
                Expense Added Successfully!
              </h2>
              <p className="font-sans font-normal text-[11px] sm:text-xs leading-4 text-[#94A3B8] m-0 max-w-[280px] px-4 hidden sm:block">
                The expense has been recorded and added to your expenditure list.
              </p>
            </div>
          </div>

          {/* Body - Scrollable section */}
          <div className="flex flex-col w-full px-4 sm:px-6 py-1 sm:py-2 overflow-y-auto scrollbar-themed flex-1 z-0">
            {/* Summary Box */}
            <div className="flex flex-col w-full bg-[#090D13] border border-[#1E293B] rounded-xl overflow-hidden shrink-0">
              <div className="flex flex-row items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-3 border-b border-[#1E293B] bg-[rgba(255,255,255,0.02)] shrink-0">
                <Receipt size={16} weight="fill" className="text-[#CCFF00]" />
                <span className="font-sans font-bold text-xs leading-4 text-white">Expense Summary</span>
              </div>
              <div className="flex flex-col w-full px-3 sm:px-4 py-1 sm:py-1.5 shrink-0">
                <div className="flex flex-row justify-between items-center py-2 sm:py-2.5 border-b border-[#1E293B]/50 last:border-none w-full">
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#64748B] shrink-0">Expense Title</span>
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#E2E8F0] text-right truncate pl-4">
                    {expenseData?.name || "Gym Rent - July 2024"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center py-2 sm:py-2.5 border-b border-[#1E293B]/50 last:border-none w-full">
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#64748B] shrink-0">Category</span>
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#E2E8F0] text-right capitalize">
                    {expenseData?.category || "Rent"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center py-2 sm:py-2.5 border-b border-[#1E293B]/50 last:border-none w-full">
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#64748B] shrink-0">Amount</span>
                  <span className="font-sans font-bold text-[11px] leading-4 text-[#CCFF00] text-right">
                    ₹{expenseData?.amount || "25,000"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center py-2 sm:py-2.5 border-b border-[#1E293B]/50 last:border-none w-full">
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#64748B] shrink-0">Date</span>
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#E2E8F0] text-right">
                    {expenseData?.date || "1 Jul 2024"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center py-2 sm:py-2.5 border-b border-[#1E293B]/50 last:border-none w-full">
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#64748B] shrink-0">Payment Method</span>
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#E2E8F0] text-right capitalize">
                    {expenseData?.paymentMethod || "Bank Transfer"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center py-2 sm:py-2.5 border-b border-[#1E293B]/50 last:border-none w-full">
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#64748B] shrink-0">Added By</span>
                  <span className="font-sans font-medium text-[11px] leading-4 text-[#E2E8F0] text-right">
                    Amit Gupta
                  </span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="flex flex-row items-start gap-3 w-full p-3 mt-3 sm:mt-4 bg-[rgba(204,255,0,0.03)] border border-[rgba(204,255,0,0.1)] rounded-lg shrink-0">
              <Info size={16} weight="fill" className="text-[#CCFF00] shrink-0 mt-0.5" />
              <span className="font-sans font-normal text-[11px] leading-4 text-[#CBD5E1]">
                This expense is now visible in your expenditure list.
              </span>
            </div>
          </div>

          {/* Footer - Fixed bottom section */}
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3 px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6 shrink-0 bg-[#0F141C] border-t border-[rgba(30,41,59,0.4)] z-10">
            <button 
              onClick={onClose}
              className="w-full sm:flex-1 flex justify-center items-center h-9 sm:h-10 px-5 rounded-xl border border-[#1E293B] hover:bg-white/5 transition-colors cursor-pointer shrink-0"
            >
              <span className="font-sans font-semibold text-[11px] sm:text-xs text-white">View Expense</span>
            </button>
            <button 
              onClick={onAddAnother}
              className="w-full sm:flex-1 flex justify-center items-center h-9 sm:h-10 px-5 rounded-xl bg-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.2)] hover:bg-[#bbf000] transition-colors cursor-pointer shrink-0"
            >
              <span className="font-sans font-bold text-[11px] sm:text-xs text-black">Add Another Expense</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
