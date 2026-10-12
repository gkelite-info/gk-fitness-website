import { Suspense } from "react";
import GymDetailView from "@/app/(screens)/components/reusable/gyms/detail/GymDetailView";
import GymDetailSkeleton from "@/app/(screens)/components/reusable/gyms/detail/GymDetailSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GymDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<GymDetailSkeleton />}>
      <GymDetailView gymId={id} />
    </Suspense>
  );
}
