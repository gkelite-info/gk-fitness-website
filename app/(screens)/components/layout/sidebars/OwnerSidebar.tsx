"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Users, CurrencyInr, Compass, User, Barbell } from "@phosphor-icons/react";

const navLinks = [
  { name: "Home", href: "/owner", icon: House },
  { name: "Users", href: "/owner/users", icon: Users },
  { name: "Finance", href: "/owner/finance", icon: CurrencyInr },
  { name: "Explore", href: "/owner/explore", icon: Compass },
  { name: "Profile", href: "/owner/profile", icon: User },
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[256px] h-full bg-[#0E0F13] border-r border-[#1E2027] flex flex-col justify-between items-start px-4 py-6">
      <div className="flex flex-col items-start gap-8 w-full">
        {/* Logo Header */}
        <div className="flex flex-row items-center gap-3 px-3 w-full">
          <div className="w-10 h-10 bg-[#D4FF32] rounded-xl flex items-center justify-center relative z-10 shadow-[0_10px_15px_-3px_rgba(212,255,50,0.2),0_4px_6px_-4px_rgba(212,255,50,0.2)]">
            <div className="absolute inset-0 bg-white/5 rounded-xl z-0 pointer-events-none" />
            <Barbell size={24} weight="fill" className="text-black relative z-10" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-['Nimbus_Sans'] font-bold text-base leading-6 tracking-[-0.4px] text-white m-0">
              GK-Gym Life
            </h1>
            <span className="font-['Nimbus_Sans'] font-medium text-[11px] leading-4 text-[#94A3B8]">
              Owner Portal
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start gap-2 w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-row items-center px-4 py-3 gap-3.5 w-full h-[46px] rounded-2xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[rgba(212,255,50,0.18)] to-[rgba(212,255,50,0.05)] border border-[#D4FF32] shadow-[0_0_16px_rgba(212,255,50,0.12),inset_0_0_12px_1px_rgba(212,255,50,0.15)] text-[#D4FF32]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                  className={isActive ? "text-[#D4FF32]" : "text-[#94A3B8] group-hover:text-white"}
                />
                <span className={`font-['Nimbus_Sans'] text-sm leading-5 tracking-[0.35px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
