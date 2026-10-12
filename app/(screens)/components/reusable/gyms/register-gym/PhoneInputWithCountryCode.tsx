"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { COUNTRY_CODES } from "./types";

interface PhoneInputWithCountryCodeProps {
  label: string;
  required?: boolean;
  phoneCode: string;
  phoneNumber: string;
  onCodeChange: (code: string) => void;
  onNumberChange: (number: string) => void;
  placeholder?: string;
}

export default function PhoneInputWithCountryCode({
  label,
  required = false,
  phoneCode,
  phoneNumber,
  onCodeChange,
  onNumberChange,
  placeholder = "Enter phone number",
}: PhoneInputWithCountryCodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericOnly = e.target.value.replace(/\D/g, "").slice(0, 15);
    onNumberChange(numericOnly);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full min-w-0">
      <label className="text-xs font-medium text-[#94A3B8]">
        {label} {required && <span className="text-[#D4FF32]">*</span>}
      </label>

      <div
        className={`relative flex items-center rounded-xl bg-[#1B202D] border transition-colors w-full min-w-0 ${
          isOpen
            ? "border-[#D4FF32]"
            : "border-[#232B3C] focus-within:border-[#D4FF32]"
        }`}
      >
        <div
          ref={dropdownRef}
          className="relative w-[62px] min-w-[62px] max-w-[62px] shrink-0"
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full h-11 px-2 flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-[#232B3C]/50 transition-colors cursor-pointer select-none border-r border-[#232B3C]"
          >
            <span className="truncate">{phoneCode}</span>
            <CaretDown
              size={11}
              weight="bold"
              className={`text-[#94A3B8] transition-transform duration-200 shrink-0 ${
                isOpen ? "rotate-180 text-[#D4FF32]" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-36 bg-[#161B26] border border-[#2A3449] rounded-xl shadow-2xl py-1 z-50 overflow-hidden">
              {COUNTRY_CODES.map((item) => {
                const isSelected = phoneCode === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onCodeChange(item.code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#D4FF32]/10 text-[#D4FF32] font-bold"
                        : "text-[#CBD5E1] hover:bg-[#1F2637]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={15}
          className="min-w-0 flex-1 w-full h-11 px-3 bg-transparent text-sm text-white placeholder-[#4A5568] outline-none focus:outline-none focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
