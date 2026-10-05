"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import AssignedTrainerHeader from "./AssignedTrainerHeader";
import TrainerMemberBanner from "./TrainerMemberBanner";
import NoTrainerPanel from "./NoTrainerPanel";
import AssessmentCard from "./AssessmentCard";
import MatchingTrainersCard from "./MatchingTrainersCard";
import CurrentAssignedTrainerCard from "./CurrentAssignedTrainerCard";
import TrainerDetailsModal from "./modals/TrainerDetailsModal";

export default function AssignedTrainerView() {
  const params = useParams();
  const customerId = params?.id as string;
  const { data: assignedTrainers } = useAssignedTrainersByCustomer(customerId);
  
  const currentTrainerAssignment = assignedTrainers?.find((t: any) => t.isActive);
  const isTrainerAssigned = !!currentTrainerAssignment;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6 sm:gap-8 pb-12">
      <div className="w-full max-w-[960px]">
        


        <AssignedTrainerHeader />
        <TrainerMemberBanner />
        
        <div className="flex flex-col lg:flex-row items-stretch gap-6 mt-6 w-full">
          {isTrainerAssigned ? (
            <div className="flex w-full lg:w-1/2 flex-1">
              <CurrentAssignedTrainerCard onViewDetails={() => setIsModalOpen(true)} />
            </div>
          ) : (
            <div className="flex w-full lg:w-1/2 flex-1">
              <NoTrainerPanel />
            </div>
          )}
          <div className="flex flex-col gap-6 w-full lg:w-1/2 flex-1">
            <AssessmentCard />
            <MatchingTrainersCard />
          </div>
        </div>
      </div>

      <TrainerDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
