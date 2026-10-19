import {
  ArrowsDownUp,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
} from "@phosphor-icons/react";
import { TRANSACTIONS_KPI_DATA } from "./transactionsMockData";

const getAmountFontSize = (val: string) => {
  if (val.length >= 14) return "text-base sm:text-lg xl:text-lg 2xl:text-xl";
  if (val.length >= 10) return "text-lg sm:text-xl xl:text-xl 2xl:text-2xl";
  return "text-xl sm:text-2xl 2xl:text-3xl";
};

export default function TransactionsKpiCards() {
  const { totalTransactions, paymentReceived, paid, netBalance } =
    TRANSACTIONS_KPI_DATA;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full">
      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-[#343A4A] transition-all min-w-0 overflow-hidden">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0D261C] border border-[#164E37]/50 flex items-center justify-center shrink-0">
          <ArrowsDownUp size={20} weight="bold" className="text-[#10B981]" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs sm:text-sm text-[#94A3B8] font-medium whitespace-nowrap">
            Total Transactions
          </span>
          <span
            className={`${getAmountFontSize(
              String(totalTransactions)
            )} font-bold text-white mt-0.5 tracking-tight break-words leading-tight`}
            title={String(totalTransactions)}
          >
            {totalTransactions}
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-[#343A4A] transition-all min-w-0 overflow-hidden">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0D261C] border border-[#164E37]/50 flex items-center justify-center shrink-0">
          <ArrowDownLeft size={20} weight="bold" className="text-[#10B981]" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs sm:text-sm text-[#94A3B8] font-medium whitespace-nowrap">
            Payment Received
          </span>
          <span
            className={`${getAmountFontSize(
              paymentReceived.amount
            )} font-bold text-white mt-0.5 tracking-tight break-words leading-tight`}
            title={paymentReceived.amount}
          >
            {paymentReceived.amount}
          </span>
          <span className="text-[11px] sm:text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
            {paymentReceived.countText}
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-[#343A4A] transition-all min-w-0 overflow-hidden">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2E1F0E] border border-[#593D15]/50 flex items-center justify-center shrink-0">
          <ArrowUpRight size={20} weight="bold" className="text-[#F59E0B]" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs sm:text-sm text-[#94A3B8] font-medium whitespace-nowrap">
            Paid
          </span>
          <span
            className={`${getAmountFontSize(
              paid.amount
            )} font-bold text-white mt-0.5 tracking-tight break-words leading-tight`}
            title={paid.amount}
          >
            {paid.amount}
          </span>
          <span className="text-[11px] sm:text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
            {paid.countText}
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-[#343A4A] transition-all min-w-0 overflow-hidden">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0E2333] border border-[#164463]/50 flex items-center justify-center shrink-0">
          <CreditCard size={20} weight="fill" className="text-[#06B6D4]" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs sm:text-sm text-[#94A3B8] font-medium whitespace-nowrap">
            Net Balance
          </span>
          <span
            className={`${getAmountFontSize(
              netBalance
            )} font-bold text-[#D4FF32] mt-0.5 tracking-tight break-words leading-tight`}
            title={netBalance}
          >
            {netBalance}
          </span>
        </div>
      </div>
    </div>
  );
}
