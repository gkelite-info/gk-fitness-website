"use client";
import { ArrowUp, ArrowDown, Gear, Prohibit, ArrowsCounterClockwise } from "@phosphor-icons/react";

interface StockHistoryProps {
  history: any[];
}

export default function StockHistory({ history = [] }: StockHistoryProps) {
  return (
    <div className="flex flex-col items-start p-6 gap-6 w-full bg-[#12171E] border border-[#1D2633] shadow-sm rounded-2xl">
      <h3 className="font-sans font-semibold text-base leading-6 text-white">
        Stock History (Latest)
      </h3>

      <div className="flex flex-col w-full relative pl-2">
        <div className="absolute left-[28px] top-4 bottom-4 w-px bg-[#1F2937]" />

        <div className="flex flex-col w-full gap-6">
          {history.map((item) => (
            <div key={item.historyId} className="flex flex-col sm:flex-row sm:items-center justify-between w-full relative z-10">
              
              <div className="flex flex-row items-center gap-4">
                <div 
                  className={`flex justify-center items-center w-10 h-10 rounded-full shrink-0 
                    ${item.action === 'added' ? 'bg-[#12171E] border border-[rgba(74,222,128,0.4)]' : 
                      item.action === 'reduced' ? 'bg-[#12171E] border border-[rgba(239,68,68,0.4)]' :
                      item.action === 'maintenance' ? 'bg-[#12171E] border border-[rgba(249,115,22,0.5)]' :
                      item.action === 'out_of_service' ? 'bg-[#12171E] border border-[rgba(239,68,68,0.4)]' :
                      'bg-[#12171E] border border-[rgba(56,189,248,0.4)]'
                    }
                  `}
                >
                  {item.action === 'added' ? (
                    <ArrowUp size={16} className="text-[#4ADE80]" />
                  ) : item.action === 'reduced' ? (
                    <ArrowDown size={16} className="text-[#EF4444]" />
                  ) : item.action === 'maintenance' ? (
                    <Gear size={16} className="text-[#F97316]" />
                  ) : item.action === 'out_of_service' ? (
                    <Prohibit size={16} className="text-[#EF4444]" />
                  ) : (
                    <ArrowsCounterClockwise size={16} className="text-[#38BDF8]" />
                  )}
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <h4 className="font-sans font-semibold text-sm leading-5 text-white capitalize">
                    {item.action.replace(/_/g, ' ')}
                  </h4>
                  <p className="font-sans font-normal text-xs leading-4 text-[#8090A2]">
                    {item.quantity} {item.quantity === 1 ? 'unit' : 'units'} {item.action === 'added' ? 'added' : item.action === 'reduced' ? 'removed' : 'updated'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0 pl-14 sm:pl-0 gap-0.5">
                <span className="font-sans font-medium text-xs leading-4 text-[#8292A4] text-left sm:text-right">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
                <span className="font-sans font-normal text-[11px] leading-4 text-[#556475] text-left sm:text-right">
                  by Admin
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
