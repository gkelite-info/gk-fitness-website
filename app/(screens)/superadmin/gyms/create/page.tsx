import { Suspense } from "react";
import RegisterGymForm from "@/app/(screens)/components/reusable/gyms/register-gym/RegisterGymForm";
import RegisterGymSkeleton from "@/app/(screens)/components/reusable/gyms/register-gym/RegisterGymSkeleton";

export default function CreateGymPage() {
  return (
    <Suspense fallback={<RegisterGymSkeleton />}>
      <RegisterGymForm mode="create" />
    </Suspense>
  );
}
