"use client";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

export default function EnquiriesFilterBar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Hot", value: "hot" },
    { label: "Warm", value: "warm" },
    { label: "Cold", value: "cold" },
  ];

  const sourceOptions = [
    { label: "All Sources", value: "all" },
    { label: "Instagram", value: "instagram" },
    { label: "Google", value: "google" },
    { label: "Facebook", value: "facebook" },
    { label: "Owner Added", value: "owner" },
  ];

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "New", value: "new" },
    { label: "Follow-up", value: "followup" },
    { label: "In Progress", value: "inprogress" },
  ];

  const dateOptions = [
    { label: "All Time", value: "all" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 items-end gap-4 w-full shrink-0 min-w-0">
      <div className="sm:col-span-2 flex flex-col gap-1 w-full shrink-0 min-w-0">
        <div className="flex flex-row items-center px-3 gap-2 w-full h-[38px] bg-[#10161C] border border-[#1C2631] rounded-[6.5px]">
          <MagnifyingGlass size={14} className="text-[#5A697A]" />
          <input 
            type="text" 
            placeholder="Search by name, phone number or enquiry ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-sans text-[10.6px] text-white placeholder-[#5A697A] min-w-0"
          />
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-start gap-1 w-full shrink-0 min-w-0">
        <span className="font-sans font-semibold text-[8px] leading-3 tracking-[0.4px] uppercase text-[#667688]">
          ENQUIRY CATEGORY
        </span>
        <Dropdown 
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          triggerClassName="flex flex-row items-center justify-between px-3 w-full h-[38px] bg-[#10161C] border border-[#1C2631] rounded-[6.5px] cursor-pointer"
        />
      </div>

      <div className="col-span-1 flex flex-col items-start gap-1 w-full shrink-0 min-w-0">
        <span className="font-sans font-semibold text-[8px] leading-3 tracking-[0.4px] uppercase text-[#667688]">
          SOURCE
        </span>
        <Dropdown 
          options={sourceOptions}
          value={source}
          onChange={setSource}
          triggerClassName="flex flex-row items-center justify-between px-3 w-full h-[38px] bg-[#10161C] border border-[#1C2631] rounded-[6.5px] cursor-pointer"
        />
      </div>

      <div className="col-span-1 flex flex-col items-start gap-1 w-full shrink-0 min-w-0">
        <span className="font-sans font-semibold text-[8px] leading-3 tracking-[0.4px] uppercase text-[#667688]">
          STATUS
        </span>
        <Dropdown 
          options={statusOptions}
          value={status}
          onChange={setStatus}
          triggerClassName="flex flex-row items-center justify-between px-3 w-full h-[38px] bg-[#10161C] border border-[#1C2631] rounded-[6.5px] cursor-pointer"
        />
      </div>

      <div className="col-span-1 flex flex-col items-start gap-1 w-full shrink-0 min-w-0">
        <span className="font-sans font-semibold text-[8px] leading-3 tracking-[0.4px] uppercase text-[#667688]">
          FOLLOW-UP DATE
        </span>
        <Dropdown 
          options={dateOptions}
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select date range"
          triggerClassName="flex flex-row items-center justify-between px-3 w-full h-[38px] bg-[#10161C] border border-[#1C2631] rounded-[6.5px] cursor-pointer"
        />
      </div>
    </div>
  );
}
