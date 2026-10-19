"use client";

import { MagnifyingGlass, Funnel, X } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import { TransactionFilterType, TransactionFilterSource } from "./types";

interface TransactionsFilterBarProps {
  selectedType: TransactionFilterType;
  onTypeChange: (type: TransactionFilterType) => void;
  selectedSource: TransactionFilterSource;
  onSourceChange: (source: TransactionFilterSource) => void;
  fromDate: Date | null;
  onFromDateChange: (date: Date | null) => void;
  toDate: Date | null;
  onToDateChange: (date: Date | null) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onClear: () => void;
}

const TYPE_OPTIONS: DropdownOption[] = [
  { label: "All Types", value: "All" },
  { label: "Payment Received", value: "Payment Received" },
  { label: "Paid", value: "Paid" },
];

const SOURCE_OPTIONS: DropdownOption[] = [
  { label: "All Sources", value: "All" },
  { label: "Gym Labels", value: "Gym Labels" },
  { label: "Customer Plans", value: "Customer Plans" },
  { label: "Global Sessions", value: "Global Sessions" },
  { label: "Gym Pass", value: "Gym Pass" },
  { label: "Gym Payout", value: "Gym Payout" },
  { label: "Trainer Payout", value: "Trainer Payout" },
];

const STATUS_OPTIONS: DropdownOption[] = [
  { label: "All Status", value: "All Status" },
  { label: "Paid", value: "Paid" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
];

const DROPDOWN_TRIGGER =
  "relative flex flex-row items-center justify-between px-3.5 py-2.5 w-full bg-[#181A22] border border-[#242836] hover:border-[#383D50] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white h-[44px] min-h-[44px] cursor-pointer transition-colors select-none";

export default function TransactionsFilterBar({
  selectedType,
  onTypeChange,
  selectedSource,
  onSourceChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onClear,
}: TransactionsFilterBarProps) {
  const formatDateDisplay = (date: Date | null, fallback: string) => {
    if (!date) return fallback;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-3.5 w-full">
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full">
        <div className="w-full sm:w-[170px] shrink-0">
          <Dropdown
            options={TYPE_OPTIONS}
            value={selectedType}
            onChange={(val) => onTypeChange(val as TransactionFilterType)}
            placeholder="Transaction Type"
            className="w-full"
            triggerClassName={DROPDOWN_TRIGGER}
            noTruncate
          />
        </div>

        <div className="w-full sm:w-[175px] shrink-0">
          <Dropdown
            options={SOURCE_OPTIONS}
            value={selectedSource}
            onChange={(val) => onSourceChange(val as TransactionFilterSource)}
            placeholder="Source"
            className="w-full"
            triggerClassName={DROPDOWN_TRIGGER}
            noTruncate
          />
        </div>

        <div className="w-full sm:w-[160px] shrink-0">
          <MonthCalendarPicker
            value={fromDate || new Date()}
            onChange={onFromDateChange}
            label={fromDate ? formatDateDisplay(fromDate, "From Date") : "From Date"}
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-[160px] shrink-0">
          <MonthCalendarPicker
            value={toDate || new Date()}
            onChange={onToDateChange}
            label={toDate ? formatDateDisplay(toDate, "To Date") : "To Date"}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
        <div className="flex items-center gap-2.5 px-3.5 h-[44px] min-h-[44px] w-full sm:w-auto sm:flex-1 bg-[#181A22] border border-[#242836] hover:border-[#383D50] focus-within:border-[#D4FF32] rounded-xl shrink-0 transition-colors">
          <MagnifyingGlass size={16} className="text-[#64748B] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by transaction ID, name, or source..."
            className="bg-transparent text-xs sm:text-sm text-white placeholder-[#64748B] outline-none w-full h-full py-2.5"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="text-[#64748B] hover:text-white p-1 shrink-0"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="w-full sm:w-[150px] shrink-0">
          <Dropdown
            options={STATUS_OPTIONS}
            value={selectedStatus}
            onChange={(val) => onStatusChange(val as string)}
            placeholder="Status"
            className="w-full"
            triggerClassName={DROPDOWN_TRIGGER}
          />
        </div>

        <button
          type="button"
          onClick={onClear}
          className="h-[44px] min-h-[44px] px-4 rounded-xl bg-[#181A22] border border-[#242836] hover:border-[#383D50] text-xs sm:text-sm text-[#94A3B8] hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 select-none"
        >
          <Funnel size={14} className="text-[#94A3B8]" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
