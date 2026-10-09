"use client";

import { useState, useEffect } from "react";
import { Check, Circle, CurrencyInr, Trash, Eye, PencilSimple } from "@phosphor-icons/react";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal";

export interface PlanCardProps {
  id: string;
  name: string;
  status: string;
  price: string;
  billingCycle: string;
  badge: string | null;
  features: string[];
}

export default function PlanCard({
  id,
  name,
  status,
  price,
  billingCycle,
  badge,
  features,
}: PlanCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  let bgClass = "bg-[#111722]";
  let borderClass = "border-[#1B2533]";
  let checkColor = "text-[#9CA3AF]";
  let checkBorderColor = "border-[#9CA3AF]";
  let badgeBg = "bg-[#1A1C23]";
  let badgeBorder = "border-[#232631]";
  let badgeText = "text-[#94A3B8]";

  if (name === "Silver") {
    borderClass = "border-[#1B2B3F]";
    checkColor = "text-[#60A5FA]";
    checkBorderColor = "border-[#60A5FA]";
  } else if (name === "Gold") {
    bgClass = "bg-[#141416]";
    borderClass = "border-[#443118]";
    checkColor = "text-[#DCA560]";
    checkBorderColor = "border-[#DCA560]";
    badgeBg = "bg-[#2E1D0F]";
    badgeBorder = "border-[#52391B]";
    badgeText = "text-[#DCA560]";
  } else if (name === "Platinum") {
    bgClass = "bg-[#15121B]";
    borderClass = "border-[#3B1C55]";
    checkColor = "text-[#C084FC]";
    checkBorderColor = "border-[#C084FC]";
    badgeBg = "bg-[#37164F]";
    badgeBorder = "border-[#5A2482]";
    badgeText = "text-[#C084FC]";
  }

  const [localStatus, setLocalStatus] = useState(status);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem(`mock_plan_status_${id}`);
    if (savedStatus) setLocalStatus(savedStatus);
    
    const savedDeleted = localStorage.getItem(`mock_plan_deleted_${id}`);
    if (savedDeleted === 'true') setIsDeleted(true);
  }, [id]);

  if (isDeleted) return null;

  const isInactive = localStatus.toLowerCase() === "inactive" || localStatus.toLowerCase() === "deactivated";
  const statusBgStyle = isInactive ? "bg-red-500/10" : "bg-[#13281B]";
  const statusBorderStyle = isInactive ? "border-red-500/20" : "border-[#1E462D]";
  const statusDotColor = isInactive ? "text-red-500" : "text-[#4ADE80]";
  const statusTextColor = isInactive ? "text-red-500" : "text-[#4ADE80]";

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setIsDeleted(true);
    localStorage.setItem(`mock_plan_deleted_${id}`, 'true');
    toast.success("Plan deleted successfully", { id: `delete-plan-${id}` });
  };

  return (
    <div
      className={`flex flex-col justify-between ${bgClass} border ${borderClass} rounded-[10px] p-4 sm:p-5 transition-all hover:brightness-110 min-h-[340px] h-full w-full relative`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-[15px] sm:text-[16px] font-bold text-white break-words">{name}</h3>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusBgStyle} border ${statusBorderStyle} shrink-0`}>
              <Circle size={5} weight="fill" className={statusDotColor} />
              <span className={`text-[9px] font-medium ${statusTextColor} uppercase tracking-wider`}>{localStatus}</span>
            </div>
          </div>

          {badge && (
            <div className={`px-2 py-0.5 rounded-[5px] text-[9px] font-medium uppercase tracking-wider self-start border ${badgeBg} ${badgeBorder} ${badgeText}`}>
              {badge}
            </div>
          )}

          <div className="flex items-end gap-1 mt-1">
            <span className="text-2xl sm:text-[26px] font-bold text-white tracking-tight flex items-center ">
              <CurrencyInr size={24} weight="bold" className="mb-[2px]" />
              {price}
            </span>
            <span className="text-[10px] font-normal text-[#9CA3AF] mb-1">{billingCycle}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-3 h-3 rounded-full border-[1.1px] ${checkBorderColor} shrink-0`}>
                <Check size={8} weight="bold" className={checkColor} />
              </div>
              <span className="text-[10px] font-normal text-[#D1D5DB] break-words whitespace-normal leading-tight">{feature}</span>
            </div>
          ))}
        </div>

        <button className="cursor-pointer flex items-center text-[10px] font-normal text-[#9CA3AF] hover:text-white transition-colors mt-2 self-start uppercase tracking-wide">
          {features.length} Features Included
        </button>
      </div>

      <div className="flex flex-row justify-center items-center gap-2 mt-6 w-full pt-4 border-t border-[#1D2634]">
        <Link href={`/superadmin/plans/${id}`} className="flex justify-center items-center flex-1 h-9 rounded-lg border border-transparent hover:border-[#2B3648] hover:bg-[#1A222D] transition-colors cursor-pointer group">
          <Eye size={18} className="text-[#64748B] group-hover:text-white transition-colors" />
        </Link>
        <Link href={`/superadmin/plans/edit/${id}`} className="flex justify-center items-center flex-1 h-9 rounded-lg border border-transparent hover:border-[#2B3648] hover:bg-[#1A222D] transition-colors cursor-pointer group">
          <PencilSimple size={18} className="text-[#64748B] group-hover:text-[#BBF246] transition-colors" />
        </Link>
        <button 
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex justify-center items-center flex-1 h-9 rounded-lg border border-transparent hover:border-[#EF4444]/30 hover:bg-[#EF4444]/10 transition-colors cursor-pointer group"
        >
          <Trash size={18} className="text-[#64748B] group-hover:text-[#EF4444] transition-colors" />
        </button>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Plan"
        message={`Are you sure you want to delete the "${name}" plan? This action cannot be undone and will affect all users subscribed to this plan.`}
        confirmText="Delete Plan"
        cancelText="Cancel"
        isConfirming={isDeleting}
        confirmingText="Deleting..."
        isDestructive={true}
      />
    </div>
  );
}
