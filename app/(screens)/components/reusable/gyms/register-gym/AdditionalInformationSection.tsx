import YearCalendarPicker from "./YearCalendarPicker";
import { GymFormData } from "./types";

interface AdditionalInformationSectionProps {
  formData: GymFormData;
  onChange: <K extends keyof GymFormData>(key: K, value: GymFormData[K]) => void;
}

export default function AdditionalInformationSection({
  formData,
  onChange,
}: AdditionalInformationSectionProps) {
  const maxNotesLength = 500;
  const inputClass =
    "w-full h-11 px-3.5 rounded-xl bg-[#1B202D] border border-[#232B3C] text-sm text-white placeholder-[#4A5568] outline-none focus:outline-none focus-visible:outline-none focus:border-[#D4FF32] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-full bg-[#121620] border border-[#1E2433] rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32]">
          ADDITIONAL INFORMATION
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Number of Branches
          </label>
          <input
            type="number"
            min="1"
            value={formData.branches}
            onChange={(e) => onChange("branches", e.target.value)}
            placeholder="Enter number of branches"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Established Year (Optional)
          </label>
          <YearCalendarPicker
            value={formData.establishedYear}
            onChange={(yr) => onChange("establishedYear", yr)}
            placeholder="Select year"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#94A3B8]">
              Notes (Optional)
            </label>
            <span className="text-[11px] text-[#64748B]">
              {formData.notes.length}/{maxNotesLength}
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={maxNotesLength}
            value={formData.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Add any additional notes..."
            className="w-full p-3.5 rounded-xl bg-[#1B202D] border border-[#232B3C] text-sm text-white placeholder-[#4A5568] outline-none focus:outline-none focus-visible:outline-none focus:border-[#D4FF32] transition-colors resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
