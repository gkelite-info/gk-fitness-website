import { Crown, Users, CurrencyInr, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";

interface PlanDetailsHeroProps {
  planName: string;
}

export default function PlanDetailsHero({ planName }: PlanDetailsHeroProps) {
  return (
    <div 
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 gap-8 w-full rounded-[16px] border border-[#262C36] shadow-[inset_0px_1px_1px_1px_rgba(245,158,11,0.25)] overflow-hidden"
      style={{
        background: 'linear-gradient(120deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 43%, rgba(20, 24, 30, 0.95) 50%, #13171D 100%)'
      }}
    >
      <div className="flex flex-row items-center gap-5 relative z-10">
        <div 
          className="flex justify-center items-center p-0.5 rounded-[16px] shrink-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]"
          style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)' }}
        >
          <div className="flex justify-center items-center w-[60px] h-[60px] bg-[#F59E0B] rounded-[14px] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
            <Crown size={32} weight="fill" className="text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-center gap-2 flex-wrap">
            <h3 className="font-['Sora'] font-[600] text-[22px] leading-[32px] tracking-[-0.6px] text-white m-0 break-words">
              {planName}
            </h3>
            <div className="flex flex-row items-center px-2.5 py-0.5 bg-[#2A2412] border border-[#9B801F] rounded-full shrink-0">
              <span className="font-['Sora'] font-[400] text-[11px] leading-[16px] text-[#F7DC53] whitespace-nowrap">
                Active Plan
              </span>
            </div>
          </div>
          <span className="font-[400] text-[14px] leading-[20px] text-[#8590A2]">
            Premium fitness. A stronger you.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-center gap-6 lg:gap-0 w-full lg:w-auto relative z-10">
        
        {/* Stat 1 */}
        <div className="flex flex-col items-start gap-1 lg:pl-2 lg:pr-6">
          <div className="flex flex-row items-center gap-2">
            <div className="flex justify-center items-center w-5 h-5 bg-[#1D2A1B] rounded-[6px] shrink-0">
              <Users size={12} weight="fill" className="text-[#55C942]" />
            </div>
            <span className="font-[400] text-[12px] leading-[16px] text-[#8590A2] whitespace-nowrap">
              Active Members
            </span>
          </div>
          <span className="font-[800] text-[20px] sm:text-[24px] lg:text-[30px] leading-[30px] tracking-[-0.75px] text-white truncate w-full">
            412
          </span>
          <span className="font-[400] text-[12px] leading-[16px] text-[#5C6675]">
            Total Members
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-start gap-1 lg:px-6 lg:border-l border-[#20262F]">
          <div className="flex flex-row items-center gap-2">
            <div className="flex justify-center items-center w-5 h-5 bg-[#251A3A] rounded-[6px] shrink-0">
              <CurrencyInr size={12} weight="bold" className="text-[#A855F7]" />
            </div>
            <span className="font-[400] text-[12px] leading-[16px] text-[#8590A2] whitespace-nowrap">
              Revenue This Month
            </span>
          </div>
          <span className="font-[800] text-[20px] sm:text-[24px] lg:text-[30px] leading-[30px] tracking-[-0.75px] text-white truncate w-full">
            ₹ 1,85,000
          </span>
          <span className="font-[400] text-[12px] leading-[16px] text-[#5C6675] whitespace-nowrap">
            From Plan Purchases
          </span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-start gap-1 lg:pl-6 lg:border-l border-[#20262F] col-span-2 sm:col-span-1 lg:col-auto mt-2 sm:mt-0 lg:mt-0">
          <div className="flex flex-row items-center gap-2">
            <div className="flex justify-center items-center w-5 h-5 bg-[#162738] rounded-[6px] shrink-0">
              <ArrowsClockwise size={12} weight="bold" className="text-[#38BDF8]" />
            </div>
            <span className="font-[400] text-[12px] leading-[16px] text-[#8590A2] whitespace-nowrap">
              Renewals
            </span>
          </div>
          <span className="font-[800] text-[20px] sm:text-[24px] lg:text-[30px] leading-[30px] tracking-[-0.75px] text-white truncate w-full">
            96
          </span>
          <span className="font-[400] text-[12px] leading-[16px] text-[#5C6675] whitespace-nowrap">
            This Month
          </span>
        </div>

      </div>
    </div>
  );
}
