"use client";

import React, { useState } from "react";
import { CaretDown, User } from "@phosphor-icons/react";
import Dropdown from "../../../../components/reusable/Dropdown";

export default function PersonalInformation() {
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const languageOptions = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "Hindi", value: "hindi" },
    { label: "German", value: "german" },
    { label: "Mandarin", value: "mandarin" },
  ];

  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex-1">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <User weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Personal Information
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] w-full">
        {/* Full Name */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-row justify-center items-start px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg">
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280]"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Gender <span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={genderOptions}
            value={gender}
            onChange={(val) => setGender(val)}
            placeholder="Select gender"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg h-[34px]">
            <input
              type="date"
              className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Languages Spoken */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Languages Spoken
          </label>
          <Dropdown
            options={languageOptions}
            value={languages}
            onChange={(val) => setLanguages(val)}
            placeholder="Select languages"
            multiSelect={true}
          />
        </div>
      </div>
    </div>
  );
}
