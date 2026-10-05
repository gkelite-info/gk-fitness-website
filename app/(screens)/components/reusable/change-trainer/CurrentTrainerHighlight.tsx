"use client";

import { User, CalendarBlank, Star } from "@phosphor-icons/react/dist/ssr";
import Avatar from "../Avatar";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import { useTrainerSessionsByCustomerTrainerId } from "@/lib/hooks/trainerSessions/useTrainerSessions";

export default function CurrentTrainerHighlight({ customerId }: { customerId: string }) {
  const { data: assignedTrainers, isLoading } = useAssignedTrainersByCustomer(customerId);
  const activeTrainerAssignment = assignedTrainers?.find((t: any) => t.isActive);
  const trainer = activeTrainerAssignment?.trainer;

  const { data: trainerSessions } = useTrainerSessionsByCustomerTrainerId(activeTrainerAssignment?.customerTrainerId);
  const completedSessionsCount = trainerSessions?.filter((s: any) => s.status?.toLowerCase() === 'completed')?.length || 0;

  if (isLoading) {
    return <div className="text-[#94A3B8] p-4 text-sm font-medium border border-[#242A38] bg-[#12161F] rounded-[16px]">Loading current trainer...</div>;
  }

  if (!trainer) {
    return (
      <div className="flex flex-col items-center justify-center p-[24px] w-full bg-[#12161F] border border-[#242A38] rounded-[16px]">
        <span className="text-[#94A3B8] text-[14px]">No active trainer assigned to this member.</span>
      </div>
    );
  }

  const assignedSince = new Date(activeTrainerAssignment.assignedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="relative flex flex-col items-start p-[20px] sm:p-[24px] w-full bg-[#12161F] border border-[#242A38] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-[16px] overflow-hidden isolate">
      <div className="absolute top-[-63px] right-[-63px] w-[224px] h-[224px] bg-[#CCFF00]/5 blur-[32px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-[24px] z-10">
        <div className="flex flex-row items-center gap-[16px] sm:gap-[20px] w-full xl:w-auto">
          <div className="w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] shrink-0 border-[2px] border-[#2C3344] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] rounded-[16px] overflow-hidden">
             <Avatar src={trainer.users?.profilePhoto || undefined} alt={trainer.fullName} className="w-full h-full" />
          </div>
          
          <div className="flex flex-col items-start gap-[6px] min-w-0">
            <div className="flex flex-row items-center gap-[6px]">
              <div className="flex justify-center items-center w-[16px] h-[16px] bg-[#1E2533] rounded-full shrink-0">
                <User size={10} weight="fill" className="text-[#CCFF00]" />
              </div>
              <span className="font-sans font-medium text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                CurrentTrainer
              </span>
            </div>
            
            <h2 className="font-sans font-bold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[0.3px] text-white truncate w-full max-w-[200px] sm:max-w-none">
              {trainer.fullName}
            </h2>
            
            <div className="flex flex-row items-center px-[10px] sm:px-[12px] py-[4px] bg-[#1A2312] border border-[#344B1C] rounded-[6px]">
              <span className="font-sans font-semibold text-[11px] sm:text-[12px] leading-[16px] text-[#CCFF00] whitespace-nowrap">
                {trainer.specialization || "General Training"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px] sm:gap-[40px] w-full xl:w-auto mt-[16px] xl:mt-0">
          <div className="flex flex-row items-center p-[12px] sm:p-[12px_16px] gap-[12px] sm:gap-[14px] bg-[#171C27] border border-[#252C3C] rounded-[12px] w-full sm:w-auto">
            <div className="flex justify-center items-center w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-[#202737] rounded-[8px] shrink-0">
              <CalendarBlank size={20} weight="bold" className="text-[#CCFF00]" />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="font-sans font-medium text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                Assigned Since
              </span>
              <span className="font-sans font-bold text-[13px] sm:text-[14px] leading-[20px] tracking-[0.2px] text-white whitespace-nowrap">
                {assignedSince}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-[16px] sm:gap-[24px] w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex flex-col items-start sm:items-end min-w-0">
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                Completed Sessions
              </span>
              <span className="font-sans font-bold text-[13px] sm:text-[14px] leading-[20px] text-[#F1F5F9] whitespace-nowrap">
                {completedSessionsCount} Sessions
              </span>
            </div>
            
            <div className="h-[32px] sm:h-[40px] border-l border-[#242B3A]" />
            
            <div className="flex flex-col items-end min-w-0">
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                Trainer Rating
              </span>
              <div className="flex flex-row items-center gap-[4px]">
                <span className="font-sans font-bold text-[13px] sm:text-[14px] leading-[20px] text-[#CCFF00]">
                  -
                </span>
                <div className="flex flex-row items-center gap-[2px]">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={12} weight="fill" className="text-[#CCFF00]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
