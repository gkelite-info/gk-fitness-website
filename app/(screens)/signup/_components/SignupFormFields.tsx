"use client";

import {
  User,
  EnvelopeSimple,
  Phone,
  CalendarBlank,
  CaretDown,
  LockKey,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import SignupAddressFields from "./SignupAddressFields";

interface PlanOption {
  subscriptionPlanId: string;
  planName: string;
  price?: number | null;
}

interface SignupFormFieldsProps {
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  gender: "male" | "female" | "other"; setGender: (v: "male" | "female" | "other") => void;
  dob: string; setDob: (v: string) => void;
  streetAddress: string; setStreetAddress: (v: string) => void;
  country: string; setCountry: (v: string) => void;
  state: string; setState: (v: string) => void;
  city: string; setCity: (v: string) => void;
  pincode: string; setPincode: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  confirmPassword: string; setConfirmPassword: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean; setShowConfirmPassword: (v: boolean) => void;
  selectedPlanId: string; setSelectedPlanId: (v: string) => void;
  plans: PlanOption[];
  isLoadingPlans: boolean;
}

export default function SignupFormFields(props: SignupFormFieldsProps) {
  const {
    name, setName, email, setEmail, phone, setPhone, gender, setGender,
    dob, setDob, streetAddress, setStreetAddress, country, setCountry,
    state, setState, city, setCity, pincode, setPincode, password, setPassword,
    confirmPassword, setConfirmPassword, showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    selectedPlanId, setSelectedPlanId, plans, isLoadingPlans,
  } = props;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Email <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <EnvelopeSimple size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Mobile Number <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter mobile number"
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Date of Birth <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <CalendarBlank size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Plan <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              disabled={isLoadingPlans}
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-all appearance-none cursor-pointer disabled:opacity-50"
            >
              {isLoadingPlans ? (
                <option value="" className="bg-[#18181B]">Loading plans...</option>
              ) : plans.length === 0 ? (
                <option value="" className="bg-[#18181B]">No plans available</option>
              ) : (
                plans.map((p) => (
                  <option key={p.subscriptionPlanId} value={p.subscriptionPlanId} className="bg-[#18181B]">
                    {p.planName} {p.price !== null && p.price !== undefined ? `(₹${p.price}/mo)` : ""}
                  </option>
                ))
              )}
            </select>
            <CaretDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Gender <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-all appearance-none cursor-pointer"
            >
              <option value="male" className="bg-[#18181B]">Male</option>
              <option value="female" className="bg-[#18181B]">Female</option>
              <option value="other" className="bg-[#18181B]">Other</option>
            </select>
            <CaretDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
          </div>
        </div>
      </div>

      <SignupAddressFields
        streetAddress={streetAddress}
        setStreetAddress={setStreetAddress}
        country={country}
        setCountry={setCountry}
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        pincode={pincode}
        setPincode={setPincode}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <LockKey size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-10 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white p-1 cursor-pointer"
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
            Confirm Password <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <LockKey size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-10 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white p-1 cursor-pointer"
            >
              {showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
