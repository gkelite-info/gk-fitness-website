interface PayoutCalculationCardProps {
  entriesOrSessions: number;
  entriesLabel?: string;
  rate: number;
  totalAmount: string;
}

export default function PayoutCalculationCard({
  entriesOrSessions,
  entriesLabel = "Entries",
  rate,
  totalAmount,
}: PayoutCalculationCardProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 sm:gap-5 w-full">
      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
        Payout Calculation
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
        <div className="w-full sm:flex-1 bg-[#161922] border border-[#242A38] rounded-xl px-5 py-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF32] tracking-tight">
            {entriesOrSessions}
          </span>
          <span className="text-xs text-[#94A3B8] font-medium mt-1">
            {entriesLabel}
          </span>
        </div>

        <div className="text-xl sm:text-2xl font-bold text-[#64748B] shrink-0">
          ×
        </div>

        <div className="w-full sm:flex-1 bg-[#161922] border border-[#242A38] rounded-xl px-5 py-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF32] tracking-tight">
            ₹{rate}
          </span>
          <span className="text-xs text-[#94A3B8] font-medium mt-1">
            Per {entriesLabel === "Entries" ? "Entry" : "Session"}
          </span>
        </div>

        <div className="text-xl sm:text-2xl font-bold text-[#64748B] shrink-0">
          =
        </div>

        <div className="w-full sm:flex-1 bg-[#101914] border border-[#CCFF00]/35 rounded-[12px] px-5 py-4 flex flex-col items-center justify-center text-center shadow-[0px_0px_15px_-3px_rgba(204,255,0,0.12)]">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF32] tracking-tight whitespace-nowrap">
            {totalAmount}
          </span>
          <span className="text-xs text-[#94A3B8] font-medium mt-1 whitespace-nowrap">
            Total Payout
          </span>
        </div>

      </div>
    </div>
  );
}
