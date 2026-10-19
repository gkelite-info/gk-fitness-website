import RevenueBreakdownCard from "./RevenueBreakdownCard";
import PayoutBreakdownCard from "./PayoutBreakdownCard";

export default function FinanceBreakdownSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
      <RevenueBreakdownCard />
      <PayoutBreakdownCard />
    </div>
  );
}
