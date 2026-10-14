import PlatformKpiCard from "./PlatformKpiCard";
import { PLATFORM_KPIS } from "./types";

export default function PlatformOverviewSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
      {PLATFORM_KPIS.map((kpi) => (
        <PlatformKpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
