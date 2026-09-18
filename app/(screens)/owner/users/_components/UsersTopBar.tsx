"use client";

import { UserPlus, ArrowsOut, MagnifyingGlass, CaretRight, Users, UserList } from "@phosphor-icons/react";

export interface UsersTopBarProps {
  activeTab: "customers" | "trainers";
  onTabChange: (tab: "customers" | "trainers") => void;
}

export default function UsersTopBar({ activeTab, onTabChange }: UsersTopBarProps) {
  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-4 mt-6">
      {/* Left Group */}
      <div className="flex flex-row flex-nowrap items-center gap-4 w-full xl:w-auto overflow-x-auto scrollbar-hide pb-2 xl:pb-0">
        <div className="flex flex-row items-center p-1 bg-[#1B1F24] border border-[#262B32] rounded-[16px] h-[46px] flex-shrink-0">
          <button
            onClick={() => onTabChange("customers")}
            className={`flex flex-row items-center justify-center px-5 py-2.5 gap-2 h-[36px] rounded-[12px] transition-all cursor-pointer ${
              activeTab === "customers"
                ? "bg-[#D2F829] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-black"
                : "bg-transparent text-[#808794] hover:text-white"
            }`}
          >
            <UserPlus size={16} weight={activeTab === "customers" ? "bold" : "regular"} />
            <span className={`font-sans text-[12px] leading-4 tracking-[0.3px] ${activeTab === "customers" ? "font-bold" : "font-medium"}`}>
              Customers
            </span>
          </button>
          
          <button
            onClick={() => onTabChange("trainers")}
            className={`flex flex-row items-center justify-center px-5 py-2.5 gap-2 h-[36px] rounded-[12px] transition-all cursor-pointer ${
              activeTab === "trainers"
                ? "bg-[#D2F829] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-black"
                : "bg-transparent text-[#808794] hover:text-white"
            }`}
          >
            <ArrowsOut size={16} weight={activeTab === "trainers" ? "bold" : "regular"} />
            <span className={`font-sans text-[12px] leading-4 tracking-[0.3px] ${activeTab === "trainers" ? "font-bold" : "font-medium"}`}>
              Trainers
            </span>
          </button>
        </div>
        <div className="relative w-full sm:w-[288px] h-[38px] flex-shrink-0">
          <MagnifyingGlass
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747B87]"
            weight="regular"
          />
          <input
            type="text"
            placeholder="Search by name"
            className="w-full h-full bg-[#121417] border border-[#23272E] rounded-[12px] pl-10 pr-4 font-sans text-[12px] leading-[15px] text-white placeholder:text-[#747B87] focus:outline-none focus:border-[#D2F829] transition-colors"
          />
        </div>
        <button className="flex flex-row items-center justify-center px-4 py-2.5 gap-2 h-[38px] bg-[#121417] border border-[#D2F829] rounded-[12px] hover:bg-[rgba(210,248,41,0.05)] transition-colors cursor-pointer flex-shrink-0">
          <UserList size={16} className="text-[#D2F829]" weight="regular" />
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D2F829]">
            Past Customers
          </span>
          <CaretRight size={14} className="text-[#D2F829]" weight="bold" />
        </button>
      </div>
      <div className="flex flex-row justify-between items-center px-5 py-3 w-full sm:w-[210px] min-w-[210px] h-[70px] bg-[#15181C] border border-[#22272E] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[16px]">
        <div className="w-11 h-11 bg-[#192B15] border border-[rgba(210,248,41,0.2)] rounded-[12px] flex items-center justify-center">
          <Users size={20} className="text-[#D2F829]" weight="fill" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#848D9A]">
            TOTAL CUSTOMERS
          </span>
          <span className="font-sans font-black text-[24px] leading-[24px] text-[#D2F829]">
            324
          </span>
        </div>
      </div>
      
    </div>
  );
}
