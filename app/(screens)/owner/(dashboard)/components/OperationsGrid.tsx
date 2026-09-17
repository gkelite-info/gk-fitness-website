"use client";

import { CaretRight, Info, WarningCircle, CheckCircle, Fire, Thermometer, Snowflake, TrendUp } from "@phosphor-icons/react";

export default function OperationsGrid() {
  const alerts = [
    { text: "Equipment maintenance scheduled", icon: <Info size={14} className="text-[#F43F5E]" weight="bold" />, date: "Today" },
    { text: "Low stock: Protein Supplements", icon: <WarningCircle size={14} className="text-[#FBBF24]" weight="bold" />, date: "Tomorrow" },
    { text: "Staff meeting at 2:00 PM", icon: <Info size={14} className="text-[#F43F5E]" weight="bold" />, date: "Today" },
    { text: "System update completed", icon: <CheckCircle size={14} className="text-[#34D399]" weight="bold" />, date: "Yesterday" }
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full">
      <div className="flex flex-col gap-5 w-full xl:w-[386px]">
        <div className="w-full bg-[#14151A] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-white tracking-wide">Today's Operations</h3>
            <a href="#" className="cursor-pointer flex items-center gap-1 text-xs font-semibold text-[#D4FF32] hover:underline">
              View All <CaretRight size={12} weight="bold" />
            </a>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#191B22] border border-[#222530] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#D4FF32]/10 border border-[#D4FF32]/30 rounded-xl flex items-center justify-center text-[#D4FF32]">
                <WarningCircle size={20} weight="fill" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#94A3B8]">Pending Approvals</span>
                <span className="text-xs font-bold text-black mt-1 bg-[#D4FF32] px-3 py-1 rounded shadow-[0_4px_6px_-1px_rgba(212,255,50,0.2)] self-start">
                  12 New
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#14151A] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-xs text-white tracking-wide uppercase">Alerts & Reminders</h4>
            <a href="#" className="cursor-pointer font-semibold text-[11px] text-[#D4FF32] flex items-center gap-1 hover:underline">
              View All <CaretRight size={10} weight="bold" />
            </a>
          </div>
          <div className="flex flex-col gap-2">
            {alerts.map((alert, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-[#191B22] border border-[#222530] rounded-xl">
                <div className="flex items-center gap-2.5">
                  {alert.icon}
                  <span className="text-xs text-[#CBD5E1]">{alert.text}</span>
                </div>
                <span className="text-[10px] text-[#94A3B8]">{alert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full flex-grow">
        
        <div className="flex-1 bg-[#14151A] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[274px]">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-xs text-white uppercase tracking-wide">Finances (Today)</h4>
            <a href="#" className="cursor-pointer text-xs text-[#D4FF32]"><CaretRight size={14} weight="bold" /></a>
          </div>
          
          <div className="w-full bg-[#191B22] border border-[#232631] rounded-xl p-4 flex flex-col justify-center my-4 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-[10px] text-[#94A3B8] uppercase">Total Income</span>
              <div className="px-2 py-0.5 bg-[#D4FF32]/10 rounded font-bold text-[10px] text-[#D4FF32]">
                +14%
              </div>
            </div>
            <span className="font-black text-xl text-white mb-1">$2,450.00</span>
            <span className="text-[10px] text-[#94A3B8]">12 transactions completed</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-full flex h-2 rounded-full overflow-hidden bg-[#20242F]">
              <div className="h-full bg-[#D4FF32]" style={{ width: '60%' }} />
              <div className="h-full bg-[#22D3EE]" style={{ width: '25%' }} />
              <div className="h-full bg-[#FBBF24]" style={{ width: '15%' }} />
            </div>
            <div className="flex justify-between items-center pt-1">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" /><span className="text-[10px] text-[#CBD5E1] font-medium">Memberships</span></div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" /><span className="text-[10px] text-[#CBD5E1] font-medium">PT</span></div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" /><span className="text-[10px] text-[#CBD5E1] font-medium">Merch</span></div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#14151A] border border-[#222328] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4)] rounded-2xl p-5 flex flex-col gap-4 min-h-[274px]">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="font-black text-2xl text-white tracking-tight">45</h3>
            <span className="font-bold text-xs text-[#F59E0B] tracking-wide">OPEN ENQUIRIES</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-2.5 bg-[#141A15] border border-[#243126] rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#ef4444]/15 flex items-center justify-center border border-[#f87171]/20 text-[#f87171]">
                  <Fire size={14} weight="fill" />
                </div>
                <span className="font-medium text-xs text-[#CBD5E1]">Hot</span>
              </div>
              <span className="font-bold text-xs text-white">12</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#141A15] border border-[#243126] rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#f59e0b]/15 flex items-center justify-center border border-[#f59e0b]/30 text-[#f59e0b]">
                  <Thermometer size={14} weight="fill" />
                </div>
                <span className="font-medium text-xs text-[#CBD5E1]">Warm</span>
              </div>
              <span className="font-bold text-xs text-white">18</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#141A15] border border-[#243126] rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#06b6d4]/15 flex items-center justify-center border border-[#38bdf8]/30 text-[#38bdf8]">
                  <Snowflake size={14} weight="fill" />
                </div>
                <span className="font-medium text-xs text-[#CBD5E1]">Cold</span>
              </div>
              <span className="font-bold text-xs text-white">10</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#141A15] border border-[#243126] rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#a855f7]/15 flex items-center justify-center border border-[#a78bfa]/30 text-[#a78bfa]">
                  <TrendUp size={14} weight="fill" />
                </div>
                <span className="font-medium text-xs text-[#CBD5E1]">Others</span>
              </div>
              <span className="font-bold text-xs text-white">5</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
