import { User, CalendarBlank } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "../../Dropdown";

interface PersonalInfoSectionProps {
  fullName: string;
  onFullNameChange: (val: string) => void;
  trainerId: string;
  onTrainerIdChange: (val: string) => void;
  dob: string;
  onDobChange: (val: string) => void;
  gender: string;
  onGenderChange: (val: string) => void;
}

const GENDER_OPTIONS: DropdownOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function PersonalInfoSection({
  fullName,
  onFullNameChange,
  trainerId,
  onTrainerIdChange,
  dob,
  onDobChange,
  gender,
  onGenderChange,
}: PersonalInfoSectionProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
        <User size={15} weight="bold" />
        <span>PERSONAL INFORMATION</span>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            FULL NAME <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="Enter full name"
            className="w-full h-11 px-4 rounded-xl bg-[#141B26] border border-[#222E42] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              TRAINER ID <span className="text-[#D4FF32]">*</span>
            </label>
            <input
              type="text"
              value={trainerId}
              onChange={(e) => onTrainerIdChange(e.target.value)}
              placeholder="T-2024-001"
              className="w-full h-11 px-4 rounded-xl bg-[#141B26] border border-[#222E42] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              DATE OF BIRTH <span className="text-[#D4FF32]">*</span>
            </label>
            <div className="relative flex items-center justify-between w-full h-11 px-3.5 rounded-xl bg-[#141B26] border border-[#222E42] focus-within:border-[#D4FF32] transition-colors group cursor-pointer">
              <span
                className={`text-sm select-none ${
                  dob ? "text-white font-medium" : "text-[#64748B]"
                }`}
              >
                {dob || "mm/dd/yyyy"}
              </span>
              <CalendarBlank
                size={16}
                weight="bold"
                className="text-[#D4FF32] shrink-0 pointer-events-none"
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => onDobChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            GENDER <span className="text-[#D4FF32]">*</span>
          </label>
          <Dropdown
            options={GENDER_OPTIONS}
            value={gender}
            onChange={onGenderChange}
            placeholder="Select gender"
            className="w-full"
            triggerClassName="relative flex flex-row items-center justify-between px-4 h-12 w-full bg-[#141B26] border border-[#222E42] rounded-xl text-sm text-white hover:border-[#323E54] transition-colors cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
