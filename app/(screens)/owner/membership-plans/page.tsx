"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MagnifyingGlass, CaretDown } from "@phosphor-icons/react";
import PlanCard from "./components/PlanCard";
import RetentionSummary from "./components/RetentionSummary";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

export default function MembershipPlansPage() {
  const [activeTab, setActiveTab] = useState("Active Plans");
  const [billingCycle, setBillingCycle] = useState("all");

  const tabs = [
    { name: "Active Plans", count: 3 },
    { name: "Drafts", count: 1 },
    { name: "Archived", count: 0 },
  ];

  const billingOptions = [
    { label: "All Billing Cycles", value: "all" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
  ];

  const membershipPlans = [
    {
      title: "Basic Membership",
      price: "₹799",
      period: "/ Month",
      status: "Active",
      features: [
        "Workout Plans",
        "Attendance",
        "Water Tracker",
        "Community",
      ],
      duration: "1 Month",
      members: 42,
      extraFeaturesCount: 2,
    },
    {
      title: "Premium Membership",
      price: "₹1,299",
      period: "/ Month",
      status: "Active",
      features: [
        "Workout Plans",
        "Recipes",
        "Nutrition Plans",
        "Community",
        "Progress Tracking",
        "AI Recommendations",
        "Water Tracker",
      ],
      duration: "3 Months",
      members: 138,
      isHighlighted: true,
      extraFeaturesCount: 1,
    },
    {
      title: "Elite Membership",
      price: "₹2,499",
      period: "/ Month",
      status: "Active",
      features: [
        "All Premium Features",
        "Priority Support 24/7",
        "Early Access to New Features",
        "Steam & Sauna Unlimited Access",
      ],
      duration: "6 Months",
      members: 0,
    }
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 md:p-8 overflow-y-auto scrollbar-themed">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-2 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-[24px] font-[800] font-['Plus_Jakarta_Sans',sans-serif] leading-[32px] tracking-[-0.6px] m-0">
            Membership Plans
          </h1>
          <p className="text-[#9CA3AF] text-[14px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[20px] m-0">
            Manage and configure membership tiers, pricing, and member perks
          </p>
        </div>
        <Link href="/owner/membership-plans/create">
          <button className="h-[40px] px-4 py-2.5 rounded-[12px] bg-[#D4FF00] text-black font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[20px] flex items-center justify-center gap-2 hover:bg-[#c2eb00] transition-colors shrink-0 shadow-[0px_4px_20px_-3px_rgba(212,255,0,0.35)] relative cursor-pointer">
            <div className="absolute inset-0 bg-white/0 rounded-[12px] shadow-[0px_4px_20px_-3px_rgba(212,255,0,0.35)] pointer-events-none" />
            <Plus size={20} weight="bold" className="relative z-10" />
            <span className="relative z-10">Create New Plan</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 w-full border-b border-[#20252B]">
        <div className="flex flex-row items-end gap-[24px] w-full lg:w-auto overflow-x-auto overflow-y-hidden scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className="flex flex-col justify-end h-[44px] cursor-pointer outline-none shrink-0"
              >
                <div className="flex flex-row items-center gap-[6px] mb-[12px]">
                  <span className={`font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[20px] whitespace-nowrap ${
                    isActive ? "font-[700] text-[#FFFFFF]" : "font-[600] text-[#9CA3AF]"
                  }`}>
                    {tab.name}
                  </span>
                  <div
                    className={`px-2 flex flex-col items-center justify-center h-[16px] rounded-full ${
                      isActive ? "bg-[#D4FF00]" : "bg-[#20252B]"
                    }`}
                  >
                    <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-[700] text-[12px] leading-[16px] ${
                      isActive ? "text-[#000000]" : "text-[#D1D5DB]"
                    }`}>
                      {tab.count}
                    </span>
                  </div>
                </div>
                {isActive ? (
                  <div className="h-[2px] w-full bg-[#D4FF00] rounded-t-[4px] shadow-[0px_-2px_12px_1px_rgba(212,255,0,0.7)]" />
                ) : (
                  <div className="h-[2px] w-full bg-transparent" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-row items-center gap-[12px] w-full lg:w-auto pb-[12px]">
          <Dropdown
            options={billingOptions}
            value={billingCycle}
            onChange={setBillingCycle}
            triggerClassName="h-[34px] pl-[14px] pr-[12px] py-[8px] bg-[#171B20] border border-[#262B32] rounded-[12px] flex flex-row items-center justify-between text-[#D1D5DB] hover:text-white hover:border-[#333845] transition-colors w-[177px] shrink-0 cursor-pointer"
          />

          
          <div className="relative w-[176px] h-[34px] shrink-0">
            <MagnifyingGlass
              size={14}
              className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              type="text"
              placeholder="Search plans..."
              className="w-full h-full pl-[32px] pr-[12px] py-[8px] bg-[#171B20] border border-[#262B32] rounded-[12px] text-white placeholder-[#6B7280] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] leading-[15px] focus:outline-none focus:border-[#D4FF00] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row overflow-x-auto gap-6 mb-12 w-[calc(100%+48px)] -ml-6 px-6 md:w-full md:ml-0 md:px-0 justify-start pb-4 scrollbar-themed snap-x">
        {membershipPlans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>

      <RetentionSummary />
    </div>
  );
}
