"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileText, 
  House, 
  Users, 
  Gear, 
  Lightning, 
  Megaphone, 
  Barbell, 
  Package, 
  DotsThree,
  CalendarBlank,
  CloudArrowUp,
  FloppyDisk,
  CurrencyInr
} from "@phosphor-icons/react";
import CategorySelector from "./CategorySelector";
import PaymentMethodSelector from "./PaymentMethodSelector";

export interface ExpenseData {
  id?: number | string;
  name?: string;
  category?: string;
  amount?: string;
  date?: string;
  paymentMethod?: string;
  notes?: string;
}

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ExpenseData | null;
  onSuccess?: (data: ExpenseData) => void;
}

export default function AddExpenseModal({ isOpen, onClose, initialData, onSuccess }: AddExpenseModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("rent");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.name || "");
        // Map category label to value
        const catMap: Record<string, string> = {
          "Rent": "rent", "Staff Salaries": "salaries", "Maintenance": "maintenance",
          "Utilities": "utilities", "Marketing": "marketing", "Equipment": "equipment",
          "Supplies": "supplies", "Cleaning Supplies": "supplies", "Other": "other"
        };
        setCategory(initialData.category ? (catMap[initialData.category] || "other") : "rent");
        setAmount(initialData.amount ? initialData.amount.replace(/[^0-9.]/g, '') : "");
        setDate(initialData.date || "");
        
        const payMap: Record<string, string> = {
          "UPI": "upi", "Bank Transfer": "bank", "Cash": "cash", "Credit Card": "credit", "Debit Card": "debit"
        };
        setPaymentMethod(initialData.paymentMethod ? (payMap[initialData.paymentMethod] || "upi") : "upi");
        setNotes(initialData.notes || "");
      } else {
        setTitle("");
        setCategory("rent");
        setAmount("");
        setDate("");
        setPaymentMethod("upi");
        setNotes("");
        setFiles([]);
      }
    }
  }, [isOpen, initialData]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(droppedFiles)]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="flex flex-col w-full max-w-[640px] max-h-[85vh] bg-[#0F141C] border border-[rgba(30,41,59,0.9)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-row justify-between items-start px-6 pt-6 pb-5 w-full shrink-0 border-b border-[rgba(30,41,59,0.6)]">
            <div className="flex flex-row items-center gap-3.5">
              <div className="flex justify-center items-center w-11 h-11 bg-[rgba(26,46,5,0.4)] border border-[rgba(204,255,0,0.4)] shadow-[0_0_15px_rgba(204,255,0,0.15)] rounded-xl shrink-0">
                <FileText size={20} weight="fill" className="text-[#CCFF00]" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <h2 className="font-sans font-bold text-xl leading-7 tracking-[-0.5px] text-white m-0">
                  {initialData ? "Edit Expense" : "Add Expense"}
                </h2>
                <span className="font-sans font-normal text-xs leading-4 text-[#94A3B8]">
                  {initialData ? "Update the details of this expense" : "Record a new expense"}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="flex justify-center items-center p-2 w-9 h-9 rounded-lg hover:bg-white/5 transition-colors cursor-pointer shrink-0"
            >
              <X size={20} className="text-[#94A3B8]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col items-start p-6 gap-5 w-full overflow-y-auto scrollbar-themed flex-1">
            
            {/* Field 1: Expense Title */}
            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
                Expense Title <span className="text-[#F87171]">*</span>
              </label>
              <div className="flex flex-row items-center px-4 py-3 w-full bg-[#090D13] border border-[rgba(30,41,59,0.9)] rounded-xl">
                <input 
                  type="text"
                  placeholder="e.g. Gym Rent - July 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-sans text-sm text-white placeholder-[#64748B] min-w-0"
                />
              </div>
            </div>

            {/* Field 2: Category Selector */}
            <CategorySelector category={category} setCategory={setCategory} />

            {/* Field 3: Amount & Date */}
            <div className="flex flex-col sm:flex-row items-start w-full gap-4 shrink-0">
              {/* Amount */}
              <div className="flex flex-col items-start gap-1.5 w-full flex-1">
                <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
                  Amount <span className="text-[#F87171]">*</span>
                </label>
                <div className="flex flex-row items-center px-4 py-3 w-full bg-[#090D13] border border-[rgba(30,41,59,0.9)] rounded-xl gap-2">
                  <CurrencyInr size={16} className="text-[#64748B]" />
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none font-sans text-sm text-white placeholder-[#64748B] min-w-0"
                  />
                </div>
              </div>
              {/* Date */}
              <div className="flex flex-col items-start gap-1.5 w-full flex-1">
                <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
                  Date <span className="text-[#F87171]">*</span>
                </label>
                <div className="flex flex-row items-center justify-between px-4 py-3 w-full bg-[#090D13] border border-[rgba(30,41,59,0.9)] rounded-xl cursor-pointer hover:border-[#334155] transition-colors">
                  <span className={`font-sans font-normal text-sm ${date ? 'text-white' : 'text-[#64748B]'}`}>
                    {date || "Select date"}
                  </span>
                  <CalendarBlank size={16} className="text-[#64748B]" />
                </div>
              </div>
            </div>

            {/* Field 4: Payment Method */}
            <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

            {/* Field 5: Notes */}
            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
                Notes
              </label>
              <div className="flex flex-col relative w-full h-[120px]">
                <textarea 
                  placeholder="Add notes about this expense (optional)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={500}
                  className="w-full h-full bg-[#090D13] border border-[rgba(30,41,59,0.9)] rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-[#64748B] outline-none resize-none scrollbar-themed"
                />
                <span className="absolute bottom-2.5 right-3 font-sans font-medium text-[11px] leading-4 text-[#64748B]">
                  {notes.length}/500
                </span>
              </div>
            </div>

            {/* Field 6: Receipt Upload */}
            <div className="flex flex-col items-start gap-1.5 w-full mt-2">
              <div className="flex flex-row items-center gap-1">
                <span className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">Receipt Upload</span>
                <span className="font-sans font-normal text-[11px] leading-4 text-[#64748B]">(optional)</span>
              </div>
              <div 
                className={`flex flex-col justify-center items-center w-full py-5 bg-[rgba(9,13,19,0.6)] border-2 border-dashed ${isDragging ? 'border-[#CCFF00] bg-[rgba(204,255,0,0.05)]' : 'border-[#1E293B] hover:border-[#334155]'} rounded-xl transition-colors cursor-pointer group relative`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  multiple 
                  accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className={`flex justify-center items-center w-10 h-10 border rounded-full mb-2 transition-colors ${isDragging ? 'bg-[rgba(204,255,0,0.2)] border-[#CCFF00]' : 'bg-[rgba(30,41,59,0.7)] border-[#94A3B8] group-hover:bg-[#1E293B]'}`}>
                  <CloudArrowUp size={20} className={isDragging ? 'text-[#CCFF00]' : 'text-[#94A3B8]'} />
                </div>
                <span className="font-sans font-medium text-xs leading-4 text-white underline mb-1">
                  Click to upload <span className="no-underline text-white font-medium">or drag and drop</span>
                </span>
                <span className="font-sans font-normal text-[11px] leading-4 text-[#64748B]">
                  JPG, PNG, PDF, Excel (Max 5 MB)
                </span>
              </div>

              {files.length > 0 && (
                <div className="flex flex-col w-full gap-2 mt-1">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex flex-row items-center justify-between px-3 py-2.5 bg-[#090D13] border border-[#1E293B] rounded-lg">
                      <div className="flex flex-row items-center gap-2 truncate pr-2">
                        <FileText size={16} weight="fill" className="text-[#CCFF00] shrink-0" />
                        <span className="font-sans font-medium text-[11px] text-[#D1D5DB] truncate">
                          {file.name}
                        </span>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="flex justify-center items-center w-6 h-6 hover:bg-white/10 rounded cursor-pointer transition-colors shrink-0"
                      >
                        <X size={14} className="text-[#F87171]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="flex flex-row justify-end items-center gap-3 px-6 pt-3 pb-6 w-full shrink-0 border-t border-[rgba(30,41,59,0.6)] bg-[#0F141C]">
            <button 
              onClick={onClose}
              className="flex justify-center items-center px-5 py-2.5 h-[38px] border border-[#1E293B] rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="font-sans font-semibold text-xs leading-4 text-[#CBD5E1]">
                Cancel
              </span>
            </button>
            <button 
              onClick={() => {
                if (onSuccess) {
                  onSuccess({
                    id: initialData?.id || Date.now(),
                    name: title,
                    category: category,
                    amount: amount,
                    date: date,
                    paymentMethod: paymentMethod,
                    notes: notes
                  });
                }
              }}
              className="flex justify-center items-center px-5 py-2.5 gap-2 h-[38px] bg-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.25)] rounded-xl hover:bg-[#bbf000] transition-colors cursor-pointer"
            >
              <FloppyDisk size={16} weight="regular" className="text-black" />
              <span className="font-sans font-bold text-xs leading-4 text-black">
                {initialData ? "Update Expense" : "Save Expense"}
              </span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
