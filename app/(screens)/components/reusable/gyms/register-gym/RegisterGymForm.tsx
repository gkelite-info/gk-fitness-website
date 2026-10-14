"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PlusCircle, CheckCircle } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { GymFormData, INITIAL_GYM_FORM, getMockGymEditData } from "./types";
import GymInformationSection from "./GymInformationSection";
import OwnerInformationSection from "./OwnerInformationSection";
import AdditionalInformationSection from "./AdditionalInformationSection";
import GymLogoUploadCard from "./GymLogoUploadCard";
import GymQrCard from "./GymQrCard";
import GymSuccessModal from "./GymSuccessModal";

interface RegisterGymFormProps {
  mode?: "create" | "edit";
  gymId?: string;
  onSuccess?: (data: GymFormData) => void;
}

export default function RegisterGymForm({
  mode = "create",
  gymId,
  onSuccess,
}: RegisterGymFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState<GymFormData>(() => {
    if (isEdit && gymId) {
      return getMockGymEditData(gymId);
    }
    return INITIAL_GYM_FORM;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFieldChange = <K extends keyof GymFormData>(
    key: K,
    value: GymFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.gymName.trim()) {
      toast.error("Please enter the gym name", { id: "val-gym-name" });
      return false;
    }
    if (!formData.gymEmail.trim() || !formData.gymEmail.includes("@")) {
      toast.error("Please enter a valid gym email address", { id: "val-gym-email" });
      return false;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit gym phone number", { id: "val-gym-phone" });
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter the gym address", { id: "val-gym-address" });
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter the city", { id: "val-gym-city" });
      return false;
    }
    if (!formData.state.trim()) {
      toast.error("Please select a state", { id: "val-gym-state" });
      return false;
    }
    if (!formData.pinCode.trim() || formData.pinCode.replace(/\D/g, "").length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code", { id: "val-gym-pin" });
      return false;
    }
    if (!formData.ownerName.trim()) {
      toast.error("Please enter the owner full name", { id: "val-owner-name" });
      return false;
    }
    if (!formData.ownerEmail.trim() || !formData.ownerEmail.includes("@")) {
      toast.error("Please enter a valid owner email address", { id: "val-owner-email" });
      return false;
    }
    if (!formData.ownerPhone.trim() || formData.ownerPhone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit owner phone number", { id: "val-owner-phone" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    }, 500);
  };

  const handleBack = () => {
    router.push("/superadmin/gyms");
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 pb-20 sm:pb-14 lg:pb-14 flex flex-col gap-6 max-w-full overflow-x-hidden">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to Gyms"
          className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {isEdit ? "Edit Gym Information" : "Register New Gym"}
          </h1>
          <p className="text-xs text-[#94A3B8]">
            {isEdit
              ? "Update gym/organization details on the platform."
              : "Add a new gym/organization to the platform."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 w-full items-start">
        <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
          <GymInformationSection formData={formData} onChange={handleFieldChange} />
          <OwnerInformationSection formData={formData} onChange={handleFieldChange} />
          <AdditionalInformationSection formData={formData} onChange={handleFieldChange} />
        </div>

        <div className="w-full lg:w-[340px] xl:w-[380px] flex flex-col gap-6 shrink-0">
          <GymLogoUploadCard
            logoUrl={formData.logoUrl}
            onLogoChange={(url) => handleFieldChange("logoUrl", url)}
            isEdit={isEdit}
          />

          <GymQrCard
            gymName={formData.gymName}
            onGenerate={() => handleFieldChange("qrCodeGenerated", true)}
          />

          <div className="flex flex-col sm:flex-row gap-3 w-full shrink-0 pt-1 pb-4 sm:pb-0">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:flex-1 h-12 shrink-0 rounded-xl bg-[#18202D] hover:bg-[#222C3E] border border-[#263145] text-white font-semibold text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-[1.2] h-12 shrink-0 rounded-xl bg-[#D4FF32] hover:bg-[#bde826] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,50,0.25)] active:scale-95 disabled:opacity-75"
            >
              {isEdit ? (
                <CheckCircle size={20} weight="bold" />
              ) : (
                <PlusCircle size={20} weight="bold" />
              )}
              <span>{isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Gym"}</span>
            </button>
          </div>
        </div>
      </form>

      <GymSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        mode={mode}
        formData={formData}
        gymId={gymId}
      />
    </div>
  );
}
