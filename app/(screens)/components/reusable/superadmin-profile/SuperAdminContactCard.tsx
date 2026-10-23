"use client";

import { EnvelopeSimple, Phone, CalendarBlank, CaretRight } from "@phosphor-icons/react";

interface SuperAdminContactCardProps {
  email?: string;
  phone?: string;
  joinedOn?: string;
  role?: string;
  status?: string;
}

export default function SuperAdminContactCard({
  email = "amit.verma@gkgymlife.com",
  phone = "+91 98765 43210",
  joinedOn = "20 May 2026",
  role = "SUPER ADMIN",
  status = "Active Member",
}: SuperAdminContactCardProps) {
  const items = [
    {
      id: "email",
      label: "Email",
      value: email,
      icon: <EnvelopeSimple size={18} weight="bold" />,
    },
    {
      id: "phone",
      label: "Phone",
      value: phone,
      icon: <Phone size={18} weight="bold" />,
    },
    {
      id: "joined",
      label: "Joined On",
      value: joinedOn,
      icon: <CalendarBlank size={18} weight="bold" />,
    },
  ];

  return (
    <div className="w-full bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xs font-bold text-[#64748B] tracking-wider uppercase">
          CONTACT & MEMBERSHIP DETAILS
        </h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[rgba(212,255,50,0.12)] text-[#D4FF32] border border-[#D4FF32]/30 whitespace-nowrap">
          Verified
        </span>
      </div>

      <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full bg-[#13151D] border border-[#1F2430] hover:border-[#2D3446] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,255,50,0.08)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-medium text-[#64748B] leading-tight">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white truncate mt-0.5">
                  {item.value}
                </span>
              </div>
            </div>

            <CaretRight
              size={16}
              weight="bold"
              className="text-[#64748B] group-hover:text-white transition-colors shrink-0"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1 w-full">
        <div className="bg-[#13151D] border border-[#1F2430] rounded-xl p-3.5 flex flex-col justify-center">
          <span className="text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">
            ROLE
          </span>
          <span className="text-xs sm:text-sm font-bold text-white mt-1 uppercase whitespace-nowrap">
            {role}
          </span>
        </div>

        <div className="bg-[#13151D] border border-[#1F2430] rounded-xl p-3.5 flex flex-col justify-center">
          <span className="text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">
            STATUS
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#D4FF32] shadow-[0_0_6px_#D4FF32]" />
            <span className="text-xs sm:text-sm font-semibold text-[#D4FF32] whitespace-nowrap">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
