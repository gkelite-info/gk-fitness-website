"use client";

import React, { useState } from "react";
import { IdentificationCard } from "@phosphor-icons/react";
import Dropdown from "../../../../components/reusable/Dropdown";
import { useUser } from "@/app/context/UserContext";
import { useMembershipPlans } from "@/lib/hooks/membership/useMembershipPlans";
import { useFormContext } from "react-hook-form";

export default function MembershipInformation() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const membershipPlanId = watch("membershipPlanId");

  const { roleData } = useUser();
  const gymId = roleData && roleData.length > 0 ? roleData[0].gymId : null;
  const { data: plans, isLoading } = useMembershipPlans(gymId);

  const membershipOptions = plans?.map((plan: any) => ({
    label: plan.name,
    value: plan.id
  })) || [];

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
            value={membershipPlanId}
            onChange={(val) => setValue("membershipPlanId", val, { shouldValidate: true })}
            placeholder={isLoading ? "Loading plans..." : "Select Membership plan"}
          />
          {errors.membershipPlanId && <span className="text-red-500 text-[10px]">{errors.membershipPlanId.message as string}</span>}
        </div>

        {/* Start Date and Expiry Date Row */}
        <div className="flex flex-row items-start gap-4 w-full">
          {/* Start Date */}
          <div className="flex flex-col items-start gap-1.5 w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className={`relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border rounded-lg h-[34px] ${errors.planStartDate ? "border-red-500" : "border-[#14161A]"}`}>
              <input
                type="date"
                {...register("planStartDate")}
                className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
              />
            </div>
            {errors.planStartDate && <span className="text-red-500 text-[10px]">{errors.planStartDate.message as string}</span>}
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col items-start gap-1.5 w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <div className={`relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border rounded-lg h-[34px] ${errors.planExpiryDate ? "border-red-500" : "border-[#14161A]"}`}>
              <input
                type="date"
                {...register("planExpiryDate")}
                className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
              />
            </div>
            {errors.planExpiryDate && <span className="text-red-500 text-[10px]">{errors.planExpiryDate.message as string}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
