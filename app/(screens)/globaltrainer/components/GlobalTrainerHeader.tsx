"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { logoutUser as logoutUserServer } from "@/app/api/auth/actions";
import { logoutUser as logoutUserClient } from "@/app/api/supabase/helpers";
import { openAppOrStore } from "@/app/utils/deepLink";
import {
  UsersThree,
  Bell,
  SignOut,
  House,
  CalendarBlank,
  Barbell,
  DeviceMobile,
  X,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

export default function GlobalTrainerHeader() {
  const { profile, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUserServer().catch(() => {});
      await logoutUserClient().catch(() => {});
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  const rawName = profile?.name || user?.user_metadata?.name || user?.user_metadata?.fullName || "";
  const displayName = rawName && rawName.toLowerCase() !== "global trainer" ? rawName : "Rahul";
  const displayEmail = profile?.email || user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1A1A1A] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E2029] to-[#2D3142] border border-[#2A2E3D] flex items-center justify-center text-[#D4FF32] font-bold text-sm shadow-inner overflow-hidden shrink-0">
            {profile?.profilePhoto ? (
              <img src={profile.profilePhoto} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold leading-tight">
              {displayName}
            </span>
            <span className="text-[#8E8E93] text-[10px] font-medium tracking-wide uppercase">
              Global Trainer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openAppOrStore("community")}
            aria-label="Community"
            className="w-10 h-10 rounded-2xl bg-[#141414] border border-[#222222] flex items-center justify-center text-[#94A3B8] hover:text-[#D4FF32] hover:border-[#333333] transition-colors cursor-pointer shrink-0"
          >
            <UsersThree size={20} weight="regular" />
          </button>

          <button
            type="button"
            onClick={() => openAppOrStore("notifications")}
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-2xl bg-[#141414] border border-[#222222] flex items-center justify-center text-[#94A3B8] hover:text-[#D4FF32] hover:border-[#333333] transition-colors cursor-pointer shrink-0"
          >
            <Bell size={20} weight="regular" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#F43F5E]" />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="relative w-10 h-10 rounded-2xl bg-[#141414] border border-[#222222] flex flex-col items-center justify-center gap-[5px] hover:bg-[#1A1A1A] hover:border-[#333333] active:scale-95 transition-all duration-300 group focus:outline-none cursor-pointer shrink-0"
          >
            <span
              className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-[7px] bg-[#D4FF32]" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-[7px] bg-[#D4FF32]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        />
      )}

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-80 bg-[#121214] border-l border-[#222226] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-[#222226] flex items-center justify-between bg-[#0A0A0A]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center text-[#D4FF32] font-bold text-base overflow-hidden shrink-0">
              {profile?.profilePhoto ? (
                <img src={profile.profilePhoto} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white text-sm font-bold truncate">
                {displayName}
              </span>
              <span className="text-[#8E8E93] text-xs truncate">
                {displayEmail}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 rounded-xl bg-[#1C1C20] border border-[#2C2C32] flex items-center justify-center text-[#8E8E93] hover:text-white hover:bg-[#25252B] transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openAppOrStore("dashboard");
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[#1C1C20] text-[#D4FF32] font-semibold text-sm transition-all cursor-pointer text-left"
          >
            <House size={20} weight="fill" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openAppOrStore("schedule");
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#C0C0C6] hover:text-white hover:bg-[#1A1A1E] font-medium text-sm transition-all cursor-pointer text-left"
          >
            <CalendarBlank size={20} />
            <span>Today's Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openAppOrStore("programs");
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#C0C0C6] hover:text-white hover:bg-[#1A1A1E] font-medium text-sm transition-all cursor-pointer text-left"
          >
            <Barbell size={20} />
            <span>Workout Programs</span>
          </button>

          <div className="my-2 border-t border-[#222226]" />

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openAppOrStore("home");
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#D4FF32] bg-[#D4FF32]/10 hover:bg-[#D4FF32]/15 border border-[#D4FF32]/20 font-semibold text-sm transition-all cursor-pointer text-left"
          >
            <DeviceMobile size={20} weight="fill" />
            <span>Open in Native App</span>
          </button>
        </nav>

        <div className="p-4 border-t border-[#222226] bg-[#0A0A0A]/50">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-[#2A1515] hover:bg-[#3D1C1C] border border-[#542222] text-[#FF5555] font-semibold text-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoggingOut ? (
              <div className="w-5 h-5 border-2 border-[#FF5555] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <SignOut size={18} weight="bold" />
                <span>Log Out</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

