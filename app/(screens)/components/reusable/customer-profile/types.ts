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
    status: "Active" | "Inactive";
    remainingDays: number;
  };
  trainer?: {
    name: string;
    specialty: string;
    assignedSince: string;
    avatarUrl?: string;
  };
}
