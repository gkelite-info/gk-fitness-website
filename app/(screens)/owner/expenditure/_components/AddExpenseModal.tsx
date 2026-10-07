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
import { useUser } from "@/app/context/UserContext";
import { useSaveGymExpense } from "@/lib/hooks/gymExpenses/useGymExpenses";
import { uploadGymExpenseReceipt, deleteGymExpenseReceipt } from "@/lib/helpers/gymExpenses";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { compressImage } from "@/app/(screens)/components/imageCompressor";

export interface ExpenseData {
  id?: number | string;
  name?: string;
  category?: string;
  amount?: string;
  date?: string;
  paymentMethod?: string;
  notes?: string;
  receiptUrl?: string | null;
  addedBy?: string;
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
  const [existingReceiptUrl, setExistingReceiptUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteReceiptModalOpen, setIsDeleteReceiptModalOpen] = useState(false);
  const [isDeletingReceipt, setIsDeletingReceipt] = useState(false);

  const { user, roleData, profile } = useUser();
  const gymId = roleData?.[0]?.gymId;
  const userId = user?.id;

  const saveExpenseMutation = useSaveGymExpense();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.name || "");
        const catMap: Record<string, string> = {
          "Rent": "rent", "Staff Salaries": "salaries", "Maintenance": "maintenance",
          "Utilities": "utilities", "Marketing": "marketing", "Equipment": "equipment",
          "Supplies": "supplies", "Cleaning Supplies": "supplies", "Other": "other"
        };
        setCategory(initialData.category ? (catMap[initialData.category] || initialData.category) : "rent");
        setAmount(initialData.amount ? initialData.amount.replace(/[^0-9.]/g, '') : "");
        setDate(initialData.date || "");

        const payMap: Record<string, string> = {
          "UPI": "upi", "Bank Transfer": "bank", "Cash": "cash", "Credit Card": "credit", "Debit Card": "debit"
        };
        setPaymentMethod(initialData.paymentMethod ? (payMap[initialData.paymentMethod] || "upi") : "upi");
        setNotes(initialData.notes || "");
        setExistingReceiptUrl(initialData.receiptUrl || null);
      } else {
        setTitle("");
        setCategory("rent");
        setAmount("");
        setDate("");
        setPaymentMethod("upi");
        setNotes("");
        setFiles([]);
        setExistingReceiptUrl(null);
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

  const handleDeleteExistingReceipt = async () => {
    if (!existingReceiptUrl) return;
    setIsDeletingReceipt(true);
    try {
      await deleteGymExpenseReceipt(existingReceiptUrl);

      setExistingReceiptUrl(null);
      setIsDeleteReceiptModalOpen(false);
      toast.success("Receipt image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete receipt image");
    } finally {
      setIsDeletingReceipt(false);
    }
  };

  const displayFilename = existingReceiptUrl ? existingReceiptUrl.split('/').pop()?.replace(/^\d+_+/, '') || existingReceiptUrl : '';

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="flex flex-col w-full max-w-[640px] max-h-[85vh] bg-[#0F141C] border border-[rgba(30,41,59,0.9)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden"
            >
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

              <div className="flex flex-col items-start p-6 gap-5 w-full overflow-y-auto scrollbar-themed flex-1">
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

                <CategorySelector category={category} setCategory={setCategory} />

                <div className="flex flex-col sm:flex-row items-start w-full gap-4 shrink-0">
                  <div className="flex flex-col items-start gap-1.5 w-full flex-1">
                    <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
                      Amount <span className="text-[#F87171]">*</span>
                    </label>
                    <div className="flex flex-row items-center px-4 py-3 w-full bg-[#090D13] border border-[rgba(30,41,59,0.9)] rounded-xl gap-2">
                      <CurrencyInr size={16} className="text-[#64748B]" />
                      <input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val.includes('-')) {
                            setAmount(val);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                            e.preventDefault();
                          }
                        }}
                        className="flex-1 bg-transparent border-none outline-none font-sans text-sm text-white placeholder-[#64748B] min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full flex-1">
                    <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
                      Date <span className="text-[#F87171]">*</span>
                    </label>
                    <div className="flex flex-row items-center justify-between px-4 py-3 w-full bg-[#090D13] border border-[rgba(30,41,59,0.9)] rounded-xl hover:border-[#334155] transition-colors focus-within:border-[#334155]">
                      <span className={`font-sans font-normal text-sm ${date ? 'text-white' : 'text-[#64748B]'}`}>
                        {date || "Select date"}
                      </span>
                      <div className="relative flex items-center justify-center">
                        <input
                          type="date"
                          value={date}
                          max={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setDate(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0"
                        />
                        <CalendarBlank size={16} className="text-[#64748B] cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

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

                  {files.length === 0 && existingReceiptUrl && (
                    <div className="flex flex-col w-full gap-2 mt-1">
                      <div className="flex flex-row items-center justify-between px-3 py-2.5 bg-[#090D13] border border-[#1E293B] rounded-lg">
                        <div className="flex flex-row items-center gap-2 truncate pr-2">
                          <FileText size={16} weight="fill" className="text-[#CCFF00] shrink-0" />
                          <span className="font-sans font-medium text-[11px] text-[#D1D5DB] truncate">
                            {displayFilename}
                          </span>
                        </div>
                        <button
                          onClick={() => setIsDeleteReceiptModalOpen(true)}
                          className="flex justify-center items-center w-6 h-6 hover:bg-white/10 rounded cursor-pointer transition-colors shrink-0"
                        >
                          <X size={14} className="text-[#F87171]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-end items-center gap-3 px-6 pt-3 pb-6 w-full shrink-0 border-t border-[rgba(30,41,59,0.6)] bg-[#0F141C]">
                <button
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex justify-center items-center px-5 py-2.5 h-[38px] border border-[#1E293B] rounded-xl hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <span className="font-sans font-semibold text-xs leading-4 text-[#CBD5E1]">
                    Cancel
                  </span>
                </button>
                <button
                  onClick={async () => {
                    if (!title || !amount || !date || !gymId || !userId) {
                      toast.error("Please fill all required fields (Title, Amount, Date).");
                      return;
                    }

                    setIsSaving(true);
                    try {
                      let receiptUrl = existingReceiptUrl;

                      if (files.length > 0) {
                        const compressedFile = await compressImage(files[0]);

                        const uploadedUrl = await uploadGymExpenseReceipt(compressedFile);
                        if (uploadedUrl) receiptUrl = uploadedUrl;
                      }

                      const expensePayload = {
                        gymExpenseId: initialData?.id?.toString(),
                        expenseTitle: title,
                        category: category as any,
                        amount: parseFloat(amount),
                        date: date,
                        paymentMethod: paymentMethod as any,
                        notes: notes || null,
                        receiptUrl: receiptUrl,
                        gymId: gymId,
                        createdBy: userId!
                      };


                      saveExpenseMutation.mutate(expensePayload, {
                        onSuccess: (data) => {
                          toast.success(`Expense ${initialData ? 'updated' : 'saved'} successfully!`);
                          if (onSuccess && data) {
                            onSuccess({
                              id: data.gymExpenseId,
                              name: data.expenseTitle,
                              category: data.category,
                              amount: data.amount.toString(),
                              date: data.date,
                              paymentMethod: data.paymentMethod,
                              notes: data.notes || "",
                              receiptUrl: data.receiptUrl || null,
                              addedBy: user?.user_metadata?.name || profile?.name || "Unknown"
                            });
                          }
                          setIsSaving(false);
                          onClose();
                        },
                        onError: (err) => {
                          console.error('[AddExpenseModal] saveExpenseMutation Error:', err);
                          toast.error("Failed to save expense. Please try again.");
                          setIsSaving(false);
                        }
                      });
                    } catch (error) {
                      console.error('[AddExpenseModal] Catch Error:', error);
                      toast.error("Error saving expense or uploading receipt.");
                      setIsSaving(false);
                    }
                  }}
                  disabled={isSaving || saveExpenseMutation.isPending}
                  className="flex justify-center items-center px-5 py-2.5 gap-2 h-[38px] bg-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.25)] rounded-xl hover:bg-[#bbf000] transition-colors cursor-pointer disabled:opacity-50"
                >
                  <FloppyDisk size={16} weight="regular" className="text-black" />
                  <span className="font-sans font-bold text-xs leading-4 text-black">
                    {isSaving || saveExpenseMutation.isPending
                      ? "Saving..."
                      : (initialData ? "Update Expense" : "Save Expense")}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ConfirmationModal
        isOpen={isDeleteReceiptModalOpen}
        onClose={() => !isDeletingReceipt && setIsDeleteReceiptModalOpen(false)}
        onConfirm={handleDeleteExistingReceipt}
        title="Delete Receipt Image"
        message="Are you sure you want to delete this attached receipt image? This action cannot be undone."
        confirmText="Delete"
        confirmingText="Deleting..."
        isDestructive={true}
      />
    </>
  );
}
