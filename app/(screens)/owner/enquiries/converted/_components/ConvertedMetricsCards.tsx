import { UsersThree, Users, ShareNetwork, PersonSimpleWalk } from "@phosphor-icons/react";

interface ConvertedMetricsCardsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ConvertedMetricsCards({ activeFilter, onFilterChange }: ConvertedMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 shrink-0">
      
      <div 
        onClick={() => onFilterChange("All")}
        className={`flex items-center p-4 gap-4 bg-[#131926]/90 border rounded-2xl cursor-pointer transition-all ${activeFilter === "All" ? "border-[#34D399] shadow-[0_0_15px_rgba(52,211,153,0.15)]" : "border-[#1F2738] hover:border-[#34D399]/50"}`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#10B981]/15 shrink-0">
          <UsersThree size={24} weight="fill" className="text-[#34D399]" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-medium text-xs text-[#94A3B8]">Total Converted</span>
          <span className="font-sans font-medium text-xs text-[#94A3B8] mb-0.5">Members</span>
          <span className="font-sans font-black text-2xl text-white leading-none">32</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-sans font-semibold text-[11px] text-[#34D399]">↑ 14%</span>
            <span className="font-sans text-[11px] text-[#64748B]">vs last month</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange("This Month")}
        className={`flex items-center p-4 gap-4 bg-[#131926]/90 border rounded-2xl cursor-pointer transition-all ${activeFilter === "This Month" ? "border-[#FF7272] shadow-[0_0_15px_rgba(255,114,114,0.15)]" : "border-[#1F2738] hover:border-[#FF7272]/50"}`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F43F5E]/15 shrink-0">
          <Users size={24} weight="fill" className="text-[#FF7272]" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-medium text-xs text-[#94A3B8]">Converted This Month</span>
          <div className="h-4"></div>
          <span className="font-sans font-black text-2xl text-white leading-none">11</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-sans font-semibold text-[11px] text-[#34D399]">↑ 3</span>
            <span className="font-sans text-[11px] text-[#64748B]">vs last month</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange("Social Media")}
        className={`flex items-center p-4 gap-4 bg-[#131926]/90 border rounded-2xl cursor-pointer transition-all ${activeFilter === "Social Media" ? "border-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.15)]" : "border-[#1F2738] hover:border-[#22D3EE]/50"}`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#06B6D4]/15 shrink-0">
          <ShareNetwork size={24} weight="fill" className="text-[#22D3EE]" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-medium text-xs text-[#94A3B8]">Converted from Social</span>
          <span className="font-sans font-medium text-xs text-[#94A3B8] mb-0.5">Media</span>
          <span className="font-sans font-black text-2xl text-white leading-none">18</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-sans font-semibold text-[11px] text-[#34D399]">↑ 6</span>
            <span className="font-sans text-[11px] text-[#64748B]">vs last month</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange("Walk-in")}
        className={`flex items-center p-4 gap-4 bg-[#131926]/90 border rounded-2xl cursor-pointer transition-all ${activeFilter === "Walk-in" ? "border-[#FFDDAA] shadow-[0_0_15px_rgba(255,221,170,0.15)]" : "border-[#1F2738] hover:border-[#FFDDAA]/50"}`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F59E0B]/15 shrink-0">
          <PersonSimpleWalk size={24} weight="fill" className="text-[#FFDDAA]" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-medium text-xs text-[#94A3B8]">Converted from Walk-in</span>
          <span className="font-sans font-medium text-xs text-[#94A3B8] mb-0.5">/ Owner Added</span>
          <span className="font-sans font-black text-2xl text-white leading-none">14</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-sans font-semibold text-[11px] text-[#34D399]">↑ 5</span>
            <span className="font-sans text-[11px] text-[#64748B]">vs last month</span>
          </div>
        </div>
      </div>

    </div>
  );
}
