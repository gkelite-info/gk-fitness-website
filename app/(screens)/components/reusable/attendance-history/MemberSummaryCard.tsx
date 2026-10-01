"use client";

import { AttendanceHistoryData } from "./types";
import Avatar from "../Avatar";

interface MemberSummaryCardProps {
  data: AttendanceHistoryData;
}

export default function MemberSummaryCard({ data }: MemberSummaryCardProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 w-full bg-[#111319] border border-[#232730] rounded-2xl gap-6">

      <div className="flex flex-row items-center gap-4">
        <div className="flex justify-center items-center w-16 h-16 bg-[#0E1118] border-2 border-[rgba(200,255,0,0.6)] rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 overflow-hidden p-0.5">
          <Avatar gender="male" className="w-full h-full object-cover !rounded-[14px]" />
        </div>

        <div className="flex flex-col items-start gap-1">
          <h3 className="font-sans font-bold text-xl leading-7 text-white m-0">
            {data.memberName}
          </h3>

          <div className="flex flex-row items-center px-2.5 py-0.5 gap-1.5 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full mb-1 w-fit">
            <div className="w-1.5 h-1.5 bg-[#C8FF00] rounded-full shrink-0" />
            <span className="font-sans font-semibold text-xs leading-4 text-[#C8FF00] whitespace-nowrap">
              {data.memberStatus}
            </span>
          </div>

          {/* <div className="flex flex-row items-center px-2.5 py-0.5 bg-[#14171D] border border-[#232730] rounded-full w-fit">
            <span className="font-mono font-normal text-xs leading-4 text-[#94A3B8] whitespace-nowrap">
              Customer ID: <strong className="font-mono text-white">{data.customerId}</strong>
            </span>
          </div> */}
        </div>
      </div>

      <div className="flex flex-row items-start gap-4">
        <div className="flex flex-col items-center p-3 gap-0.5 bg-[rgba(20,23,29,0.8)] border border-[rgba(35,39,48,0.6)] rounded-xl min-w-[132px]">
          <span className="font-sans font-medium text-[11px] leading-4 text-[#94A3B8] tracking-[0.55px] uppercase">
            Days Attended
          </span>
          <span className="font-sans font-bold text-lg leading-7 text-white">
            {data.daysAttended}
          </span>
        </div>

        <div className="flex flex-col items-center p-3 gap-0.5 bg-[rgba(20,23,29,0.8)] border border-[rgba(35,39,48,0.6)] rounded-xl min-w-[132px]">
          <span className="font-sans font-medium text-[11px] leading-4 text-[#94A3B8] tracking-[0.55px] uppercase">
            Current Streak
          </span>
          <span className="font-sans font-bold text-lg leading-7 text-[#C8FF00]">
            {data.currentStreak}
          </span>
        </div>
      </div>

    </div>
  );
}
