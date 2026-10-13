import { Suspense } from "react";
import MemberDetailView from "@/app/(screens)/components/reusable/gyms/member-detail/MemberDetailView";
import MemberDetailSkeleton from "@/app/(screens)/components/reusable/gyms/member-detail/MemberDetailSkeleton";

interface PageProps {
  params: Promise<{ id: string; role: string; memberId: string }>;
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id, role, memberId } = await params;

  return (
    <Suspense fallback={<MemberDetailSkeleton />}>
      <MemberDetailView gymId={id} role={role} memberId={memberId} />
    </Suspense>
  );
}
