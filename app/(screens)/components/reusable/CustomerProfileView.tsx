"use client";

import CustomerProfileHeader from "./customer-profile/CustomerProfileHeader";
import CustomerProfileBanner from "./customer-profile/CustomerProfileBanner";
import CustomerMembershipCard from "./customer-profile/CustomerMembershipCard";
import CustomerTrainerCard from "./customer-profile/CustomerTrainerCard";
import CustomerNavigationCards from "./customer-profile/CustomerNavigationCards";
import { CustomerProfileData } from "./customer-profile/types";

// Re-export type for consumers
export type { CustomerProfileData };

interface CustomerProfileViewProps {
  data: CustomerProfileData;
  onEditMember?: () => void;
  onEditPlan?: () => void;
}

export default function CustomerProfileView({ data, onEditMember, onEditPlan }: CustomerProfileViewProps) {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 gap-6 w-full max-w-[1024px] mx-auto overflow-y-auto scrollbar-themed h-full">
      
      {/* Breadcrumb & Top Action Header */}
      <CustomerProfileHeader onEditMember={onEditMember} />

      {/* Section - Primary Member Banner & Detail Card */}
      <CustomerProfileBanner data={data} />

      {/* Middle Two-Column Section: Membership and Assigned Trainer */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 w-full shrink-0">
        <CustomerMembershipCard membership={data.membership} onEditPlan={onEditPlan} />
        <CustomerTrainerCard trainer={data.trainer} />
      </div>

      {/* Bottom Section: Member Information Navigation Cards */}
      <CustomerNavigationCards />

    </div>
  );
}
