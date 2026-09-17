"use client";

import { UserPlus, Megaphone, QrCode, Package, Receipt, Fingerprint, NotePencil, Fire, CaretRight } from "@phosphor-icons/react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Member",
      icon: <UserPlus size={24} className="text-[#34D399]" weight="duotone" />,
      bg: "bg-[#141b16]/90",
      border: "border-[#10b981]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(34,197,94,0.28)]",
      iconBg: "bg-gradient-to-br from-[#34d399]/20 to-[#84cc16]/20",
      iconBorder: "border-[#34d399]/40",
    },
    {
      title: "Announcement",
      icon: <Megaphone size={24} className="text-[#c084fc]" weight="duotone" />,
      bg: "bg-[#1a1424]/90",
      border: "border-[#a855f7]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(168,85,247,0.28)]",
      iconBg: "bg-gradient-to-br from-[#c084fc]/20 to-[#d946ef]/20",
      iconBorder: "border-[#c084fc]/40",
    },
    {
      title: "Open Check-in",
      icon: <QrCode size={24} className="text-[#22d3ee]" weight="duotone" />,
      bg: "bg-[#111c24]/90",
      border: "border-[#06b6d4]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(6,182,212,0.28)]",
      iconBg: "bg-gradient-to-br from-[#22d3ee]/20 to-[#0ea5e9]/20",
      iconBorder: "border-[#22d3ee]/40",
    },
    {
      title: "Manage Inventory",
      icon: <Package size={24} className="text-[#fb923c]" weight="duotone" />,
      bg: "bg-[#221711]/90",
      border: "border-[#f97316]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(249,115,22,0.28)]",
      iconBg: "bg-gradient-to-br from-[#fb923c]/20 to-[#f59e0b]/20",
      iconBorder: "border-[#fb923c]/40",
    },
    {
      title: "Record Payment",
      icon: <Receipt size={24} className="text-[#facc15]" weight="duotone" />,
      bg: "bg-[#201c10]/90",
      border: "border-[#f59e0b]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(234,179,8,0.28)]",
      iconBg: "bg-gradient-to-br from-[#facc15]/20 to-[#f59e0b]/20",
      iconBorder: "border-[#facc15]/40",
    },
    {
      title: "Manage Biometric",
      icon: <Fingerprint size={24} className="text-[#fb7185]" weight="duotone" />,
      bg: "bg-[#221319]/90",
      border: "border-[#f43f5e]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(244,63,94,0.28)]",
      iconBg: "bg-gradient-to-br from-[#fb7185]/20 to-[#ec4899]/20",
      iconBorder: "border-[#fb7185]/40",
    },
    {
      title: "Create Plan",
      icon: <NotePencil size={24} className="text-[#818cf8]" weight="duotone" />,
      bg: "bg-[#141628]/90",
      border: "border-[#6366f1]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(99,102,241,0.28)]",
      iconBg: "bg-gradient-to-br from-[#818cf8]/20 to-[#3b82f6]/20",
      iconBorder: "border-[#818cf8]/40",
    },
    {
      title: "PT Sessions",
      icon: <Fire size={24} className="text-[#f87171]" weight="duotone" />,
      bg: "bg-[#231313]/90",
      border: "border-[#ef4444]/30",
      shadow: "shadow-[0_10px_24px_-8px_rgba(239,68,68,0.28)]",
      iconBg: "bg-gradient-to-br from-[#f87171]/20 to-[#f43f5e]/20",
      iconBorder: "border-[#f87171]/40",
    },
  ];

  return (
    <>
      <div className="w-full bg-[#14151A] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-base text-white tracking-wide">Quick Actions</h3>
          <a href="#" className="cursor-pointer flex items-center gap-1 text-xs font-semibold text-[#D4FF32] hover:underline">
            View All <CaretRight size={12} weight="bold" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center justify-center p-4 h-[114px] rounded-xl border transition-transform hover:scale-[1.02] active:scale-95 ${action.bg} ${action.border} ${action.shadow}`}
            >
              <div className={`w-11 h-11 mb-3 flex items-center justify-center rounded-xl border shadow-inner ${action.iconBg} ${action.iconBorder}`}>
                {action.icon}
              </div>
              <span className="text-xs font-medium text-[#E2E8F0] text-center leading-tight">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-[#14151A] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-base text-white tracking-wide">Management Shortcuts</h3>
          <a href="#" className="cursor-pointer flex items-center gap-1 text-xs font-semibold text-[#D4FF32] hover:underline">
            Edit <CaretRight size={12} weight="bold" />
          </a>
        </div>
        <div className="flex flex-wrap gap-3">
          {["Staff Attendance", "PT Session Details", "Request Details", "Expense Log"].map((shortcut, idx) => (
            <button key={idx} className="cursor-pointer flex items-center gap-2.5 px-4 py-3 bg-[#191B22] border border-[#222530] rounded-xl text-xs font-medium text-[#CBD5E1] hover:bg-[#1f222d] transition-colors">
              <CaretRight size={12} weight="bold" className="text-[#D4FF32]" />
              {shortcut}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
