"use client";

import { PhoneCall } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "../../Dropdown";

interface ContactInfoSectionProps {
  countryCode: string;
  onCountryCodeChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
}

const COUNTRY_CODES: DropdownOption[] = [
  { label: "+91", value: "+91" },
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+971", value: "+971" },
];

export default function ContactInfoSection({
  countryCode,
  onCountryCodeChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
}: ContactInfoSectionProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
        <PhoneCall size={15} weight="bold" />
        <span>CONTACT INFORMATION</span>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              PHONE NUMBER <span className="text-[#D4FF32]">*</span>
            </label>
            <div className="flex flex-row items-stretch w-full h-11 bg-[#141B26] border border-[#222E42] rounded-xl focus-within:border-[#D4FF32] transition-colors relative">
              <div className="w-[84px] shrink-0 border-r border-[#222E42]">
                <Dropdown
                  options={COUNTRY_CODES}
                  value={countryCode}
                  onChange={onCountryCodeChange}
                  className="w-full h-full"
                  triggerClassName="relative flex flex-row items-center justify-between px-3 w-full h-full rounded-l-xl cursor-pointer hover:bg-white/5 transition-colors border-0 bg-transparent text-sm text-white"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center px-3.5">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-transparent outline-none text-sm text-white placeholder-[#64748B]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter email address"
              className="w-full h-11 px-4 rounded-xl bg-[#141B26] border border-[#222E42] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
