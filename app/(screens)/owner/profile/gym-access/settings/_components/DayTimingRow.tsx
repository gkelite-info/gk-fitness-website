"use client";

import { CheckSquare, Square } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";

const TIME_OPTIONS: DropdownOption[] = [
  "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"
].map(t => ({ label: t, value: t }));

interface DayTimingRowProps {
  day: string;
  data: {
    isClosed: boolean;
    opensAt: string;
    closesAt: string;
  };
  onChange: (field: string, value: any) => void;
}

export default function DayTimingRow({ day, data, onChange }: DayTimingRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 w-full">
      <div className="flex flex-col gap-2 min-w-[140px]">
        <span className="font-['Nimbus_Sans'] font-medium text-[15px] text-white">
          {day}
        </span>
        <div 
          onClick={() => onChange('isClosed', !data.isClosed)}
          className="flex items-center gap-2 cursor-pointer w-fit group"
        >
          {data.isClosed ? (
            <CheckSquare size={16} weight="fill" className="text-[#94A3B8]" />
          ) : (
            <div className="w-4 h-4 rounded-[3px] border border-[#232631] group-hover:border-[#94A3B8] transition-colors flex items-center justify-center shrink-0 bg-transparent"></div>
          )}
          <span className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8] group-hover:text-white transition-colors">Closed</span>
        </div>
      </div>

      <div className={`flex flex-row items-center gap-4 w-full sm:w-auto transition-opacity duration-200 ${data.isClosed ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col gap-1.5 w-full sm:w-[200px]">
          <span className="font-['Nimbus_Sans'] text-[11px] text-[#64748B]">Opens at</span>
          <Dropdown
            options={TIME_OPTIONS}
            value={data.opensAt}
            onChange={(val) => onChange('opensAt', val)}
            className="w-full"
            triggerClassName="relative flex flex-row items-center justify-between px-4 py-2.5 w-full bg-[#1A1C22] border border-[#232631] rounded-lg cursor-pointer h-10 hover:border-[#303744] transition-colors"
          />
        </div>
        
        <div className="flex flex-col gap-1.5 w-full sm:w-[200px]">
          <span className="font-['Nimbus_Sans'] text-[11px] text-[#64748B]">Closes at</span>
          <Dropdown
            options={TIME_OPTIONS}
            value={data.closesAt}
            onChange={(val) => onChange('closesAt', val)}
            className="w-full"
            triggerClassName="relative flex flex-row items-center justify-between px-4 py-2.5 w-full bg-[#1A1C22] border border-[#232631] rounded-lg cursor-pointer h-10 hover:border-[#303744] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
