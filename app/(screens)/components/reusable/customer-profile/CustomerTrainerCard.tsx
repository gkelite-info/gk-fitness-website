"use client";

import { User, CalendarBlank } from "@phosphor-icons/react";
import Avatar from "../Avatar";
import { CustomerProfileData } from "./types";

interface CustomerTrainerCardProps {
  trainer?: CustomerProfileData["trainer"];
  assignedList?: CustomerProfileData["assignedList"];
  userType?: "customer" | "trainer";
}

export default function CustomerTrainerCard({ trainer, assignedList, userType = "customer" }: CustomerTrainerCardProps) {
  const isTrainer = userType === "trainer";

  return (
    <div className="flex flex-col p-4 sm:p-6 w-full md:flex-[5] bg-[#10151E] border border-[#1B2433] shadow-lg rounded-2xl h-full min-h-[274px]">
      <div className="flex flex-row items-center justify-start gap-3 w-full border-b border-[#1B2433] pb-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-[#141B24] border border-[#253245] rounded-full shrink-0">
          <User size={16} className="text-[#D2F802]" weight="regular" />
        </div>
        <h4 className="font-sans font-bold text-sm leading-5 tracking-wide text-white m-0">
          {isTrainer ? "Assigned Customers" : "Assigned Trainer"}
        </h4>
      </div>

      <div className={`flex ${isTrainer ? 'flex-row overflow-x-auto gap-4 scrollbar-themed' : 'flex-col justify-center items-center gap-4'} w-full h-full flex-1 pb-2`}>
        {isTrainer ? (
          assignedList && assignedList.length > 0 ? (
            assignedList.map((customer, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center min-w-[120px] bg-[#141B24] p-3 rounded-xl border border-[#1F2937]">
                <div className="w-12 h-12 rounded-full border-2 border-[#223044] shadow-sm overflow-hidden shrink-0 mb-3">
                  <Avatar src={customer.avatarUrl} alt={customer.name} className="w-full h-full" />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h5 className="font-sans font-bold text-sm leading-4 text-white m-0 truncate w-[100px]">
                    {customer.name}
                  </h5>
                  <div className="flex flex-row items-center justify-center gap-1 mt-1">
                    <CalendarBlank size={12} className="text-[#9CA3AF]" />
                    <span className="font-sans font-normal text-[10px] leading-3 text-[#6B7280]">
                      {customer.assignedSince}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-2 text-[#9CA3AF] my-auto">
              <User size={32} />
              <span className="text-sm">No Customers Assigned</span>
            </div>
          )
        ) : trainer ? (
          <>
            <div className="w-16 h-16 rounded-full border-2 border-[#223044] shadow-sm overflow-hidden shrink-0">
              <Avatar src={trainer.avatarUrl} alt={trainer.name} className="w-full h-full" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <h5 className="font-sans font-bold text-base leading-5 text-white m-0">
                {trainer.name}
              </h5>
              <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">
                {trainer.specialty}
              </span>
              <div className="flex flex-row items-center gap-1.5 mt-0.5">
                <CalendarBlank size={14} className="text-[#9CA3AF]" />
                <span className="font-sans font-normal text-xs leading-4 text-[#6B7280]">
                  Assigned Since {trainer.assignedSince}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-2 text-[#9CA3AF] my-auto">
            <User size={32} />
            <span className="text-sm">No Trainer Assigned</span>
          </div>
        )}
      </div>
    </div>
  );
}
