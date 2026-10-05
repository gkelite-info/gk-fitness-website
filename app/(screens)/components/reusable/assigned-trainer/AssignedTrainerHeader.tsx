"use client";

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useParams } from "next/navigation";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";

export default function AssignedTrainerHeader() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: customer } = useGymCustomerById(id);

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center w-[38px] h-[38px] bg-[#181C24] border border-[#242B38] rounded-xl hover:bg-[#2a2f3a] transition-colors cursor-pointer shrink-0"
        >
          <CaretLeft size={16} className="text-[#D1D5DB]" weight="bold" />
        </button>
        <div className="flex flex-row items-baseline gap-3 flex-wrap">
          <h1 className="font-sans font-bold text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
            Trainer Details
          </h1>
          <span className="font-mono font-medium text-[14px] leading-[20px] text-[#9CA3AF]">
            Customer: <span className="text-[#C8FF00] font-sans">{customer?.fullName || "Loading..."}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
