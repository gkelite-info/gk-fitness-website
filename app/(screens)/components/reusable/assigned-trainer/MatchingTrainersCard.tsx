"use client";

import { Star } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useParams } from "next/navigation";
import Avatar from "./../Avatar";
import { useGymTrainers } from "@/lib/hooks/trainers/useGymTrainers";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";

interface MatchingTrainersCardProps {
  customer?: any;
}

export default function MatchingTrainersCard({ customer }: MatchingTrainersCardProps) {
  const router = useRouter();
  const params = useParams();
  const customerId = params?.id as string;
  // const { data: allTrainers } = useGymTrainers();
  // const { data: assignedTrainers } = useAssignedTrainersByCustomer(customerId);

  // const activeTrainerId = assignedTrainers?.find((t: any) => t.isActive)?.gymTrainerId;
  // const availableTrainers = allTrainers?.filter((t: any) => t.gymTrainerId !== activeTrainerId).slice(0, 3) || [];

  const { data: allTrainers, isLoading: isTrainersLoading } = useGymTrainers(customer?.gymId, !!customer?.gymId);
  const { data: assignedTrainers, isLoading: isAssignedLoading } = useAssignedTrainersByCustomer(customer?.id);

  const assignedTrainerIds = assignedTrainers?.map((at: any) => at.trainerId) || [];
  const availableTrainers = allTrainers?.filter((t: any) => !assignedTrainerIds.includes(t.id)) || [];

  const isLoading = isTrainersLoading || isAssignedLoading;

  return (
    <div className="flex flex-col items-start p-[24px] w-full h-full flex-1 bg-[#15181E] border border-[#212630] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] gap-[16px]">

      <div className="flex flex-row justify-between items-center w-full gap-3">
        <h4 className="font-sans font-bold text-[14px] leading-[20px] tracking-[0.7px] uppercase text-white m-0 break-words flex-1 min-w-0">
          Available Matching Trainers
        </h4>
        <button
          onClick={() => router.push(`/owner/users/${params.id}/change-trainer`)}
          className="font-sans font-semibold text-[12px] leading-[16px] text-[#CCFF00] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 whitespace-nowrap shrink-0"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col w-full gap-[14px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <span className="text-[#9CA3AF] text-sm">Loading trainers...</span>
          </div>
        ) : availableTrainers.length === 0 ? (
          <div className="flex justify-center items-center py-4">
            <span className="text-[#9CA3AF] text-sm">No available trainers found</span>
          </div>
        ) : (
          availableTrainers.slice(0, 3).map((t: any, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-[14px] w-full bg-[#1B1F27] border border-[#252B37] rounded-[12px] gap-[14px] sm:gap-[19px]">

              <div className="flex flex-row items-center gap-[12px] w-full sm:w-auto sm:flex-1 min-w-0">
                <Avatar className="w-[40px] h-[40px] shrink-0" alt={t.fullName || "Trainer"} />

                <div className="flex flex-col items-start min-w-0 flex-1 -mt-0.5">
                  <h5 className="font-sans font-bold text-[14px] leading-[20px] text-white m-0 break-words w-full">
                    {t.fullName}
                  </h5>
                  <div className="flex flex-row items-center gap-[4px] mt-0.5 w-full flex-wrap">
                    <span className="font-sans font-normal text-[11px] leading-[16px] text-[#9CA3AF] break-words">
                      {t.specialization || "General Training"}
                    </span>
                    <div className="w-1 h-1 bg-[#475569] rounded-full shrink-0" />
                    <div className="flex flex-row items-center gap-0.5">
                      <Star size={10} className="text-[#F59E0B]" weight="fill" />
                      <span className="font-sans font-medium text-[11px] leading-[16px] text-[#9CA3AF]">
                        {t.rating || "4.8"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="flex justify-center items-center px-[14px] py-[6px] bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 border border-[#CCFF00]/30 rounded-[8px] transition-all cursor-pointer w-full sm:w-auto shrink-0">
                <span className="font-sans font-bold text-[12px] leading-[16px] text-[#CCFF00]">
                  Assign
                </span>
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
