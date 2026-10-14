"use client";

import {
  UserCircle,
  CalendarBlank,
  GenderIntersex,
  Phone,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react";
import { PlatformUser } from "../types";

interface CustomerPersonalInfoCardProps {
  customer: PlatformUser;
}

export default function CustomerPersonalInfoCard({
  customer,
}: CustomerPersonalInfoCardProps) {
  const infoRows = [
    {
      icon: CalendarBlank,
      label: "Date of Birth",
      value: customer.dob || "24 Mar 1995",
    },
    {
      icon: GenderIntersex,
      label: "Gender",
      value: customer.gender || "Male",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: customer.mobileNumber || "+91 98765 43210",
    },
    {
      icon: EnvelopeSimple,
      label: "Email Address",
      value:
        customer.email ||
        `${customer.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
    },
    {
      icon: MapPin,
      label: "Address",
      value:
        customer.address ||
        "Flat 12B, Sunrise Towers, Hyderabad, Telangana - 500081",
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#12151D] border border-[#1E232E] p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#1A1F2B]">
        <UserCircle size={22} weight="fill" className="text-[#D4FF32] shrink-0" />
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Personal Information
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {infoRows.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-1.5 border-b border-[#161B24] last:border-0"
            >
              <div className="flex items-center gap-2.5 shrink-0">
                <Icon size={16} className="text-[#64748B] shrink-0" />
                <span className="text-xs sm:text-sm text-[#94A3B8] font-normal">
                  {item.label}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white sm:text-right break-words max-w-full sm:max-w-[320px]">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
