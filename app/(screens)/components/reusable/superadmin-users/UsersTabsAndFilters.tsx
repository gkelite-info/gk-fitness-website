"use client";

import { Users, User, Globe } from "@phosphor-icons/react";
import { UserRoleTab } from "./types";

interface UsersTabsAndFiltersProps {
  currentTab: UserRoleTab;
  onTabChange: (tab: UserRoleTab) => void;
}

const TABS: { key: UserRoleTab; label: string; icon: typeof Users }[] = [
  { key: "owners", label: "Owners", icon: Users },
  { key: "trainers", label: "Trainers", icon: User },
  { key: "global-trainers", label: "Global Trainers", icon: Globe },
  { key: "gym-customers", label: "Gym Customers", icon: Globe },
  { key: "individual-customers", label: "Individual Customers", icon: Globe },
];

export default function UsersTabsAndFilters({
  currentTab,
  onTabChange,
}: UsersTabsAndFiltersProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? "bg-[#D4FF32] text-black shadow-[0_0_14px_rgba(212,255,50,0.25)] font-bold"
                  : "bg-[#13151D] border border-[#222634] text-[#94A3B8] hover:text-white hover:border-[#323847]"
              }`}
            >
              <Icon size={16} weight={isActive ? "fill" : "regular"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
