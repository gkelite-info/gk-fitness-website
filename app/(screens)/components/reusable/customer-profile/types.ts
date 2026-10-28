export interface CustomerProfileData {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  memberCode: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  membership?: {
    planName: string;
    startDate: string;
    expiryDate: string;
    duration: string;
    status: "Active" | "Inactive" | "Pending Activation" | string;
    remainingDays: number;
    pendingPlanId?: string | null;
    pendingPlanName?: string | null;
    pendingAmount?: number | null;
    GymCustomerMembershipPlanId?: string;
  };
  trainer?: {
    name: string;
    specialty: string;
    assignedSince: string;
    avatarUrl?: string;
  };
  assignedList?: {
    name: string;
    specialty: string;
    assignedSince: string;
    avatarUrl?: string;
  }[];
}
