"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import { FinanceTab } from "./types";

const TABS: { id: FinanceTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "revenue", label: "Revenue" },
  { id: "payouts", label: "Payouts" },
  { id: "transactions", label: "Transactions" },
];

export default function FinanceHeaderTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FinanceTab) || "overview";

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isThisMonth, setIsThisMonth] = useState(true);

  const handleTabChange = (tabId: FinanceTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    if (tabId === "overview") {
      params.delete("tab");
      params.delete("subtab");
    } else {
      params.set("tab", tabId);
      if (tabId !== "payouts") {
        params.delete("subtab");
      }
    }
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const now = new Date();
    const isNow =
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    setIsThisMonth(isNow);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 w-full">
      <div className="flex items-center gap-1 p-1 bg-[#12141A] border border-[#232631] rounded-xl overflow-x-auto scrollbar-none shrink-0">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#D4FF32] text-black font-bold shadow-[0_0_12px_rgba(212,255,50,0.3)]"
                  : "text-[#94A3B8] hover:text-white font-medium"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
        <MonthCalendarPicker
          value={selectedDate}
          onChange={handleDateChange}
          label={isThisMonth ? "This Month" : undefined}
          className="w-full sm:w-[170px]"
        />
      </div>
    </div>
  );
}
