"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import TrainerProfileHeader from "./TrainerProfileHeader";
import TrainerHeroCard from "./TrainerHeroCard";
import TrainerKpiCards from "./TrainerKpiCards";
import TrainerAboutAndSpecs from "./TrainerAboutAndSpecs";
import TrainerCertsAndPerformance from "./TrainerCertsAndPerformance";
import ConfirmationModal from "../../ConfirmationModal";
import { TrainerItem } from "../types";

interface GlobalTrainerProfileViewProps {
  trainer: TrainerItem;
}

export default function GlobalTrainerProfileView({
  trainer,
}: GlobalTrainerProfileViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const trainerCode = `TRN-${trainer.id.replace("global-tr-", "").padStart(6, "0")}`;

  const handleEditClick = () => {
    const from = searchParams.get("from");
    router.push(
      `/superadmin/trainers/${trainer.id}/edit${from ? `?from=${from}` : ""}`
    );
  };

  const handleConfirmRemove = () => {
    toast.success(`Trainer "${trainer.name}" removed successfully`, {
      id: "profile-remove-trainer",
    });
    setIsRemoveModalOpen(false);
    const from = searchParams.get("from");
    if (from === "users") {
      router.push("/superadmin/users?tab=global-trainers");
    } else {
      router.push("/superadmin/trainers");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <TrainerProfileHeader trainerCode={trainerCode} />

      <TrainerHeroCard trainer={trainer} />

      <TrainerKpiCards trainer={trainer} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full min-w-0 items-start">
        <TrainerAboutAndSpecs trainer={trainer} />
        <TrainerCertsAndPerformance trainer={trainer} />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-3 border-t border-[#1C2536]">
        <button
          type="button"
          onClick={handleEditClick}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#141B26] border border-[#222E42] hover:border-[#D4FF32] text-[#D4FF32] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 text-center"
        >
          <PencilSimple size={15} weight="bold" />
          <span>Edit Trainer</span>
        </button>

        <button
          type="button"
          onClick={() => setIsRemoveModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2A1417] border border-[#441D22] hover:border-[#EF4444] text-[#FB7185] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 text-center"
        >
          <Trash size={15} weight="bold" />
          <span>Remove</span>
        </button>
      </div>

      <ConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Global Trainer"
        message={`Are you sure you want to remove "${trainer.name}" from global trainers? This action cannot be undone.`}
        confirmText="Remove Trainer"
        cancelText="Cancel"
      />
    </div>
  );
}
