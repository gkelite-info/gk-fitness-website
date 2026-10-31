"use client";

import { CaretLeft, UsersThree, Barbell } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface AddUserHeaderProps {
  isEditMode: boolean;
  activeTab: "customers" | "trainers";
}

export default function AddUserHeader({ isEditMode, activeTab }: AddUserHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0 mb-8">
      <div className="flex flex-row items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex flex-row justify-center items-center w-8 h-8 bg-[#161B22] border border-[#232A35] rounded-lg cursor-pointer hover:bg-[#232A35] transition-colors"
        >
          <CaretLeft size={16} className="text-[#D1D5DB]" weight="bold" />
        </button>

        <div className="flex flex-col items-start pl-3.5">
          <h1 className="font-sans font-bold text-lg leading-7 tracking-[-0.45px] text-white">
            {isEditMode ? "Edit" : "Add New"} {activeTab === "trainers" ? "Trainer" : "Customer"}
          </h1>
          <p className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">
            {isEditMode ? "Update their details" : "Fill in the details and create their account"}
          </p>
        </div>
      </div>

      <div className="flex flex-row items-start p-1 bg-[#161B22] border border-[#232A35] rounded-lg">
        <button
          type="button"
          onClick={() => router.push("?type=customers", { scroll: false })}
          className={`flex flex-row items-center px-4 py-1.5 gap-2 h-[28px] rounded-md transition-all cursor-pointer ${
            activeTab === "customers"
              ? "bg-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              : "bg-transparent hover:bg-white/5"
          }`}
        >
          <UsersThree
            size={14}
            weight={activeTab === "customers" ? "bold" : "regular"}
            className={activeTab === "customers" ? "text-black" : "text-[#9CA3AF]"}
          />
          <span
            className={`font-sans text-xs leading-4 text-center ${
              activeTab === "customers" ? "font-semibold text-black" : "font-medium text-[#9CA3AF]"
            }`}
          >
            Customers
          </span>
        </button>

        <button
          type="button"
          onClick={() => router.push("?type=trainers", { scroll: false })}
          className={`flex flex-row items-center px-4 py-1.5 gap-2 h-[28px] rounded-md transition-all cursor-pointer ${
            activeTab === "trainers"
              ? "bg-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              : "bg-transparent hover:bg-white/5"
          }`}
        >
          <Barbell
            size={14}
            weight={activeTab === "trainers" ? "bold" : "regular"}
            className={activeTab === "trainers" ? "text-black" : "text-[#9CA3AF]"}
          />
          <span
            className={`font-sans text-xs leading-4 text-center ${
              activeTab === "trainers" ? "font-semibold text-black" : "font-medium text-[#9CA3AF]"
            }`}
          >
            Trainers
          </span>
        </button>
      </div>
    </div>
  );
}

