"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, Phone, Envelope, Globe,
  Users, Barbell, CreditCard,
  Crown, ArrowsLeftRight, Bell, User, ShieldCheck, Question, SignOut,
  CaretRight, CheckCircle, PencilSimple
} from "@phosphor-icons/react";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { logoutUser } from "@/app/api/supabase/helpers";

export default function ProfileClient() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  const menuItems = [
    { icon: Crown, title: "Membership Plans", desc: "Create, edit and manage membership plans", color: "text-[#C8FF00]" },
    { icon: Barbell, title: "Gym Access", desc: "Manage gym timings and customer check-in rules.", color: "text-[#C8FF00]" },
    { icon: Bell, title: "Notifications", desc: "Manage notification preferences", color: "text-[#C8FF00]", isToggle: true },
    { icon: User, title: "Member App Access", desc: "Choose how long members can continue", color: "text-[#C8FF00]" },
    { icon: ShieldCheck, title: "Privacy & Security", desc: "Change password and security settings", color: "text-[#C8FF00]" },
    { icon: Question, title: "Help & Support", desc: "Get help and contact support", color: "text-[#C8FF00]" },
    { icon: SignOut, title: "Logout", desc: "Sign out from your account", color: "text-[#F43F5E]", isDestructive: true, onClick: () => setIsLogoutModalOpen(true) },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 overflow-y-auto scrollbar-themed">
      <div className="flex flex-col gap-1 w-full shrink-0">
        <h1 className="font-['Nimbus_Sans'] font-black text-2xl sm:text-[28px] leading-8 text-white tracking-[-0.6px]">
          Profile
        </h1>
        <p className="font-['Nimbus_Sans'] font-normal text-sm text-[#94A3B8]">
          Manage your gym profile, facility settings, and operational preferences.
        </p>
      </div>

      <div className="w-full bg-[#12141A] border border-[#232631] rounded-2xl flex flex-col items-center pt-8 pb-6 px-6 gap-6 relative shrink-0">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-[#C8FF00] rounded-2xl flex items-center justify-center border-[3px] border-[#12141A] shadow-[0_0_20px_rgba(200,255,0,0.2)]">
            <Barbell size={40} weight="fill" className="text-black" />
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-[#C8FF00] rounded-full text-[#C8FF00] hover:bg-[#C8FF00]/10 transition-colors cursor-pointer">
            <PencilSimple size={14} weight="bold" />
            <span className="font-['Nimbus_Sans'] font-semibold text-xs tracking-wide">Edit Profile</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="font-['Nimbus_Sans'] font-bold text-2xl text-white">Gold Fitness</h2>
          <CheckCircle size={24} weight="fill" className="text-[#C8FF00]" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 w-full border-t border-[#232631] pt-6 mt-2">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <MapPin size={16} />
            <span className="font-['Nimbus_Sans'] text-sm">Hyderabad, India</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Phone size={16} />
            <span className="font-['Nimbus_Sans'] text-sm">+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Envelope size={16} />
            <span className="font-['Nimbus_Sans'] text-sm">info@goldfitness.com</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Globe size={16} />
            <span className="font-['Nimbus_Sans'] text-sm">www.goldfitness.in</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full shrink-0 mt-2">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[17px] text-white">Gym Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-6 sm:p-5 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-3">
            <div className="w-12 h-12 sm:w-8 sm:h-8 bg-[#1E293B] rounded-lg flex items-center justify-center shrink-0 text-[24px] sm:text-[16px]">
              <Users size="1em" weight="fill" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-1 items-center sm:items-start">
              <span className="font-['Nimbus_Sans'] text-sm sm:text-xs text-[#94A3B8]">Active Members</span>
              <span className="font-['Nimbus_Sans'] font-bold text-3xl sm:text-2xl text-white">324</span>
            </div>
            <span className="font-['Nimbus_Sans'] font-medium text-xs sm:text-[11px] text-[#C8FF00]">↑ 12 this month</span>
          </div>
          
          <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-6 sm:p-5 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-3">
            <div className="w-12 h-12 sm:w-8 sm:h-8 bg-[#1E293B] rounded-lg flex items-center justify-center shrink-0 text-[24px] sm:text-[16px]">
              <Barbell size="1em" weight="fill" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-1 items-center sm:items-start">
              <span className="font-['Nimbus_Sans'] text-sm sm:text-xs text-[#94A3B8]">Total Trainers</span>
              <span className="font-['Nimbus_Sans'] font-bold text-3xl sm:text-2xl text-white">18</span>
            </div>
            <span className="font-['Nimbus_Sans'] font-medium text-xs sm:text-[11px] text-[#C8FF00]">↑ 2 this month</span>
          </div>

          <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-6 sm:p-5 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-3">
            <div className="w-12 h-12 sm:w-8 sm:h-8 bg-[#1E293B] rounded-lg flex items-center justify-center shrink-0 text-[24px] sm:text-[16px]">
              <CreditCard size="1em" weight="fill" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-1 items-center sm:items-start">
              <span className="font-['Nimbus_Sans'] text-sm sm:text-xs text-[#94A3B8]">Membership Plans</span>
              <span className="font-['Nimbus_Sans'] font-bold text-3xl sm:text-2xl text-white">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full shrink-0 mt-2">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[17px] text-white">Manage Your Gym</h3>
        <div className="w-full bg-[#12141A] border border-[#232631] rounded-2xl flex flex-col overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isDestructive = item.isDestructive;
            return (
              <div 
                key={index}
                onClick={item.onClick}
                className={`flex items-center justify-between p-4 sm:p-5 transition-colors cursor-pointer ${
                  index !== menuItems.length - 1 ? 'border-b border-[#232631]' : ''
                } hover:bg-[#1A1C22]`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isDestructive ? 'bg-[#F43F5E]/10' : 'bg-[#1E293B]'}`}>
                    <Icon size={18} weight="fill" className={isDestructive ? 'text-[#F43F5E]' : item.color} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-['Nimbus_Sans'] font-bold text-[15px] ${isDestructive ? 'text-[#F43F5E]' : 'text-white'}`}>
                      {item.title}
                    </span>
                    <span className="font-['Nimbus_Sans'] text-xs text-[#94A3B8] hidden sm:block">
                      {item.desc}
                    </span>
                  </div>
                </div>

                {item.isToggle ? (
                  <div 
                    onClick={(e) => { e.stopPropagation(); setNotificationsEnabled(!notificationsEnabled); }}
                    className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${notificationsEnabled ? 'bg-[#C8FF00]' : 'bg-[#334155]'}`}
                  >
                    <div className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                ) : (
                  <CaretRight size={16} weight="bold" className="text-[#64748B]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Log Out of GK-Gym Life"
        message="Are you sure you want to log out? You will need to enter your credentials to access the portal again."
        confirmText="Log Out"
        isConfirming={isLoggingOut}
        isDestructive={true}
      />
    </div>
  );
}
