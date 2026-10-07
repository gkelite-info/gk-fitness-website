import { MagnifyingGlass, SortAscending, CheckSquare, Square } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";

interface Props {
  isBulkMode: boolean;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
  selectedCount: number;
  onSubmitBulk: () => void;
  onSortToggle: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeCount: number;
}

export default function ManualAttendanceFilterBar({
  isBulkMode,
  isAllSelected,
  onToggleSelectAll,
  selectedCount,
  onSubmitBulk,
  onSortToggle,
  searchTerm,
  onSearchChange,
  activeCount
}: Props) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 600);
    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  return (
    <div className="flex flex-col w-full p-4 bg-[#171B24] border border-[#232936] rounded-[16px]">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
        <div className="relative w-full md:flex-1 h-[42px] shrink-0">
          <div className="absolute inset-y-0 left-0 pl-[14px] flex items-center pointer-events-none z-10">
            <MagnifyingGlass size={16} color="#8B949E" weight="bold" />
          </div>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-full bg-[#0D1017] border border-[#232936] rounded-xl pl-[40px] pr-4 font-sans font-normal text-[14px] text-white placeholder-[#8B949E] focus:outline-none focus:border-[#4ADE80] transition-colors"
          />
        </div>

        <div className="flex flex-row flex-wrap items-center gap-2 shrink-0">
          <button className="flex flex-col justify-center items-center px-3.5 py-2 h-[34px] bg-[#0D1017] border border-[#232936] rounded-xl shrink-0 hover:bg-[#1A1C23] transition-colors cursor-pointer">
            <span className="font-sans font-semibold text-[12px] leading-[16px] text-center text-[#8B949E]">
              Active ({activeCount})
            </span>
          </button>

          {isBulkMode && (
            <button
              onClick={onToggleSelectAll}
              className="flex flex-row justify-center items-center px-3.5 py-2 h-[34px] bg-[#0D1017] border border-[#232936] rounded-xl shrink-0 hover:bg-[#1A1C23] transition-colors cursor-pointer gap-2"
            >
              {isAllSelected ? (
                <CheckSquare size={16} color="#C8FF00" weight="fill" />
              ) : (
                <Square size={16} color="#8B949E" weight="regular" />
              )}
              <span className={`font-sans font-semibold text-[12px] leading-[16px] text-center ${isAllSelected ? "text-[#C8FF00]" : "text-[#8B949E]"}`}>
                Select All
              </span>
            </button>
          )}

          {selectedCount > 0 && (
            <button
              onClick={onSubmitBulk}
              className="flex flex-row justify-center items-center px-4 py-2 h-[34px] bg-[#C8FF00] rounded-xl shrink-0 hover:bg-[#d4ff32] transition-colors cursor-pointer shadow-[0_0_15px_rgba(200,255,0,0.2)]"
            >
              <span className="font-sans font-bold text-[12px] leading-[16px] text-center text-black">
                Submit ({selectedCount})
              </span>
            </button>
          )}

          <button
            onClick={onSortToggle}
            className="flex flex-col justify-center items-center p-2 w-[34px] h-[34px] bg-[#0D1017] border border-[#232936] rounded-xl shrink-0 hover:bg-[#1A1C23] transition-colors cursor-pointer"
          >
            <SortAscending size={16} color="#8B949E" weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
