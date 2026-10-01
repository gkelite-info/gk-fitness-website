import UserProfileClient from "../_components/UserProfileClient";

export default async function UserProfilePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams?: Promise<{ [key: string]: string | undefined }> }) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  
  return (
    <UserProfileClient 
      customerId={resolvedParams.id}
      initialName={resolvedSearchParams.name || ""}
      initialPhone={resolvedSearchParams.phone || ""}
      initialPlan={resolvedSearchParams.plan || ""}
      initialJoinedDate={resolvedSearchParams.joinedDate || ""}
      initialValidTill={resolvedSearchParams.validTill || ""}
      initialStatus={(resolvedSearchParams.status as string) || "Active"}
      initialMemberCode={resolvedSearchParams.memberCode || ""}
      initialUserType={resolvedSearchParams.userType || "customer"}
    />
  );
}
