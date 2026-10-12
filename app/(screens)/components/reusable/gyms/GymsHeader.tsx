import { MagnifyingGlass, Plus } from "@phosphor-icons/react";

interface GymsHeaderProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddGym: () => void;
}

export default function GymsHeader({
  totalCount,
  searchQuery,
  onSearchChange,
  onAddGym,
}: GymsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Total Gyms
          </h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold text-[#D4FF32] bg-[#1C2513] border border-[#3E5218] shrink-0">
            {totalCount} Locations
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          View and manage all registered gyms
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
        <div className="relative w-full sm:flex-1 sm:max-w-md lg:w-[320px] xl:w-[360px]">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search gyms, cities..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#13151D] border border-[#222634] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:ring-1 focus:ring-[#D4FF32] transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={onAddGym}
          className="h-11 px-5 rounded-xl bg-[#D4FF32] hover:bg-[#c4f026] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_16px_rgba(212,255,50,0.25)] shrink-0 w-full sm:w-auto active:scale-95"
        >
          <Plus size={18} weight="bold" />
          <span>Add Gym</span>
        </button>
      </div>
    </div>
  );
}
