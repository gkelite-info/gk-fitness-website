"use client";

import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useRouter } from "next/navigation";

interface PlanRecentPurchasesProps {
  purchases?: any[];
}

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
  const timePart = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  return `${datePart} • ${timePart}`;
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(val);
};

export default function PlanRecentPurchases({ purchases = [] }: PlanRecentPurchasesProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col py-4 md:py-5 w-full h-full bg-[#12151B] border border-[#20252E] rounded-[16px]">
      <div className="flex flex-row justify-between items-center pb-4 px-4 md:px-5 w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Recent Purchases
        </h2>
      </div>

      <div className="flex flex-col flex-1 min-h-0 w-full mt-2 overflow-y-auto scrollbar-orange px-2 md:px-3">
        {purchases.length > 0 ? (
          purchases.map((purchase, index) => {
            const name = purchase.gym_customers?.users?.name || purchase.gym_customers?.fullName || 'Unknown User';
            const gender = purchase.gym_customers?.users?.gender || 'male';
            return (
              <div 
                key={index} 
                className="flex flex-row justify-between items-center p-2 rounded-[8px] hover:bg-[#1A1F26] transition-colors cursor-pointer group"
                onClick={() => router.push(`/owner/finance/today/payments/${purchase.id || purchase.gymPaymentId}`)}
              >
                <div className="flex flex-row items-center gap-3">
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden bg-slate-700/60">
                    <Avatar gender={gender} className="w-[30px] h-[30px]" />
                  </div>
                  <div className="flex flex-col items-start justify-center min-w-0">
                    <span className="font-[600] text-[13px] leading-[18px] text-white truncate w-full group-hover:text-white transition-colors">
                      {name}
                    </span>
                    <span className="font-[400] text-[11px] leading-[14px] text-[#64748B] truncate w-full group-hover:text-[#94A3B8] transition-colors mt-0.5">
                      {formatDateTime(purchase.createdAt || purchase.paymentDate)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-row items-center gap-2 pl-2">
                  <span className="font-[700] text-[13px] leading-[18px] text-white group-hover:text-white transition-colors">
                    ₹{formatCurrency(purchase.amountPaid || 0)}
                  </span>
                  <CaretRight size={14} className="text-[#64748B] group-hover:text-white transition-colors shrink-0" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center py-6 h-full">
            <span className="text-sm text-[#94A3B8]">No recent purchases.</span>
          </div>
        )}
      </div>
    </div>
  );
}
