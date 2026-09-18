"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft, UsersThree, Barbell } from "@phosphor-icons/react";

import PersonalInformation from "./_components/PersonalInformation";
import ProfessionalInformation from "./_components/ProfessionalInformation";
import ContactInformation from "./_components/ContactInformation";
import WorkingSchedule from "./_components/WorkingSchedule";
import AdditionalInformation from "./_components/AdditionalInformation";
import AccountInformation from "./_components/AccountInformation";
import EmergencyContact from "./_components/EmergencyContact";
import MembershipInformation from "./_components/MembershipInformation";

function AddUserForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const initialTab = typeParam === "trainers" ? "trainers" : "customers";
  
  const [activeTab, setActiveTab] = useState<"customers" | "trainers">(initialTab);

  useEffect(() => {
    if (typeParam === "trainers" || typeParam === "customers") {
      setActiveTab(typeParam);
    }
  }, [typeParam]);
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen px-4 md:px-6 lg:px-8 pb-10 max-w-[1200px] mx-auto mt-6 overflow-x-hidden">
      {/* Page Title & Segmented Toggle Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0 mb-8">
        
        {/* Title and Back button */}
        <div className="flex flex-row items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex flex-row justify-center items-center w-8 h-8 bg-[#161B22] border border-[#232A35] rounded-lg cursor-pointer hover:bg-[#232A35] transition-colors"
          >
            <CaretLeft size={16} className="text-[#D1D5DB]" weight="bold" />
          </button>

          <div className="flex flex-col items-start pl-3.5">
            <h1 className="font-sans font-bold text-lg leading-7 tracking-[-0.45px] text-white">
              Add New {activeTab === "trainers" ? "Trainer" : "Customer"}
            </h1>
            <p className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">
              Fill in the details and create their account
            </p>
          </div>
        </div>

        {/* Segmented Tab / Switcher */}
        <div className="flex flex-row items-start p-1 bg-[#161B22] border border-[#232A35] rounded-lg">
          <button
            type="button"
            onClick={() => router.push("?type=customers", { scroll: false })}
            className={`flex flex-row items-center px-4 py-1.5 gap-2 h-[28px] rounded-md transition-all cursor-pointer ${
              activeTab === "customers"
                ? "bg-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "bg-transparent hover:bg-white/5"
            }`}
          >
            <UsersThree 
              size={14} 
              weight={activeTab === "customers" ? "bold" : "regular"} 
              className={activeTab === "customers" ? "text-black" : "text-[#9CA3AF]"} 
            />
            <span
              className={`font-sans text-xs leading-4 text-center ${
                activeTab === "customers" ? "font-semibold text-black" : "font-medium text-[#9CA3AF]"
              }`}
            >
              Customers
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => router.push("?type=trainers", { scroll: false })}
            className={`flex flex-row items-center px-4 py-1.5 gap-2 h-[28px] rounded-md transition-all cursor-pointer ${
              activeTab === "trainers"
                ? "bg-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "bg-transparent hover:bg-white/5"
            }`}
          >
            <Barbell 
              size={14} 
              weight={activeTab === "trainers" ? "bold" : "regular"} 
              className={activeTab === "trainers" ? "text-black" : "text-[#9CA3AF]"} 
            />
            <span
              className={`font-sans text-xs leading-4 text-center ${
                activeTab === "trainers" ? "font-semibold text-black" : "font-medium text-[#9CA3AF]"
              }`}
            >
              Trainers
            </span>
          </button>
        </div>
      </div>

      {/* Main Form Layout */}
      {activeTab === "trainers" ? (
        <div className="flex flex-col items-start w-full gap-5">
          {/* SECTION ROW 1 */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch w-full gap-5">
            <PersonalInformation />
            <ProfessionalInformation />
          </div>

          {/* SECTION ROW 2 */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch w-full gap-5">
            <ContactInformation />
            <WorkingSchedule />
          </div>

          {/* SECTION ROW 3 */}
          <AdditionalInformation />

          {/* SECTION ROW 4 */}
          <AccountInformation userType="trainer" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-stretch w-full gap-5">
          {/* Left Column */}
          <div className="flex flex-col w-full lg:w-1/2 gap-5">
            <PersonalInformation />
            
            <div className="flex-1 flex flex-col [&>div]:flex-1 [&>div]:h-full">
              <EmergencyContact />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col w-full lg:w-1/2 gap-5">
            <ContactInformation />
            <MembershipInformation />

            <div className="flex-1 flex flex-col [&>div]:flex-1 [&>div]:h-full">
              <AccountInformation userType="customer" />
            </div>
          </div>
        </div>
      )}

      {/* Form Bottom Action Bar */}
      <div className="flex flex-row justify-end items-center pt-4 mt-5 w-full border-t border-[#14161A] gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex flex-col justify-center items-center px-6 py-2.5 h-[38px] border border-[#303744] rounded-lg hover:bg-[#303744]/50 transition-colors cursor-pointer"
        >
          <span className="font-sans font-semibold text-xs leading-4 text-center tracking-[0.3px] uppercase text-[#D1D5DB]">
            Cancel
          </span>
        </button>

        <button
          type="button"
          className="relative flex flex-col justify-center items-center px-7 py-2.5 h-[38px] bg-[#D4FF32] rounded-lg overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] shadow-[0_10px_15px_-3px_rgba(212,255,50,0.1),0_4px_6px_-4px_rgba(212,255,50,0.1)] rounded-lg z-0" />
          <span className="relative z-10 font-sans font-bold text-xs leading-4 text-center tracking-[0.6px] uppercase text-black group-hover:scale-[1.02] transition-transform">
            Create {activeTab === "trainers" ? "Trainer" : "Customer"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function AddUserPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-white">Loading...</div>}>
      <AddUserForm />
    </Suspense>
  );
}
