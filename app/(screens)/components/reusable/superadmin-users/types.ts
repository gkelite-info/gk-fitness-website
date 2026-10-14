export type UserRoleTab =
  | "owners"
  | "trainers"
  | "global-trainers"
  | "gym-customers"
  | "individual-customers";

export interface PlatformUser {
  id: string;
  name: string;
  role: UserRoleTab;
  code: string;
  avatarUrl?: string;
  gymName: string;
  location: string;
  joinedDate: string;
  joinedTimestamp: number;
  status: "Active" | "Inactive";
  mobileNumber?: string;
  email?: string;
  dob?: string;
  gender?: string;
  address?: string;
  accountType?: string;
  subscriptionPlan?: string;
  renewalDate?: string;
  paymentStatus?: string;
}

export type UserSortOption = "newest" | "oldest" | "name";
