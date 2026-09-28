import CustomerProfileView, { CustomerProfileData } from "../../../components/reusable/CustomerProfileView";

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Mock data for the customer profile based on the ID
  const mockData: CustomerProfileData = {
    id: resolvedParams.id,
    name: "Riya Sharma",
    status: "Active",
    memberCode: "MEM-000124",
    phone: "+91 98765 43210",
    email: "riya.sharma@email.com",
    avatarUrl: undefined,
    membership: {
      planName: "Gold Membership",
      startDate: "02 Jul 2026",
      expiryDate: "02 Oct 2026",
      duration: "3 Months",
      status: "Active",
      remainingDays: 61,
    },
    trainer: {
      name: "Rahul Verma",
      specialty: "Strength & Conditioning",
      assignedSince: "03 Jul 2026",
      avatarUrl: undefined
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#090D13]">
      <CustomerProfileView 
        data={mockData} 
      />
    </div>
  );
}
