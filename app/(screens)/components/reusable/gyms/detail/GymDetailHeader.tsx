"use client";

import { ArrowLeft, UsersThree, Users, User, Barbell, Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { DetailTab } from "./types";

interface GymDetailHeaderProps {
  gymName: string;
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  counts: { customers: number; trainers: number; owners: number };
}

export default function GymDetailHeader({
  gymName,
  activeTab,
  onTabChange,
  counts,
}: GymDetailHeaderProps) {
  const router = useRouter();

  const tabs: { key: DetailTab; label: string; count: number; icon: typeof Users }[] = [
    { key: "customers", label: "Customers", count: counts.customers, icon: UsersThree },
    { key: "trainers", label: "Trainers", count: counts.trainers, icon: Users },
    { key: "owners", label: "Owners", count: counts.owners, icon: User },
  ];

  return (
    <div className="w-full flex flex-col gap-4 border-b border-[#20293A] pb-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => router.push("/superadmin/gyms")}
            aria-label="Back to gyms"
            className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>

          <div className="w-11 h-11 flex items-center justify-center bg-[#171F2C] border border-[rgba(245,158,11,0.3)] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4)] shrink-0">
            <Star size={22} weight="fill" className="text-[#FBBF24]" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
            {gymName}
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-7 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-2 pb-2.5 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? "border-[#D4FF00] text-[#D4FF00]"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                <Icon size={16} weight={isActive ? "fill" : "regular"} className="shrink-0" />
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                    isActive
                      ? "bg-[rgba(212,255,0,0.2)] text-[#D4FF00]"
                      : "bg-[#18202D] text-[#94A3B8]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
