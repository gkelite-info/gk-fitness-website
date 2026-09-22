import Link from "next/link";
import { CaretRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

interface PlanDetailsHeaderProps {
  planName: string;
}

export default function PlanDetailsHeader({ planName }: PlanDetailsHeaderProps) {
  return (
    <div className="flex flex-row items-start lg:items-center gap-4 w-full">
      <Link href="/owner/finance/today" className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white mt-1 lg:mt-0">
        <ArrowLeft size={16} />
      </Link>
      <div className="flex flex-col items-start gap-1 w-full">
        <h1 className="font-[800] text-[30px] leading-[36px] tracking-[-0.75px] text-white m-0">
          {planName}
        </h1>
      <div className="flex flex-row items-center gap-2">
        <Link 
          href="/owner/membership-plans" 
          className="font-[400] text-[12px] leading-[16px] text-[#8590A2] hover:text-white transition-colors cursor-pointer"
        >
          Membership Plans
        </Link>
        <CaretRight size={12} className="text-[#5C6675]" />
        <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF]">
          {planName}
        </span>
        </div>
      </div>
    </div>
  );
}
