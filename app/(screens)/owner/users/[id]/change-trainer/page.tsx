import React from "react";
import ChangeTrainerHeader from "../../../../components/reusable/change-trainer/ChangeTrainerHeader";
import CurrentTrainerHighlight from "../../../../components/reusable/change-trainer/CurrentTrainerHighlight";
import TrainerSearchFilters from "../../../../components/reusable/change-trainer/TrainerSearchFilters";
import AvailableTrainersGrid from "../../../../components/reusable/change-trainer/AvailableTrainersGrid";
import ChangeTrainerNotice from "../../../../components/reusable/change-trainer/ChangeTrainerNotice";

export default function ChangeTrainerPage({ params }: { params: { id: string } }) {

  const customerName = "Riya Sharma";
  
  return (
    <div className="flex flex-col items-start w-full min-h-screen bg-[#0A0D14]">
      <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-[20px]">
        
        <ChangeTrainerHeader 
          customerName={customerName} 
          customerId={params?.id || "MEM-000124"} 
        />

        <CurrentTrainerHighlight />

        <TrainerSearchFilters />

        <AvailableTrainersGrid />

        <ChangeTrainerNotice />
        
      </div>
    </div>
  );
}
