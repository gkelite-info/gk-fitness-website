import { Suspense } from "react";
import AddGymLocationView from "@/app/(screens)/components/reusable/gym-locations/details/AddGymLocationView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SuperAdminGymLocationDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <AddGymLocationView gymId={id} />
    </Suspense>
  );
}
