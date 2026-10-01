"use client";

import { User, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { PaymentDetailsData } from "./types";
import Avatar from "../Avatar";

interface MemberProfileCardProps {
  data: PaymentDetailsData;
}

export default function MemberProfileCard({ data }: MemberProfileCardProps) {
  const initials = data.memberName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="relative flex flex-col items-start p-6 w-full bg-[#0A0C11] border border-[rgba(31,36,51,0.8)] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] group hover:border-[rgba(212,255,0,0.4)] transition-all duration-300 overflow-hidden z-10">
      <div className="absolute w-[176px] h-[176px] -right-[63px] -top-[63px] bg-[rgba(212,255,0,0.05)] blur-[32px] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 w-full">
          <div className="flex justify-center items-center w-20 h-20 bg-[#0E1118] border-2 border-[rgba(212,255,0,0.6)] rounded-2xl shrink-0 group-hover:shadow-[0_0_25px_rgba(212,255,0,0.3)] transition-shadow duration-300 overflow-hidden p-1 cursor-pointer">
            <Avatar gender="male" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-1.5 w-full">
            <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap items-center sm:items-start gap-3">
              <h3 className="font-sans font-extrabold text-2xl tracking-[-0.6px] text-white m-0 break-words max-w-full text-center sm:text-left">
                {data.memberName}
              </h3>

              {/* <div className="flex flex-row items-center px-3 py-1 gap-1 bg-[#131722] border border-[rgba(212,255,0,0.3)] rounded-full min-h-[26px] h-auto shrink-0 w-fit">
                <User size={12} weight="fill" className="text-[#D4FF00]" />
                <span className="font-sans font-bold text-xs tracking-[0.6px] uppercase text-[#D4FF00] whitespace-nowrap">
                  MEMBER ID: {data.memberCode}
                </span>
              </div> */}
            </div>

            <div className="flex flex-wrap flex-row justify-center sm:justify-start items-center gap-3 sm:gap-4 mt-1">
              <div className="flex flex-row items-center px-2.5 py-1 gap-1.5 bg-[rgba(19,23,34,0.8)] border border-[rgba(31,36,51,0.6)] rounded-lg h-[26px]">
                <Phone size={14} className="text-[#D4FF00]" />
                <span className="font-sans font-normal text-xs text-[#CBD5E1]">
                  {data.phone}
                </span>
              </div>

              <div className="flex flex-row items-center px-2.5 py-1 gap-1.5 bg-[rgba(19,23,34,0.8)] border border-[rgba(31,36,51,0.6)] rounded-lg h-[26px]">
                <EnvelopeSimple size={14} className="text-[#D4FF00]" />
                <span className="font-sans font-normal text-xs text-[#CBD5E1]">
                  {data.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center self-center sm:self-auto px-3 py-1.5 gap-2 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-xl h-[30px] shrink-0 mt-4 sm:mt-0">
          <div className="w-2 h-2 bg-[#34D399] rounded-full" />
          <span className="font-sans font-semibold text-xs text-[#34D399]">
            {data.memberStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
