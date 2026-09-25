"use client";

import FinanceKPICard from "@/app/(screens)/components/reusable/cards/FinanceKPICard";
import { Wallet, ChartBar, Tag, FileText } from "@phosphor-icons/react";

export default function ExpenditureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full shrink-0">
      <FinanceKPICard
        title="Today's Expenditure"
        value="₹12,450"
        valueClassName="text-[20px] leading-[28px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="-28.4%"
        trendSuffix="vs yesterday"
        trendColor="#4ADE80"
        icon={<Wallet size={24} weight="fill" />}
        iconBgColor="#2A1B1A"
        iconBorderColor="#3E2422"
        iconColor="#EF5350"
      />
      <FinanceKPICard
        title="This Month"
        value="₹1,24,850"
        valueClassName="text-[20px] leading-[28px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="+8.6%"
        trendSuffix="vs last month"
        trendColor="#F87171"
        icon={<ChartBar size={24} weight="fill" />}
        iconBgColor="#142336"
        iconBorderColor="#1C324E"
        iconColor="#38BDF8"
      />
      <FinanceKPICard
        title="Highest Expense Category"
        value="Staff Salaries"
        valueClassName="text-[16px] leading-[24px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="₹48,000"
        trendSuffix="(38.4%)"
        trendColor="#9CA3AF"
        icon={<Tag size={24} weight="fill" />}
        iconBgColor="#231A38"
        iconBorderColor="#372658"
        iconColor="#C084FC"
      />
      <FinanceKPICard
        title="Total Expense Entries"
        value="32"
        valueClassName="text-[20px] leading-[28px]"
        titleClassName="text-[11px] leading-[16px]"
        trend="+6"
        trendSuffix="new this month"
        trendColor="#CCFF00"
        icon={<FileText size={24} weight="fill" />}
        iconBgColor="#14261D"
        iconBorderColor="#1C3A2C"
        iconColor="#4ADE80"
      />
    </div>
  );
}
