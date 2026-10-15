"use client";

import { CaretRight } from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { PurchaseItem } from "./GymPassTypes";

interface GymPassRecentPurchasesCardProps {
  purchases?: PurchaseItem[];
  onViewAll?: () => void;
  onSelectPurchase?: (purchase: PurchaseItem) => void;
}

const defaultPurchases: PurchaseItem[] = [
  {
    id: "p1",
    userName: "Rohit Sharma",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    userGender: "male",
    passName: "Monthly Pass",
    passType: "Monthly Pass",
    price: 4999,
    timeAgo: "2h ago",
    date: "May 17, 2026",
  },
  {
    id: "p2",
    userName: "Neha Patel",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    userGender: "female",
    passName: "Day Pass",
    passType: "Day Pass",
    price: 799,
    timeAgo: "5h ago",
    date: "May 17, 2026",
  },
  {
    id: "p3",
    userName: "Vikram Singh",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    userGender: "male",
    passName: "Monthly Pass",
    passType: "Monthly Pass",
    price: 4999,
    timeAgo: "7h ago",
    date: "May 17, 2026",
  },
  {
    id: "p4",
    userName: "Neha Patel",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    userGender: "female",
    passName: "Day Pass",
    passType: "Day Pass",
    price: 799,
    timeAgo: "5h ago",
    date: "May 17, 2026",
  },
  {
    id: "p5",
    userName: "Rajesh Kumar",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    userGender: "male",
    passName: "Monthly Pass",
    passType: "Monthly Pass",
    price: 4999,
    timeAgo: "9h ago",
    date: "May 17, 2026",
  },
];

export default function GymPassRecentPurchasesCard({
  purchases = defaultPurchases,
  onViewAll,
  onSelectPurchase,
}: GymPassRecentPurchasesCardProps) {
  const displayItems = purchases.slice(0, 5);

  return (
    <div className="w-full h-full bg-[#13151B] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Recent Purchases
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Real-time gym subscriber feed
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4FF32] hover:text-[#c4ef2b] hover:underline cursor-pointer shrink-0 transition-colors"
        >
          <span>View All</span>
          <CaretRight size={13} weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-2.5 mt-4 flex-1 justify-between">
        {displayItems.map((item) => {
          const isMonthly = item.passType === "Monthly Pass";

          return (
            <div
              key={item.id}
              onClick={() => onSelectPurchase?.(item)}
              className="w-full bg-[#181A22] border border-[#242836] hover:border-[#383D50] hover:bg-[#1C1F2B] rounded-xl p-2.5 sm:px-3.5 sm:py-2.5 flex items-center justify-between gap-3 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#2D3344] relative">
                  <Avatar
                    src={item.userAvatar}
                    gender={item.userGender}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-white truncate leading-tight group-hover:text-[#D4FF32] transition-colors">
                    {item.userName}
                  </span>
                  <div className="mt-1">
                    <span
                      className={`inline-block text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                        isMonthly
                          ? "bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30"
                          : "bg-[#10B981]/15 text-[#6EE7B7] border border-[#10B981]/30"
                      }`}
                    >
                      {item.passType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium mt-0.5 whitespace-nowrap">
                  {item.timeAgo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
