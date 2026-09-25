"use client";

import { Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function EnquiriesHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 shrink-0">
      <div className="flex flex-col items-start gap-1.5">
        <h1 className="font-sans font-bold text-[26px] leading-[26px] tracking-[-0.65px] text-white">
          Enquiries
        </h1>
        <p className="font-sans font-normal text-[11.5px] leading-[19px] text-[#627282] max-w-[551px]">
          Manage and track all enquiries from various channels including social media, website and manually added enquiries.
        </p>
      </div>

      <button 
        onClick={() => router.push('/owner/enquiries/add')}
        className="flex flex-row justify-center items-center px-4 py-2 gap-1 bg-[#D8FF00] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[6.5px] cursor-pointer hover:opacity-90 transition-opacity"
      >
        <Plus size={13} weight="bold" className="text-black" />
        <span className="font-sans font-semibold text-[11.5px] leading-[17px] text-black">
          Add Enquiry
        </span>
      </button>
    </div>
  );
}
