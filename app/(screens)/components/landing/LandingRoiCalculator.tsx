"use client";

import { useState } from "react";
<<<<<<< Updated upstream
import { Calculator, CurrencyInr, Clock, ShieldCheck, ArrowRight, Sparkle } from "@phosphor-icons/react";
=======
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
>>>>>>> Stashed changes

interface LandingRoiCalculatorProps {
  onOpenConsultation: () => void;
}

export default function LandingRoiCalculator({ onOpenConsultation }: LandingRoiCalculatorProps) {
<<<<<<< Updated upstream
  const [members, setMembers] = useState<number>(350);

  const avgMonthlyFee = 1800;
  const proxyLossRate = 0.08;
  const renewalRecoveryRate = 0.15;
  const hoursSavedPerMember = 0.05;
=======
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
>>>>>>> Stashed changes

  const monthlyProxySaved = Math.round(members * proxyLossRate * avgMonthlyFee);
  const monthlyRenewalRecovered = Math.round(members * renewalRecoveryRate * avgMonthlyFee);
  const monthlyTotalRecovered = monthlyProxySaved + monthlyRenewalRecovered;
  const annualTotalRecovered = monthlyTotalRecovered * 12;
  const weeklyHoursSaved = Math.max(12, Math.round(members * hoursSavedPerMember));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="w-full py-10 lg:py-14 bg-[#0C0D10] relative overflow-hidden border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4FF32]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4">
            <Calculator size={15} weight="bold" />
<<<<<<< Updated upstream
            Interactive ROI Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Calculate How Much Revenue Your Gym Is{" "}
            <span className="text-[#D4FF32]">Leaving On The Table</span>
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Slide to your current active member count and see your estimated monthly recovered revenue.
          </p>
        </div>

        <div className="rounded-3xl bg-[#14151C]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <label className="text-sm font-bold text-white uppercase tracking-wider">
                Select Your Active Member Count
=======
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
>>>>>>> Stashed changes
              </label>
              <div className="text-2xl sm:text-3xl font-black text-[#D4FF32] flex items-center gap-1">
                <span>{members}</span>
                <span className="text-sm font-semibold text-[#94A3B8]">Members</span>
              </div>
            </div>

            <input
              type="range"
              min="100"
              max="1500"
              step="50"
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
              className="w-full h-3 bg-[#232631] rounded-lg appearance-none cursor-pointer accent-[#D4FF32]"
            />

            <div className="flex justify-between text-[11px] text-[#94A3B8] font-semibold mt-2">
              <span>100 Members (Boutique)</span>
              <span>500 Members (Standard)</span>
              <span>1500+ Members (High Capacity)</span>
            </div>
          </div>

<<<<<<< Updated upstream
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.06] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">Zero-Proxy Protection</span>
                <ShieldCheck size={20} className="text-[#D4FF32]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {formatCurrency(monthlyProxySaved)}
=======
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
>>>>>>> Stashed changes
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Saved from unpaid entries/mo</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.06] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">WhatsApp Renewal Lift</span>
                <CurrencyInr size={20} className="text-[#D4FF32]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {formatCurrency(monthlyRenewalRecovered)}
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Recovered renewals/mo</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1015] border border-white/[0.06] text-left">
              <div className="flex items-center justify-between text-[#94A3B8] mb-2">
                <span className="text-xs font-semibold">Staff Hours Saved</span>
                <Clock size={20} className="text-[#D4FF32]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {weeklyHoursSaved} hrs
              </div>
              <span className="text-[11px] text-[#94A3B8] block mt-1">Saved weekly on admin tasks</span>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-[#D4FF32]/10 via-[#D4FF32]/5 to-transparent border border-[#D4FF32]/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32]">
                Estimated Annual Profit Expansion
              </span>
<<<<<<< Updated upstream
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                {formatCurrency(annualTotalRecovered)}
                <span className="text-xs sm:text-sm font-semibold text-[#94A3B8] ml-2">/ year</span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1">
                Based on average fee metrics and observed retention improvements across GK partner gyms.
=======
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
>>>>>>> Stashed changes
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="h-12 px-7 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(212,255,50,0.35)] shrink-0 cursor-pointer"
            >
              <Sparkle size={18} weight="fill" />
              Claim Your Free Audit
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
