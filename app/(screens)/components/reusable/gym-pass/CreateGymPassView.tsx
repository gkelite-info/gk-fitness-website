"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateGymPassHeader from "./CreateGymPassHeader";
import CreateGymPassFormSection, { GymPassFormData } from "./CreateGymPassFormSection";
import CreateGymPassSideCards from "./CreateGymPassSideCards";
import CreateGymPassFooter from "./CreateGymPassFooter";
import EditGymPassBanner from "./EditGymPassBanner";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { GymPassItem } from "./GymPassTypes";
import { saveGymPass, updateGymPass, getGymPassById } from "./gymPassStore";

export default function CreateGymPassView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  const passId = searchParams.get("id");

  const [currentPass, setCurrentPass] = useState<GymPassItem | null>(null);
  const [formData, setFormData] = useState<GymPassFormData>({
    name: "",
    price: "",
    validity: "30 Days",
    maxVisits: "1 Visit",
    access: "Registered Gyms",
    activationRule: "On First Use",
  });

  const [isActive, setIsActive] = useState(true);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  useEffect(() => {
    if (isEdit && passId) {
      const p = getGymPassById(passId);
      if (p) {
        setCurrentPass(p);
        setFormData({
          name: p.name,
          price: `₹${p.price.toLocaleString("en-IN")}`,
          validity: `${p.durationDays} Days`,
          maxVisits: p.maxVisits || "1 Visit",
          access: p.access || "Registered Gyms",
          activationRule: p.activationRule || "On First Use",
        });
        setIsActive(p.status === "active");
      }
    }
  }, [isEdit, passId]);

  const handleFieldChange = (field: keyof GymPassFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    const rawPrice = Number(formData.price.replace(/[^\d]/g, "")) || 999;
    const rawDays = Number(formData.validity.replace(/[^\d]/g, "")) || 30;

    if (isEdit && currentPass) {
      updateGymPass(currentPass.id, {
        name: formData.name.trim() || currentPass.name,
        price: rawPrice,
        durationDays: rawDays,
        maxVisits: formData.maxVisits,
        access: formData.access,
        activationRule: formData.activationRule,
        status: isActive ? "active" : "inactive",
      });
    } else if (formData.name.trim()) {
      saveGymPass({
        name: formData.name.trim(),
        type: formData.validity.toLowerCase().includes("1 day") ? "day" : "monthly",
        price: rawPrice,
        status: isActive ? "active" : "inactive",
        color: formData.validity.toLowerCase().includes("1 day") ? "emerald" : "purple",
        durationDays: rawDays,
        maxVisits: formData.maxVisits,
        access: formData.access,
        activationRule: formData.activationRule,
      });
    }
    router.back();
  };

  const handleConfirmDeactivate = () => {
    if (currentPass) {
      const nextStatus = currentPass.status === "active" ? "inactive" : "active";
      updateGymPass(currentPass.id, { status: nextStatus });
      setIsActive(nextStatus === "active");
      setIsDeactivateModalOpen(false);
      router.back();
    }
  };

  const isCurrentActive = currentPass?.status === "active";

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto overflow-x-hidden min-w-0">
      <CreateGymPassHeader onBack={handleBack} isEdit={isEdit} />

      {isEdit && currentPass && (
        <EditGymPassBanner pass={{ ...currentPass, status: isActive ? "active" : "inactive" }} />
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col min-w-0">
          <CreateGymPassFormSection
            formData={formData}
            onChange={handleFieldChange}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col min-w-0">
          <CreateGymPassSideCards
            isActive={isActive}
            onToggleActive={() => setIsActive((prev) => !prev)}
          />
        </div>
      </div>

      <CreateGymPassFooter
        onCancel={handleBack}
        onSubmit={handleSubmit}
        onDeactivate={() => setIsDeactivateModalOpen(true)}
        isEdit={isEdit}
        status={currentPass?.status || "active"}
      />

      <ConfirmationModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        title={isCurrentActive ? "Deactivate Gym Pass" : "Activate Gym Pass"}
        message={
          isCurrentActive
            ? `Are you sure you want to deactivate "${currentPass?.name}"? Customers will not be able to purchase or use this pass until it is reactivated.`
            : `Are you sure you want to activate "${currentPass?.name}"?`
        }
        confirmText={isCurrentActive ? "Deactivate" : "Activate"}
        cancelText="Cancel"
        isDestructive={isCurrentActive}
      />
    </div>
  );
}
