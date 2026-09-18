"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { logoutUser } from "@/app/api/auth/actions";
import { createClient } from "@/app/api/supabase/client";
import {
  SignOut,
  House,
  CreditCard,
  Barbell,
  BowlFood,
  ChartLineUp,
  DeviceMobile,
  User as UserIcon,
  X,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

export default function CustomerHeader() {
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
      await logoutUser();
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
      setIsLoggingOut(false);
    }
  };

  const displayName = profile?.name || user?.user_metadata?.fullName || user?.email?.split("@")[0] || "Customer";
  const displayEmail = profile?.email || user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1A1A1A] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E2029] to-[#2D3142] border border-[#2A2E3D] flex items-center justify-center text-[#D7FF00] font-bold text-sm shadow-inner overflow-hidden">
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
              GK Customer
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="relative w-10 h-10 rounded-2xl bg-[#141414] border border-[#222222] flex flex-col items-center justify-center gap-[5px] hover:bg-[#1A1A1A] hover:border-[#333333] active:scale-95 transition-all duration-300 group focus:outline-none"
        >
          <span
            className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[7px] bg-[#D7FF00]" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-[7px] bg-[#D7FF00]" : ""
            }`}
          />
        </button>
      </header>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-80 bg-[#121214] border-l border-[#222226] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-[#222226] flex items-center justify-between bg-[#0A0A0A]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D7FF00]/10 border border-[#D7FF00]/20 flex items-center justify-center text-[#D7FF00] font-bold text-base overflow-hidden">
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
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl bg-[#1C1C20] border border-[#2C2C32] flex items-center justify-center text-[#8E8E93] hover:text-white hover:bg-[#25252B] transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          <a
            href="/customer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[#1C1C20] text-[#D7FF00] font-semibold text-sm transition-all"
          >
            <House size={20} weight="fill" />
            <span>Dashboard</span>
          </a>

          <a
            href="gk-fitness://memberships"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#C0C0C6] hover:text-white hover:bg-[#1A1A1E] font-medium text-sm transition-all"
          >
            <CreditCard size={20} />
            <span>Memberships</span>
          </a>

          <a
            href="gk-fitness://workouts"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#C0C0C6] hover:text-white hover:bg-[#1A1A1E] font-medium text-sm transition-all"
          >
            <Barbell size={20} />
            <span>Workouts</span>
          </a>

          <a
            href="gk-fitness://nutrition"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#C0C0C6] hover:text-white hover:bg-[#1A1A1E] font-medium text-sm transition-all"
          >
            <BowlFood size={20} />
            <span>Nutrition</span>
          </a>

          <a
            href="gk-fitness://weekly-progress"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#C0C0C6] hover:text-white hover:bg-[#1A1A1E] font-medium text-sm transition-all"
          >
            <ChartLineUp size={20} />
            <span>Weekly Progress</span>
          </a>

          <div className="my-2 border-t border-[#222226]" />

          <a
            href="gk-fitness://"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[#D7FF00] bg-[#D7FF00]/10 hover:bg-[#D7FF00]/15 border border-[#D7FF00]/20 font-semibold text-sm transition-all"
          >
            <DeviceMobile size={20} weight="fill" />
            <span>Open in Native App</span>
          </a>
        </nav>

        <div className="p-4 border-t border-[#222226] bg-[#0A0A0A]/50">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-[#2A1515] hover:bg-[#3D1C1C] border border-[#542222] text-[#FF5555] font-semibold text-sm transition-all disabled:opacity-50"
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
