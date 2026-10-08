"use client";

import { UserCirclePlus, PencilSimple, ArrowsLeftRight, Clock } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckInRulesCard() {
  const router = useRouter();
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-[24px] flex flex-col p-6 w-full h-full">

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between pb-6 border-b border-[#232631]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
          <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-[14px] flex items-center justify-center shrink-0">
            <UserCirclePlus size={24} weight="regular" className="text-[#C8FF00]" />
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-1.5 pr-2 w-full text-center sm:text-left mt-1 sm:mt-0">
            <h2 className="font-['Nimbus_Sans'] font-bold text-[20px] sm:text-[18px] text-white leading-tight break-words">Customer Check-in Rules</h2>
            <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8]">Set how many times a customer can enter per day.</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/owner/profile/gym-access/check-in-rules')}
          className="absolute top-0 right-0 sm:relative w-[34px] h-[34px] bg-[#1A1C22] border border-[#232631] rounded-full flex items-center justify-center shrink-0 hover:bg-[#232631] transition-colors cursor-pointer sm:mt-0"
        >
          <PencilSimple size={16} weight="bold" className="text-[#94A3B8]" />
        </button>
      </div>


      <div className="flex flex-col mt-6 gap-5">
        

        <div className="bg-[#181A20] border border-[#232631] rounded-[16px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
            <div className="w-[42px] h-[42px] bg-[#C8FF00]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <ArrowsLeftRight size={20} weight="bold" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
              <h3 className="font-['Nimbus_Sans'] font-bold text-[15px] sm:text-[16px] text-white">Daily Check-in Limit</h3>
              <p className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#64748B] leading-tight max-w-[200px]">Maximum entries per customer per day</p>
            </div>
          </div>
          <button 
            onClick={() => toast.success("Change limit clicked")}
            className="self-center px-4 py-2 bg-[#12141A] border border-[#232631] rounded-lg font-['Nimbus_Sans'] font-bold text-[13px] sm:text-[14px] text-white hover:bg-[#232631] transition-colors cursor-pointer whitespace-nowrap"
          >
            2 times
          </button>
        </div>


        <div className="bg-[#181A20] border border-[#232631] rounded-[16px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
            <div className="w-[42px] h-[42px] bg-[#C8FF00]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Clock size={20} weight="bold" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
              <h3 className="font-['Nimbus_Sans'] font-bold text-[15px] sm:text-[16px] text-white">Minimum Gap<br className="hidden sm:block" />Between Check-ins</h3>
              <p className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#64748B] leading-tight max-w-[200px] mt-0.5 sm:mt-1">Time required between two check-ins</p>
            </div>
          </div>
          <button 
            onClick={() => toast.success("Change gap clicked")}
            className="self-center px-4 py-2 bg-[#12141A] border border-[#232631] rounded-lg font-['Nimbus_Sans'] font-bold text-[13px] sm:text-[14px] text-white hover:bg-[#232631] transition-colors cursor-pointer whitespace-nowrap"
          >
            2 Hours
          </button>
        </div>

      </div>
    </div>
  );
}
