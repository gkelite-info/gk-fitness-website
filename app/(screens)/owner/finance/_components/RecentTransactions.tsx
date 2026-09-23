"use client";

import { CaretRight } from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useRouter } from "next/navigation";

export interface TransactionData {
  gymPaymentId: string;
  name: string;
  plan: string;
  amount: number;
  paymentDate: string;
  gender: "male" | "female";
}

interface RecentTransactionsProps {
  transactions?: TransactionData[];
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export default function RecentTransactions({ transactions = [] }: RecentTransactionsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col p-4 md:p-6 w-full h-full bg-[#111418] border border-[#1D222B] rounded-[16px] min-h-[350px]">
      <div className="flex flex-row justify-between items-center pb-4 w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Recent Transactions
        </h2>
        {/* <button className="flex flex-row items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="font-[600] text-[12px] leading-[16px] text-[#CCFF00]">
            View All
          </span>
          <CaretRight size={14} weight="regular" className="text-[#CCFF00]" />
        </button> */}
      </div>
      <div className="flex flex-col w-full gap-3 mt-2">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx.gymPaymentId}
              className="flex flex-row justify-between items-center py-2 px-3 -mx-3 w-[calc(100%+24px)] gap-2 cursor-pointer hover:bg-[#1A1F26] rounded-xl transition-all"
              onClick={() => router.push(`/owner/payments/${tx.gymPaymentId}`)}
            >
              <div className="flex flex-row items-center gap-3.5 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-full border border-slate-600/40 shrink-0 flex items-center justify-center overflow-hidden bg-slate-700/60">
                  <Avatar gender={tx.gender} className="w-[38px] h-[38px]" />
                </div>
                <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1 pr-2">
                  <span className="font-[600] text-[12px] leading-[16px] text-white truncate w-full">
                    {tx.name}
                  </span>
                  <span className="font-[400] text-[11px] leading-[16px] text-[#94A3B8] truncate w-full">
                    {tx.plan}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 shrink-0">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="font-[700] text-[12px] leading-[16px] text-white text-right">
                    {formatCurrency(tx.amount)}
                  </span>
                  <span className="font-[400] text-[10px] leading-[15px] text-[#64748B] text-right whitespace-nowrap">
                    {formatTime(tx.paymentDate)}
                  </span>
                </div>
                <CaretRight size={14} weight="regular" className="text-[#64748B] shrink-0" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-10">
            <span className="text-sm text-[#94A3B8]">No recent transactions.</span>
          </div>
        )}
      </div>
    </div>
  );
}
