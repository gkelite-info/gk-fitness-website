"use client";

import { Phone, EnvelopeSimple } from "@phosphor-icons/react";
import Avatar from "../Avatar";
import { CustomerProfileData } from "./types";

interface CustomerProfileBannerProps {
  data: CustomerProfileData;
}

export default function CustomerProfileBanner({ data }: CustomerProfileBannerProps) {
  const isActive = data.status === "Active";

  return (
    <div className="flex flex-col sm:flex-row items-start p-6 gap-7 w-full bg-[#10151E] border border-[#1B2433] shadow-lg rounded-2xl shrink-0">
      {/* Member Avatar Box */}
      <div className="w-full sm:w-[240px] h-[176px] bg-black border border-[#232F42] rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
        <Avatar 
          src={data.avatarUrl} 
          alt={data.name} 
          gender={null} 
          className="w-full h-full rounded-none" 
        />
      </div>

      {/* Member Details Info */}
      <div className="flex flex-col justify-center items-start w-full gap-4">
        
        {/* Mobile View: Name, then [Active + ID] side-by-side below it */}
        <div className="flex flex-col items-start gap-3 w-full sm:hidden">
          <h2 className="font-sans font-bold text-xl leading-8 tracking-tight text-white m-0">
            {data.name}
          </h2>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center px-3 py-1 gap-1.5 bg-[#112613] border border-[#1F5426] rounded-full">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#4ADE80]' : 'bg-[#F87171]'}`} />
              <span className={`font-sans font-semibold text-xs leading-4 ${isActive ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                {data.status}
              </span>
            </div>
            <div className="flex flex-row items-center px-3 py-1.5 bg-[#16231A] border border-[#1B3D23] rounded-md">
              <span className="font-mono font-medium text-xs leading-4 tracking-wider text-[#86EFAC]">
                {data.memberCode}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop View: [Name + Active] side-by-side, then ID below it */}
        <div className="hidden sm:flex flex-col items-start gap-3 w-full">
          <div className="flex flex-row items-center gap-4">
            <h2 className="font-sans font-bold text-2xl leading-8 tracking-tight text-white m-0">
              {data.name}
            </h2>
            <div className="flex flex-row items-center px-3 py-1 gap-1.5 bg-[#112613] border border-[#1F5426] rounded-full">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#4ADE80]' : 'bg-[#F87171]'}`} />
              <span className={`font-sans font-semibold text-xs leading-4 ${isActive ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                {data.status}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center px-3 py-1.5 bg-[#16231A] border border-[#1B3D23] rounded-md">
            <span className="font-mono font-medium text-xs leading-4 tracking-wider text-[#86EFAC]">
              {data.memberCode}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 mt-2">
          <div className="flex flex-row items-center gap-2.5">
            <Phone size={16} className="text-[#D2F802]" weight="regular" />
            <span className="font-sans font-medium text-sm leading-5 text-[#D1D5DB]">
              {data.phone}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2.5">
            <EnvelopeSimple size={16} className="text-[#D2F802]" weight="regular" />
            <span className="font-sans font-medium text-sm leading-5 text-[#D1D5DB]">
              {data.email}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
