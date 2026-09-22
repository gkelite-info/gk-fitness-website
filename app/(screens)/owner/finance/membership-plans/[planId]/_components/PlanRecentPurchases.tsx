"use client";

import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useRouter } from "next/navigation";

const PURCHASES_DATA = [
  { name: "Rahul Sharma", time: "Today • 09:45 AM", amount: "₹2,499", gender: "male" as const },
  { name: "Sneha Patel", time: "Today • 08:20 AM", amount: "₹2,499", gender: "female" as const },
  { name: "Amit Kumar", time: "Yesterday • 07:15 PM", amount: "₹2,499", gender: "male" as const },
  { name: "Neha Kapoor", time: "Yesterday • 06:30 PM", amount: "₹2,499", gender: "female" as const },
  { name: "Vikram Singh", time: "29 Jul 2026 • 06:10 PM", amount: "₹2,499", gender: "male" as const },
  { name: "Neha Kapoor", time: "Yesterday • 06:30 PM", amount: "₹2,499", gender: "female" as const },
  { name: "Vikram Singh", time: "29 Jul 2026 • 06:10 PM", amount: "₹2,499", gender: "male" as const }
];

export default function PlanRecentPurchases() {
  const router = useRouter();

  return (
    <div className="flex flex-col py-4 md:py-5 w-full h-full bg-[#12151B] border border-[#20252E] rounded-[16px]">
      <div className="flex flex-row justify-between items-center pb-4 px-4 md:px-5 w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Recent Purchases
        </h2>
      </div>

      <div className="flex flex-col flex-1 min-h-0 w-full mt-2 overflow-y-auto scrollbar-orange px-2 md:px-3">
        {PURCHASES_DATA.map((purchase, index) => (
          <div 
            key={index} 
            onClick={() => router.push(`/owner/finance/today/payments/${index}`)}
            className="flex flex-row justify-between items-center p-2 w-full gap-2 border-b border-[#20252E]/50 last:border-0 hover:bg-[#1A1F26] rounded-[8px] transition-colors cursor-pointer group"
          >
            <div className="flex flex-row items-center gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-full border border-slate-600/40 shrink-0 flex items-center justify-center overflow-hidden bg-slate-700/60">
                <Avatar gender={purchase.gender} className="w-[38px] h-[38px]" />
              </div>
              <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1 pr-2">
                <span className="font-[600] text-[13px] leading-[16px] text-white break-words w-full">
                  {purchase.name}
                </span>
                <span className="font-[400] text-[11px] leading-[16px] text-[#8590A2] break-words w-full group-hover:text-[#94A3B8] transition-colors">
                  {purchase.time}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 shrink-0">
              <span className="font-[700] text-[13px] leading-[16px] text-white text-right">
                {purchase.amount}
              </span>
              <CaretRight size={14} weight="regular" className="text-[#64748B] group-hover:text-white transition-colors shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
