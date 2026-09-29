"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  House, 
  Users, 
  Gear, 
  Lightning, 
  Megaphone, 
  Barbell, 
  Package, 
  DotsThree,
  Tag,
  X
} from "@phosphor-icons/react";

interface CategorySelectorProps {
  category: string;
  setCategory: (category: string) => void;
}

const baseCategories = ["rent", "salaries", "maintenance", "utilities", "marketing", "equipment", "supplies", "other"];

export default function CategorySelector({ category, setCategory }: CategorySelectorProps) {
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category && !baseCategories.includes(category) && !customCategories.includes(category)) {
      setCustomCategories(prev => [...prev, category]);
    }
  }, [category, customCategories]);

  useEffect(() => {
    if (isAddingCustom && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingCustom]);

  const handleSaveCustom = () => {
    const trimmed = customInputValue.trim();
    if (trimmed) {
      if (!customCategories.includes(trimmed) && !baseCategories.includes(trimmed.toLowerCase())) {
        setCustomCategories([...customCategories, trimmed]);
      }
      setCategory(trimmed);
      setCustomInputValue("");
      setIsAddingCustom(false);
    }
  };

  const getStyles = (id: string) => {
    const isSelected = category === id;
    const base = "flex flex-row justify-center items-center px-1.5 sm:px-2 py-2.5 gap-1 sm:gap-2 h-[38px] rounded-xl border transition-all cursor-pointer w-full";
    switch(id) {
      case "rent":
        return isSelected 
          ? `${base} bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.7)] shadow-[0_0_10px_rgba(245,158,11,0.1)] text-[#FCD34D]`
          : `${base} bg-transparent border-[rgba(245,158,11,0.4)] hover:bg-[rgba(245,158,11,0.05)] text-[#FBBF24]`;
      case "salaries":
        return isSelected
          ? `${base} bg-[rgba(107,33,168,0.2)] border-[rgba(107,33,168,0.6)] shadow-[0_0_10px_rgba(107,33,168,0.1)] text-[#D8B4FE]`
          : `${base} bg-transparent border-[rgba(107,33,168,0.4)] hover:bg-[rgba(107,33,168,0.05)] text-[#C084FC]`;
      case "maintenance":
        return isSelected
          ? `${base} bg-[rgba(6,95,70,0.25)] border-[rgba(6,95,70,0.6)] shadow-[0_0_10px_rgba(6,95,70,0.1)] text-[#6EE7B7]`
          : `${base} bg-transparent border-[rgba(6,95,70,0.4)] hover:bg-[rgba(6,95,70,0.05)] text-[#34D399]`;
      case "utilities":
        return isSelected
          ? `${base} bg-[rgba(7,89,133,0.3)] border-[rgba(7,89,133,0.6)] shadow-[0_0_10px_rgba(7,89,133,0.1)] text-[#7DD3FC]`
          : `${base} bg-transparent border-[rgba(7,89,133,0.4)] hover:bg-[rgba(7,89,133,0.05)] text-[#38BDF8]`;
      case "marketing":
        return isSelected
          ? `${base} bg-[rgba(157,23,77,0.3)] border-[rgba(157,23,77,0.6)] shadow-[0_0_10px_rgba(157,23,77,0.1)] text-[#F9A8D4]`
          : `${base} bg-transparent border-[rgba(157,23,77,0.4)] hover:bg-[rgba(157,23,77,0.05)] text-[#F472B6]`;
      case "equipment":
        return isSelected
          ? `${base} bg-[rgba(136,19,55,0.3)] border-[rgba(136,19,55,0.6)] shadow-[0_0_10px_rgba(136,19,55,0.1)] text-[#FDA4AF]`
          : `${base} bg-transparent border-[rgba(136,19,55,0.4)] hover:bg-[rgba(136,19,55,0.05)] text-[#FB7185]`;
      case "supplies":
        return isSelected
          ? `${base} bg-[rgba(63,98,18,0.3)] border-[rgba(63,98,18,0.6)] shadow-[0_0_10px_rgba(63,98,18,0.1)] text-[#BEF264]`
          : `${base} bg-transparent border-[rgba(63,98,18,0.4)] hover:bg-[rgba(63,98,18,0.05)] text-[#A3E635]`;
      case "other":
        return isSelected
          ? `${base} bg-[rgba(30,41,59,0.4)] border-[rgba(51,65,85,0.6)] shadow-[0_0_10px_rgba(51,65,85,0.1)] text-[#94A3B8]`
          : `${base} bg-transparent border-[#1E293B] hover:bg-white/5 text-[#64748B]`;
      default:
        // Custom Category styles
        return isSelected
          ? `${base} bg-[rgba(204,255,0,0.15)] border-[rgba(204,255,0,0.6)] shadow-[0_0_10px_rgba(204,255,0,0.1)] text-[#CCFF00]`
          : `${base} bg-transparent border-[rgba(204,255,0,0.4)] hover:bg-[rgba(204,255,0,0.05)] text-[#bbf000]`;
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
          Category <span className="text-[#F87171]">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          <button onClick={() => setCategory("rent")} className={getStyles("rent")}>
            <House size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Rent</span>
          </button>
          <button onClick={() => setCategory("salaries")} className={getStyles("salaries")}>
            <Users size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Staff Salaries</span>
          </button>
          <button onClick={() => setCategory("maintenance")} className={getStyles("maintenance")}>
            <Gear size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Maintenance</span>
          </button>
          <button onClick={() => setCategory("utilities")} className={getStyles("utilities")}>
            <Lightning size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Utilities</span>
          </button>
          <button onClick={() => setCategory("marketing")} className={getStyles("marketing")}>
            <Megaphone size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Marketing</span>
          </button>
          <button onClick={() => setCategory("equipment")} className={getStyles("equipment")}>
            <Barbell size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Equipment</span>
          </button>
          <button onClick={() => setCategory("supplies")} className={getStyles("supplies")}>
            <Package size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Supplies</span>
          </button>

          {/* Custom Categories */}
          {customCategories.map(cat => {
            const isLong = cat.length > 14;
            return (
              <div 
                key={cat} 
                onClick={() => setCategory(cat)} 
                className={`relative group !pr-7 ${getStyles(cat)} ${isLong ? 'col-span-2' : ''}`}
              >
                <Tag size={16} className="shrink-0" />
                <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap truncate">{cat}</span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomCategories(prev => prev.filter(c => c !== cat));
                    if (category === cat) setCategory("rent");
                  }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-md hover:bg-black/20 text-current opacity-50 hover:opacity-100 transition-all cursor-pointer"
                  title="Remove category"
                >
                  <X size={12} weight="bold" />
                </button>
              </div>
            );
          })}

          {/* Other / Add Custom */}
          <button onClick={() => setIsAddingCustom(true)} className={getStyles("other")}>
            <DotsThree size={16} className="shrink-0" />
            <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Other</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAddingCustom && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="flex flex-col bg-[#0F141C] border border-[#1E293B] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-2xl w-full max-w-[320px] p-5 gap-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="text-white font-sans font-bold text-base leading-5">Add Custom Category</h3>
                <p className="text-[#94A3B8] font-sans text-xs leading-4">Enter a name for your new expense category.</p>
              </div>
              <input 
                ref={inputRef}
                type="text"
                placeholder="e.g. Office Supplies"
                value={customInputValue}
                onChange={(e) => setCustomInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveCustom()}
                className="w-full bg-[#090D13] border border-[#1E293B] rounded-xl px-4 py-2.5 font-sans text-sm text-white placeholder-[#64748B] outline-none focus:border-[#CCFF00] transition-colors"
              />
              <div className="flex flex-row justify-end items-center gap-2 mt-2">
                <button 
                  onClick={() => { setIsAddingCustom(false); setCustomInputValue(""); }}
                  className="px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCustom}
                  className="px-5 py-2 bg-[#CCFF00] text-black text-xs font-bold rounded-lg hover:bg-[#bbf000] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.2)] cursor-pointer"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
