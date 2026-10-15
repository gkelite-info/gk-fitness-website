"use client";

import { FileText } from "@phosphor-icons/react";

interface CreateGymPassSideCardsProps {
  isActive: boolean;
  onToggleActive: () => void;
}

export default function CreateGymPassSideCards({
  isActive,
  onToggleActive,
}: CreateGymPassSideCardsProps) {
  const terms = [
    "Valid across all registered gyms.",
    "One active Monthly Pass allowed per user.",
    "Pass becomes active from first use.",
    "Maximum one check-in per day.",
    "Once activated, the pass cannot be paused or refunded.",
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4FF32] flex items-center justify-center text-black shrink-0">
            <FileText size={18} weight="fill" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Terms & Conditions
          </h3>
        </div>

        <ul className="flex flex-col gap-3">
          {terms.map((term, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32] shrink-0 mt-1.5" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Pass Status
          </h3>
          <p className="text-xs text-[#94A3B8] font-normal mt-0.5">
            Control the availability of this pass
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          onClick={onToggleActive}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isActive ? "bg-[#D4FF32]" : "bg-[#252936]"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
              isActive ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
