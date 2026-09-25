"use client";
import React from "react";
import { 
  House, 
  Users, 
  Gear, 
  Lightning, 
  Megaphone, 
  Barbell, 
  Package, 
  DotsThree 
} from "@phosphor-icons/react";

interface CategorySelectorProps {
  category: string;
  setCategory: (category: string) => void;
}

export default function CategorySelector({ category, setCategory }: CategorySelectorProps) {
  const getStyles = (id: string) => {
    const isSelected = category === id;
    const base = "flex flex-row justify-center items-center px-1.5 sm:px-2 py-2.5 gap-1 sm:gap-2 h-[38px] rounded-xl border transition-all cursor-pointer w-full";
    switch(id) {
      case "rent":
        return isSelected 
          ? `${base} bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.7)] shadow-[0_0_10px_rgba(245,158,11,0.1)] text-[#FCD34D]`
          : `${base} bg-transparent border-[rgba(245,158,11,0.4)] hover:bg-[rgba(245,158,11,0.05)] text-[#FBBF24]`;
      case "salaries":
        return isSelected
          ? `${base} bg-[rgba(107,33,168,0.2)] border-[rgba(107,33,168,0.6)] shadow-[0_0_10px_rgba(107,33,168,0.1)] text-[#D8B4FE]`
          : `${base} bg-transparent border-[rgba(107,33,168,0.4)] hover:bg-[rgba(107,33,168,0.05)] text-[#C084FC]`;
      case "maintenance":
        return isSelected
          ? `${base} bg-[rgba(6,95,70,0.25)] border-[rgba(6,95,70,0.6)] shadow-[0_0_10px_rgba(6,95,70,0.1)] text-[#6EE7B7]`
          : `${base} bg-transparent border-[rgba(6,95,70,0.4)] hover:bg-[rgba(6,95,70,0.05)] text-[#34D399]`;
      case "utilities":
        return isSelected
          ? `${base} bg-[rgba(7,89,133,0.3)] border-[rgba(7,89,133,0.6)] shadow-[0_0_10px_rgba(7,89,133,0.1)] text-[#7DD3FC]`
          : `${base} bg-transparent border-[rgba(7,89,133,0.4)] hover:bg-[rgba(7,89,133,0.05)] text-[#38BDF8]`;
      case "marketing":
        return isSelected
          ? `${base} bg-[rgba(157,23,77,0.3)] border-[rgba(157,23,77,0.6)] shadow-[0_0_10px_rgba(157,23,77,0.1)] text-[#F9A8D4]`
          : `${base} bg-transparent border-[rgba(157,23,77,0.4)] hover:bg-[rgba(157,23,77,0.05)] text-[#F472B6]`;
      case "equipment":
        return isSelected
          ? `${base} bg-[rgba(136,19,55,0.3)] border-[rgba(136,19,55,0.6)] shadow-[0_0_10px_rgba(136,19,55,0.1)] text-[#FDA4AF]`
          : `${base} bg-transparent border-[rgba(136,19,55,0.4)] hover:bg-[rgba(136,19,55,0.05)] text-[#FB7185]`;
      case "supplies":
        return isSelected
          ? `${base} bg-[rgba(63,98,18,0.3)] border-[rgba(63,98,18,0.6)] shadow-[0_0_10px_rgba(63,98,18,0.1)] text-[#BEF264]`
          : `${base} bg-transparent border-[rgba(63,98,18,0.4)] hover:bg-[rgba(63,98,18,0.05)] text-[#A3E635]`;
      case "other":
      default:
        return isSelected
          ? `${base} bg-[rgba(30,41,59,0.4)] border-[rgba(51,65,85,0.6)] shadow-[0_0_10px_rgba(51,65,85,0.1)] text-[#94A3B8]`
          : `${base} bg-transparent border-[#1E293B] hover:bg-white/5 text-[#64748B]`;
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
        Category <span className="text-[#F87171]">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        <button onClick={() => setCategory("rent")} className={getStyles("rent")}>
          <House size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Rent</span>
        </button>
        <button onClick={() => setCategory("salaries")} className={getStyles("salaries")}>
          <Users size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Staff Salaries</span>
        </button>
        <button onClick={() => setCategory("maintenance")} className={getStyles("maintenance")}>
          <Gear size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Maintenance</span>
        </button>
        <button onClick={() => setCategory("utilities")} className={getStyles("utilities")}>
          <Lightning size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Utilities</span>
        </button>
        <button onClick={() => setCategory("marketing")} className={getStyles("marketing")}>
          <Megaphone size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Marketing</span>
        </button>
        <button onClick={() => setCategory("equipment")} className={getStyles("equipment")}>
          <Barbell size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Equipment</span>
        </button>
        <button onClick={() => setCategory("supplies")} className={getStyles("supplies")}>
          <Package size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Supplies</span>
        </button>
        <button onClick={() => setCategory("other")} className={getStyles("other")}>
          <DotsThree size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Other</span>
        </button>
      </div>
    </div>
  );
}
