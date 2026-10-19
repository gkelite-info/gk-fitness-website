"use client";

import { useState } from "react";
import FinanceHeaderTabs from "./FinanceHeaderTabs";
import RevenueKpiGrid from "./RevenueKpiGrid";
import RevenueCategoryPills from "./RevenueCategoryPills";
import RevenueTransactionsTable from "./RevenueTransactionsTable";
import { RevenueCategory, RevenueTransaction } from "./types";
import { REVENUE_TRANSACTIONS } from "./revenueMockData";

interface SuperAdminRevenueViewProps {
  onSelectTransaction: (tx: RevenueTransaction) => void;
}

export default function SuperAdminRevenueView({
  onSelectTransaction,
}: SuperAdminRevenueViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<RevenueCategory>("all");

  const filteredTransactions =
    selectedCategory === "all"
      ? REVENUE_TRANSACTIONS
      : REVENUE_TRANSACTIONS.filter((t) => t.sourceCategory === selectedCategory);

  return (
    <div className="flex flex-col gap-6 sm:gap-7 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Finance
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Track all platform revenue, payouts and transactions in one place.
        </p>
      </div>

      <FinanceHeaderTabs />
      <RevenueKpiGrid />
      <RevenueCategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <RevenueTransactionsTable
        transactions={filteredTransactions}
        onViewDetails={onSelectTransaction}
      />
    </div>
  );
}
