import { MagnifyingGlass, CaretDown, CalendarBlank } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useGymMembershipPlans } from "@/lib/hooks/useGymMembershipPlans";
import { useUser } from "@/app/context/UserContext";

interface ConvertedFiltersToolbarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedSource: string;
  onSourceChange: (val: string) => void;
  selectedPlan: string;
  onPlanChange: (val: string) => void;
  selectedDate: string;
  onDateChange: (val: string) => void;
}

export default function ConvertedFiltersToolbar({
  searchTerm,
  onSearchChange,
  selectedSource,
  onSourceChange,
  selectedPlan,
  onPlanChange,
  selectedDate,
  onDateChange
}: ConvertedFiltersToolbarProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const { user } = useUser();
  const { data: plansData } = useGymMembershipPlans(user?.id || null);
  const membershipPlans = plansData || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 600);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const sources = ['Google', 'Instagram', 'Facebook', 'Referral', 'Walkin', 'Owner', 'Others'];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 w-full shrink-0">
      
      <div className="relative w-full lg:w-[380px] shrink-0">
        <div className="absolute left-3.5 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <MagnifyingGlass size={16} className="text-[#64748B]" />
        </div>
        <input 
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search by name, phone, member ID or enquiry ID..."
          className="w-full bg-[#111723] border border-[#1F2738] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#64748B] placeholder:text-[#64748B] focus:outline-none focus:border-[#34D399]/50 transition-colors"
        />
      </div>

      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-start items-center gap-3 w-full lg:flex-1 overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
        <div className="relative flex-1 sm:flex-none shrink-0 min-w-[120px] lg:ml-auto">
          <select
            value={selectedSource}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full appearance-none px-3 py-[6px] bg-[#111723] border border-[#1F2738] rounded-xl text-xs text-white focus:outline-none focus:border-[#34D399]/50 cursor-pointer"
          >
            <option value="All">All Sources</option>
            {sources.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
        </div>
        
        <div className="relative flex-1 sm:flex-none shrink-0 min-w-[120px]">
          <select
            value={selectedPlan}
            onChange={(e) => onPlanChange(e.target.value)}
            className="w-full appearance-none px-3 py-[6px] bg-[#111723] border border-[#1F2738] rounded-xl text-xs text-white focus:outline-none focus:border-[#34D399]/50 cursor-pointer"
          >
            <option value="All">All Plans</option>
            {membershipPlans.map((plan: any) => (
              <option key={plan.planId} value={plan.planName}>{plan.planName}</option>
            ))}
          </select>
          <CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
        </div>
        
        <div className="relative flex items-center justify-between px-3 py-[6px] bg-[#111723] border border-[#1F2738] rounded-xl flex-1 sm:flex-none shrink-0 min-w-[200px] transition-colors focus-within:border-[#34D399]/50">
          <div className="flex items-center gap-2 pointer-events-none">
            <CalendarBlank size={16} className="text-[#94A3B8]" />
            <span className="font-sans font-bold text-[10px] text-[#94A3B8] tracking-wider uppercase">Conversion Date</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="bg-transparent border-none text-xs text-[#E2E8F0] focus:outline-none cursor-pointer [color-scheme:dark] ml-2"
          />
        </div>
      </div>
    </div>
  );
}
