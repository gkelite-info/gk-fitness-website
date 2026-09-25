"use client";
import { useState } from "react";
import { MagnifyingGlass, Tag, CreditCard, CalendarBlank } from "@phosphor-icons/react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

export default function ExpenditureFilterBar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [date, setDate] = useState("month");

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Rent", value: "rent" },
    { label: "Staff Salaries", value: "salaries" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Utilities", value: "utilities" },
    { label: "Marketing", value: "marketing" },
    { label: "Supplements", value: "supplements" },
    { label: "Cleaning Supplies", value: "cleaning" },
    { label: "Equipment", value: "equipment" },
  ];

  const paymentOptions = [
    { label: "All Payment Methods", value: "all" },
    { label: "Bank Transfer", value: "bank" },
    { label: "UPI", value: "upi" },
    { label: "Credit Card", value: "credit" },
    { label: "Debit Card", value: "debit" },
    { label: "Cash", value: "cash" },
  ];

  const dateOptions = [
    { label: "All Time", value: "all" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-4 shrink-0">
      <div className="flex flex-row items-center px-3 py-2 gap-3 w-full xl:w-[320px] bg-[#11161D] border border-[#1D2631] rounded-lg shrink-0">
        <MagnifyingGlass size={16} className="text-[#6B7280]" />
        <input 
          type="text" 
          placeholder="Search expenses by name, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-sans text-xs text-white placeholder-[#6B7280] min-w-0"
        />
      </div>

      <div className="flex flex-row flex-wrap items-center gap-2.5 w-full xl:w-auto shrink-0">
        <div className="w-full sm:w-[168px]">
          <Dropdown 
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            icon={<Tag size={14} weight="regular" />}
            triggerClassName="flex flex-row items-center justify-between px-3 py-2 w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg cursor-pointer text-xs font-medium text-[#D1D5DB]"
          />
        </div>
        <div className="w-full sm:w-[210px]">
          <Dropdown 
            options={paymentOptions}
            value={paymentMethod}
            onChange={setPaymentMethod}
            icon={<CreditCard size={14} weight="regular" />}
            triggerClassName="flex flex-row items-center justify-between px-3 py-2 w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg cursor-pointer text-xs font-medium text-[#D1D5DB]"
          />
        </div>
        <div className="w-full sm:w-[152px]">
          <Dropdown 
            options={dateOptions}
            value={date}
            onChange={setDate}
            icon={<CalendarBlank size={14} weight="regular" />}
            triggerClassName="flex flex-row items-center justify-between px-3 py-2 w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg cursor-pointer text-xs font-medium text-[#D1D5DB]"
          />
        </div>
      </div>
    </div>
  );
}
