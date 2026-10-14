import { Suspense } from "react";
import IndividualCustomerDetailView from "@/app/(screens)/components/reusable/superadmin-users/customer-detail/IndividualCustomerDetailView";
import { generateMockUsers } from "@/app/(screens)/components/reusable/superadmin-users/mockData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const allUsers = generateMockUsers();
  const customer =
    allUsers.find((u) => u.id === id) ||
    allUsers.find((u) => u.role === "individual-customers") ||
    allUsers[0];

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <IndividualCustomerDetailView customer={customer} />
    </Suspense>
  );
}
