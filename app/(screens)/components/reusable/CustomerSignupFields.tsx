"use client";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { SignupFormValues, SignupFormErrors } from "@/lib/validations/signupValidation";

interface CustomerSignupFieldsProps {
  values: SignupFormValues;
  errors: SignupFormErrors;
  touched: Partial<Record<keyof SignupFormValues, boolean>>;
  onChange: (field: keyof SignupFormValues, value: any) => void;
  onBlur: (field: keyof SignupFormValues) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
}

export default function CustomerSignupFields({
  values,
  errors,
  touched,
  onChange,
  onBlur,
  showPassword,
  onToggleShowPassword,
}: CustomerSignupFieldsProps) {
  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          Full Name <span className="text-[#D4FF32]">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Rahul Sharma"
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          onBlur={() => onBlur("name")}
          className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors capitalize ${
            touched.name && errors.name
              ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
              : "border-white/10 focus:border-[#D4FF32]"
          }`}
        />
        {touched.name && errors.name && (
          <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Email Address <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="email"
            placeholder="rahul@example.com"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value.trim())}
            onBlur={() => onBlur("email")}
            className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
              touched.email && errors.email
                ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-white/10 focus:border-[#D4FF32]"
            }`}
          />
          {touched.email && errors.email && (
            <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Password <span className="text-[#D4FF32]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={values.password}
              onChange={(e) => onChange("password", e.target.value)}
              onBlur={() => onBlur("password")}
              className={`w-full h-11 pl-3.5 pr-10 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
                touched.password && errors.password
                  ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                  : "border-white/10 focus:border-[#D4FF32]"
              }`}
            />
            <button
              type="button"
              onClick={onToggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-[11px] text-red-400 mt-1">{errors.password}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Mobile Number <span className="text-[#D4FF32]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#94A3B8]">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              value={values.phone}
              onChange={(e) => {
                let digits = e.target.value.replace(/\D/g, "");
                if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
                else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
                const raw = digits.slice(0, 10);
                if (raw.length > 0 && !/^[6-9]/.test(raw)) return;
                onChange("phone", raw);
              }}
              onBlur={() => onBlur("phone")}
              className={`w-full h-11 pl-12 pr-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
                touched.phone && errors.phone
                  ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                  : "border-white/10 focus:border-[#D4FF32]"
              }`}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Gender
          </label>
          <div className="grid grid-cols-3 gap-1.5 h-11">
            {(["male", "female", "other"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange("gender", g)}
                className={`h-full rounded-xl text-xs font-bold capitalize transition-all border cursor-pointer ${
                  values.gender === g
                    ? "bg-[#D4FF32] text-black border-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.2)]"
                    : "bg-[#090A0E] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={values.dob || ""}
            onChange={(e) => onChange("dob", e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm outline-none focus:border-[#D4FF32] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Pincode
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="e.g. 500001"
            value={values.pincode || ""}
            onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
            onBlur={() => onBlur("pincode")}
            className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
              touched.pincode && errors.pincode
                ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-white/10 focus:border-[#D4FF32]"
            }`}
          />
          {touched.pincode && errors.pincode && (
            <p className="text-[11px] text-red-400 mt-1">{errors.pincode}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="e.g. Hyderabad"
            value={values.city || ""}
            onChange={(e) => onChange("city", e.target.value.replace(/[^A-Za-z\s]/g, ""))}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm outline-none focus:border-[#D4FF32] transition-colors capitalize"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            State
          </label>
          <input
            type="text"
            placeholder="e.g. Telangana"
            value={values.state || ""}
            onChange={(e) => onChange("state", e.target.value.replace(/[^A-Za-z\s]/g, ""))}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm outline-none focus:border-[#D4FF32] transition-colors capitalize"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          Address
        </label>
        <input
          type="text"
          placeholder="Flat / Street / Area"
          value={values.address || ""}
          onChange={(e) => onChange("address", e.target.value)}
          className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm outline-none focus:border-[#D4FF32] transition-colors"
        />
      </div>
    </div>
  );
}
