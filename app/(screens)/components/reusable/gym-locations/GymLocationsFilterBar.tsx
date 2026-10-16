import { MagnifyingGlass } from "@phosphor-icons/react";
import CustomDropdown, { DropdownOption } from "@/app/(screens)/components/reusable/CustomDropdown";

interface GymLocationsFilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
}

const statusOptions: DropdownOption[] = [
  { label: "All Status", value: "all" },
  { label: "Location Added", value: "added" },
  { label: "Location Not Added", value: "not_added" },
];

export default function GymLocationsFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: GymLocationsFilterBarProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="relative w-full sm:w-80 md:w-96">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search gyms..."
          className="w-full pl-10 pr-4 py-2 bg-[#13151B] border border-[#232631] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors h-[42px]"
        />
      </div>

      <div className="w-full sm:w-44 shrink-0">
        <CustomDropdown
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusChange}
          triggerClassName="relative flex flex-row items-center justify-between px-3.5 py-2 w-full bg-[#13151B] border border-[#232631] rounded-xl text-xs sm:text-sm text-white transition-colors cursor-pointer h-[42px]"
        />
      </div>
    </div>
  );
}
