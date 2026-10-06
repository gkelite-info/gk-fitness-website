import { UsersThree, CalendarBlank, CalendarCheck, CalendarStar } from "@phosphor-icons/react/dist/ssr";

interface MembershipExpiryCardsProps {
  total7Days: number;
  todayCount: number;
  next3DaysCount: number;
  next7DaysCount: number;
}

export default function MembershipExpiryCards({ total7Days, todayCount, next3DaysCount, next7DaysCount }: MembershipExpiryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
      <div className="flex flex-row justify-between items-center p-5 bg-[#111622] border border-[rgba(245,158,11,0.3)] rounded-[16px] w-full">
        <div className="flex flex-col gap-1">
          <span className="font-sans font-bold text-[30px] leading-[36px] text-[#FBBF24]">{total7Days}</span>
          <span className="font-sans font-medium text-[11px] leading-[16px] text-[#717E95] w-[136px]">
            Total expiring within next 7 days
          </span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
          <UsersThree size={20} color="#FBBF24" />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center p-5 bg-[#111622] border border-[rgba(239,68,68,0.2)] rounded-[16px] w-full">
        <div className="flex flex-col gap-1">
          <span className="font-sans font-bold text-[30px] leading-[36px] text-[#F87171]">{todayCount}</span>
          <span className="font-sans font-medium text-[12px] leading-[16px] text-[#717E95]">Today</span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
          <CalendarBlank size={20} color="#F87171" />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center p-5 bg-[#111622] border border-[rgba(217,119,6,0.25)] rounded-[16px] w-full">
        <div className="flex flex-col gap-1">
          <span className="font-sans font-bold text-[30px] leading-[36px] text-[#F59E0B]">{next3DaysCount}</span>
          <span className="font-sans font-medium text-[12px] leading-[16px] text-[#717E95]">Next 3 Days</span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
          <CalendarCheck size={20} color="#F59E0B" />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center p-5 bg-[#111622] border border-[rgba(16,185,129,0.2)] rounded-[16px] w-full">
        <div className="flex flex-col gap-1">
          <span className="font-sans font-bold text-[30px] leading-[36px] text-[#34D399]">{next7DaysCount}</span>
          <span className="font-sans font-medium text-[12px] leading-[16px] text-[#717E95]">Next 7 Days</span>
        </div>
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]">
          <CalendarStar size={20} color="#34D399" />
        </div>
      </div>
    </div>
  );
}
