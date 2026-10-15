"use client";

import { CalendarCheck, Ticket, CheckCircle, CurrencyInr } from "@phosphor-icons/react";
import { GymPassItem } from "./GymPassTypes";

interface EditGymPassBannerProps {
  pass: GymPassItem;
}

export default function EditGymPassBanner({ pass }: EditGymPassBannerProps) {
  const sold = pass.soldCount ?? 1470;
  const active = pass.activeCount ?? 860;
  const revenue = pass.revenueText ?? `₹ ${(pass.price * sold / 100000).toFixed(1)}L`;

  return (
    <div className="relative w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4FF32] rounded-l-2xl shadow-[0_0_12px_rgba(212,255,50,0.7)]" />

      <div className="flex items-center gap-4 pl-2 min-w-0">
        <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#14291F] border border-[#165330] flex items-center justify-center text-[#D4FF32] shrink-0 shadow-inner">
          <CalendarCheck size={28} weight="bold" />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
              {pass.name}
            </h2>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                pass.status === "active"
                  ? "bg-[#10B981]/15 text-[#22C55E] border border-[#10B981]/30"
                  : "bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  pass.status === "active" ? "bg-[#22C55E] animate-pulse" : "bg-[#EF4444]"
                }`}
              />
              {pass.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF32] tracking-tight leading-none">
              ₹{pass.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs sm:text-sm text-[#94A3B8] font-medium">
              Valid for {pass.durationDays} Days
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap pl-2 lg:pl-0 shrink-0">
        <div className="bg-[#161822] border border-[#222634] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[100px] flex-1 sm:flex-initial">
          <Ticket size={20} weight="fill" className="text-[#D4FF32] mb-1" />
          <span className="text-base sm:text-lg font-bold text-white leading-tight">
            {sold.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium uppercase mt-0.5">
            Sold
          </span>
        </div>

        <div className="bg-[#161822] border border-[#222634] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[100px] flex-1 sm:flex-initial">
          <CheckCircle size={20} weight="fill" className="text-[#22C55E] mb-1" />
          <span className="text-base sm:text-lg font-bold text-white leading-tight">
            {active.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium uppercase mt-0.5">
            Active
          </span>
        </div>

        <div className="bg-[#161822] border border-[#222634] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex flex-col items-center justify-center min-w-[85px] sm:min-w-[100px] flex-1 sm:flex-initial">
          <CurrencyInr size={20} weight="bold" className="text-[#22C55E] mb-1" />
          <span className="text-base sm:text-lg font-bold text-white leading-tight whitespace-nowrap">
            {revenue}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium uppercase mt-0.5">
            Revenue
          </span>
        </div>
      </div>
    </div>
  );
}
