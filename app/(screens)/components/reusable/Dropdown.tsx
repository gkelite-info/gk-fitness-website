"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, CheckSquare, Square } from "@phosphor-icons/react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | string[];
  onChange: (val: any) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  multiSelect?: boolean;
  icon?: React.ReactNode;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  triggerClassName,
  multiSelect = false,
  icon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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

  // Smart positioning logic
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const dropdownHeight = 250; 
      
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    }
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    if (!multiSelect) {
      onChange(option.value);
      setIsOpen(false);
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(option.value)) {
        onChange(currentValues.filter((v) => v !== option.value));
      } else {
        onChange([...currentValues, option.value]);
      }
    }
  };

  const getDisplayText = () => {
    if (!multiSelect) {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.length === 0) return placeholder;
    
    const selectedLabels = options
      .filter((opt) => currentValues.includes(opt.value))
      .map((opt) => opt.label);
      
    return selectedLabels.join(", ");
  };

  const hasSelection = multiSelect 
    ? Array.isArray(value) && value.length > 0
    : !!options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={
          triggerClassName ||
          "relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg cursor-pointer h-[34px] disabled:opacity-50 disabled:cursor-not-allowed group transition-colors hover:border-[#303744]"
        }
      >
        {icon && <div className="mr-1.5 flex shrink-0 items-center text-[#9CA3AF] group-hover:text-[#D1D5DB] transition-colors">{icon}</div>}
        <span
          className={`flex-1 text-left font-sans font-normal text-xs leading-4 truncate ${
            hasSelection ? "text-[#D1D5DB]" : "text-[#6B7280]"
          }`}
        >
          {getDisplayText()}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2 text-[#6B7280] group-hover:text-[#D1D5DB]"
        >
          <CaretDown size={14} weight="bold" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: openUpwards ? 10 : -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUpwards ? 5 : -5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute left-0 w-full z-50 bg-[#1A2029] border border-[#303744] shadow-xl rounded-lg overflow-hidden flex flex-col py-1 ${
              openUpwards ? "bottom-full mb-1" : "top-full mt-1"
            }`}
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            {options.map((option) => {
              const isSelected = multiSelect
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`flex flex-row items-center w-full px-3 py-2 text-left transition-colors font-sans text-xs leading-4 gap-2 cursor-pointer ${
                    !multiSelect && isSelected
                      ? "bg-[#D4FF32]/10 text-[#D4FF32] font-medium"
                      : "text-[#D1D5DB] hover:bg-[#303744]/50"
                  }`}
                >
                  {multiSelect && (
                    <div className="flex-shrink-0 flex items-center justify-center">
                      {isSelected ? (
                        <CheckSquare weight="fill" size={16} className="text-[#D4FF32]" />
                      ) : (
                        <Square weight="regular" size={16} className="text-[#6B7280]" />
                      )}
                    </div>
                  )}
                  <span className={`truncate flex-1 ${multiSelect && isSelected ? "text-white font-medium" : ""}`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
