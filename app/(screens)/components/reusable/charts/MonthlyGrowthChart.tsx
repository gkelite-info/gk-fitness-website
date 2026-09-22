"use client";

const CHART_DATA = [
  { month: "Jan", value: 6200, display: "₹6.2K" },
  { month: "Feb", value: 7800, display: "₹7.8K" },
  { month: "Mar", value: 9500, display: "₹9.5K" },
  { month: "Apr", value: 8400, display: "₹8.4K" },
  { month: "May", value: 10200, display: "₹10.2K" },
  { month: "Jun", value: 12600, display: "₹12.6K" },
  { month: "Jul", value: 14200, display: "₹14.2K" },
  { month: "Aug", value: 16800, display: "₹16.8K" },
  { month: "Sep", value: 13200, display: "₹13.2K" },
  { month: "Oct", value: 15600, display: "₹15.6K" },
  { month: "Nov", value: 17900, display: "₹17.9K" },
  { month: "Dec", value: 19800, display: "₹19.8K" }
];

export default function MonthlyGrowthChart() {
  const maxDataValue = 25000;
  const yAxisLabels = [25000, 20000, 15000, 10000, 5000, 0];

  const formatLabel = (val: number) => {
    if (val === 0) return "0";
    return `${val / 1000}K`;
  };

  return (
    <div className="flex flex-col p-4 md:p-6 pb-4 md:pb-6 gap-6 md:gap-8 w-full bg-[#10151C] border border-[#1E2A1E] rounded-[16px] shadow-lg">
      <div className="flex flex-row justify-between items-center w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Monthly Revenue
        </h2>
        <div className="flex flex-row items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#CCFF00]"></div>
          <span className="font-[500] text-[11px] leading-[16px] text-[#94A3B8]">
            Revenue (₹)
          </span>
        </div>
      </div>
      
      <div className="flex flex-row w-full relative">
        
        {/* Y-Axis Fixed */}
        <div className="flex flex-col justify-between items-end pr-3 w-10 shrink-0 h-[300px] pt-10 pb-8 z-30 bg-[#10151C] border-r border-[#1B2029]">
          {yAxisLabels.map((val, idx) => (
            <span key={idx} className="font-[500] text-[11px] leading-[16px] text-[#64748B]">
              {formatLabel(val)}
            </span>
          ))}
        </div>
        
        {/* Scrollable Chart Area */}
        <div className="flex-1 overflow-x-auto scrollbar-themed">
          <div className="relative flex flex-row items-start min-w-[700px] h-[300px] pt-10 pb-8">
            <div className="relative flex-1 h-[228px] isolate">
              
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between items-start pointer-events-none z-0">
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-solid border-[#1B2029]" />
              </div>
              
              {/* Bars */}
              <div className="relative flex flex-row justify-around items-end px-2 h-full w-full z-10">
                {CHART_DATA.map((data, index) => {
                  const heightPercent = (data.value / maxDataValue) * 100;
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center relative h-full justify-end"
                    >
                      {/* Fixed Value Label */}
                      <span className="font-[600] text-[10px] leading-[14px] text-white mb-2">
                        {data.display}
                      </span>

                      <div 
                        className="w-10 md:w-11 bg-gradient-to-b from-[#84cc16] to-[#3f6212] rounded-t-[4px] shadow-[0_0_10px_rgba(132,204,22,0.2)]"
                        style={{ height: `${heightPercent}%` }}
                      />
                      
                      <span className="absolute -bottom-6 font-[500] text-[11px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                        {data.month}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
