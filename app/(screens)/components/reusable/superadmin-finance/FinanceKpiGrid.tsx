import FinanceKpiCard from "./FinanceKpiCard";
import { FINANCE_KPIS } from "./mockData";

export default function FinanceKpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {FINANCE_KPIS.map((kpi) => (
        <FinanceKpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
