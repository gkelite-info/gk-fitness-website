"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import AddExpenseModal, { ExpenseData } from "./AddExpenseModal";
import ExpenseSuccessModal from "./ExpenseSuccessModal";

export default function ExpenditureHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ExpenseData | null>(null);

  return (
    <>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 shrink-0">
      <div className="flex flex-col items-start gap-0.5">
        <h2 className="font-sans font-bold text-2xl leading-8 tracking-[-0.6px] text-white">
          Expenditure
        </h2>
        <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">
          Track and manage all gym expenses.
        </span>
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex flex-row items-center justify-center py-2.5 px-4 gap-1.5 h-9 bg-[#CCFF00] hover:bg-[#bbf000] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg transition-colors cursor-pointer shrink-0"
      >
        <Plus size={16} weight="bold" className="text-black" />
        <span className="font-sans font-semibold text-xs leading-4 text-center text-black">
          Add Expense
        </span>
      </button>
    </div>
    <AddExpenseModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onSuccess={(data) => {
        setIsModalOpen(false);
        setSuccessData(data);
      }}
    />
    <ExpenseSuccessModal 
      isOpen={!!successData}
      onClose={() => setSuccessData(null)}
      expenseData={successData}
      onAddAnother={() => {
        setSuccessData(null);
        setIsModalOpen(true);
      }}
    />
    </>
  );
}
