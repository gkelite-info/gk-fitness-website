"use client";

import React, { useState } from "react";
import { IdentificationCard } from "@phosphor-icons/react";
import Dropdown from "../../../../components/reusable/Dropdown";

export default function MembershipInformation() {
  const [membershipPlan, setMembershipPlan] = useState("");

  const membershipOptions = [
    { label: "Basic Plan - 1 Month", value: "basic_1m" },
    { label: "Pro Plan - 3 Months", value: "pro_3m" },
    { label: "Elite Plan - 12 Months", value: "elite_12m" },
  ];

  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex-1">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <IdentificationCard weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Membership Information
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] w-full">
        {/* Membership Plan */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Membership Plan <span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={membershipOptions}
            value={membershipPlan}
            onChange={(val) => setMembershipPlan(val)}
            placeholder="Select Membership plan"
          />
        </div>

        {/* Start Date and Expiry Date Row */}
        <div className="flex flex-row items-start gap-4 w-full">
          {/* Start Date */}
          <div className="flex flex-col items-start gap-1.5 w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg h-[34px]">
              <input
                type="date"
                className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col items-start gap-1.5 w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <div className="relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg h-[34px]">
              <input
                type="date"
                className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
