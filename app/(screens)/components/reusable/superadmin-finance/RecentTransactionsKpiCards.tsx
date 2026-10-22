import {
  ArrowsDownUp,
  CreditCard,
  Check,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { RecentTransactionsKpis } from "./recentTransactionsTypes";

interface RecentTransactionsKpiCardsProps {
  kpis: RecentTransactionsKpis;
}

export default function RecentTransactionsKpiCards({
  kpis,
}: RecentTransactionsKpiCardsProps) {
  const cards = [
    {
      id: "total",
      title: "Total Transactions",
      value: kpis.totalTransactions.toLocaleString("en-IN"),
      icon: <ArrowsDownUp size={20} weight="bold" className="text-[#10B981]" />,
      bg: "bg-[#0D261C] border-[#164E37]/60",
    },
    {
      id: "received",
      title: "Payments Received",
      value: kpis.paymentsReceived,
      icon: <CreditCard size={20} weight="fill" className="text-[#10B981]" />,
      bg: "bg-[#0D261C] border-[#164E37]/60",
    },
    {
      id: "paid",
      title: "Paid",
      value: kpis.paid.toLocaleString("en-IN"),
      icon: <Check size={20} weight="bold" className="text-[#10B981]" />,
      bg: "bg-[#0D261C] border-[#164E37]/60",
    },
    {
      id: "pending",
      title: "Pending",
      value: kpis.pending.toLocaleString("en-IN"),
      icon: <Clock size={20} weight="fill" className="text-[#FBBF24]" />,
      bg: "bg-[#2E1F0A] border-[#684712]/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition-all hover:border-[#343B4E] min-w-0"
        >
          <div className="flex items-center justify-between gap-2.5 w-full">
            <span className="text-xs sm:text-sm font-medium text-[#94A3B8] whitespace-nowrap">
              {card.title}
            </span>
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${card.bg}`}
            >
              {card.icon}
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight whitespace-nowrap">
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
