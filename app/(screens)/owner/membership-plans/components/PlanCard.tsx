"use client";

import { Crown, CheckCircle, CalendarBlank, Users, DotsThree, NotePencil, Trash, Recycle } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { useDeleteMembershipPlan, useRestoreMembershipPlan } from "@/lib/hooks/membership/useMutateMembershipPlan";

interface PlanCardProps {
  id: string;
  title: string;
  price: string;
  period: string;
  status: string;
  features: string[];
  duration: string;
  members: number;
  isHighlighted?: boolean;
  extraFeaturesCount?: number;
}

export default function PlanCard({
  id,
  title,
  price,
  period,
  status,
  features,
  duration,
  members,
  isHighlighted = false,
  extraFeaturesCount = 0,
}: PlanCardProps) {
  const [isDeletedLocal, setIsDeletedLocal] = useState(status === "Inactive");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  
  const deleteMutation = useDeleteMembershipPlan();
  const restoreMutation = useRestoreMembershipPlan();

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setIsDeletedLocal(true);
        setIsModalOpen(false);
      }
    });
  };

  const handleRestore = () => {
    restoreMutation.mutate(id, {
      onSuccess: () => {
        setIsDeletedLocal(false);
        setIsRestoreModalOpen(false);
      }
    });
  };

  return (
    <>
    <div
      className={`flex flex-col justify-between p-[24px] rounded-[24px] transition-all w-[85vw] max-w-[320px] sm:max-w-none sm:w-[314px] shrink-0 h-full min-h-[475px] box-border ${isHighlighted
          ? "bg-[#171A1E] border-[1.5px] border-[#D4FF00] shadow-[0px_0px_16px_-2px_rgba(212,255,0,0.25)]"
          : "bg-[#171A1E] border border-[#262A30]"
        }`}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row justify-between items-start min-h-[90px] gap-2">
          <div className="flex flex-row items-center gap-[12px] sm:gap-[14px] min-w-0 flex-1">
            <div className="w-[49px] h-[48px] rounded-[16px] bg-[#22291D] border border-[rgba(212,255,0,0.4)] flex items-center justify-center shrink-0 box-border">
              <Crown size={24} weight="fill" className="text-[#D4FF00]" />
            </div>
            <div className="flex flex-col gap-[2px] min-w-0 flex-1">
              <h3 className="text-white text-[18px] sm:text-[20px] font-[700] font-['Plus_Jakarta_Sans',sans-serif] leading-[24px] sm:leading-[28px] tracking-[-0.5px] m-0 break-words whitespace-normal">
                {title}
              </h3>
              <div className="flex flex-row items-baseline gap-[4px] sm:gap-[6px] flex-nowrap">
                <span className="text-[#D4FF00] text-[20px] sm:text-[24px] font-[900] font-['Plus_Jakarta_Sans',sans-serif] leading-[28px] sm:leading-[32px] whitespace-nowrap">
                  {price}
                </span>
                <span className="text-[#9CA3AF] text-[11px] sm:text-[12px] font-[500] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px] whitespace-nowrap">
                  {period}
                </span>
              </div>
            </div>
          </div>
          <div className="px-[8px] sm:px-[10px] py-[4px] rounded-full border border-[rgba(212,255,0,0.25)] bg-[#1D261A] text-[#D4FF00] text-[10px] sm:text-[11px] font-[600] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px] flex items-center shrink-0 mt-[2px]">
            {status}
          </div>
        </div>

        <div className="flex flex-col pt-[19px] gap-[14px] border-t border-[#23282F]">
          <span className="text-[#9CA3AF] text-[11px] font-[700] font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.55px] uppercase leading-[16px]">
            INCLUDES
          </span>
          <div className={`grid gap-y-[12px] gap-x-[10px] ${features.length > 4 ? "grid-cols-2" : "grid-cols-1"}`}>
            {features.length > 0 ? (
              features.map((feature, idx) => (
                <div key={idx} className="flex flex-row items-center gap-[10px]">
                  <CheckCircle size={16} weight="fill" className="text-[#D4FF00] shrink-0" />
                  <span className="text-[#E5E7EB] text-[12px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px] truncate">
                    {feature}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-[#9CA3AF] text-[14px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px]">
                -
              </span>
            )}
          </div>
          {extraFeaturesCount > 0 && (
            <div className="flex justify-end mt-[-8px]">
              <span
                className={`px-[8px] py-[2px] rounded-[6px] text-[10px] font-[600] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px] ${isHighlighted
                    ? "bg-[#1D261A] border border-[rgba(212,255,0,0.4)] text-[#D4FF00] shadow-[0px_0px_8px_0px_rgba(212,255,0,0.15)]"
                    : "bg-[#21262D] border border-[#2B333C] text-[#9CA3AF]"
                  }`}
              >
                +{extraFeaturesCount} More
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col pt-[20px] gap-[20px] border-t border-[#23282F] mt-[24px]">
        <div className="flex flex-row justify-between items-center h-[25.5px]">
          <div className="flex flex-row items-center gap-[8px]">
            <CalendarBlank size={16} className="text-[#6B7280]" />
            <div className="flex flex-col justify-center">
              <span className="text-[#6B7280] text-[10px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[10px] mb-[2px]">
                Duration
              </span>
              <span className="text-[#E5E7EB] text-[12px] font-[700] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px]">
                {duration}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[8px]">
            <Users size={16} className="text-[#6B7280]" />
            <div className="flex flex-col justify-center">
              <span className="text-[#6B7280] text-[10px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[10px] mb-[2px]">
                Members
              </span>
              <span className={`text-[12px] font-[700] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px] ${isHighlighted ? "text-[#D4FF00]" : "text-[#D1D5DB]"}`}>
                {members} Members
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-[8px]">
          <Link href={`/owner/membership-plans/create?planId=${id}`} className="flex-1">
            <button
              className={`w-full h-[46px] rounded-[16px] flex flex-row items-center justify-center gap-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-[700] text-[14px] leading-[20px] transition-all cursor-pointer box-border ${isHighlighted
                  ? "bg-[#D4FF00] text-black hover:bg-[#c2eb00] border border-[#D4FF00]"
                  : "bg-transparent border border-[rgba(212,255,0,0.8)] text-[#D4FF00] hover:bg-[#D4FF00]/10"
                }`}
            >
              <NotePencil size={18} weight="fill" />
              Edit Plan
            </button>
          </Link>
          {isDeletedLocal ? (
            <button 
              onClick={() => setIsRestoreModalOpen(true)}
              className="w-[42px] h-[42px] rounded-[16px] bg-[#1D261A] border border-[rgba(212,255,0,0.4)] flex items-center justify-center text-[#D4FF00] hover:bg-[#D4FF00]/10 transition-all cursor-pointer shrink-0"
            >
              <Recycle size={18} weight="bold" />
            </button>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-[42px] h-[42px] rounded-[16px] bg-[#2F1B1E] border border-[#482025] flex items-center justify-center text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-all cursor-pointer shrink-0"
            >
              <Trash size={18} weight="bold" />
            </button>
          )}
        </div>
      </div>
    </div>

    <ConfirmationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={handleDelete}
      title="Delete Membership Plan?"
      message={`Are you sure you want to delete "${title}"? This plan will no longer be visible or available for assignment.`}
      confirmText="Delete Plan"
      confirmingText="Deleting Plan..."
      isConfirming={deleteMutation.isPending}
      isDestructive={true}
    />

    <ConfirmationModal
      isOpen={isRestoreModalOpen}
      onClose={() => setIsRestoreModalOpen(false)}
      onConfirm={handleRestore}
      title="Restore Membership Plan?"
      message={`Are you sure you want to restore "${title}"? This plan will become active and available for assignment again.`}
      confirmText="Restore Plan"
      confirmingText="Restoring Plan..."
      isConfirming={restoreMutation.isPending}
      isDestructive={false}
    />
    </>
  );
}
