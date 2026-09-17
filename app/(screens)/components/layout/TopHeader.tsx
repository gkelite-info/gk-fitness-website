"use client";

import { MagnifyingGlass, UsersThree, Bell, Gear, List } from "@phosphor-icons/react";
import { useUser } from "@/app/context/UserContext";
import Avatar from "../reusable/Avatar";

interface TopHeaderProps {
  onOpenSidebar?: () => void;
}

export default function TopHeader({ onOpenSidebar }: TopHeaderProps) {
  const { profile, roleData, loading } = useUser();

  const formattedRole = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Gym Owner";

  const displayName = profile?.name || formattedRole;
  const gender = roleData && roleData.length > 0 ? roleData[0].gender : null;

  const formattedDate = new Intl.DateTimeFormat('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }).format(new Date());

  const currentHour = new Date().getHours();
  let greeting = "Good Evening";
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <header className="sticky top-0 z-40 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-5 w-full bg-[rgba(12,13,16,0.95)] border-b border-[#181A22] backdrop-blur-[6px] gap-4 sm:gap-0 h-auto sm:h-[101px]">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden flex items-center justify-center p-2 rounded-lg bg-[#15161C] border border-[#232631] text-white hover:bg-[#1f212a] transition-colors"
        >
          <List size={24} weight="bold" />
        </button>

        {loading ? (
          <div className="w-12 h-12 rounded-full bg-[#232631] animate-pulse flex-shrink-0 shadow-[0_0_0_2px_#222530]" />
        ) : (
          <Avatar 
            src={profile?.profilePhoto} 
            gender={gender} 
            className="w-12 h-12 shadow-[0_0_0_2px_#222530]" 
          />
        )}
        <div className="flex flex-col">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#94A3B8]">
            WELCOME BACK
          </span>
          {loading ? (
            <div className="h-6 w-40 sm:w-56 bg-[#232631] animate-pulse rounded my-0.5" />
          ) : (
            <h1 className="font-['Nimbus_Sans'] font-bold text-[18px] leading-[28px] text-white m-0">
              {greeting}, {displayName}
            </h1>
          )}
          <span className="font-['Nimbus_Sans'] font-medium text-[12px] leading-4 text-[#94A3B8]">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        <div className="relative flex-grow sm:flex-grow-0 w-full sm:w-[320px]">
          <MagnifyingGlass
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            weight="bold"
          />
          <input
            type="text"
            placeholder="Search members, payments, etc..."
            className="w-full h-[38px] bg-[#15161C] border border-[#232631] rounded-xl pl-10 pr-4 font-['Nimbus_Sans'] text-[12px] text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="cursor-pointer w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors">
            <UsersThree size={16} className="text-[#CBD5E1]" weight="regular" />
          </button>
          <button className="cursor-pointer relative w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors">
            <Bell size={16} className="text-[#CBD5E1]" weight="regular" />
            <div className="absolute right-[9px] top-[9px] w-2 h-2 bg-[#F43F5E] rounded-full shadow-[0_0_0_2px_#15161C]" />
          </button>
          <button className="cursor-pointer w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors">
            <Gear size={16} className="text-[#CBD5E1]" weight="regular" />
          </button>
        </div>
      </div>
    </header>
  );
}
