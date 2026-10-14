import DashboardActionCard from "./DashboardActionCard";
import { QUICK_ACTIONS, LEAD_ACTIONS } from "./types";

export default function ActionsAndLeadsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full min-w-0">
      <div className="flex flex-col gap-3 w-full min-w-0">
        <h2 className="text-sm font-semibold text-[#E2E8F0] tracking-normal leading-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full min-w-0">
          {QUICK_ACTIONS.map((item) => (
            <DashboardActionCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full min-w-0">
        <h2 className="text-sm font-semibold text-[#E2E8F0] tracking-normal leading-5">
          Leads
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full min-w-0">
          {LEAD_ACTIONS.map((item) => (
            <DashboardActionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
