"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserCirclePlus, Minus, Plus, Clock, Info, CalendarBlank } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";

const GAP_OPTIONS: DropdownOption[] = [
  "30 Minutes", "1 Hour", "2 Hours", "3 Hours", "4 Hours", "6 Hours", "12 Hours", "24 Hours"
].map(t => ({ label: t, value: t }));

export default function CheckInRulesClient() {
  const router = useRouter();
  
  const [dailyLimit, setDailyLimit] = useState(2);
  const [minimumGap, setMinimumGap] = useState("2 Hours");

  const incrementLimit = () => {
    setDailyLimit(prev => Math.min(prev + 1, 10));
  };

  const decrementLimit = () => {
    setDailyLimit(prev => Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    toast.success("Check-in rules saved successfully");
    router.back();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 overflow-y-auto scrollbar-themed text-white">
      <div className="flex flex-col gap-4 w-full shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-['Nimbus_Sans'] font-bold text-[24px] sm:text-[28px] leading-8 tracking-[-0.6px] m-0">
              Edit Check-in Rules
            </h1>
            <p className="font-['Nimbus_Sans'] font-normal text-[13px] sm:text-[14px] text-[#94A3B8]">
              Set how many times a customer can check in and the minimum gap.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="bg-[#12141A] border border-[#232631] rounded-[20px] p-5 sm:p-6 flex flex-col gap-6 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
            <div className="w-[48px] h-[48px] sm:w-[42px] sm:h-[42px] bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-full flex items-center justify-center shrink-0">
              <UserCirclePlus size={22} weight="regular" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 mt-1 sm:mt-0.5 text-center sm:text-left">
              <h2 className="font-['Nimbus_Sans'] font-bold text-[18px] sm:text-[17px] text-white">Daily Check-in Limit</h2>
              <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8]">How many times can a customer check in per day?</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-[#1A1C22] border border-[#232631] rounded-[14px] h-[52px] px-3">
            <button 
              onClick={decrementLimit}
              className="w-[34px] h-[34px] flex items-center justify-center bg-[#232631] hover:bg-[#303744] text-[#94A3B8] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <Minus size={16} weight="bold" />
            </button>
            <span className="font-['Nimbus_Sans'] font-bold text-[15px] text-white">{dailyLimit} {dailyLimit === 1 ? 'time' : 'times'}</span>
            <button 
              onClick={incrementLimit}
              className="w-[34px] h-[34px] flex items-center justify-center bg-[#232631] hover:bg-[#303744] text-[#C8FF00] rounded-lg transition-colors cursor-pointer"
            >
              <Plus size={16} weight="bold" />
            </button>
          </div>
        </div>

        <div className="bg-[#12141A] border border-[#232631] rounded-[20px] p-5 sm:p-6 flex flex-col gap-6 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
            <div className="w-[48px] h-[48px] sm:w-[42px] sm:h-[42px] bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-full flex items-center justify-center shrink-0">
              <Clock size={22} weight="regular" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 mt-1 sm:mt-0.5 text-center sm:text-left">
              <h2 className="font-['Nimbus_Sans'] font-bold text-[18px] sm:text-[17px] text-white">Minimum Gap Between Check-ins</h2>
              <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8]">Set the minimum time gap required between two check-ins.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <Dropdown
              options={GAP_OPTIONS}
              value={minimumGap}
              onChange={setMinimumGap}
              className="w-full"
              triggerClassName="relative flex flex-row items-center justify-between px-4 py-3.5 w-full bg-[#1A1C22] border border-[#232631] rounded-[14px] cursor-pointer h-[52px] hover:border-[#303744] transition-colors"
            />
            
            <div className="flex items-start gap-3 bg-[#1A1C22] border border-[#232631] rounded-[14px] p-4">
              <Info size={20} weight="regular" className="text-[#C8FF00] shrink-0 mt-0.5" />
              <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8] leading-relaxed">
                Customers can check in up to <span className="text-[#C8FF00] font-bold">{dailyLimit} {dailyLimit === 1 ? 'time' : 'times'}</span> per day, with at least <span className="text-[#C8FF00] font-bold">{minimumGap.toLowerCase()}</span> between each check-in.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#12141A] border border-[#232631] rounded-[20px] p-5 sm:p-6 flex flex-col w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
            <div className="w-[48px] h-[48px] sm:w-[42px] sm:h-[42px] bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-full flex items-center justify-center shrink-0">
              <CalendarBlank size={22} weight="regular" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 mt-1 sm:mt-0 text-center sm:text-left">
              <h2 className="font-['Nimbus_Sans'] font-bold text-[18px] sm:text-[17px] text-white">Rule Applies To</h2>
              <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8]">These rules will be applied to all active members.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2 pb-10">
        <button
          onClick={() => router.back()}
          className="w-full sm:w-[120px] h-[48px] bg-[#1A1C22] hover:bg-[#232631] border border-[#232631] text-white font-['Nimbus_Sans'] font-bold text-[15px] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full sm:w-[160px] h-[48px] bg-[#C8FF00] hover:bg-[#D4FF32] text-black font-['Nimbus_Sans'] font-bold text-[15px] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer ml-auto"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
}
