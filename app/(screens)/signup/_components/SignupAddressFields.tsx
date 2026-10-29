"use client";

import { MapPin, Flag, MapTrifold, Buildings, Hash } from "@phosphor-icons/react";

interface SignupAddressFieldsProps {
  streetAddress: string;
  setStreetAddress: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  pincode: string;
  setPincode: (v: string) => void;
}

export default function SignupAddressFields({
  streetAddress,
  setStreetAddress,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  pincode,
  setPincode,
}: SignupAddressFieldsProps) {
  return (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
              Address <span className="text-red-400">*</span>
            </label>
            <div className="relative group">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="House / Flat / Building / Street"
                className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
              />
            </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
                  Country <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Flag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
                  State <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <MapTrifold size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
                  />
                </div>
              </div>
            </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
                      City <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <Buildings size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
                      />
                    </div>
                  </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 ml-1">
                        PIN Code <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group">
                        <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#D4FF32]" />
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="PIN Code"
                          className="w-full h-12 bg-[#18181B] border border-[#27272A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4FF32] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                );
}
