import { Suspense } from "react";
import RegisterGymForm from "@/app/(screens)/components/reusable/gyms/register-gym/RegisterGymForm";
import RegisterGymSkeleton from "@/app/(screens)/components/reusable/gyms/register-gym/RegisterGymSkeleton";

interface EditGymPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGymPage({ params }: EditGymPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<RegisterGymSkeleton />}>
      <RegisterGymForm mode="edit" gymId={id} />
    </Suspense>
  );
}
