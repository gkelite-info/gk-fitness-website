"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import EnquiryBasicDetails from "./_components/EnquiryBasicDetails";
import InterestedService from "./_components/InterestedService";
import EnquirySource from "./_components/EnquirySource";
import NotesSection from "./_components/NotesSection";
import CategoryAndFollowUp from "./_components/CategoryAndFollowUp";
import EnquirySidebar from "./_components/EnquirySidebar";
import { Suspense, useEffect } from "react";
import { EnquiryProvider, useEnquiryForm } from "./_components/EnquiryContext";
import { useUser } from "@/app/context/UserContext";
import { useSaveGymEnquiry, useGymEnquiryById } from "@/lib/hooks/gymEnquiries/useGymEnquiries";
import toast from "react-hot-toast";

function EnquiryPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const enquiryId = searchParams.get("id");
  const { formData, updateFormData } = useEnquiryForm();
  const { user, roleData } = useUser();
  const saveEnquiry = useSaveGymEnquiry();

  const { data: existingEnquiry, isLoading } = useGymEnquiryById(enquiryId || undefined);

  useEffect(() => {
    if (isEditMode && existingEnquiry) {
      updateFormData({
        fullName: existingEnquiry.fullName || "",
        mobile: existingEnquiry.mobile || "",
        email: existingEnquiry.email || "",
        gender: existingEnquiry.gender || "",
        interestedIn: existingEnquiry.interestedIn || "membership",
        planId: existingEnquiry.planId || "",
        planName: existingEnquiry.plan?.planName || "",
        addedThrough: existingEnquiry.addedThrough || "owner",
        enquirySource: existingEnquiry.enquirySource || "google",
        notes: existingEnquiry.notes || "",
        enquiryCategory: existingEnquiry.enquiryCategory || "cold",
        followUpDate: existingEnquiry.followUpDate ? new Date(existingEnquiry.followUpDate).toISOString().split('T')[0] : "",
      });
    }
  }, [isEditMode, existingEnquiry]);

  const handleSave = async () => {
    try {
      const gymId = roleData?.[0]?.gymId;
      if (!gymId) {
        toast.error("Gym ID not found.");
        return;
      }

      if (!formData.fullName || !formData.mobile || !formData.email) {
        toast.error("Please fill all required fields (Name, Mobile, and Email).");
        return;
      }

      const params: any = {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        gender: formData.gender,
        interestedIn: formData.interestedIn,
        planId: formData.interestedIn === "membership" ? formData.planId : null,
        addedThrough: formData.addedThrough,
        enquirySource: formData.enquirySource,
        notes: formData.notes,
        enquiryCategory: formData.enquiryCategory,
        followUpDate: formData.followUpDate,
        gymId: gymId,
        createdBy: user?.id,
        status: isEditMode && existingEnquiry ? existingEnquiry.status : "new",
      };

      if (isEditMode && enquiryId) {
        params.gymEnquiryId = enquiryId;
      }

      await saveEnquiry.mutateAsync(params);
      toast.success(isEditMode ? "Enquiry updated successfully!" : "Enquiry saved successfully!");
      router.push('/owner/enquiries');
    } catch (err) {
      console.error("Failed to save enquiry:", err);
      toast.error("Failed to save enquiry. Please try again.");
    }
  };

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
              onClick={handleSave}
              disabled={saveEnquiry.isPending}
              className="flex-1 relative flex flex-col justify-center items-center py-2.5 h-[46px] bg-[#D9F927] rounded-lg overflow-hidden group cursor-pointer shadow-[0_10px_15px_-3px_rgba(217,249,39,0.1),0_4px_6px_-4px_rgba(217,249,39,0.1)] hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] z-0" />
              <span className="relative z-10 font-sans font-bold text-[15px] text-[#020617] leading-5 text-center tracking-[-0.35px] group-hover:scale-[1.02] transition-transform">
                {saveEnquiry.isPending ? "Saving..." : (isEditMode ? "Update Enquiry" : "Save Enquiry")}
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
      <EnquiryProvider>
        <EnquiryPageContent />
      </EnquiryProvider>
    </Suspense>
  );
}
