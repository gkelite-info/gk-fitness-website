"use client";

import { Info, LockKey } from "@phosphor-icons/react";

interface AccountInformationProps {
  userType: "customer" | "trainer";
}

export default function AccountInformation({ userType }: AccountInformationProps) {
  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <LockKey weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Account Information
          </h2>
        </div>
      </div>

      <div className="flex flex-row items-center p-3 w-full bg-[#1A2029] border border-[#14161A] rounded-lg">
        <div className="w-[14px] h-[14px] flex items-center justify-center">
          <Info size={14} className="text-[#9CA3AF]" weight="fill" />
        </div>
        <div className="pl-3">
          <p className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">
            Login credentials will be generated automatically and shared with the {userType} via the provided email address upon account creation.
          </p>
        </div>
      </div>
    </div>
  );
}
