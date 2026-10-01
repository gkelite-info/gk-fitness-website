"use client";

import CustomerProfileHeader from "./customer-profile/CustomerProfileHeader";
import CustomerProfileBanner from "./customer-profile/CustomerProfileBanner";
import CustomerMembershipCard from "./customer-profile/CustomerMembershipCard";
import CustomerTrainerCard from "./customer-profile/CustomerTrainerCard";
import CustomerNavigationCards from "./customer-profile/CustomerNavigationCards";
import { CustomerProfileData } from "./customer-profile/types";

export type { CustomerProfileData };

interface CustomerProfileViewProps {
  data: CustomerProfileData;
  title?: string;
  subtitle?: string;
  userType?: "customer" | "trainer";
  onEditMember?: () => void;
  onEditPlan?: () => void;
}

export default function CustomerProfileView({ data, onEditMember, onEditPlan, title, subtitle, userType = "customer" }: CustomerProfileViewProps) {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 gap-6 w-full max-w-[1024px] mx-auto overflow-y-auto scrollbar-themed h-full">

      <CustomerProfileHeader onEditMember={onEditMember} title={title} subtitle={subtitle} />

      <CustomerProfileBanner data={data} />

      <div className="flex flex-col md:flex-row items-stretch gap-6 w-full shrink-0">
        <CustomerMembershipCard membership={data.membership} onEditPlan={onEditPlan} />
        <CustomerTrainerCard trainer={data.trainer} assignedList={data.assignedList} userType={userType} />
      </div>

      <CustomerNavigationCards />
    </div>
  );
}
