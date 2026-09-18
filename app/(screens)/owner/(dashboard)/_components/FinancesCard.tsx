import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

interface FinancesCardProps {
  paymentsToday: any[];
}

export default function FinancesCard({ paymentsToday = [] }: FinancesCardProps) {
  let upi = 0;
  let card = 0;
  let cash = 0;
  let total = 0;
  
  paymentsToday.forEach((p: any) => {
    const amt = Number(p.amountPaid || 0);
    total += amt;
    const method = (p.paymentMethod || "").toLowerCase();
    if (method.includes("upi") || method.includes("online")) upi += amt;
    else if (method.includes("card")) card += amt;
    else cash += amt; // default to cash
  });

  const transactionsCount = paymentsToday.length;
  
  const upiPercent = total > 0 ? (upi / total) * 100 : 0;
  const cardPercent = total > 0 ? (card / total) * 100 : 0;
  const cashPercent = total > 0 ? (cash / total) * 100 : 0;

  const formatCurrency = (val: number) => {
    if (val === 0) return '₹0';
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k`;
    return `₹${val}`;
  };

  const breakdown = [
    { label: "UPI", amount: `(${formatCurrency(upi)})`, color: "bg-[#D4FF32]", dotColor: "bg-[#D4FF32]", width: `${upiPercent}%` },
    { label: "Card", amount: `(${formatCurrency(card)})`, color: "bg-[#22D3EE]", dotColor: "bg-[#22D3EE]", width: `${cardPercent}%` },
    { label: "Cash", amount: `(${formatCurrency(cash)})`, color: "bg-[#FBBF24]", dotColor: "bg-[#FBBF24]", width: `${cashPercent}%` },
  ];

  return (
    <div className="w-full bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-4 flex flex-col justify-between gap-3 h-full">
      <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
        Finances <span className="font-normal text-[#94A3B8]">(Today)</span>
      </h3>

      <div className="bg-[#191B22] border border-[#232631] rounded-[12px] p-3 flex flex-col justify-center gap-1">
        <span className="font-sans font-semibold text-[10px] leading-[15px] uppercase text-[#94A3B8]">
          TODAY'S REVENUE
        </span>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <span className="font-sans font-black text-[18px] leading-[28px] text-white">
            ₹{total.toLocaleString('en-IN')}
          </span>
          <span className="font-sans font-bold text-[10px] leading-[14px] text-[#D4FF32] bg-[rgba(212,255,50,0.1)] px-1.5 py-0.5 rounded-[4px] flex items-center gap-0.5">
            +0%
          </span>
        </div>
        <span className="font-sans font-normal text-[9px] leading-[15px] text-[#94A3B8]">
          {transactionsCount} transactions completed
        </span>
      </div>

      <div className="flex flex-col gap-[10px] w-full">
        <div className="w-full h-[8px] rounded-full flex flex-row overflow-hidden bg-[#20242F]">
          {breakdown.map((item, index) => (
            <div key={index} className={`h-full ${item.color}`} style={{ width: item.width }} />
          ))}
        </div>
        <div className="flex flex-row justify-between w-full">
          {breakdown.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-1">
              <div className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${item.dotColor}`} />
              <div className="flex flex-col font-sans font-medium text-[10px] leading-[15px]">
                <span className="text-[#CBD5E1]">{item.label}</span>
                <span className="text-[#94A3B8]">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
