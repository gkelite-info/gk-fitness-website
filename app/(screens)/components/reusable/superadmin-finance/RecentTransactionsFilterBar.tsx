"use client";

import { MagnifyingGlass, X, Funnel } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";

interface RecentTransactionsFilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  fromDate: Date | null;
  onFromDateChange: (date: Date) => void;
  toDate: Date | null;
  onToDateChange: (date: Date) => void;
  selectedSource: string;
  onSourceChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

const SOURCE_OPTIONS: DropdownOption[] = [
  { label: "All Sources", value: "All Sources" },
  { label: "Gym Pass", value: "Gym Pass" },
  { label: "Global Session", value: "Global Session" },
  { label: "Customer Plan", value: "Customer Plan" },
  { label: "Gym Label", value: "Gym Label" },
  { label: "Gym Owner Payout", value: "Gym Owner Payout" },
  { label: "Global Trainer Payout", value: "Global Trainer Payout" },
];

const STATUS_OPTIONS: DropdownOption[] = [
  { label: "All Status", value: "All Status" },
  { label: "Paid", value: "Paid" },
  { label: "Pending", value: "Pending" },
];

const DROPDOWN_TRIGGER =
  "relative flex flex-row items-center justify-between px-3.5 py-2 w-full bg-[#181A22] border border-[#242836] hover:border-[#383D50] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white h-[40px] min-h-[40px] cursor-pointer transition-colors select-none";

export default function RecentTransactionsFilterBar({
  searchTerm,
  onSearchChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  selectedSource,
  onSourceChange,
  selectedStatus,
  onStatusChange,
  hasActiveFilters,
  onClearAll,
}: RecentTransactionsFilterBarProps) {
  const formatDateLabel = (d: Date | null, fallback: string) => {
    if (!d) return fallback;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3 w-full">
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <span className="text-[11px] font-medium text-[#64748B] pl-0.5">
          Search
        </span>
        <div className="flex items-center gap-2.5 px-3.5 h-[40px] min-h-[40px] w-full bg-[#181A22] border border-[#242836] hover:border-[#383D50] focus-within:border-[#D4FF32] rounded-xl transition-colors">
          <MagnifyingGlass size={16} className="text-[#64748B] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search transactions..."
            className="bg-transparent text-xs sm:text-sm text-white placeholder-[#64748B] outline-none w-full h-full py-2"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="text-[#64748B] hover:text-white p-1 shrink-0 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-end gap-3 w-full lg:w-auto shrink-0">
        <div className="flex flex-col gap-1 w-full sm:w-auto lg:w-[155px] shrink-0">
          <span className="text-[11px] font-medium text-[#64748B] pl-0.5">
            From Date
          </span>
          <MonthCalendarPicker
            value={fromDate || new Date()}
            onChange={onFromDateChange}
            label={formatDateLabel(fromDate, "01 Oct 2026")}
            noTruncate
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto lg:w-[155px] shrink-0">
          <span className="text-[11px] font-medium text-[#64748B] pl-0.5">
            To Date
          </span>
          <MonthCalendarPicker
            value={toDate || new Date()}
            onChange={onToDateChange}
            label={formatDateLabel(toDate, "31 Oct 2026")}
            noTruncate
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto lg:w-[155px] shrink-0">
          <span className="text-[11px] font-medium text-[#64748B] pl-0.5">
            Source
          </span>
          <Dropdown
            options={SOURCE_OPTIONS}
            value={selectedSource}
            onChange={(val) => onSourceChange(val as string)}
            placeholder="All Sources"
            className="w-full"
            triggerClassName={DROPDOWN_TRIGGER}
            noTruncate
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto lg:w-[140px] shrink-0">
          <span className="text-[11px] font-medium text-[#64748B] pl-0.5">
            Status
          </span>
          <Dropdown
            options={STATUS_OPTIONS}
            value={selectedStatus}
            onChange={(val) => onStatusChange(val as string)}
            placeholder="All Status"
            className="w-full"
            triggerClassName={DROPDOWN_TRIGGER}
            noTruncate
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="h-[40px] min-h-[40px] px-3.5 rounded-xl bg-[#181A22] border border-[#242836] hover:border-[#383D50] text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 select-none"
          >
            <Funnel size={14} className="text-[#94A3B8]" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
