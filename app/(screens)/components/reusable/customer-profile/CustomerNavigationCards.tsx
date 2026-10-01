"use client";

import { User, CreditCard, CalendarBlank, Users, CaretRight, FileText } from "@phosphor-icons/react";
import { useRouter, useParams } from "next/navigation";

export default function CustomerNavigationCards() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="flex flex-col items-start pt-2 gap-4 w-full shrink-0">

      <div className="flex flex-row items-center gap-2.5 w-full">
        <FileText size={20} className="text-[#D2F802]" weight="fill" />
        <h3 className="font-sans font-bold text-base leading-6 tracking-wide text-white m-0">
          Member Information
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

        <button
          onClick={() => id && router.push(`/owner/users/${id}/personal-details`)}
          className="flex flex-row justify-between items-center p-4 bg-[#10151E] border border-[#1B2433] shadow-md rounded-xl hover:bg-[#151c27] transition-colors group cursor-pointer"
        >
          <div className="flex flex-row items-center gap-3.5 flex-1 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 bg-[#141D1A] border border-[#213F28] rounded-xl shrink-0">
              <User size={20} className="text-[#D2F802]" weight="regular" />
            </div>
            <div className="flex flex-col items-start text-left flex-1 min-w-0">
              <span className="font-sans font-semibold text-sm leading-5 text-white truncate w-full">
                Personal Details
              </span>
              <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF] truncate w-full">
                View and edit member
              </span>
            </div>
          </div>
          <CaretRight size={16} className="text-[#6B7280] group-hover:text-white transition-colors shrink-0 ml-2" weight="bold" />
        </button>

        <button
          onClick={() => id && router.push(`/owner/users/${id}/membership-payments`)}
          className="flex flex-row justify-between items-center p-4 bg-[#10151E] border border-[#1B2433] shadow-md rounded-xl hover:bg-[#151c27] transition-colors group cursor-pointer"
        >
          <div className="flex flex-row items-center gap-3.5 flex-1 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 bg-[#141D1A] border border-[#213F28] rounded-xl shrink-0">
              <CreditCard size={20} className="text-[#D2F802]" weight="regular" />
            </div>
            <div className="flex flex-col items-start text-left flex-1 min-w-0">
              <span className="font-sans font-semibold text-sm leading-5 text-white truncate w-full">
                Membership & Payments
              </span>
              <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF] truncate w-full">
                View plan, history
              </span>
            </div>
          </div>
          <CaretRight size={16} className="text-[#6B7280] group-hover:text-white transition-colors shrink-0 ml-2" weight="bold" />
        </button>

        <button
          onClick={() => id && router.push(`/owner/users/${id}/attendance-history`)}
          className="flex flex-row justify-between items-center p-4 bg-[#10151E] border border-[#1B2433] shadow-md rounded-xl hover:bg-[#151c27] transition-colors group cursor-pointer"
        >
          <div className="flex flex-row items-center gap-3.5 flex-1 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 bg-[#141D1A] border border-[#213F28] rounded-xl shrink-0">
              <CalendarBlank size={20} className="text-[#D2F802]" weight="regular" />
            </div>
            <div className="flex flex-col items-start text-left flex-1 min-w-0">
              <span className="font-sans font-semibold text-sm leading-5 text-white truncate w-full">
                Attendance History
              </span>
              <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF] truncate w-full">
                View check-ins
              </span>
            </div>
          </div>
          <CaretRight size={16} className="text-[#6B7280] group-hover:text-white transition-colors shrink-0 ml-2" weight="bold" />
        </button>

        <button 
          onClick={() => id && router.push(`/owner/users/${id}/assigned-trainer`)}
          className="flex flex-row justify-between items-center p-4 bg-[#10151E] border border-[#1B2433] shadow-md rounded-xl hover:bg-[#151c27] transition-colors group cursor-pointer"
        >
          <div className="flex flex-row items-center gap-3.5 flex-1 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 bg-[#141D1A] border border-[#213F28] rounded-xl shrink-0">
              <Users size={20} className="text-[#D2F802]" weight="regular" />
            </div>
            <div className="flex flex-col items-start text-left flex-1 min-w-0">
              <span className="font-sans font-semibold text-sm leading-5 text-white truncate w-full">
                Assigned Trainer
              </span>
              <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF] truncate w-full">
                View and manage
              </span>
            </div>
          </div>
          <CaretRight size={16} className="text-[#6B7280] group-hover:text-white transition-colors shrink-0 ml-2" weight="bold" />
        </button>

      </div>
    </div>
  );
}
