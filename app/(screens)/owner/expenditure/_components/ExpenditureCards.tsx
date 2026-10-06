"use client";

import FinanceKPICard from "@/app/(screens)/components/reusable/cards/FinanceKPICard";
import { Wallet, ChartBar, Tag, FileText } from "@phosphor-icons/react";

export default function ExpenditureCards({ expensesData = [] }: { expensesData?: any[] }) {
  
  // Compute Stats
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  let todayTotal = 0;
  let monthTotal = 0;
  let totalEntries = 0;
  let highestExpenseCategory = "None";
  let maxAmount = 0;
  let highestPercentage = 0;

  expensesData.forEach((expense) => {
    // Only consider non-deleted expenses
    if (expense.is_deleted || expense.deletedAt) return;
    
    totalEntries += 1;
    
    const amount = expense.amount || 0;
    const expenseDate = new Date(expense.createdAt || expense.date);

    // Today's total (using createdAt as requested)
    if (
      expenseDate.getDate() === today.getDate() &&
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    ) {
      todayTotal += amount;
    }

    // This month's total (using createdAt as requested)
    if (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    ) {
      monthTotal += amount;
    }

    // Highest expense row category
    if (amount > maxAmount) {
      maxAmount = amount;
      highestExpenseCategory = expense.category || "Unknown";
    }
  });

  // Optional: calculate percentage for highest expense if monthTotal > 0
  if (monthTotal > 0 && maxAmount > 0) {
    highestPercentage = (maxAmount / monthTotal) * 100;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full shrink-0">
      <FinanceKPICard
        title="Today's Expenditure"
        value={`₹${todayTotal.toLocaleString('en-IN')}`}
        valueClassName="text-[20px] leading-[28px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="Live"
        trendSuffix="data"
        trendColor="#4ADE80"
        icon={<Wallet size={24} weight="fill" />}
        iconBgColor="#2A1B1A"
        iconBorderColor="#3E2422"
        iconColor="#EF5350"
      />
      <FinanceKPICard
        title="This Month"
        value={`₹${monthTotal.toLocaleString('en-IN')}`}
        valueClassName="text-[20px] leading-[28px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="Current"
        trendSuffix="billing cycle"
        trendColor="#F87171"
        icon={<ChartBar size={24} weight="fill" />}
        iconBgColor="#142336"
        iconBorderColor="#1C324E"
        iconColor="#38BDF8"
      />
      <FinanceKPICard
        title="Highest Expense Category"
        value={highestExpenseCategory.charAt(0).toUpperCase() + highestExpenseCategory.slice(1).toLowerCase()}
        valueClassName="text-[16px] leading-[24px]"
        titleClassName="text-[11px] leading-[16px]"
        trend={`₹${maxAmount.toLocaleString('en-IN')}`}
        trendSuffix={highestPercentage > 0 ? `(${highestPercentage.toFixed(1)}%)` : ""}
        trendColor="#9CA3AF"
        icon={<Tag size={24} weight="fill" />}
        iconBgColor="#231A38"
        iconBorderColor="#372658"
        iconColor="#C084FC"
      />
      <FinanceKPICard
        title="Total Expense Entries"
        value={totalEntries.toString()}
        valueClassName="text-[20px] leading-[28px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="Active"
        trendSuffix="records"
        trendColor="#CCFF00"
        icon={<FileText size={24} weight="fill" />}
        iconBgColor="#14261D"
        iconBorderColor="#1C3A2C"
        iconColor="#4ADE80"
      />
    </div>
  );
}
