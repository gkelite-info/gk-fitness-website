import MembershipPaymentsView from "../../../../components/reusable/MembershipPaymentsView";

export default async function MembershipPaymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  
  return (
    <div className="flex flex-col w-full h-full bg-[#111319]">
      <MembershipPaymentsView userId={userId} />
    </div>
  );
}
