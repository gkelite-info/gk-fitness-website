import { Briefcase, CalendarBlank } from "@phosphor-icons/react";

interface ProfessionalInfoSectionProps {
  specializations: string[];
  onToggleSpecialization: (spec: string) => void;
  experienceYears: string;
  onExperienceYearsChange: (val: string) => void;
  joiningDate: string;
  onJoiningDateChange: (val: string) => void;
  qualification: string;
  onQualificationChange: (val: string) => void;
}

const SPECIALIZATION_OPTIONS = [
  "Strength Training",
  "Fat Loss",
  "CrossFit",
  "Yoga",
  "Bodybuilding",
  "HIIT",
];

export default function ProfessionalInfoSection({
  specializations,
  onToggleSpecialization,
  experienceYears,
  onExperienceYearsChange,
  joiningDate,
  onJoiningDateChange,
  qualification,
  onQualificationChange,
}: ProfessionalInfoSectionProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
        <Briefcase size={15} weight="bold" />
        <span>PROFESSIONAL INFORMATION</span>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            SPECIALIZATION
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {SPECIALIZATION_OPTIONS.map((spec) => {
              const isSelected = specializations.includes(spec);
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => onToggleSpecialization(spec)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#D4FF32] text-black shadow-[0_2px_10px_rgba(212,255,50,0.3)]"
                      : "bg-[#141B26] border border-[#222E42] text-[#94A3B8] hover:text-white hover:border-[#323E54]"
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              EXPERIENCE (YEARS)
            </label>
            <input
              type="text"
              value={experienceYears}
              onChange={(e) => onExperienceYearsChange(e.target.value)}
              placeholder="e.g. 5"
              className="w-full h-11 px-4 rounded-xl bg-[#141B26] border border-[#222E42] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              JOINING DATE
            </label>
            <div className="relative flex items-center justify-between w-full h-11 px-3.5 rounded-xl bg-[#141B26] border border-[#222E42] focus-within:border-[#D4FF32] transition-colors group cursor-pointer">
              <span
                className={`text-sm select-none ${
                  joiningDate ? "text-white font-medium" : "text-[#64748B]"
                }`}
              >
                {joiningDate || "mm/dd/yyyy"}
              </span>
              <CalendarBlank
                size={16}
                weight="bold"
                className="text-[#D4FF32] shrink-0 pointer-events-none"
              />
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => onJoiningDateChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            QUALIFICATION / CERTIFICATION
          </label>
          <input
            type="text"
            value={qualification}
            onChange={(e) => onQualificationChange(e.target.value)}
            placeholder="NASM Certified Trainer, BSc Sports Science"
            className="w-full h-11 px-4 rounded-xl bg-[#141B26] border border-[#222E42] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
