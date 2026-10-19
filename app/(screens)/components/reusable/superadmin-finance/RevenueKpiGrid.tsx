import RevenueKpiCard from "./RevenueKpiCard";

export default function RevenueKpiGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
      <RevenueKpiCard
        title="Total Revenue"
        value="₹12,31,900"
        changePercentage={12}
        variant="revenue"
      />
      <RevenueKpiCard
        title="Transactions Count"
        value="842"
        changePercentage={18}
        variant="transactions"
      />
    </div>
  );
}
