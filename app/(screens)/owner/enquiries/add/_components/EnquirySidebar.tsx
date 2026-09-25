"use client";

import { useRouter } from "next/navigation";
import { User, Phone, EnvelopeSimple, GenderIntersex, ArrowsLeftRight, ClipboardText, TrendUp, ShareNetwork, Clock, ChatCenteredText, Info } from "@phosphor-icons/react";

export default function EnquirySidebar() {
  const router = useRouter();

  const previewItems = [
    { label: "Name", icon: <User size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Mobile", icon: <Phone size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Email", icon: <EnvelopeSimple size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Gender", icon: <GenderIntersex size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Interested In", icon: <ArrowsLeftRight size={14} className="text-[#94A3B8]" />, value: "Membership", valueColor: "text-[#34D399]" },
    { label: "Preferred Plan", icon: <ClipboardText size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Added Via", icon: <TrendUp size={14} className="text-[#94A3B8]" />, value: "Social Media", valueColor: "text-[#CBD5E1]" },
    { label: "Source", icon: <ShareNetwork size={14} className="text-[#94A3B8]" />, value: "Google", valueColor: "text-[#CBD5E1]" },
    { label: "Category", icon: <Info size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Follow-up Date", icon: <Clock size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
    { label: "Notes", icon: <ChatCenteredText size={14} className="text-[#94A3B8]" />, value: "—", valueColor: "text-[#CBD5E1]" },
  ];

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      
      <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
        <div className="flex flex-row items-center gap-3 w-full">
          <div className="flex flex-row justify-center items-center w-10 h-10 bg-[rgba(2,44,34,0.5)] border border-[rgba(16,185,129,0.3)] rounded-lg shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6667 2.5H5.83333C4.91286 2.5 4.16667 3.24619 4.16667 4.16667V15.8333C4.16667 16.7538 4.91286 17.5 5.83333 17.5H14.1667C15.0871 17.5 15.8333 16.7538 15.8333 15.8333V6.66667L11.6667 2.5Z" stroke="#34D399" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.6667 2.5V6.66667H15.8333" stroke="#34D399" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 10.8333H6.66667" stroke="#34D399" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 14.1667H6.66667" stroke="#34D399" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.33333 7.5H6.66667" stroke="#34D399" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="font-sans font-bold text-base text-white leading-6 tracking-[0.4px]">Enquiry Preview</h3>
            <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">Here's what will be captured for this enquiry.</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {previewItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-row justify-between items-center py-2.5 w-full ${index !== 0 ? 'border-t border-[rgba(30,41,59,0.6)]' : ''}`}
            >
              <div className="flex flex-row items-center gap-2.5">
                {item.icon}
                <span className="font-sans font-medium text-xs text-[#94A3B8] leading-4">{item.label}</span>
              </div>
              
              {item.value === "—" ? (
                <div className="w-3 h-[1.26px] bg-[#CBD5E1]" />
              ) : (
                <span className={`font-sans font-semibold text-xs leading-4 text-right ${item.valueColor}`}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-start p-5 gap-3 w-full bg-[rgba(11,27,45,0.6)] border border-[rgba(30,58,138,0.4)] rounded-xl">
        <div className="mt-0.5 flex flex-row justify-center items-center w-5 h-5 bg-[rgba(59,130,246,0.2)] border border-[#60A5FA] rounded-full shrink-0">
          <span className="font-sans font-bold text-[11px] text-[#60A5FA] leading-4">i</span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-sans font-semibold text-sm text-[#93C5FD] leading-5 tracking-[-0.35px]">Good to know</h4>
          <ul className="flex flex-col gap-1.5 list-none pl-0">
            <li className="relative pl-3 font-sans font-normal text-xs text-[#CBD5E1] leading-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-[#CBD5E1]">
              All details can be edited later from the enquiries list.
            </li>
            <li className="relative pl-3 font-sans font-normal text-xs text-[#CBD5E1] leading-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-[#CBD5E1]">
              Follow-up helps you stay on track.
            </li>
            <li className="relative pl-3 font-sans font-normal text-xs text-[#CBD5E1] leading-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-[#CBD5E1]">
              This will be added to your enquiries, not converted to a member yet.
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
