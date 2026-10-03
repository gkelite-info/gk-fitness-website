import AssignedTrainerView from "@/app/(screens)/components/reusable/assigned-trainer/AssignedTrainerView";

export default async function AssignedTrainerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return (
    <main className="flex w-full min-h-screen bg-[#0A0D14] flex-col overflow-y-auto overflow-x-hidden">
      <AssignedTrainerView userId={resolvedParams.id} />
    </main>
  );
}
