"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  ShieldCheck,
  Question,
  LockKey,
  SignOut,
  CaretRight,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { logoutUser } from "@/app/api/supabase/helpers";

export default function SuperAdminSettingsCard() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleToggleNotifications = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    toast.dismiss("superadmin-notifications");
    toast.success(next ? "Notifications enabled" : "Notifications muted", {
      id: "superadmin-notifications",
    });
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to sign out. Please try again.");
      setIsLoggingOut(false);
      setIsLogoutOpen(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xs font-bold text-[#64748B] tracking-wider uppercase">
            SETTINGS & ACCOUNT OPTIONS
          </h3>
          <span className="text-xs text-[#64748B] whitespace-nowrap">
            Security & Preferences
          </span>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
          <div
            onClick={handleToggleNotifications}
            className="w-full bg-[#13151D] border border-[#1F2430] hover:border-[#2D3446] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,255,50,0.08)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                <Bell size={18} weight="bold" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Notifications
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5 truncate">
                  Manage notification preferences
                </span>
              </div>
            </div>

            <div
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 pointer-events-none ${
                notificationsEnabled ? "bg-[#D4FF32]" : "bg-[#232733]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition-transform duration-200 ${
                  notificationsEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          <Link
            href="/superadmin/profile/privacy-policy"
            className="w-full bg-[#13151D] border border-[#1F2430] hover:border-[#2D3446] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,255,50,0.08)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} weight="bold" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Privacy Policy
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5 truncate">
                  View our privacy policy
                </span>
              </div>
            </div>

            <CaretRight
              size={16}
              weight="bold"
              className="text-[#64748B] group-hover:text-white transition-colors shrink-0"
            />
          </Link>

          <div
            onClick={() => toast("Contact support: support@gkgymlife.com")}
            className="w-full bg-[#13151D] border border-[#1F2430] hover:border-[#2D3446] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,255,50,0.08)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                <Question size={18} weight="bold" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Help & Support
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5 truncate">
                  Get help and contact support
                </span>
              </div>
            </div>

            <CaretRight
              size={16}
              weight="bold"
              className="text-[#64748B] group-hover:text-white transition-colors shrink-0"
            />
          </div>

          <Link
            href="/superadmin/profile/change-password"
            className="w-full bg-[#13151D] border border-[#1F2430] hover:border-[#2D3446] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,255,50,0.08)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                <LockKey size={18} weight="bold" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Change Password
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5 truncate">
                  Update your account password securely
                </span>
              </div>
            </div>

            <CaretRight
              size={16}
              weight="bold"
              className="text-[#64748B] group-hover:text-white transition-colors shrink-0"
            />
          </Link>

          <div
            onClick={() => setIsLogoutOpen(true)}
            className="w-full bg-[#13151D] border border-[#1F2430] hover:border-red-500/30 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[rgba(239,68,68,0.1)] border border-red-500/25 text-[#EF4444] flex items-center justify-center shrink-0">
                <SignOut size={18} weight="bold" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-[#EF4444] leading-tight">
                  Logout
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5 truncate">
                  Sign out from your account
                </span>
              </div>
            </div>

            <CaretRight
              size={16}
              weight="bold"
              className="text-[#64748B] group-hover:text-[#EF4444] transition-colors shrink-0"
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out from your account? You will need to log in again to access the portal."
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        isConfirming={isLoggingOut}
        confirmingText="Signing out..."
        isDestructive={true}
      />
    </>
  );
}
