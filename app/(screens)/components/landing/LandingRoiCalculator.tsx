"use client";

import { useState } from "react";
import { 
  Calculator, 
  CurrencyInr, 
  ArrowRight, 
  Sparkle, 
  Users, 
  TrendUp, 
  Receipt,
  Coins
} from "@phosphor-icons/react";

interface LandingRoiCalculatorProps {
  onOpenConsultation: () => void;
}

export default function LandingRoiCalculator({ onOpenConsultation }: LandingRoiCalculatorProps) {
  const [planAmount, setPlanAmount] = useState<number>(1999);
  const [customers, setCustomers] = useState<number>(250);
  const [rentExpense, setRentExpense] = useState<number>(60000);
  const [staffExpense, setStaffExpense] = useState<number>(45000);
  const [maintenanceExpense, setMaintenanceExpense] = useState<number>(20000);
  const [otherExpense, setOtherExpense] = useState<number>(15000);

  const totalMembers = customers;
  const monthlyRevenue = Math.max(0, customers * planAmount);
  const yearlyRevenue = monthlyRevenue * 12;
  const monthlyExpenses = Math.max(0, rentExpense + staffExpense + maintenanceExpense + otherExpense);
  const yearlyExpenses = monthlyExpenses * 12;
  const monthlyNetProfit = monthlyRevenue - monthlyExpenses;
  const yearlyNetProfit = yearlyRevenue - yearlyExpenses;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <section id="calculator" className="w-full py-12 lg:py-16 bg-[#0C0D10] relative overflow-hidden border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4FF32]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4">
            <Calculator size={15} weight="bold" />
            Plan Revenue & Profit Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Calculate Gym Revenue & <span className="text-[#D4FF32]">Net Profit</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#94A3B8]">
            Enter your plan amount, active members, and monthly operating expenses to project your monthly and annual gym income.
          </p>
        </div>

        <div className="rounded-3xl bg-[#14151C]/90 border border-white/10 p-6 sm:p-9 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 pb-6 border-b border-white/10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-3">
                1. Enter Plan Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base font-bold text-[#94A3B8]">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="e.g. 1999"
                  value={planAmount === 0 ? "" : planAmount}
                  onChange={(e) => setPlanAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full h-14 pl-9 pr-24 rounded-xl bg-[#0F1015] border border-white/10 text-white font-black text-lg sm:text-xl focus:border-[#D4FF32] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8] pointer-events-none">
                  / Month
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-2.5">
                Enter membership fee charged per customer per month.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-3">
                2. Enter Number of Customers
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter customer count"
                  value={customers === 0 ? "" : customers}
                  onChange={(e) => setCustomers(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full h-14 pl-4 pr-24 rounded-xl bg-[#0F1015] border border-white/10 text-white font-black text-lg sm:text-xl focus:border-[#D4FF32] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8] pointer-events-none">
                  Members
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-2.5">
                Directly enter your active member count to automatically calculate revenue.
              </p>
            </div>
          </div>

          <div className="mb-8 pb-8 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">
                  3. Enter Monthly Expenses
                </label>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">
                  Operating costs including rent, staff, electricity, maintenance, and other expenses.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#94A3B8]">
                Total Expenses: <span className="text-[#FF7A59] font-black">{formatCurrency(monthlyExpenses)}</span> / mo
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#CBD5E1] mb-1.5">
                  Rent & Facility
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={rentExpense === 0 ? "" : rentExpense}
                    onChange={(e) => setRentExpense(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-[#0F1015] border border-white/10 text-white font-bold text-sm focus:border-[#D4FF32] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#CBD5E1] mb-1.5">
                  Staff & Salaries
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={staffExpense === 0 ? "" : staffExpense}
                    onChange={(e) => setStaffExpense(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-[#0F1015] border border-white/10 text-white font-bold text-sm focus:border-[#D4FF32] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#CBD5E1] mb-1.5">
                  Electricity & Maintenance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={maintenanceExpense === 0 ? "" : maintenanceExpense}
                    onChange={(e) => setMaintenanceExpense(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-[#0F1015] border border-white/10 text-white font-bold text-sm focus:border-[#D4FF32] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#CBD5E1] mb-1.5">
                  Other Expenses
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={otherExpense === 0 ? "" : otherExpense}
                    onChange={(e) => setOtherExpense(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-[#0F1015] border border-white/10 text-white font-bold text-sm focus:border-[#D4FF32] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.08] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">Active Customers</span>
                <Users size={18} className="text-[#D4FF32]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {totalMembers}<span className="text-sm font-semibold text-[#94A3B8] ml-1.5">Members</span>
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">
                Total gym customer count
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.08] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">Monthly Revenue</span>
                <CurrencyInr size={18} className="text-[#D4FF32]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(monthlyRevenue)}
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Gross recurring revenue</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.08] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">Monthly Expenses</span>
                <Receipt size={18} className="text-[#FF7A59]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#FF7A59]">
                {formatCurrency(monthlyExpenses)}
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Rent, staff & other costs</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.08] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">Monthly Net Profit</span>
                <Coins size={18} className="text-[#D4FF32]" />
              </div>
              <div className={`text-2xl sm:text-3xl font-black ${monthlyNetProfit >= 0 ? "text-[#D4FF32]" : "text-red-400"}`}>
                {formatCurrency(monthlyNetProfit)}
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Revenue − expenses</span>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-[#D4FF32]/15 via-[#D4FF32]/5 to-transparent border border-[#D4FF32]/30 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_0_30px_rgba(212,255,50,0.06)]">
            <div>
              <div className="flex items-center gap-2">
                <TrendUp size={18} className="text-[#D4FF32]" weight="bold" />
                <span className="text-xs font-black uppercase tracking-wider text-[#D4FF32]">
                  Total Projected Net Profit Per Year
                </span>
              </div>
              <div className={`text-3xl sm:text-5xl font-black tracking-tight mt-1.5 ${yearlyNetProfit >= 0 ? "text-white" : "text-red-400"}`}>
                {formatCurrency(yearlyNetProfit)}<span className="text-xs sm:text-sm font-semibold text-[#94A3B8] ml-2">/ year</span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1.5">
                Annual Revenue ({formatCurrency(yearlyRevenue)}) − Annual Expenses ({formatCurrency(yearlyExpenses)}) for {totalMembers} members.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="h-12 px-7 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(212,255,50,0.35)] shrink-0 cursor-pointer"
            >
              <Sparkle size={18} weight="fill" />
              Request For Demo
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
