"use client";

import PaymentDetailsHeader from "./PaymentDetailsHeader";
import MemberProfileCard from "./MemberProfileCard";
import TransactionSpecificationCard from "./TransactionSpecificationCard";
import { PaymentDetailsData } from "./types";

interface PaymentDetailsViewProps {
  data: PaymentDetailsData;
}

export default function PaymentDetailsView({ data }: PaymentDetailsViewProps) {
  return (
    <div className="flex flex-col items-start px-4 sm:px-6 py-8 gap-6 w-full max-w-[1024px] mx-auto overflow-y-auto scrollbar-themed h-full bg-[#111319]">
      <PaymentDetailsHeader />
      <div id="payment-invoice-content" className="flex flex-col gap-6 w-full">
        <MemberProfileCard data={data} />
        <TransactionSpecificationCard data={data} />
      </div>
    </div>
  );
}
