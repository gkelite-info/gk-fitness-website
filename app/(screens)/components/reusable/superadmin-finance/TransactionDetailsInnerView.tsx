"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { FinanceTransactionRecord } from "./types";
import TransactionDetailsCard from "./TransactionDetailsCard";
import TransactionRightCards from "./TransactionRightCards";

interface TransactionDetailsInnerViewProps {
  transaction: FinanceTransactionRecord;
  onBack: () => void;
}

export default function TransactionDetailsInnerView({
  transaction,
  onBack,
}: TransactionDetailsInnerViewProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#D4FF32] hover:text-[#e5ff6e] transition-colors cursor-pointer group"
        >
          <ArrowLeft
            size={16}
            weight="bold"
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Transactions</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        <div className="lg:col-span-7 w-full min-w-0">
          <TransactionDetailsCard transaction={transaction} />
        </div>

        <div className="lg:col-span-5 w-full min-w-0">
          <TransactionRightCards transaction={transaction} />
        </div>
      </div>
    </div>
  );
}
