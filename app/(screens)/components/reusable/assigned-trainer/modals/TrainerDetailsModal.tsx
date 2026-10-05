"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { CaretLeft, X, Trash, ArrowsLeftRight } from "@phosphor-icons/react/dist/ssr";
import ConfirmationModal from "../../ConfirmationModal";
import TrainerProfileInfo from "./components/TrainerProfileInfo";
import TrainerAboutSection from "./components/TrainerAboutSection";
import TrainerSessionSummary from "./components/TrainerSessionSummary";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useAssignedTrainersByCustomer, useDeleteCustomerTrainer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import toast from "react-hot-toast";

interface TrainerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrainerDetailsModal({ isOpen, onClose }: TrainerDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const params = useParams();
  const customerId = params?.id as string;
  const { data: customer } = useGymCustomerById(customerId);
  const { data: assignedTrainers } = useAssignedTrainersByCustomer(customerId);
  const currentTrainerAssignment = assignedTrainers?.find((t: any) => t.isActive);
  const trainer = currentTrainerAssignment?.trainer;
  const { mutateAsync: removeTrainer } = useDeleteCustomerTrainer();

  const handleRemoveTrainer = async () => {
    setIsConfirming(true);
    try {
      if (currentTrainerAssignment?.customerTrainerId) {
        await removeTrainer(currentTrainerAssignment.customerTrainerId);
        toast.success("Trainer removed successfully");
      }
      setShowConfirmModal(false);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove trainer");
    } finally {
      setIsConfirming(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-[894px] max-h-[90vh] bg-[#141720] shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col overflow-hidden z-10"
          >
            <div className="flex flex-row justify-between items-center px-[20px] sm:px-[32px] py-[16px] sm:py-[20px] bg-[#151922] border-b border-[#1E232E] w-full shrink-0 z-20">
              <div className="flex flex-row items-center gap-[16px]">
                <button
                  onClick={onClose}
                  className="flex justify-center items-center w-[36px] h-[36px] bg-[#1D222E] border border-[#2E3547] rounded-[8px] hover:bg-[#252a36] transition-colors cursor-pointer shrink-0"
                >
                  <CaretLeft size={16} className="text-[#D1D5DB]" weight="bold" />
                </button>
                <div className="flex flex-col items-start gap-[4px] sm:gap-[2px]">
                  <div className="flex flex-row items-center gap-[8px] sm:gap-[12px] flex-wrap">
                    <h2 className="font-sans font-bold text-[20px] sm:text-[24px] leading-[26px] sm:leading-[32px] tracking-[-0.6px] text-white m-0 whitespace-nowrap">
                      Trainer Details
                    </h2>
                    <div className="flex flex-row items-center px-[10px] py-[2px] bg-[#CCFF00]/10 border border-[#CCFF00]/25 rounded-full shrink-0">
                      <span className="font-sans font-semibold text-[11px] sm:text-[12px] leading-[16px] text-[#CCFF00]">
                        Active Assignment
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-normal text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#9CA3AF]">
                    Customer: <span className="text-[#CCFF00] font-sans">{customer?.fullName || "Loading..."}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center w-[36px] h-[36px] bg-[#1A1E28] border border-[#262C3B] rounded-[8px] hover:bg-[#252a36] transition-colors cursor-pointer shrink-0"
              >
                <X size={16} className="text-[#9CA3AF]" weight="bold" />
              </button>
            </div>

            <div className="flex flex-col w-full flex-1 overflow-y-auto scrollbar-themed">
              <div className="flex flex-col items-start p-[20px] sm:p-[32px] gap-[24px] w-full shrink-0">
                <TrainerProfileInfo trainer={trainer} assignment={currentTrainerAssignment} />

                <div className="flex flex-col lg:flex-row items-stretch gap-[24px] w-full shrink-0">
                  <TrainerAboutSection trainer={trainer} />
                  <TrainerSessionSummary 
                    customerTrainerId={currentTrainerAssignment?.customerTrainerId} 
                    gymTrainerId={currentTrainerAssignment?.gymTrainerId} 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-[20px] sm:px-[32px] py-[20px] sm:py-[16px] bg-[#141720] border-t border-[#1E232E] w-full shrink-0 gap-[20px] sm:gap-[16px] sm:sticky sm:bottom-0 z-20">
                <div className="flex flex-row items-start sm:items-center gap-[8px] sm:gap-[8px]">
                  <div className="w-[8px] h-[8px] bg-[#CCFF00] rounded-full mt-[4px] sm:mt-0 shrink-0" />
                  <span className="font-sans font-normal text-[12px] leading-[18px] sm:leading-[16px] text-[#9CA3AF]">
                    Assigned trainer status active for this membership
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-[12px] w-full sm:w-auto">
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex flex-row items-center justify-center px-[20px] py-[10px] gap-[8px] bg-[#1E1315] border border-[#682528] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#25171a] transition-colors cursor-pointer w-full sm:w-auto flex-1 sm:flex-none"
                  >
                    <Trash size={16} className="text-[#FF4D4F]" weight="bold" />
                    <span className="font-sans font-semibold text-[14px] leading-[20px] tracking-[0.35px] text-[#FF4D4F]">
                      Remove Trainer
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      router.push(`/owner/users/${params.id}/change-trainer`);
                    }}
                    className="flex flex-row items-center justify-center px-[20px] py-[10px] gap-[8px] bg-[#1A2215] border border-[#CCFF00] rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(204,255,0,0.1),0px_2px_4px_-2px_rgba(204,255,0,0.1)] hover:bg-[#202a1a] transition-colors cursor-pointer w-full sm:w-auto flex-1 sm:flex-none"
                  >
                    <ArrowsLeftRight size={16} className="text-[#CCFF00]" weight="bold" />
                    <span className="font-sans font-bold text-[14px] leading-[20px] tracking-[0.35px] text-[#CCFF00]">
                      Change Trainer
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {createPortal(modalContent, document.body)}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleRemoveTrainer}
        title="Remove Assigned Trainer"
        message="Are you sure you want to remove Rahul Verma from this member's profile? This action cannot be undone and you will need to manually reassign a trainer if needed."
        confirmText="Yes, Remove Trainer"
        cancelText="Keep Trainer"
        isConfirming={isConfirming}
        confirmingText="Removing..."
        isDestructive={true}
      />
    </>
  );
}
