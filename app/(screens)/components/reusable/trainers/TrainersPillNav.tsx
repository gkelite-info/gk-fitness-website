"use client";

import { motion } from "framer-motion";
import { TrainerTab } from "./types";

interface TrainersPillNavProps {
  activeTab: TrainerTab;
  onTabChange: (tab: TrainerTab) => void;
}

const TABS: { id: TrainerTab; label: string }[] = [
  { id: "global", label: "Global Trainers" },
  { id: "gym", label: "Gym Trainers" },
];

export default function TrainersPillNav({
  activeTab,
  onTabChange,
}: TrainersPillNavProps) {
  return (
    <div className="w-full flex justify-center py-2">
      <div className="bg-[#141721] border border-[#222938] p-1 rounded-full flex items-center relative shadow-inner">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative z-10 px-5 sm:px-7 py-2 text-xs sm:text-sm rounded-full transition-colors font-bold whitespace-nowrap cursor-pointer ${
                isActive ? "text-black" : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTrainerPill"
                  className="absolute inset-0 bg-[#D4FF32] rounded-full -z-10 shadow-[0_2px_12px_rgba(212,255,50,0.35)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
