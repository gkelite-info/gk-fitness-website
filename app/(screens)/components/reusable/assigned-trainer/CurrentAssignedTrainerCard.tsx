"use client";

import { Star, Barbell, Phone, TrendUp, Info } from "@phosphor-icons/react/dist/ssr";
import Avatar from "./../Avatar";
import { useTrainerSessionsByCustomerTrainerId } from "@/lib/hooks/trainerSessions/useTrainerSessions";

import { useParams } from "next/navigation";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";

interface CurrentAssignedTrainerCardProps {
  onViewDetails: () => void;
  trainerData?: any;
  isLoading?: boolean;
}

export default function CurrentAssignedTrainerCard({ onViewDetails }: CurrentAssignedTrainerCardProps) {
  const params = useParams();
  const customerId = params?.id as string;
  const { data: assignedTrainers } = useAssignedTrainersByCustomer(customerId);
  const currentTrainerAssignment = assignedTrainers?.find((t: any) => t.isActive);
  const trainer = currentTrainerAssignment?.trainer;

  const { data: sessions } = useTrainerSessionsByCustomerTrainerId(currentTrainerAssignment?.customerTrainerId);
  const sessionsCount = sessions?.length || 0;

  if (!trainer) return null;
  return (
    <div className="flex flex-col items-start p-[24px] sm:p-[32px] w-full h-full bg-[#15181E] border border-[#212630] rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] gap-[24px] relative overflow-hidden flex-1">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#CCFF00]/5 blur-[40px] rounded-full pointer-events-none z-0" />
      <div className="flex flex-row flex-wrap justify-between items-center w-full z-10 border-b border-[#232936] pb-[16px] gap-3">
        <h2 className="font-sans font-bold text-[18px] sm:text-[24px] leading-[26px] sm:leading-[32px] tracking-[-0.6px] text-white m-0 break-words flex-1 min-w-[150px]">
          Current Assigned Trainer
        </h2>
        <div className="flex flex-row items-center px-[10px] sm:px-[12px] py-[2px] sm:py-[4px] bg-[#CCFF00]/10 border border-[#CCFF00]/25 rounded-full shrink-0">
          <span className="font-sans font-semibold text-[11px] sm:text-[12px] leading-[16px] text-[#CCFF00]">
            Active
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[24px] w-full z-10 mt-4">
        <div className="flex flex-col justify-center items-center w-[120px] h-[120px] sm:w-[144px] sm:h-[144px] bg-[#101218] border-[2px] border-[#2C3242] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-full shrink-0 overflow-hidden">
          <Avatar className="w-[120px] h-[120px] sm:w-[144px] sm:h-[144px] rounded-full" alt={trainer?.fullName || "Trainer"} src={trainer?.users?.profilePhoto || undefined} />
        </div>

        <div className="flex flex-col items-center gap-[12px] w-full text-center">
          <div className="flex flex-col items-center gap-[12px] w-full">
            <h3 className="font-sans font-bold text-[24px] sm:text-[28px] leading-[32px] sm:leading-[36px] tracking-[-0.6px] text-white m-0">
              {trainer?.fullName || "Unknown"}
            </h3>
            <div className="flex flex-col items-center px-[12px] py-[4px] bg-[#CCFF00]/15 border border-[#CCFF00]/30 rounded-full">
              <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.3px] uppercase text-[#CCFF00]">
                {trainer?.specialization || "GENERAL TRAINING"}
              </span>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-center gap-[16px] w-full mt-2">
            <div className="flex flex-row items-center gap-[6px]">
              <Star size={16} className="text-[#CCFF00]" weight="fill" />
              <span className="font-sans font-bold text-[14px] leading-[20px] text-white">-</span>
              <span className="font-sans font-medium text-[12px] leading-[16px] text-[#9CA3AF]">(-)</span>
            </div>

            <div className="w-[1px] h-[16px] bg-[#3B4352]" />

            <div className="flex flex-row items-center gap-[6px]">
              <TrendUp size={16} className="text-[#CCFF00]" />
              <span className="font-sans font-medium text-[14px] leading-[20px] text-white">
                {sessionsCount} Sessions
              </span>
            </div>
          </div>

          {/* <p className="font-sans font-normal text-[14px] leading-[22px] text-[#9CA3AF] m-0 mt-2 max-w-[480px]">
            Certified strength and conditioning specialist with 6+ years of experience helping clients achieve their fitness goals through progressive overload.
        </p> */}

          <div className="flex w-full justify-center mt-6">
            <button
              onClick={onViewDetails}
              className="flex flex-row items-center justify-center gap-[8px] w-full max-w-[384px] px-[24px] py-[14px] bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 border border-[#CCFF00]/30 rounded-[12px] transition-all cursor-pointer group"
            >
              <Info size={18} className="text-[#CCFF00] group-hover:scale-110 transition-transform" />
              <span className="font-sans font-semibold text-[14px] leading-[20px] text-[#CCFF00]">
                View Full Details
              </span>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
