import React from "react";
import { X } from "@phosphor-icons/react";

interface ExpenseReceiptZoomProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseReceiptZoom({ isOpen, onClose }: ExpenseReceiptZoomProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-8 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-white p-5 sm:p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-themed flex flex-col" onClick={e => e.stopPropagation()}>
        
        {/* Close Button Header (Safe Flow) */}
        <div className="flex justify-end w-full mb-2 sm:mb-4">
          <button 
            onClick={onClose}
            className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-gray-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Invoice Header */}
        <div className="flex flex-row justify-between items-start mb-6 sm:mb-12 border-b border-gray-200 pb-4 sm:pb-6">
          <div className="font-bold text-black text-lg sm:text-2xl tracking-tight leading-none">
            GK <span className="font-light text-gray-500 text-base sm:text-xl">GYM LIFE</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-black text-sm sm:text-lg leading-none">RENT INVOICE</div>
            <div className="text-gray-400 text-[10px] sm:text-sm mt-1 sm:mt-1.5">#RENT-2024-07-001</div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            BILL TO<br/>
            <span className="font-bold text-black text-sm sm:text-base">GK Gym Life</span><br/>
            123 Fitness Street<br/>Indore, Madhya Pradesh<br/>India - 452001
          </div>
          <div className="text-xs sm:text-sm text-gray-500 text-left sm:text-right leading-relaxed">
            Invoice Date: <span className="text-black font-bold">1 Jul 2024</span><br/>
            Period: <span className="text-black font-bold">July 2024</span><br/>
            Due Date: <span className="text-black font-bold">1 Jul 2024</span>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="flex justify-between border-b border-gray-200 pb-2 mb-3 sm:mb-4">
          <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Description</div>
          <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</div>
        </div>
        <div className="flex justify-between items-start gap-4 mb-8 sm:mb-12">
          <div className="text-xs sm:text-base font-medium text-black leading-tight">Monthly Rent - Gym Facility (July 2024)</div>
          <div className="text-xs sm:text-base text-black font-semibold shrink-0">₹25,000</div>
        </div>

        {/* Total & Notes */}
        <div className="mt-auto flex flex-col gap-4 sm:gap-6">
          <div className="flex justify-between items-center bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-100">
            <div className="text-sm sm:text-lg font-bold text-black">TOTAL AMOUNT</div>
            <div className="text-sm sm:text-lg font-bold text-black">₹25,000</div>
          </div>
          <div className="text-center text-[9px] sm:text-[11px] text-gray-400 italic px-2">
            Notes: Monthly rent payment for gym facility. Payment made via bank transfer as per rental agreement for July 2024.
          </div>
        </div>

      </div>
    </div>
  );
}
