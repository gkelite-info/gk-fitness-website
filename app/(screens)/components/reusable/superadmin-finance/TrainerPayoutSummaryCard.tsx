import { ClipboardText, CreditCard, Users } from "@phosphor-icons/react/dist/ssr";

interface TrainerPayoutSummaryCardProps {
  monthlyPayout: string;
  sessionsCompleted: number;
}

export default function TrainerPayoutSummaryCard({
  monthlyPayout,
  sessionsCompleted,
}: TrainerPayoutSummaryCardProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 sm:gap-5 w-full">
      <div className="flex items-center gap-2 pb-1">
        <ClipboardText size={18} weight="fill" className="text-[#94A3B8]" />
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Payout Summary
        </h3>
      </div>

      <div
        className="w-full relative rounded-[12px] p-5 sm:p-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6 border border-[#CCFF00]/40 bg-[#10170F] overflow-hidden"
        style={{
          boxShadow: "0px 0px 15px -3px rgba(204, 255, 0, 0.07)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[12px] z-0"
          style={{
            background: "rgba(255, 255, 255, 0.002)",
            boxShadow: "0px 0px 15px -3px rgba(204, 255, 0, 0.07)",
          }}
        />

        <div className="flex items-center gap-4 z-10 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#132214] border border-[#234E2C] flex items-center justify-center shrink-0 text-[#D4FF32]">
            <CreditCard size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
              Fixed Monthly Payout
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF32] tracking-tight whitespace-nowrap">
              {monthlyPayout}
            </span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-12 bg-[#233520] shrink-0 z-10 mx-auto" />

        <div className="flex items-center gap-4 z-10 min-w-0 sm:justify-end">
          <div className="w-12 h-12 rounded-xl bg-[#141C26] border border-[#202B3B] flex items-center justify-center shrink-0 text-[#94A3B8]">
            <Users size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
              Sessions Completed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight whitespace-nowrap">
              {sessionsCompleted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
