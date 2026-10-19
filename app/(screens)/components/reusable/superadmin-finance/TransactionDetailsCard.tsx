import { FileText, CheckCircle } from "@phosphor-icons/react";
import { FinanceTransactionRecord } from "./types";

interface TransactionDetailsCardProps {
  transaction: FinanceTransactionRecord;
}

export default function TransactionDetailsCard({
  transaction,
}: TransactionDetailsCardProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 w-full">
      <div className="flex items-center gap-3 pb-3 border-b border-[#1E222D]">
        <div className="w-10 h-10 rounded-xl bg-[#0D261C] border border-[#164E37]/50 flex items-center justify-center shrink-0">
          <FileText size={20} weight="fill" className="text-[#10B981]" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Transaction Information
        </h2>
      </div>

      <div className="flex flex-col text-xs sm:text-sm">
        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Transaction ID
          </span>
          <span className="text-white font-medium break-all text-right">
            {transaction.id}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Date & Time
          </span>
          <span className="text-white font-medium text-right">
            {transaction.dateTime}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Type
          </span>
          <span className="text-[#D4FF32] font-semibold text-right">
            {transaction.typeDisplay || transaction.type}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Source
          </span>
          <span className="text-white font-medium text-right">
            {transaction.source}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Amount
          </span>
          <span className="text-white font-bold text-right">
            {transaction.amount}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Status
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0D2B1E] text-[#10B981] border border-[#165636]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            {transaction.status}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-[#1E222D] gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Payment Method
          </span>
          <span className="text-white font-medium text-right">
            {transaction.paymentMethod}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 gap-4">
          <span className="text-[#94A3B8] font-medium whitespace-nowrap">
            Reference ID
          </span>
          <span className="text-white font-medium break-all text-right">
            {transaction.referenceId}
          </span>
        </div>
      </div>
    </div>
  );
}
