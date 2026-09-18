"use client";

import React, { useState } from "react";
import { Phone } from "@phosphor-icons/react";
import Dropdown from "../../../../components/reusable/Dropdown";

export default function ContactInformation() {
  const [countryCode, setCountryCode] = useState("+91");

  const countryOptions = [
    { label: "+91", value: "+91" },
    { label: "+1", value: "+1" },
    { label: "+44", value: "+44" },
  ];

  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex-1">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <Phone weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Contact Information
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] w-full">
        {/* Phone Number with Country Code Dropdown */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-row items-stretch w-full h-[34px] bg-[#1A2029] border border-[#14161A] rounded-lg overflow-hidden">
            <div className="w-[85px] shrink-0 h-full border-r border-[#14161A] bg-[rgba(17,22,29,0.6)]">
              <Dropdown
                options={countryOptions}
                value={countryCode}
                onChange={(val) => setCountryCode(val)}
                triggerClassName="relative flex flex-row items-center justify-between px-3 py-2 w-full h-full cursor-pointer hover:bg-white/5 transition-colors"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center px-3">
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280]"
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Email Address
          </label>
          <div className="flex flex-row justify-center items-start px-3 py-[9px] w-full h-[34px] bg-[#1A2029] border border-[#14161A] rounded-lg">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
