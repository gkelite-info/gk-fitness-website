"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  Barbell,
  Users,
  MagnifyingGlass,
  Star,
  ShieldCheck,
  EnvelopeSimple,
  Ticket,
  PlayCircle,
  MapPin,
  CurrencyCircleDollar,
  CookingPot,
  User,
} from "@phosphor-icons/react";

interface NavItem {
  name: string;
  href: string;
  icon: typeof Barbell;
  badge?: number;
}

const navLinks: NavItem[] = [
  { name: "Dashboard", href: "/superadmin", icon: SquaresFour },
  { name: "Recipes", href: "/superadmin/recipes", icon: CookingPot },
  { name: "Gym Pass", href: "/superadmin/gym-pass", icon: Ticket },
  { name: "Gym Locations", href: "/superadmin/gym-locations", icon: MapPin },
  { name: "Finance", href: "/superadmin/finance", icon: CurrencyCircleDollar },
  { name: "Gyms", href: "/superadmin/gyms", icon: Barbell, badge: 120 },
  { name: "Demo Requests", href: "/superadmin/demo-requests", icon: EnvelopeSimple },
  { name: "Website Videos", href: "/superadmin/website-videos", icon: PlayCircle },
  { name: "Trainers", href: "/superadmin/trainers", icon: Users, badge: 48 },
  { name: "Explore", href: "/superadmin/explore", icon: MagnifyingGlass },
  { name: "Plans & Subscriptions", href: "/superadmin/plans", icon: Star },
  { name: "Profile", href: "/superadmin/profile", icon: User },
  // { name: "Settings", href: "/superadmin/settings", icon: ShieldCheck },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pathname]);

  return (
    <div className="w-[268px] h-full bg-[#0E0F13] border-r-[2px] border-[#232631] flex flex-col px-3.5 py-6 overflow-hidden shrink-0">
      <div className="flex flex-row items-center gap-3 px-2.5 w-full shrink-0 mb-7">
        <div className="w-10 h-10 bg-[#D4FF32] rounded-xl flex items-center justify-center relative z-10 shadow-[0_10px_15px_-3px_rgba(212,255,50,0.2),0_4px_6px_-4px_rgba(212,255,50,0.2)]">
          <div className="absolute inset-0 bg-white/5 rounded-xl z-0 pointer-events-none" />
          <Barbell size={24} weight="fill" className="text-black relative z-10" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-base leading-6 tracking-[-0.4px] text-white m-0">
            GK-Gym Life
          </h1>
          <span className="font-medium text-[11px] leading-4 text-[#94A3B8]">
            SuperAdmin Portal
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1.5 w-full flex-1 overflow-y-auto overflow-x-hidden scrollbar-themed pr-2">
        {navLinks.map((link) => {
          const isDashboard = link.href === "/superadmin";
          const isActive = isDashboard
            ? pathname === "/superadmin" || pathname.startsWith("/superadmin/users")
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              prefetch={true}
              ref={isActive ? activeItemRef : null}
              className={`flex flex-row items-center px-3.5 py-2.5 gap-2.5 w-full h-[44px] rounded-xl transition-all cursor-pointer shrink-0 ${isActive
                  ? "bg-gradient-to-r from-[rgba(212,255,50,0.18)] to-[rgba(212,255,50,0.05)] border border-[#D4FF32] sidebar-glow text-[#D4FF32]"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.03]"
                }`}
            >
              <Icon
                size={20}
                weight={isActive ? "fill" : "regular"}
                className={isActive ? "text-[#D4FF32] shrink-0" : "text-[#94A3B8] group-hover:text-white shrink-0"}
              />
              <span
                className={`text-[13.5px] leading-tight tracking-[0.2px] truncate ${isActive ? "font-semibold" : "font-medium"
                  }`}
              >
                {link.name}
              </span>

              {link.badge !== undefined && (
                <span
                  className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold shrink-0 transition-colors ${isActive
                      ? "bg-[#D4FF32] text-black shadow-[0_0_8px_rgba(212,255,50,0.35)]"
                      : "bg-[#181A20] text-[#64748B]"
                    }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
