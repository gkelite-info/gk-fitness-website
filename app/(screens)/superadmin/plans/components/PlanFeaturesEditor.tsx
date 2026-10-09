"use client";

import { useState } from "react";
import { Plus, CheckCircle, X } from "@phosphor-icons/react";

interface PlanFeaturesEditorProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
  initialSuggestions: string[];
}

export default function PlanFeaturesEditor({
  selectedFeatures,
  onChange,
  initialSuggestions,
}: PlanFeaturesEditorProps) {
  const startingSuggestions = initialSuggestions.filter(
    (s) => !selectedFeatures.includes(s)
  );
  
  const [suggestions, setSuggestions] = useState<string[]>(startingSuggestions);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customFeatureText, setCustomFeatureText] = useState("");

  const handleAddFeature = (feature: string) => {
    if (!selectedFeatures.includes(feature)) {
      onChange([...selectedFeatures, feature]);
    }
    setSuggestions(suggestions.filter((s) => s !== feature));
  };

  const handleRemoveFeature = (feature: string) => {
    onChange(selectedFeatures.filter((f) => f !== feature));
    if (initialSuggestions.includes(feature) && !suggestions.includes(feature)) {
      setSuggestions([feature, ...suggestions]);
    }
  };

  const handleSaveCustomFeature = () => {
    const trimmed = customFeatureText.trim();
    if (trimmed && !selectedFeatures.includes(trimmed)) {
      onChange([...selectedFeatures, trimmed]);
    }
    setCustomFeatureText("");
    setIsAddingCustom(false);
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-[14px] font-medium text-white">Features</h3>
        <span className="text-[10px] font-medium text-[#BBF246]">Suggestions</span>
      </div>

      {isAddingCustom && (
        <div className="flex items-center w-full bg-[#1A2029] border border-[#BBF246] rounded-lg px-3 py-2 transition-colors shadow-[0_0_8px_rgba(187,242,70,0.15)]">
          <input
            type="text"
            autoFocus
            value={customFeatureText}
            onChange={(e) => setCustomFeatureText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveCustomFeature();
              if (e.key === 'Escape') {
                setIsAddingCustom(false);
                setCustomFeatureText("");
              }
            }}
            placeholder="Type feature..."
            className="flex-1 min-w-0 bg-transparent text-xs text-white placeholder-[#6B7280] focus:outline-none"
          />
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
            <button 
              onClick={handleSaveCustomFeature}
              className="cursor-pointer text-xs font-semibold text-[#BBF246] hover:text-[#c5f55e] transition-colors"
            >
              Save
            </button>
            <button 
              onClick={() => {
                setIsAddingCustom(false);
                setCustomFeatureText("");
              }}
              className="cursor-pointer px-2 py-1 rounded hover:bg-[#303744]/50 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedFeatures.length > 0 && (
        <div className="flex flex-col gap-2">
          {selectedFeatures.map((feature, idx) => (
            <div key={`sel-${idx}`} className="flex items-center justify-between w-full bg-[#1A2029] border border-[#232B36] rounded-lg px-3 py-2.5 transition-all">
              <div className="flex items-center gap-2.5">
                <CheckCircle size={16} weight="fill" className="text-[#BBF246]" />
                <span className="text-[11.5px] font-normal text-white">{feature}</span>
              </div>
              <button 
                onClick={() => handleRemoveFeature(feature)}
                className="cursor-pointer text-[#6B7280] hover:text-red-400 transition-colors p-1 rounded-full hover:bg-[#303744]"
              >
                <X size={12} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion, idx) => (
            <div key={`sug-${idx}`} className="flex items-center justify-between w-full bg-[#1A2029] border border-[#232B36] rounded-lg px-3 py-2.5 transition-all hover:border-[#303744]">
              <span className="text-[11.5px] font-normal text-[#9CA3AF]">{suggestion}</span>
              <button 
                onClick={() => handleAddFeature(suggestion)}
                className="cursor-pointer flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#222A35] hover:bg-[#2A3441] border border-[#303744] text-[#9CA3AF] hover:text-white transition-colors"
              >
                <Plus size={10} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isAddingCustom && (
        <button 
          onClick={() => setIsAddingCustom(true)}
          className="cursor-pointer self-start flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-[#BBF246]/40 rounded-[6px] text-[#BBF246] hover:bg-[#BBF246]/10 transition-colors text-[10.5px] font-medium mt-1"
        >
          <Plus size={10} weight="bold" />
          Add Another Feature
        </button>
      )}
    </div>
  );
}
