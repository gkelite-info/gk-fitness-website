import { Wallet, CheckCircle, Clock, User } from "@phosphor-icons/react/dist/ssr";

interface PayoutKpiCardsProps {
  totalPayable: string;
  totalPayableSub: string;
  paid: string;
  paidSub: string;
  pending: string;
  pendingSub: string;
  variant?: "gym" | "trainer";
}

export default function PayoutKpiCards({
  totalPayable,
  totalPayableSub,
  paid,
  paidSub,
  pending,
  pendingSub,
  variant = "gym",
}: PayoutKpiCardsProps) {
  const isTrainer = variant === "trainer";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full">
      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-[#303646]">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,255,50,0.1)] ${
            isTrainer
              ? "bg-[#0D261C] border border-[#164E37] text-[#10B981]"
              : "bg-[#222B14] border border-[#3B4C1A] text-[#D4FF32]"
          }`}
        >
          {isTrainer ? <User size={24} weight="fill" /> : <Wallet size={24} weight="fill" />}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            Total Payable
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight whitespace-nowrap">
            {totalPayable}
          </span>
          <span className="text-[11px] sm:text-xs text-[#64748B] font-medium mt-0.5 whitespace-nowrap">
            {totalPayableSub}
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-[#303646]">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0D261C] border border-[#164E37] flex items-center justify-center shrink-0 text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.1)]">
          <CheckCircle size={24} weight="fill" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">Paid</span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight whitespace-nowrap">
            {paid}
          </span>
          <span className="text-[11px] sm:text-xs text-[#64748B] font-medium mt-0.5 whitespace-nowrap">
            {paidSub}
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-[#303646] sm:col-span-2 lg:col-span-1">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#281E10] border border-[#4E3717] flex items-center justify-center shrink-0 text-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.1)]">
          <Clock size={24} weight="fill" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            Pending
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight whitespace-nowrap">
            {pending}
          </span>

          <span className="text-[11px] sm:text-xs text-[#64748B] font-medium mt-0.5 whitespace-nowrap">
            {pendingSub}
          </span>

        </div>
      </div>
    </div>
  );
}
