"use client";

import FinanceKPICard, { FinanceKPICardProps } from "@/app/(screens)/components/reusable/cards/FinanceKPICard";
import { Database, UsersThree, TrendUp } from "@phosphor-icons/react";

const KPI_DATA: FinanceKPICardProps[] = [
  {
    title: "Today's Revenue",
    value: "₹8,450",
    trend: "+12.4%",
    trendSuffix: "vs yesterday",
    trendColor: "#CCFF00",
    icon: <Database size={24} weight="regular" />,
    iconBgColor: "#122B1C",
    iconBorderColor: "rgba(16, 185, 129, 0.2)",
    iconColor: "#34D399",
    href: "/owner/finance/today"
  },
  {
    title: "Total Customers",
    value: "1,248",
    trend: "-9.3%",
    trendSuffix: "this month",
    trendColor: "#F43F5E",
    icon: <UsersThree size={24} weight="regular" />,
    iconBgColor: "#2E1D15",
    iconBorderColor: "rgba(180, 83, 9, 0.2)",
    iconColor: "#FF8C42",
    href: "/owner/finance/active-customers"
  },
  {
    title: "Monthly Growth",
    value: "+8.4%",
    trend: "vs last month",
    trendSuffix: "",
    trendColor: "#60A5FA",
    icon: <TrendUp size={24} weight="regular" />,
    iconBgColor: "#132238",
    iconBorderColor: "rgba(37, 99, 235, 0.2)",
    iconColor: "#60A5FA",
    href: "/owner/finance/monthly-growth"
  }
];

export default function FinanceKPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {KPI_DATA.map((card, index) => (
        <FinanceKPICard key={index} {...card} />
      ))}
    </div>
  );
}
