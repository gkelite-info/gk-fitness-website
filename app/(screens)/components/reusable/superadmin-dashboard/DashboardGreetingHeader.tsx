import DashboardCalendarPicker from "./DashboardCalendarPicker";

export default function DashboardGreetingHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-2.5">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Platform Overview
        </h2>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#192B1A] border border-[rgba(163,230,53,0.3)] text-[#A3E635]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse" />
          Live
        </span>
      </div>

      <DashboardCalendarPicker />
    </div>
  );
}
