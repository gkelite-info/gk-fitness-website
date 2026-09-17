import MetricsOverview from "../(dashboard)/components/MetricsOverview";
import OperationsGrid from "../(dashboard)/components/OperationsGrid";
import QuickActions from "../(dashboard)/components/QuickActions";
import RevenueChartSection from "../(dashboard)/components/RevenueChartSection";


export default function OwnerDashboardPage() {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 pb-12 gap-7 w-full max-w-5xl mx-auto xl:max-w-none">
      
      <MetricsOverview />

      <div className="w-full bg-[#13151B] border border-[#D4FF32]/45 shadow-[0_0_15px_rgba(212,255,50,0.08)] rounded-2xl p-4 sm:px-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#D4FF32]/15 border border-[#D4FF32]/30 rounded-xl flex items-center justify-center text-[#D4FF32]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 4.5v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="font-semibold text-sm text-white">Manual Attendance Needed</h4>
            <p className="text-xs text-[#94A3B8]">Review pending check-ins</p>
          </div>
        </div>
        <button className="cursor-pointer w-8 h-8 bg-[#1A1D25] rounded-lg flex items-center justify-center text-[#D4FF32] hover:bg-[#232733] transition-colors">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path d="M2 5h8M6 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-7 items-start">
        
        <div className="w-full xl:w-[550px] flex flex-col gap-5 flex-shrink-0">
          <QuickActions />
        </div>

        <div className="w-full flex-grow flex flex-col gap-5">
          <OperationsGrid />
          <RevenueChartSection />
        </div>
      </div>
    </div>
  );
}
