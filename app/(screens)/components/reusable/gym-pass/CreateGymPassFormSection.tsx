"use client";

import {
  CreditCard,
  Money,
  Clock,
  Barcode,
  User,
  Lightning,
} from "@phosphor-icons/react";
import CustomDropdown, { DropdownOption } from "@/app/(screens)/components/reusable/CustomDropdown";

export interface GymPassFormData {
  name: string;
  price: string;
  validity: string;
  maxVisits: string;
  access: string;
  activationRule: string;
}

interface CreateGymPassFormSectionProps {
  formData: GymPassFormData;
  onChange: (field: keyof GymPassFormData, value: string) => void;
}

const maxVisitsOptions: DropdownOption[] = [
  { label: "1 Visit", value: "1 Visit" },
  { label: "2 Visits", value: "2 Visits" },
  { label: "3 Visits", value: "3 Visits" },
  { label: "Unlimited", value: "Unlimited" },
];

const accessOptions: DropdownOption[] = [
  { label: "Registered Gyms", value: "Registered Gyms" },
  { label: "All Partner Gyms", value: "All Partner Gyms" },
  { label: "Single Gym Only", value: "Single Gym Only" },
];

const activationOptions: DropdownOption[] = [
  { label: "On First Use", value: "On First Use" },
  { label: "Immediate upon Purchase", value: "Immediate upon Purchase" },
  { label: "Custom Date", value: "Custom Date" },
];

export default function CreateGymPassFormSection({
  formData,
  onChange,
}: CreateGymPassFormSectionProps) {
  const fields = [
    {
      id: "name" as const,
      icon: CreditCard,
      label: "Pass Name",
      subtitle: "This is the name shown to customers",
      type: "input" as const,
      placeholder: "Enter pass name...",
    },
    {
      id: "price" as const,
      icon: Money,
      label: "Price",
      subtitle: "Amount customer needs to pay",
      type: "input" as const,
      placeholder: "₹0",
    },
    {
      id: "validity" as const,
      icon: Clock,
      label: "Validity",
      subtitle: "How long the pass is valid",
      type: "input" as const,
      placeholder: "e.g. 30 Days",
    },
    {
      id: "maxVisits" as const,
      icon: Barcode,
      label: "Max Visits Per Day",
      subtitle: "Maximum gym entries allowed per day",
      type: "dropdown" as const,
      options: maxVisitsOptions,
    },
    {
      id: "access" as const,
      icon: User,
      label: "Access",
      subtitle: "Gyms where this pass is valid",
      type: "dropdown" as const,
      options: accessOptions,
    },
    {
      id: "activationRule" as const,
      icon: Lightning,
      label: "Activation Rule",
      subtitle: "When does the pass become active?",
      type: "dropdown" as const,
      options: activationOptions,
    },
  ];

  return (
    <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-6 flex flex-col gap-4 shadow-sm">
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
        Pass Settings
      </h2>

      <div className="flex flex-col gap-3.5 sm:gap-3">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.id}
              className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-[#161822] border border-[#202432] hover:border-[#2C3345] transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#1C202C] border border-[#262D3D] flex items-center justify-center text-[#D4FF32] shrink-0 mt-0.5 sm:mt-0">
                  <Icon size={20} weight="fill" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-white break-words">
                    {field.label}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#94A3B8] font-normal leading-relaxed break-words mt-0.5">
                    {field.subtitle}
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-64 lg:w-72 shrink-0">
                {field.type === "input" ? (
                  <input
                    type="text"
                    value={formData[field.id]}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-[#11131A] border border-[#242A38] focus:border-[#D4FF32] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors h-[42px]"
                  />
                ) : (
                  <CustomDropdown
                    options={field.options || []}
                    value={formData[field.id]}
                    onChange={(val) => onChange(field.id, val)}
                    triggerClassName="relative flex flex-row items-center justify-between px-3.5 py-2.5 w-full bg-[#11131A] hover:bg-[#161822] border border-[#242A38] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white transition-colors cursor-pointer h-[42px]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
