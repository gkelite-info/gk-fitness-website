import ConfirmTrainerAssignmentView from "../../../../../components/reusable/change-trainer/ConfirmTrainerAssignmentView";

export default async function ConfirmTrainerPage({ params }: { params: Promise<{ id: string, trainerId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-[20px]">
      <ConfirmTrainerAssignmentView 
        customerId={resolvedParams.id} 
        trainerId={resolvedParams.trainerId} 
      />
    </div>
  );
}
