interface PayoutCategoryPillsProps {
  selectedSubTab: "gym-owners" | "global-trainers";
  onSelectSubTab: (tab: "gym-owners" | "global-trainers") => void;
}

export default function PayoutCategoryPills({
  selectedSubTab,
  onSelectSubTab,
}: PayoutCategoryPillsProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-[#12141A] border border-[#232631] rounded-full w-fit shadow-inner">
      <button
        type="button"
        onClick={() => onSelectSubTab("gym-owners")}
        className={`px-5 sm:px-6 py-2 text-xs sm:text-sm rounded-full transition-all cursor-pointer whitespace-nowrap font-bold ${
          selectedSubTab === "gym-owners"
            ? "bg-[#D4FF32] text-black shadow-[0_2px_12px_rgba(212,255,50,0.35)]"
            : "text-[#94A3B8] hover:text-white"
        }`}
      >
        Gym Owners
      </button>
      <button
        type="button"
        onClick={() => onSelectSubTab("global-trainers")}
        className={`px-5 sm:px-6 py-2 text-xs sm:text-sm rounded-full transition-all cursor-pointer whitespace-nowrap font-bold ${
          selectedSubTab === "global-trainers"
            ? "bg-[#D4FF32] text-black shadow-[0_2px_12px_rgba(212,255,50,0.35)]"
            : "text-[#94A3B8] hover:text-white"
        }`}
      >
        Global Trainers
      </button>
    </div>
  );
}

