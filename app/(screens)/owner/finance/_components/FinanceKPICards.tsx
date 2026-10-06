"use client";

import FinanceKPICard, { FinanceKPICardProps } from "@/app/(screens)/components/reusable/cards/FinanceKPICard";
import { Database, UsersThree, TrendUp } from "@phosphor-icons/react";

interface FinanceKPICardsProps {
  todaysRevenue?: number;
  todaysGrowth?: number;
  totalCustomers?: number;
  customerGrowth?: number;
  monthlyGrowth?: number;
  selectedMonth?: number;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const formatPercent = (val: number) => {
  const sign = val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
};

const getTrendColor = (val: number, reverseColors = false) => {
  if (val === 0) return "#94A3B8";
  if (val > 0) return reverseColors ? "#F43F5E" : "#CCFF00";
  return reverseColors ? "#CCFF00" : "#F43F5E";
};

export default function FinanceKPICards({
  todaysRevenue = 0,
  todaysGrowth = 0,
  totalCustomers = 0,
  customerGrowth = 0,
  monthlyGrowth = 0,
  selectedMonth = new Date().getMonth()
}: FinanceKPICardsProps) {

  const KPI_DATA: FinanceKPICardProps[] = [
    {
      title: "Today's Revenue",
      value: formatCurrency(todaysRevenue),
      trend: selectedMonth === -1 ? "" : formatPercent(todaysGrowth),
      trendSuffix: selectedMonth === -1 ? "" : "vs yesterday",
      trendColor: getTrendColor(todaysGrowth),
      icon: <Database size={24} weight="regular" />,
      iconBgColor: "#122B1C",
      iconBorderColor: "rgba(16, 185, 129, 0.2)",
      iconColor: "#34D399",
      href: "/owner/finance/today"
    },
    {
      title: "Total Customers",
      value: totalCustomers.toLocaleString('en-IN'),
      trend: selectedMonth === -1 ? "" : formatPercent(customerGrowth),
      trendSuffix: selectedMonth === -1 ? "" : "this month",
      trendColor: getTrendColor(customerGrowth),
      icon: <UsersThree size={24} weight="regular" />,
      iconBgColor: "#2E1D15",
      iconBorderColor: "rgba(180, 83, 9, 0.2)",
      iconColor: "#FF8C42",
      href: "/owner/finance/active-customers"
    },
    {
      title: selectedMonth === -1 ? "All Time Growth" : "Monthly Growth",
      value: selectedMonth === -1 ? "N/A" : formatPercent(monthlyGrowth),
      trend: selectedMonth === -1 ? "" : "vs last month",
      trendSuffix: "",
      trendColor: selectedMonth === -1 ? "#94A3B8" : getTrendColor(monthlyGrowth),
      icon: <TrendUp size={24} weight="regular" />,
      iconBgColor: "#132238",
      iconBorderColor: "rgba(37, 99, 235, 0.2)",
      iconColor: "#60A5FA",
      href: "/owner/finance/monthly-growth"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {KPI_DATA.map((card, index) => (
        <FinanceKPICard key={index} {...card} />
      ))}
    </div>
  );
}
