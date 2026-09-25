"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import EnquiryBasicDetails from "./_components/EnquiryBasicDetails";
import InterestedService from "./_components/InterestedService";
import EnquirySource from "./_components/EnquirySource";
import NotesSection from "./_components/NotesSection";
import CategoryAndFollowUp from "./_components/CategoryAndFollowUp";
import EnquirySidebar from "./_components/EnquirySidebar";
import { Suspense } from "react";

function EnquiryPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  return (
    <div className="flex flex-col w-full min-h-screen px-4 md:px-6 lg:px-8 pb-10 max-w-[1540px] mx-auto mt-6 overflow-x-hidden">
      
      <div className="flex flex-row items-center w-full mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex flex-row justify-center items-center w-8 h-8 bg-[#161B22] border border-[#232A35] rounded-lg cursor-pointer hover:bg-[#232A35] transition-colors shrink-0"
        >
          <CaretLeft size={16} className="text-[#D1D5DB]" weight="bold" />
        </button>

        <div className="flex flex-col items-start pl-3.5">
          <h1 className="font-sans font-bold text-[30px] leading-[36px] tracking-[-0.75px] text-white">
            {isEditMode ? "Edit Enquiry" : "Add Enquiry"}
          </h1>
          <p className="font-sans font-normal text-[14px] leading-[20px] text-[#94A3B8]">
            {isEditMode ? "Update customer details and preferences." : "Capture customer details and track follow-up for new enquiries."}
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-stretch w-full gap-5">
        
        <div className="flex flex-col flex-1 w-full gap-5 min-w-0">
          <EnquiryBasicDetails />
          <InterestedService />
          <EnquirySource />
          <div className="flex-1 flex flex-col h-full min-h-0">
            <NotesSection />
          </div>
        </div>

        <div className="flex flex-col w-full xl:w-[340px] 2xl:w-[420px] gap-5 shrink-0">
          <EnquirySidebar />
          <CategoryAndFollowUp />
          
          <div className="flex flex-row items-center w-full gap-3 mt-auto pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 flex flex-col justify-center items-center py-2.5 h-[46px] bg-[#10151F] border border-[#232E40] rounded-lg cursor-pointer hover:bg-[#1C2631] transition-colors"
            >
              <span className="font-sans font-medium text-[15px] text-[#CBD5E1] leading-5 text-center">Cancel</span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/owner/enquiries')}
              className="flex-1 relative flex flex-col justify-center items-center py-2.5 h-[46px] bg-[#D9F927] rounded-lg overflow-hidden group cursor-pointer shadow-[0_10px_15px_-3px_rgba(217,249,39,0.1),0_4px_6px_-4px_rgba(217,249,39,0.1)] hover:brightness-105 transition-all"
            >
              <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] z-0" />
              <span className="relative z-10 font-sans font-bold text-[15px] text-[#020617] leading-5 text-center tracking-[-0.35px] group-hover:scale-[1.02] transition-transform">
                {isEditMode ? "Update Enquiry" : "Save Enquiry"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddEnquiryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading...</div>}>
      <EnquiryPageContent />
    </Suspense>
  );
}
