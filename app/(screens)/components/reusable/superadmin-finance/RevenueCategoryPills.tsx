import {
  Buildings,
  User,
  Users,
  Ticket,
} from "@phosphor-icons/react/dist/ssr";
import { RevenueCategory } from "./types";

interface RevenueCategoryPillsProps {
  selectedCategory: RevenueCategory;
  onSelectCategory: (cat: RevenueCategory) => void;
}

export default function RevenueCategoryPills({
  selectedCategory,
  onSelectCategory,
}: RevenueCategoryPillsProps) {
  const categories: {
    id: RevenueCategory;
    label: string;
    icon?: typeof Buildings;
    iconColor?: string;
  }[] = [
    { id: "all", label: "All" },
    { id: "gym-labels", label: "Gym Labels", icon: Buildings, iconColor: "text-[#10B981]" },
    { id: "customer-plans", label: "Customer Plans", icon: User, iconColor: "text-[#38BDF8]" },
    { id: "global-sessions", label: "Global Sessions", icon: Users, iconColor: "text-[#C084FC]" },
    { id: "gym-pass", label: "Gym Pass", icon: Ticket, iconColor: "text-[#FB923C]" },
  ];

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1 w-full shrink-0">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const Icon = cat.icon;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              isActive
                ? "bg-[#D4FF32] text-black border-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.3)]"
                : "bg-[#131720] border-[#232938] text-[#CBD5E1] hover:text-white hover:border-[#38435A]"
            }`}
          >
            {Icon && (
              <Icon
                size={16}
                weight="fill"
                className={isActive ? "text-black" : cat.iconColor}
              />
            )}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
