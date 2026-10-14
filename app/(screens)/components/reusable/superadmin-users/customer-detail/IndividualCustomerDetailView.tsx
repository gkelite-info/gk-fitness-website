"use client";

import CustomerDetailHeader from "./CustomerDetailHeader";
import CustomerHeroCard from "./CustomerHeroCard";
import CustomerPersonalInfoCard from "./CustomerPersonalInfoCard";
import CustomerAccountInfoCard from "./CustomerAccountInfoCard";
import { PlatformUser } from "../types";

interface IndividualCustomerDetailViewProps {
  customer: PlatformUser;
  onBack?: () => void;
}

export default function IndividualCustomerDetailView({
  customer,
  onBack,
}: IndividualCustomerDetailViewProps) {
  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        <CustomerDetailHeader onBack={onBack} />

        <CustomerHeroCard customer={customer} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full min-w-0 items-start">
          <CustomerPersonalInfoCard customer={customer} />
          <CustomerAccountInfoCard customer={customer} />
        </div>
      </div>
    </div>
  );
}
