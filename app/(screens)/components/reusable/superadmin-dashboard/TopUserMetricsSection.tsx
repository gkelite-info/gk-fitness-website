import TopUserMetricCard from "./TopUserMetricCard";
import { TOP_USER_METRICS } from "./mockData";

export default function TopUserMetricsSection() {
  return (
    <div className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full min-w-0">
      {TOP_USER_METRICS.map((metric) => (
        <TopUserMetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
