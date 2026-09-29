import ConfirmTrainerAssignmentView from "../../../../../components/reusable/change-trainer/ConfirmTrainerAssignmentView";

export default function ConfirmTrainerPage({ params }: { params: { id: string, trainerId: string } }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-[20px]">
      <ConfirmTrainerAssignmentView 
        customerId={params?.id || "MEM-000124"} 
        trainerId={params?.trainerId || "1"} 
      />
    </div>
  );
}
