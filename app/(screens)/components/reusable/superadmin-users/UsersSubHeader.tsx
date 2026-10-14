"use client";

import { Plus } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "../Dropdown";
import { UserRoleTab, UserSortOption } from "./types";

interface UsersSubHeaderProps {
  count: number;
  currentTab: UserRoleTab;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  gymFilter: string;
  onGymChange: (gym: string) => void;
  gymOptions: DropdownOption[];
  sortOption: UserSortOption;
  onSortChange: (sort: UserSortOption) => void;
  onAddTrainer?: () => void;
}

const TAB_TITLES: Record<UserRoleTab, string> = {
  owners: "Owners",
  trainers: "Trainers",
  "global-trainers": "Global Trainers",
  "gym-customers": "Gym Customers",
  "individual-customers": "Individual Customers",
};

const STATUS_OPTIONS: DropdownOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const SORT_OPTIONS: DropdownOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name (A-Z)", value: "name" },
];

export default function UsersSubHeader({
  count,
  currentTab,
  statusFilter,
  onStatusChange,
  gymFilter,
  onGymChange,
  gymOptions,
  sortOption,
  onSortChange,
  onAddTrainer,
}: UsersSubHeaderProps) {
  const isGlobal = currentTab === "global-trainers";

  const renderSortDropdown = () => (
    <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0">
      <span className="text-xs text-[#94A3B8] font-medium hidden sm:inline shrink-0">
        Sorted by:
      </span>
      <div className="w-full sm:w-[125px]">
        <Dropdown
          options={SORT_OPTIONS}
          value={sortOption}
          onChange={(val) => onSortChange(val as UserSortOption)}
          placeholder="Sort by"
          align="right"
          triggerClassName="relative flex items-center justify-between px-3 sm:px-3.5 py-2 w-full bg-[#13151D] border border-[#222634] rounded-xl cursor-pointer h-10 hover:border-[#323847] text-xs font-semibold text-[#D4FF32] transition-all"
        />
      </div>
    </div>
  );

  if (currentTab === "individual-customers") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full py-1">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl sm:text-2xl font-extrabold text-[#D4FF32]">
            {count}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-white">
            Individual Customers
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto shrink-0 sm:justify-end">
          <div className="w-full sm:w-[130px]">
            <Dropdown
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={onStatusChange}
              placeholder="All Status"
              align="right"
              triggerClassName="relative flex items-center justify-between px-3 sm:px-3.5 py-2 w-full bg-[#13151D] border border-[#222634] rounded-xl cursor-pointer h-10 hover:border-[#323847] text-xs font-medium text-[#94A3B8] hover:text-white transition-all"
            />
          </div>

          {renderSortDropdown()}
        </div>
      </div>
    );
  }

  if (isGlobal) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full py-1">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl sm:text-2xl font-extrabold text-[#D4FF32]">
            {count}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-white">
            Global Trainers
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto shrink-0 sm:justify-end">
          <div className="w-full sm:w-[130px]">
            <Dropdown
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={onStatusChange}
              placeholder="All Status"
              align="right"
              triggerClassName="relative flex items-center justify-between px-3 sm:px-3.5 py-2 w-full bg-[#13151D] border border-[#222634] rounded-xl cursor-pointer h-10 hover:border-[#323847] text-xs font-medium text-[#94A3B8] hover:text-white transition-all"
            />
          </div>

          {renderSortDropdown()}

          <button
            type="button"
            onClick={onAddTrainer}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4FF32] text-black font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_12px_rgba(212,255,50,0.25)] cursor-pointer shrink-0"
          >
            <Plus size={18} weight="bold" />
            <span>Add Global Trainer</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full py-1">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-base sm:text-lg font-bold text-[#D4FF32]">
          {count}
        </span>
        <span className="text-base sm:text-lg font-bold text-white">
          {TAB_TITLES[currentTab]}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5 w-full md:w-auto shrink-0 sm:justify-end">
        <div className="w-full sm:w-[130px]">
          <Dropdown
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={onStatusChange}
            placeholder="All Status"
            triggerClassName="relative flex items-center justify-between px-3 sm:px-3.5 py-2 w-full bg-[#13151D] border border-[#222634] rounded-xl cursor-pointer h-10 hover:border-[#323847] text-xs font-medium text-[#94A3B8] hover:text-white transition-all"
          />
        </div>

        <div className="w-full sm:w-[160px]">
          <Dropdown
            options={gymOptions}
            value={gymFilter}
            onChange={onGymChange}
            placeholder="All Gyms"
            align="right"
            triggerClassName="relative flex items-center justify-between px-3 sm:px-3.5 py-2 w-full bg-[#13151D] border border-[#222634] rounded-xl cursor-pointer h-10 hover:border-[#323847] text-xs font-medium text-[#94A3B8] hover:text-white transition-all"
          />
        </div>

        {renderSortDropdown()}
      </div>
    </div>
  );
}
