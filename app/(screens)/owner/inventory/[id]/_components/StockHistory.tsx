"use client";
import { ArrowUp, Gear } from "@phosphor-icons/react";

const historyData = [
  {
    id: 1,
    action: "Stock Added",
    description: "Added 1 unit",
    date: "20 July 2025, 10:30 AM",
    user: "by Admin",
    type: "add"
  },
  {
    id: 2,
    action: "Marked Under Maintenance",
    description: "1 unit moved to maintenance",
    date: "18 July 2025, 04:15 PM",
    user: "by Admin",
    type: "maintenance"
  },
  {
    id: 3,
    action: "Stock Added",
    description: "Added 2 units",
    date: "15 July 2025, 11:20 AM",
    user: "by Admin",
    type: "add"
  }
];

export default function StockHistory() {
  return (
    <div className="flex flex-col items-start p-6 gap-6 w-full bg-[#12171E] border border-[#1D2633] shadow-sm rounded-2xl">
      <h3 className="font-sans font-semibold text-base leading-6 text-white">
        Stock History (Latest)
      </h3>

      <div className="flex flex-col w-full relative pl-2">
        <div className="absolute left-[28px] top-4 bottom-4 w-px bg-[#1F2937]" />

        <div className="flex flex-col w-full gap-6">
          {historyData.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between w-full relative z-10">
              
              <div className="flex flex-row items-center gap-4">
                <div 
                  className={`flex justify-center items-center w-10 h-10 rounded-full shrink-0 
                    ${item.type === 'add' ? 'bg-[#12171E] border border-[rgba(74,222,128,0.4)]' : 'bg-[#12171E] border border-[rgba(249,115,22,0.5)]'}
                  `}
                >
                  {item.type === 'add' ? (
                    <ArrowUp size={16} className="text-[#4ADE80]" />
                  ) : (
                    <Gear size={16} className="text-[#F97316]" />
                  )}
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <h4 className="font-sans font-semibold text-sm leading-5 text-white">
                    {item.action}
                  </h4>
                  <p className="font-sans font-normal text-xs leading-4 text-[#8090A2]">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0 pl-14 sm:pl-0 gap-0.5">
                <span className="font-sans font-medium text-xs leading-4 text-[#8292A4] text-left sm:text-right">
                  {item.date}
                </span>
                <span className="font-sans font-normal text-[11px] leading-4 text-[#556475] text-left sm:text-right">
                  {item.user}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
