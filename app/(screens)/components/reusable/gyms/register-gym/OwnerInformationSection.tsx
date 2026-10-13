"use client";

import PhoneInputWithCountryCode from "./PhoneInputWithCountryCode";
import { GymFormData } from "./types";

interface OwnerInformationSectionProps {
  formData: GymFormData;
  onChange: <K extends keyof GymFormData>(key: K, value: GymFormData[K]) => void;
}

export default function OwnerInformationSection({
  formData,
  onChange,
}: OwnerInformationSectionProps) {
  const inputClass =
    "w-full h-11 px-3.5 rounded-xl bg-[#1B202D] border border-[#232B3C] text-sm text-white placeholder-[#4A5568] outline-none focus:outline-none focus-visible:outline-none focus:border-[#D4FF32] transition-colors";

  return (
    <div className="w-full bg-[#121620] border border-[#1E2433] rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32]">
          OWNER INFORMATION
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Owner Full Name <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => onChange("ownerName", e.target.value)}
            placeholder="Enter owner full name"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#94A3B8]">
            Email Address <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="email"
            value={formData.ownerEmail}
            onChange={(e) => onChange("ownerEmail", e.target.value)}
            placeholder="Enter email address"
            className={inputClass}
          />
        </div>

        <PhoneInputWithCountryCode
          label="Phone Number"
          required
          phoneCode={formData.ownerPhoneCode}
          phoneNumber={formData.ownerPhone}
          onCodeChange={(code) => onChange("ownerPhoneCode", code)}
          onNumberChange={(val) => onChange("ownerPhone", val)}
          placeholder="Enter phone number"
        />

        <PhoneInputWithCountryCode
          label="Alternate Number (Optional)"
          phoneCode={formData.ownerAltPhoneCode}
          phoneNumber={formData.ownerAltPhoneNumber}
          onCodeChange={(code) => onChange("ownerAltPhoneCode", code)}
          onNumberChange={(val) => onChange("ownerAltPhoneNumber", val)}
          placeholder="Enter alternate number"
        />
      </div>
    </div>
  );
}
