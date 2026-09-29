"use client";
import { useState } from "react";
import { MagnifyingGlass, Tag, CreditCard } from "@phosphor-icons/react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

export default function ExpenditureFilterBar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  return (
    <div className="flex flex-col gap-3 w-full shrink-0">
      <div className="flex flex-row items-center px-3 py-2 gap-3 w-full bg-[#11161D] border border-[#1D2631] rounded-lg">
        <MagnifyingGlass size={16} className="text-[#6B7280] shrink-0" />
        <input 
          type="text" 
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-sans text-xs text-white placeholder-[#6B7280] min-w-0 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full">
        <Dropdown 
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          icon={<Tag size={14} weight="regular" />}
          triggerClassName="flex flex-row items-center justify-between px-3 py-2 w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg cursor-pointer text-xs font-medium text-[#D1D5DB]"
        />
        <Dropdown 
          options={paymentOptions}
          value={paymentMethod}
          onChange={setPaymentMethod}
          icon={<CreditCard size={14} weight="regular" />}
          triggerClassName="flex flex-row items-center justify-between px-3 py-2 w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg cursor-pointer text-xs font-medium text-[#D1D5DB]"
        />
        
        <div className="flex items-center w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg px-2.5 overflow-hidden">
          <span className="text-[#6B7280] text-[10px] uppercase font-bold mr-2 tracking-wider shrink-0">From</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-[#D1D5DB] [color-scheme:dark] min-w-0 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          />
        </div>
        <div className="flex items-center w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg px-2.5 overflow-hidden">
          <span className="text-[#6B7280] text-[10px] uppercase font-bold mr-2 tracking-wider shrink-0">To</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-[#D1D5DB] [color-scheme:dark] min-w-0 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
