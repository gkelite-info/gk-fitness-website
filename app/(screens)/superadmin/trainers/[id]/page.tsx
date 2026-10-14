import { Suspense } from "react";
import GlobalTrainerProfileView from "@/app/(screens)/components/reusable/trainers/detail/GlobalTrainerProfileView";
import { MOCK_GLOBAL_TRAINERS } from "@/app/(screens)/components/reusable/trainers/mockData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrainerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const trainer =
    MOCK_GLOBAL_TRAINERS.find((t) => t.id === id) || MOCK_GLOBAL_TRAINERS[0];

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <GlobalTrainerProfileView trainer={trainer} />
    </Suspense>
  );
}
