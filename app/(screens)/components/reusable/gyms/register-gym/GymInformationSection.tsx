"use client";

import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import PhoneInputWithCountryCode from "./PhoneInputWithCountryCode";
import { GymFormData, INDIAN_STATES } from "./types";

interface GymInformationSectionProps {
  formData: GymFormData;
  onChange: <K extends keyof GymFormData>(key: K, value: GymFormData[K]) => void;
}

export default function GymInformationSection({
  formData,
  onChange,
}: GymInformationSectionProps) {
  const stateOptions = INDIAN_STATES.map((st) => ({
    label: st,
    value: st,
  }));

  const inputClass =
    "w-full h-11 px-3.5 rounded-xl bg-[#1B202D] border border-[#232B3C] text-sm text-white placeholder-[#4A5568] outline-none focus:outline-none focus-visible:outline-none focus:border-[#D4FF32] transition-colors";

  return (
    <div className="w-full bg-[#121620] border border-[#1E2433] rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32]">
          GYM INFORMATION
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Gym Name <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="text"
            value={formData.gymName}
            onChange={(e) => onChange("gymName", e.target.value)}
            placeholder="Enter gym name"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Gym Email <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="email"
            value={formData.gymEmail}
            onChange={(e) => onChange("gymEmail", e.target.value)}
            placeholder="info@powerhousegym.com"
            className={inputClass}
          />
        </div>

        <PhoneInputWithCountryCode
          label="Phone Number"
          required
          phoneCode={formData.phoneCode}
          phoneNumber={formData.phoneNumber}
          onCodeChange={(code) => onChange("phoneCode", code)}
          onNumberChange={(val) => onChange("phoneNumber", val)}
          placeholder="Enter phone number"
        />

        <PhoneInputWithCountryCode
          label="Alternate Number (Optional)"
          phoneCode={formData.altPhoneCode}
          phoneNumber={formData.altPhoneNumber}
          onCodeChange={(code) => onChange("altPhoneCode", code)}
          onNumberChange={(val) => onChange("altPhoneNumber", val)}
          placeholder="Enter alternate number"
        />

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Address <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Plot No. 45, Hitech City Road, Madhapur"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">
              City <span className="text-[#D4FF32]">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Hyderabad"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">
              State <span className="text-[#D4FF32]">*</span>
            </label>
            <Dropdown
              options={stateOptions}
              value={formData.state}
              onChange={(val) => onChange("state", val)}
              noTruncate
              triggerClassName="w-full h-11 px-3.5 rounded-xl bg-[#1B202D] border border-[#232B3C] text-sm text-white flex items-center justify-between hover:border-[#303744] focus:border-[#D4FF32] transition-colors cursor-pointer"
            />
          </div>

          <div className="sm:col-span-3 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">
              PIN Code <span className="text-[#D4FF32]">*</span>
            </label>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => onChange("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="500081"
              maxLength={6}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
