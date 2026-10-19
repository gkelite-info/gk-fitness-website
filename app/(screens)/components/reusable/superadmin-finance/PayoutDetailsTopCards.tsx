import { Buildings, CalendarBlank, Clock, CheckCircle, Wallet, User, CreditCard } from "@phosphor-icons/react/dist/ssr";

interface PayoutDetailsTopCardsProps {
  gymName: string;
  payoutMonth: string;
  status: "Paid" | "Pending";
  amount: string;
  nameLabel?: string;
  nameIcon?: "building" | "user";
  totalPayoutIcon?: "wallet" | "card";
}

export default function PayoutDetailsTopCards({
  gymName,
  payoutMonth,
  status,
  amount,
  nameLabel = "Gym Name",
  nameIcon = "building",
  totalPayoutIcon = "wallet",
}: PayoutDetailsTopCardsProps) {
  const isPaid = status === "Paid";

  return (
    <div className="w-full bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-4 items-center">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0D261C] border border-[#164E37] flex items-center justify-center shrink-0 text-[#10B981]">
            {nameIcon === "user" ? <User size={22} weight="fill" /> : <Buildings size={22} weight="fill" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">{nameLabel}</span>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-white whitespace-nowrap">
              {gymName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 min-w-0 sm:border-l sm:border-[#1E2430] sm:pl-4 lg:pl-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#181D26] border border-[#262F3E] flex items-center justify-center shrink-0 text-[#94A3B8]">
            <CalendarBlank size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">Payout Month</span>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-white whitespace-nowrap">
              {payoutMonth}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 min-w-0 lg:border-l lg:border-[#1E2430] lg:pl-6">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isPaid
                ? "bg-[#0D261C] border border-[#164E37] text-[#10B981]"
                : "bg-[#281E10] border border-[#4E3717] text-[#F59E0B]"
            }`}
          >
            {isPaid ? <CheckCircle size={22} weight="fill" /> : <Clock size={22} weight="fill" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] mb-1 whitespace-nowrap">Status</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold w-fit whitespace-nowrap ${
                isPaid
                  ? "bg-[#0D261C] text-[#10B981] border border-[#164E37]"
                  : "bg-[#281E10] text-[#F59E0B] border border-[#4E3717]"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 min-w-0 sm:border-l sm:border-[#1E2430] sm:pl-4 lg:pl-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#132A1C] border border-[#1E4D2C] flex items-center justify-center shrink-0 text-[#D4FF32]">
            {totalPayoutIcon === "card" ? <CreditCard size={22} weight="fill" /> : <Wallet size={22} weight="fill" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">Total Payout</span>
            <span className="text-sm sm:text-base lg:text-lg font-extrabold text-white whitespace-nowrap">
              {amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
