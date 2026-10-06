"use client";
import { useState } from "react";
import { MagnifyingGlass, Tag, CreditCard } from "@phosphor-icons/react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

export default function ExpenditureFilterBar({
  search, setSearch,
  category, setCategory,
  paymentMethod, setPaymentMethod,
  fromDate, setFromDate,
  toDate, setToDate
}: any) {

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Rent", value: "rent" },
    { label: "Salaries", value: "salaries" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Utilities", value: "utilities" },
    { label: "Marketing", value: "marketing" },
    { label: "Equipment", value: "equipment" },
    { label: "Supplies", value: "supplies" },
    { label: "Others", value: "others" },
  ];

  const paymentOptions = [
    { label: "All Payment Methods", value: "all" },
    { label: "Upi", value: "upi" },
    { label: "Bank", value: "bank" },
    { label: "Cash", value: "cash" },
    { label: "Credit card", value: "credit_card" },
    { label: "Debit card", value: "debit_card" },
  ];

  const today = new Date().toISOString().split('T')[0];

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
            max={today}
            value={fromDate}
            onChange={(e) => {
              const newFromDate = e.target.value;
              setFromDate(newFromDate);
              if (toDate && newFromDate > toDate) {
                setToDate(newFromDate);
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-[#D1D5DB] [color-scheme:dark] min-w-0 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          />
        </div>

        <div className="flex items-center w-full h-[34px] bg-[#11161D] border border-[#1D2631] rounded-lg px-2.5 overflow-hidden">
          <span className="text-[#6B7280] text-[10px] uppercase font-bold mr-2 tracking-wider shrink-0">To</span>
          <input
            type="date"
            min={fromDate}
            max={today}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-[#D1D5DB] [color-scheme:dark] min-w-0 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
