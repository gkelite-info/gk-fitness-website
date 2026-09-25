import { Info } from "@phosphor-icons/react";

export default function EnquiryCustomerInfo() {
  return (
    <div className="flex flex-col p-5 bg-[#141B24] border border-[#202938] rounded-2xl gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E2634]">
        <div className="flex items-center justify-center w-7 h-7 bg-blue-500/10 rounded-lg">
          <Info size={16} className="text-blue-400" />
        </div>
        <h3 className="font-sans font-bold text-[13px] text-white tracking-wide uppercase">Customer Information</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-xs text-[#9CA3AF]">Full Name</span>
          <span className="font-sans font-semibold text-sm text-[#F3F4F6]">Rahul Sharma</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-xs text-[#9CA3AF]">Email Address</span>
          <span className="font-sans font-semibold text-sm text-[#F3F4F6] break-all">rahul.sharma90@gmail.com</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-xs text-[#9CA3AF]">Mobile Number</span>
          <span className="font-sans font-semibold text-sm text-[#F3F4F6]">9876543210</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-xs text-[#9CA3AF]">Gender</span>
          <span className="font-sans font-semibold text-sm text-[#F3F4F6]">Male</span>
        </div>
        <div className="flex flex-col gap-0.5 sm:col-span-2">
          <span className="font-sans text-xs text-[#9CA3AF]">Age / DOB</span>
          <span className="font-sans font-semibold text-sm text-[#F3F4F6]">28 years (12 Mar 1998)</span>
        </div>
      </div>
    </div>
  );
}
