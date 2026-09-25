"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileText, 
  Copy, 
  DownloadSimple, 
  Pen, 
  Trash, 
  ArrowsOut,
  ChartBar,
  Tag,
  CreditCard,
  CalendarBlank,
  NotePencil
} from "@phosphor-icons/react";
import { ExpenseData } from "./AddExpenseModal";
import ExpenseReceiptZoom from "./ExpenseReceiptZoom";
import { ExpenseInfoRow } from "./ExpenseInfoRow";

interface ExpenseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseData: ExpenseData | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExpenseDetailsModal({ isOpen, onClose, expenseData, onEdit, onDelete }: ExpenseDetailsModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const categoryLabel = expenseData?.category || "Rent";
  const amountStr = expenseData?.amount || "25,000";
  const dateStr = expenseData?.date || "1 Jul 2024";
  const paymentMethodStr = expenseData?.paymentMethod || "Bank Transfer";
  const titleStr = expenseData?.name || "Gym Rent - July 2024";

  return (
    <>
    <AnimatePresence>
      {isOpen && expenseData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="flex flex-col relative w-full max-w-[840px] max-h-[90vh] bg-[#0F141C] border border-[#1E293B] shadow-[0px_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-2xl overflow-hidden"
          >
          {/* Header */}
          <div className="flex flex-row justify-between items-start px-5 pt-5 pb-4 w-full shrink-0 border-b border-[#1E293B]/60 bg-[#0F141C]">
            <div className="flex flex-row items-center gap-3">
              <div className="flex justify-center items-center w-10 h-10 bg-[rgba(204,255,0,0.05)] border border-[#CCFF00]/20 rounded-xl shrink-0">
                <FileText size={20} weight="fill" className="text-[#CCFF00]" />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="font-sans font-bold text-lg leading-5 text-white m-0 tracking-[-0.3px]">
                  Expense Details
                </h2>
                <span className="font-sans font-normal text-xs leading-4 text-[#94A3B8] mt-0.5">
                  View complete expense information and receipt.
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="flex justify-center items-center p-2 w-8 h-8 rounded-xl bg-[#1E293B]/40 hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0 border border-[#1E293B]"
            >
              <X size={16} className="text-[#94A3B8]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col w-full flex-1 overflow-y-auto scrollbar-themed bg-[#0F141C] p-4 sm:p-5 pb-6 sm:pb-8 gap-4 sm:gap-5">
            
            {/* Quick Overview Bar (Moved inside scrolling body for mobile space) */}
            <div className="flex flex-row flex-wrap items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-[#090D13] border border-[#1E293B]/60 rounded-xl w-full shrink-0 gap-3 sm:gap-4">
            <div className="flex flex-col gap-0.5 min-w-[100px]">
              <span className="font-sans font-semibold text-[9px] uppercase tracking-wider text-[#64748B]">Expense Title</span>
              <span className="font-sans font-bold text-xs text-white truncate">{titleStr}</span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-[80px]">
              <span className="font-sans font-semibold text-[9px] uppercase tracking-wider text-[#64748B]">Category</span>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded border border-[#522D1B] bg-[#332219] w-fit">
                <span className="font-sans font-medium text-[10px] text-[#EA580C] capitalize">{categoryLabel}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 min-w-[80px]">
              <span className="font-sans font-semibold text-[9px] uppercase tracking-wider text-[#64748B]">Amount</span>
              <span className="font-sans font-bold text-xs text-white">₹{amountStr}</span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-[80px]">
              <span className="font-sans font-semibold text-[9px] uppercase tracking-wider text-[#64748B]">Date</span>
              <span className="font-sans font-medium text-xs text-[#E2E8F0]">{dateStr}</span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-[100px]">
              <span className="font-sans font-semibold text-[9px] uppercase tracking-wider text-[#64748B]">Payment Method</span>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded border border-[#273648] bg-[#1A232F] w-fit">
                <span className="font-sans font-medium text-[10px] text-[#D1D5DB] capitalize">{paymentMethodStr}</span>
              </div>
            </div>
            </div>
            
            {/* Two Column Layout for Desktop/Tablet */}
            <div className="flex flex-col md:flex-row w-full gap-4 sm:gap-5">
              {/* Left Column */}
              <div className="flex flex-col flex-1 w-full sm:min-w-[280px]">
                {/* Expense Information */}
                <div className="flex flex-col w-full h-full bg-[#131922] border border-[#1E293B] rounded-xl overflow-hidden shrink-0">
                  <div className="flex flex-row items-center gap-2 px-4 py-3 border-b border-[#1E293B]">
                  <FileText size={16} className="text-[#94A3B8]" />
                  <span className="font-sans font-bold text-xs text-white">Expense Information</span>
                </div>
                <div className="flex flex-col w-full px-4 py-1.5">
                  <ExpenseInfoRow label="Expense Title" value={titleStr} />
                  <ExpenseInfoRow label="Category" value={categoryLabel} isCategory />
                  <ExpenseInfoRow label="Amount" value={`₹${amountStr}`} isBold />
                  <ExpenseInfoRow label="Date" value={dateStr} />
                  <ExpenseInfoRow label="Payment Method" value={paymentMethodStr} isPill />
                  <ExpenseInfoRow label="Reference ID" value="RENT-2024-07-001" hasCopy />
                  <ExpenseInfoRow label="Added By" value="Amit Gupta" />
                  <ExpenseInfoRow label="Recorded On" value={`${dateStr}, 10:30 AM`} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col w-full md:w-[320px] gap-4 sm:gap-5 shrink-0">
              {/* Receipt */}
              <div className="flex flex-col flex-1 w-full bg-[#131922] border border-[#1E293B] rounded-xl overflow-hidden shrink-0">
                <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-[#1E293B] shrink-0">
                  <div className="flex flex-row items-center gap-2">
                    <FileText size={16} className="text-[#94A3B8]" />
                    <span className="font-sans font-bold text-xs text-white">Receipt</span>
                  </div>
                  <button 
                    onClick={() => setIsZoomed(true)}
                    className="flex justify-center items-center w-6 h-6 rounded bg-[#1E293B]/40 hover:bg-[#1E293B] transition-colors cursor-pointer"
                  >
                    <ArrowsOut size={14} className="text-[#94A3B8]" />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1 gap-3 items-center">
                  {/* Receipt Image Placeholder */}
                  <div className="w-full flex-1 min-h-[160px] bg-white rounded-lg p-3 shadow-sm flex flex-col cursor-zoom-in" onClick={() => setIsZoomed(true)}>
                    <div className="flex justify-between items-start mb-2 border-b pb-1">
                      <div className="font-bold text-black text-xs tracking-tight">GK <span className="font-light text-gray-500 text-[9px]">GYM LIFE</span></div>
                      <div className="text-right">
                        <div className="font-bold text-black text-[8px]">RENT INVOICE</div>
                        <div className="text-gray-400 text-[6px]">#RENT-2024-07-001</div>
                      </div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[6px] text-gray-500 leading-tight">
                        BILL TO<br/>
                        <span className="font-bold text-black text-[7px]">GK Gym Life</span><br/>
                        123 Fitness Street<br/>Indore, Madhya Pradesh
                      </div>
                      <div className="text-[6px] text-gray-500 text-right leading-tight">
                        Invoice Date: <span className="text-black font-bold">1 Jul 2024</span><br/>
                        Period: <span className="text-black font-bold">July 2024</span><br/>
                        Due Date: <span className="text-black font-bold">1 Jul 2024</span>
                      </div>
                    </div>
                    <div className="flex justify-between border-b pb-1 mb-1">
                      <div className="text-[6px] font-bold text-gray-400">DESCRIPTION</div>
                      <div className="text-[6px] font-bold text-gray-400">AMOUNT</div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[7px] font-medium text-black">Monthly Rent - Gym Facility</div>
                      <div className="text-[7px] text-black">₹25,000</div>
                    </div>
                    <div className="mt-auto flex justify-between bg-gray-50 p-1.5 rounded">
                      <div className="text-[8px] font-bold text-black">TOTAL AMOUNT</div>
                      <div className="text-[8px] font-bold text-black">₹25,000</div>
                    </div>
                  </div>
                  <button className="flex justify-center items-center gap-2 w-full h-8 mt-auto shrink-0 rounded-lg border border-[#1E293B] hover:bg-[#1E293B]/50 transition-colors cursor-pointer">
                    <DownloadSimple size={14} className="text-white" />
                    <span className="font-sans font-semibold text-[11px] text-white">Download Receipt</span>
                  </button>
                </div>
              </div>

              {/* Expense Summary Small Cards */}
              <div className="flex flex-col w-full bg-[#131922] border border-[#1E293B] rounded-xl overflow-hidden p-4 shrink-0">
                <div className="flex flex-row items-center gap-2 mb-3">
                  <ChartBar size={16} className="text-[#94A3B8]" />
                  <span className="font-sans font-bold text-xs text-white">Expense Summary</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="flex flex-col items-center text-center bg-[#1A1C19] border border-[#262B21] rounded-md p-2 gap-1.5">
                    <div className="w-6 h-6 rounded bg-[#332219] flex justify-center items-center">
                      <Tag size={12} className="text-[#EA580C]" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-semibold text-[#64748B] uppercase">Category</span>
                      <span className="text-[10px] font-bold text-[#EA580C]">{categoryLabel}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center bg-[#141C24] border border-[#1B2735] rounded-md p-2 gap-1.5">
                    <div className="w-6 h-6 rounded bg-[#1A232F] flex justify-center items-center">
                      <CreditCard size={12} className="text-[#38BDF8]" />
                    </div>
                    <div className="flex flex-col items-center w-full">
                      <span className="text-[8px] font-semibold text-[#64748B] uppercase">Payment</span>
                      <span className="text-[10px] font-bold text-[#38BDF8] truncate max-w-full">{paymentMethodStr}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center bg-[#1D1726] border border-[#2A2136] rounded-md p-2 gap-1.5">
                    <div className="w-6 h-6 rounded bg-[#281B36] flex justify-center items-center">
                      <CalendarBlank size={12} className="text-[#C084FC]" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-semibold text-[#64748B] uppercase">Month</span>
                      <span className="text-[10px] font-bold text-[#C084FC]">July 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Full Width Notes Section */}
            <div className="flex flex-col w-full bg-[#131922] border border-[#1E293B] rounded-xl overflow-hidden shrink-0">
              <div className="flex flex-row items-center gap-2 px-4 py-3 border-b border-[#1E293B]">
                <NotePencil size={16} className="text-[#94A3B8]" />
                <span className="font-sans font-bold text-xs text-white">Notes</span>
              </div>
              <div className="p-4">
                <p className="font-sans font-normal text-[11px] leading-4 text-[#94A3B8]">
                  {expenseData?.notes && expenseData.notes.trim() !== "" 
                    ? expenseData.notes 
                    : "Monthly rent payment for gym facility. Payment made via bank transfer as per rental agreement for July 2024."}
                </p>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-2 px-5 py-4 sm:py-3 w-full shrink-0 border-t border-[#1E293B]/60 bg-[#0F141C]">
            <button 
              onClick={onEdit}
              className="flex justify-center items-center w-full sm:w-auto px-4 py-2 gap-1.5 h-10 sm:h-8 bg-[#1E293B]/40 border border-[#1E293B] rounded-lg hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              <Pen size={14} className="text-white" />
              <span className="font-sans font-semibold text-[13px] sm:text-[11px] text-white">Edit Expense</span>
            </button>
            <button 
              onClick={onDelete}
              className="flex justify-center items-center w-full sm:w-auto px-4 py-2 gap-1.5 h-10 sm:h-8 bg-[rgba(225,29,72,0.1)] border border-[rgba(225,29,72,0.2)] rounded-lg hover:bg-[rgba(225,29,72,0.2)] transition-colors cursor-pointer"
            >
              <Trash size={14} className="text-[#F43F5E]" />
              <span className="font-sans font-semibold text-[13px] sm:text-[11px] text-[#F43F5E]">Delete Expense</span>
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
    {/* Full Screen Receipt Zoom */}
    <ExpenseReceiptZoom isOpen={isZoomed} onClose={() => setIsZoomed(false)} />
    </>
  );
}
