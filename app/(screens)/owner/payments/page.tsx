"use client";

import { Wallet, CurrencyInr, TrendUp } from "@phosphor-icons/react";
import MetricCard from "./_components/MetricCard";
import PaymentsTable from "./_components/PaymentsTable";

export default function PaymentsPage() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0C0D10] overflow-y-auto scrollbar-themed relative">
      <div className="flex flex-col p-6 md:p-8 max-w-[1024px] mx-auto w-full gap-7 pb-6 md:pb-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-baseline gap-2 md:gap-4 w-full">
          <h1 className="font-['Plus_Jakarta_Sans'] font-[800] text-[24px] md:text-[30px] leading-[36px] tracking-[-0.75px] text-white m-0">
            Payments
          </h1>
          <span className="font-['Plus_Jakarta_Sans'] font-[600] text-[12px] leading-[16px] tracking-[0.3px] text-[#9CA3AF]">
            Tue, 29 Jul 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <MetricCard
            title="Today's Revenue"
            subtitle="(this month)"
            value="₹48,500"
            icon={<Wallet size={32} weight="fill" />}
            trendIcon={<TrendUp size={16} weight="bold" />}
          />
          <MetricCard
            title="Today's Payments"
            value="18"
            icon={<CurrencyInr size={32} weight="bold" />}
            trendIcon={<TrendUp size={16} weight="bold" />}
          />
        </div>

        <PaymentsTable />

      </div>
    </div>
  );
}
