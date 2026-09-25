"use client";

import { CaretDown } from "@phosphor-icons/react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import { useState } from "react";

export default function EnquiryBasicDetails() {
  const [gender, setGender] = useState("");

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex flex-row items-center gap-3.5 w-full">
        <div className="flex flex-row justify-center items-center w-7 h-7 bg-[rgba(23,37,84,0.8)] border border-[rgba(37,99,235,0.4)] rounded-full shrink-0">
          <span className="font-sans font-bold text-xs text-[#60A5FA]">1</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-sans font-semibold text-base text-white leading-6">Basic Details</h2>
          <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">Enter the customer's basic information.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start w-full gap-5">
        
        <div className="flex flex-col flex-1 w-full gap-1.5">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Full Name <span className="text-[#EF4444]">*</span></label>
          <div className="relative w-full h-[42px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3333 14C13.3333 11.7909 10.9455 10 8 10C5.05452 10 2.66666 11.7909 2.66666 14" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Enter full name"
              className="w-full h-full bg-[#0C1017] border border-[#232E40] rounded-lg pl-10 pr-3.5 font-sans font-normal text-sm text-white placeholder-[#64748B] outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full gap-1.5">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Mobile Number <span className="text-[#EF4444]">*</span></label>
          <div className="flex flex-row w-full h-[42px] bg-[#0C1017] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[#232E40] focus-within:border-[#38BDF8] transition-colors">
            <div className="flex flex-row items-center justify-center pl-3 pr-2 border-r border-[#232E40] cursor-pointer hover:bg-[#1C2631] transition-colors rounded-l-lg shrink-0">
              <span className="font-sans font-normal text-sm text-[#CBD5E1] mr-1.5">+91</span>
              <CaretDown size={14} className="text-[#64748B]" />
            </div>
            <div className="relative flex-1 h-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 3.33333C4 2.59695 4.59695 2 5.33333 2H10.6667C11.403 2 12 2.59695 12 3.33333V12.6667C12 13.403 11.403 14 10.6667 14H5.33333C4.59695 14 4 13.403 4 12.6667V3.33333Z" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11.3333H8.00667" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Enter mobile number"
                className="w-full h-full bg-transparent border-none rounded-r-lg pl-9 pr-3.5 font-sans font-normal text-sm text-white placeholder-[#64748B] outline-none"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-start w-full gap-5">
        
        <div className="flex flex-col flex-1 w-full gap-1.5">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Email Address</label>
          <div className="relative w-full h-[42px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66666 4C2.66666 3.26362 3.26362 2.66667 4 2.66667H12C12.7364 2.66667 13.3333 3.26362 13.3333 4V12C13.3333 12.7364 12.7364 13.3333 12 13.3333H4C3.26362 13.3333 2.66666 12.7364 2.66666 12V4Z" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3333 4L8 8.66667L2.66666 4" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="email" 
              placeholder="Enter email address"
              className="w-full h-full bg-[#0C1017] border border-[#232E40] rounded-lg pl-10 pr-3.5 font-sans font-normal text-sm text-white placeholder-[#64748B] outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full gap-1.5">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Gender</label>
          <div className="relative w-full h-[42px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3333 14C13.3333 11.7909 10.9455 10 8 10C5.05452 10 2.66666 11.7909 2.66666 14" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Dropdown 
              options={genderOptions}
              value={gender}
              onChange={setGender}
              placeholder="Select gender"
              triggerClassName="flex flex-row items-center justify-between pl-10 pr-3 w-full h-[42px] bg-[#0C1017] border border-[#232E40] rounded-lg cursor-pointer"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
