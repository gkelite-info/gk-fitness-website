"use client";
import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";

export default function InventoryFilterBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full mb-6">
      <div className="flex flex-row items-center px-4 gap-2 w-full sm:flex-1 h-[42px] bg-[#121720] border border-[#1E2632] rounded-xl shrink-0 transition-colors focus-within:border-[#334155]">
        <MagnifyingGlass size={16} className="text-[#64748B] shrink-0" />
        <input 
          type="text" 
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-sans text-[13.5px] leading-4 text-white placeholder-[#64748B] min-w-0"
        />
      </div>
      <Link 
        href="/owner/inventory/add"
        className="flex flex-row items-center justify-center px-4 py-2 gap-2 w-full sm:w-auto h-[42px] bg-[#D2FF00] shadow-[0_0_15.5px_rgba(210,255,0,0.25)] rounded-xl hover:bg-[#bbf000] transition-colors cursor-pointer shrink-0"
      >
        <PlusCircle size={18} weight="bold" className="text-black" />
        <span className="font-sans font-semibold text-[13.5px] leading-[20px] text-black">
          Add Equipment
        </span>
      </Link>

    </div>
  );
}
