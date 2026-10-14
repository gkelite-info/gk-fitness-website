"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PhoneCall,
  EnvelopeSimple,
  Globe,
  PencilSimple,
  Trash,
  Gear,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../ConfirmationModal";

interface GymContactAndActionsSectionProps {
  gymId: string;
  gymName: string;
  phone: string;
  email: string;
  website: string;
  status: "active" | "inactive";
  onStatusToggle?: (newStatus: "active" | "inactive") => void;
  className?: string;
}

export default function GymContactAndActionsSection({
  gymId,
  gymName,
  phone,
  email,
  website,
  status,
  onStatusToggle,
  className = "",
}: GymContactAndActionsSectionProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const isActive = status === "active";

  const handleEditClick = () => {
    router.push(`/superadmin/gyms/${gymId}/edit`);
  };

  const handleConfirmToggle = () => {
    const nextStatus = isActive ? "inactive" : "active";
    if (onStatusToggle) {
      onStatusToggle(nextStatus);
    }
    toast.success(
      `Gym "${gymName}" ${isActive ? "deactivated" : "activated"} successfully`,
      { id: "gym-status-toggle" }
    );
    setIsConfirmOpen(false);
  };

  return (
    <div className={`flex flex-col h-full w-full min-w-0 justify-between ${className}`}>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
          <PhoneCall size={15} weight="bold" />
          <span>CONTACT INFORMATION</span>
        </div>

        <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
          <div
            title={phone}
            className="flex items-center justify-between gap-3 cursor-default group"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                PHONE NUMBER
              </span>
              <span className="text-sm font-semibold text-white mt-0.5 truncate group-hover:text-[#D4FF32] transition-colors">
                {phone}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#141B26] border border-[#232E42] flex items-center justify-center text-[#94A3B8] shrink-0 group-hover:border-[#D4FF32]/50 group-hover:text-[#D4FF32] transition-all">
              <PhoneCall size={16} />
            </div>
          </div>

          <div className="w-full h-px bg-[#1C2536]" />

          <div
            title={email}
            className="flex items-center justify-between gap-3 cursor-default group"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                EMAIL ADDRESS
              </span>
              <span className="text-sm font-semibold text-white mt-0.5 truncate group-hover:text-[#D4FF32] transition-colors">
                {email}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#141B26] border border-[#232E42] flex items-center justify-center text-[#94A3B8] shrink-0 group-hover:border-[#D4FF32]/50 group-hover:text-[#D4FF32] transition-all">
              <EnvelopeSimple size={16} />
            </div>
          </div>

          <div className="w-full h-px bg-[#1C2536]" />

          <div
            title={website}
            className="flex items-center justify-between gap-3 cursor-default group"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                WEBSITE
              </span>
              <span className="text-sm font-semibold text-white mt-0.5 truncate group-hover:text-[#D4FF32] transition-colors">
                {website}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#141B26] border border-[#232E42] flex items-center justify-center text-[#94A3B8] shrink-0 group-hover:border-[#D4FF32]/50 group-hover:text-[#D4FF32] transition-all">
              <Globe size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-6">
        <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
          <Gear size={15} weight="bold" />
          <span>ACTIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-[#0F141E] border border-[#1C2536] hover:border-[#D4FF32]/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group shadow-sm active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] group-hover:scale-105 transition-transform">
              <PencilSimple size={20} weight="bold" />
            </div>
            <span className="text-sm font-bold text-white group-hover:text-[#D4FF32] transition-colors">
              Edit Gym
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="bg-[#0F141E] border border-[#1C2536] hover:border-red-500/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group shadow-sm active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-[#2A1417] border border-[#441D22] flex items-center justify-center text-[#FB7185] group-hover:scale-105 transition-transform">
              <Trash size={20} weight="bold" />
            </div>
            <span className="text-sm font-bold text-[#FB7185] transition-colors">
              {isActive ? "Deactivate" : "Activate Gym"}
            </span>
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmToggle}
        title={isActive ? "Deactivate Gym" : "Activate Gym"}
        message={
          isActive
            ? `Are you sure you want to deactivate "${gymName}"? Members and trainers will temporarily lose access until reactivated.`
            : `Are you sure you want to activate "${gymName}"? All services will resume immediately.`
        }
        confirmText={isActive ? "Deactivate Gym" : "Activate Gym"}
        isDestructive={isActive}
      />
    </div>
  );
}
