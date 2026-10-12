import { Suspense } from "react";
import GymsView from "@/app/(screens)/components/reusable/gyms/GymsView";
import GymsSkeleton from "@/app/(screens)/components/reusable/gyms/GymsSkeleton";

export default function SuperAdminGymsPage() {
  return (
    <Suspense fallback={<GymsSkeleton />}>
      <GymsView />
    </Suspense>
  );
}
