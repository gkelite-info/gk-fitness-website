"use client";

import { MagnifyingGlass, UsersThree, Bell, SignOut, List } from "@phosphor-icons/react";
import { useUser } from "@/app/context/UserContext";
import Avatar from "../reusable/Avatar";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import AnnouncementsModal from "@/app/(screens)/owner/(dashboard)/_components/AnnouncementsModal";
import ConfirmationModal from "../reusable/ConfirmationModal";
import toast from "react-hot-toast";

interface TopHeaderProps {
  onOpenSidebar?: () => void;
}

export default function TopHeader({ onOpenSidebar }: TopHeaderProps) {
  const { profile, roleData, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isAnnouncementsModalOpen, setIsAnnouncementsModalOpen] = useState(false);
  const [hasUnreadAnnouncements, setHasUnreadAnnouncements] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const rolePrefix = profile?.role === "superadmin" ? "/superadmin" : "/owner";
  const communityRoute = `${rolePrefix}/community`;

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
    <header className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-5 w-full bg-[rgba(12,13,16,0.95)] border-b-[2px] border-[#232631] backdrop-blur-[6px] gap-4 sm:gap-0 h-auto sm:h-[101px]">
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

      <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">

        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => router.push(communityRoute)}
            className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              pathname.startsWith(communityRoute)
                ? "bg-[rgba(212,255,50,0.1)] border border-[#D4FF32] shadow-[0_0_16px_rgba(212,255,50,0.2),inset_0_0_8px_rgba(212,255,50,0.2)]"
                : "bg-[#15161C] border border-[#232631] hover:bg-[#1f212a]"
            }`}
          >
            <UsersThree 
              size={16} 
              className={pathname.startsWith(communityRoute) ? "text-[#D4FF32]" : "text-[#CBD5E1]"} 
              weight={pathname.startsWith(communityRoute) ? "fill" : "regular"} 
            />
          </button>
          <button
            onClick={() => {
              setHasUnreadAnnouncements(false);
              setIsAnnouncementsModalOpen(true);
            }}
            className="cursor-pointer relative w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors"
          >
            <Bell size={16} className="text-[#CBD5E1]" weight="regular" />
            {hasUnreadAnnouncements && (
              <div className="absolute right-[9px] top-[9px] w-2 h-2 bg-[#F43F5E] rounded-full shadow-[0_0_0_2px_#15161C]" />
            )}
          </button>
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="cursor-pointer w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition-colors group"
          >
            <SignOut size={16} className="text-[#EF4444] group-hover:text-red-400 transition-colors" weight="bold" />
          </button>
        </div>
      </div>

      {isAnnouncementsModalOpen && (
        <AnnouncementsModal onClose={() => setIsAnnouncementsModalOpen(false)} />
      )}

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          toast.success("Logged out successfully");
          router.push("/login");
        }}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
        cancelText="Cancel"
        isDestructive={true}
      />
    </header>
  );
}
