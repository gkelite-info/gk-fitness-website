"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BellRinging, DeviceMobile, Clock, Info, CalendarBlank, ArrowRight, ArrowDown, FloppyDisk } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";

const priorNotificationOptions: DropdownOption[] = [
  { label: "1 Day Before", value: "1" },
  { label: "3 Days Before", value: "3" },
  { label: "7 Days Before", value: "7" },
  { label: "14 Days Before", value: "14" },
];

const accessDurationOptions: DropdownOption[] = [
  { label: "7 Days", value: "7" },
  { label: "14 Days", value: "14" },
  { label: "30 Days", value: "30" },
  { label: "60 Days", value: "60" },
];

export default function MemberAppAccessClient() {
  const router = useRouter();
  
  const [priorNotification, setPriorNotification] = useState<string>("7");
  const [allowAccess, setAllowAccess] = useState<boolean>(true);
  const [accessDuration, setAccessDuration] = useState<string>("30");

  const handleSave = () => {
    console.log("Saving preferences...", { priorNotification, allowAccess, accessDuration });
    router.back(); 
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 overflow-y-auto scrollbar-themed text-white">
      <div className="flex flex-col gap-2 w-full shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <h1 className="font-['Nimbus_Sans'] font-bold text-2xl sm:text-[28px] leading-8 tracking-[-0.6px] m-0">
            Member App Access
          </h1>
        </div>
        <p className="font-['Nimbus_Sans'] font-normal text-[13px] sm:text-sm text-[#94A3B8]">
          Manage how long members can use the app after their membership expires and when to send prior notifications.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        
        <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-[#B45309]/10 border border-[#B45309]/20 rounded-xl flex items-center justify-center shrink-0">
              <BellRinging size={22} weight="fill" className="text-[#F59E0B]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <h2 className="font-['Nimbus_Sans'] font-bold text-[16px] sm:text-[17px] text-white">Prior Notification</h2>
              <p className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#94A3B8]">Send a notification to members before their membership expires.</p>
            </div>
          </div>
          
          <div className="w-full relative">
            <Dropdown
              options={priorNotificationOptions}
              value={priorNotification}
              onChange={setPriorNotification}
              icon={<CalendarBlank size={18} weight="regular" className="text-[#94A3B8]" />}
              className="w-full"
              triggerClassName="relative flex flex-row items-center px-4 py-3 w-full bg-[#1A1C22] border border-[#232631] rounded-xl cursor-pointer h-12 hover:border-[#303744] transition-colors"
            />
          </div>

          <div className="flex items-start gap-2.5 bg-[#1A1C22] rounded-xl p-3 border border-[#232631]">
            <Info size={16} weight="fill" className="text-[#F59E0B] shrink-0 mt-0.5" />
            <span className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#94A3B8] leading-relaxed">
              Members will receive a notification this many days before their membership expiry date.
            </span>
          </div>
        </div>

        <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-5 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-[#1E293B] rounded-xl flex items-center justify-center shrink-0">
              <DeviceMobile size={22} weight="fill" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 sm:pr-2">
              <h2 className="font-['Nimbus_Sans'] font-bold text-[16px] sm:text-[17px] text-white leading-tight">Allow access after membership expiry</h2>
              <p className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#94A3B8]">Members can continue using the app for a selected period.</p>
            </div>
          </div>
          <div
            onClick={() => setAllowAccess(!allowAccess)}
            className={`w-[46px] h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors shrink-0 ${allowAccess ? 'bg-[#C8FF00]' : 'bg-[#334155]'}`}
          >
            <div className={`w-4 h-4 bg-black rounded-full shadow-sm transform transition-transform ${allowAccess ? 'translate-x-[22px]' : 'translate-x-0'}`} />
          </div>
        </div>

        <div className={`bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 transition-opacity duration-300 ${!allowAccess ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-[#1E293B] rounded-xl flex items-center justify-center shrink-0">
              <Clock size={22} weight="fill" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <h2 className="font-['Nimbus_Sans'] font-bold text-[16px] sm:text-[17px] text-white">Access Duration</h2>
              <p className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#94A3B8]">Select the duration for app access after expiry.</p>
            </div>
          </div>
          
          <div className="w-full relative">
            <Dropdown
              options={accessDurationOptions}
              value={accessDuration}
              onChange={setAccessDuration}
              icon={<CalendarBlank size={18} weight="regular" className="text-[#94A3B8]" />}
              className="w-full"
              triggerClassName="relative flex flex-row items-center px-4 py-3 w-full bg-[#1A1C22] border border-[#232631] rounded-xl cursor-pointer h-12 hover:border-[#303744] transition-colors"
            />
          </div>

          <div className="flex items-start gap-2.5 bg-[#1A1C22] rounded-xl p-3 border border-[#232631]">
            <Info size={16} weight="fill" className="text-[#C8FF00] shrink-0 mt-0.5" />
            <span className="font-['Nimbus_Sans'] text-[12px] sm:text-[13px] text-[#94A3B8] leading-relaxed">
              This duration will be applied to all members.
            </span>
          </div>

          <div className="bg-[#0A0B0E] border border-[#232631] rounded-xl p-5 flex flex-col gap-5 mt-2">
            <div className="flex items-center gap-2 w-fit bg-[#C8FF00]/10 px-2.5 py-1.5 rounded-md border border-[#C8FF00]/20">
               <CalendarBlank size={14} weight="bold" className="text-[#C8FF00]" />
               <span className="text-[#C8FF00] font-['Nimbus_Sans'] text-[11px] font-bold uppercase tracking-wider">Example</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-5 sm:gap-2">
              <div className="flex flex-col items-center sm:items-start gap-1.5">
                <span className="font-['Nimbus_Sans'] text-[12px] text-[#94A3B8]">Membership expires on</span>
                <div className="flex items-center gap-2">
                  <CalendarBlank size={16} className="text-[#94A3B8]" />
                  <span className="font-['Nimbus_Sans'] font-medium text-[15px] text-white">10 Aug 2026</span>
                </div>
              </div>
              
              <div className="hidden sm:flex shrink-0 opacity-50">
                <ArrowRight size={20} className="text-[#C8FF00]" />
              </div>
              <div className="flex sm:hidden shrink-0 opacity-50">
                <ArrowDown size={20} className="text-[#C8FF00]" />
              </div>

              <div className="flex flex-col items-center sm:items-end gap-1.5">
                <span className="font-['Nimbus_Sans'] text-[12px] text-[#94A3B8]">Access ends on</span>
                <div className="flex items-center gap-2">
                  <CalendarBlank size={16} weight="bold" className="text-[#C8FF00] drop-shadow-[0_0_8px_rgba(200,255,0,0.5)]" />
                  <span className="font-['Nimbus_Sans'] font-bold text-[15px] text-[#C8FF00]">09 Sep 2026</span>
                </div>
                <span className="font-['Nimbus_Sans'] text-[11px] text-[#64748B]">({accessDuration} Days after expiry)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-3 w-full mt-4 pb-12">
        <button
          onClick={handleSave}
          className="w-full h-[52px] bg-[#C8FF00] hover:bg-[#D4FF32] text-black font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FloppyDisk size={20} weight="bold" className="text-black" />
          <span>Save Changes</span>
        </button>
        <p className="text-center font-['Nimbus_Sans'] text-xs text-[#64748B]">
          Changes will be applied to all members immediately.
        </p>
      </div>

    </div>
  );
}
