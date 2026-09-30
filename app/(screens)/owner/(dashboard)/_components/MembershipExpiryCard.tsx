import { CalendarBlank, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';

interface MembershipExpiryCardProps {
  expiringToday: number;
  expiringNext3Days: number;
  expiringNext7Days: number;
  totalExpiring: number;
}

export default function MembershipExpiryCard({
  expiringToday,
  expiringNext3Days,
  expiringNext7Days,
  totalExpiring,
}: MembershipExpiryCardProps) {
  return (
    <div className="w-full bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-4 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[rgba(250,204,21,0.1)] flex items-center justify-center border border-[rgba(250,204,21,0.2)]">
            <CalendarBlank size={18} color="#FACC15" weight="bold" />
          </div>
          <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
            Membership Expiry
          </h3>
        </div>
        <Link href="/owner/membership-expiry" className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View Members
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-sans font-bold text-[32px] leading-[36px] text-[#F59E0B]">
          {totalExpiring}
        </span>
        <span className="font-sans font-medium text-[12px] leading-[18px] text-[#94A3B8]">
          Members expiring within next 7 days
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="bg-[#191B22] border border-[#222530] rounded-[12px] p-3 flex flex-col justify-center gap-1 min-h-[72px]">
          <span className="font-sans font-bold text-[20px] leading-[24px] text-[#F43F5E]">
            {expiringToday}
          </span>
          <span className="font-sans font-semibold text-[11px] leading-[14px] text-[#94A3B8]">
            Today
          </span>
        </div>
        <div className="bg-[#191B22] border border-[#222530] rounded-[12px] p-3 flex flex-col justify-center gap-1 min-h-[72px]">
          <span className="font-sans font-bold text-[20px] leading-[24px] text-[#FBBF24]">
            {expiringNext3Days}
          </span>
          <span className="font-sans font-semibold text-[11px] leading-[14px] text-[#94A3B8]">
            Next 3 Days
          </span>
        </div>
        <div className="bg-[#191B22] border border-[#222530] rounded-[12px] p-3 flex flex-col justify-center gap-1 min-h-[72px]">
          <span className="font-sans font-bold text-[20px] leading-[24px] text-[#34D399]">
            {expiringNext7Days}
          </span>
          <span className="font-sans font-semibold text-[11px] leading-[14px] text-[#94A3B8]">
            Next 7 Days
          </span>
        </div>
      </div>
    </div>
  );
}
