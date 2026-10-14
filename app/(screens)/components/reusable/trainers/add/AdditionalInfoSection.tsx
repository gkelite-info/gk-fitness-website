"use client";

import { FileText } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "../../Dropdown";

interface AdditionalInfoSectionProps {
  bio: string;
  onBioChange: (val: string) => void;
  languages: string[];
  onLanguagesChange: (val: string[]) => void;
}

const LANGUAGE_OPTIONS: DropdownOption[] = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Telugu", value: "Telugu" },
  { label: "Tamil", value: "Tamil" },
  { label: "Arabic", value: "Arabic" },
];

export default function AdditionalInfoSection({
  bio,
  onBioChange,
  languages,
  onLanguagesChange,
}: AdditionalInfoSectionProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
        <FileText size={15} weight="bold" />
        <span>ADDITIONAL INFORMATION</span>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            BIO / ABOUT TRAINER
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder="Brief history of achievements..."
            className="w-full p-4 rounded-xl bg-[#141B26] border border-[#222E42] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            LANGUAGES SPOKEN
          </label>
          <Dropdown
            options={LANGUAGE_OPTIONS}
            value={languages}
            onChange={onLanguagesChange}
            placeholder="Select languages"
            multiSelect
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
