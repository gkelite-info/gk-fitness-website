import { Icon } from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react/dist/ssr";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: Icon;
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function FeatureCard({
  feature,
  isSelected,
  onToggle,
}: FeatureCardProps) {
  const IconComponent = feature.icon;

  return (
    <div
      onClick={() => onToggle(feature.id)}
      className={`box-border flex flex-row justify-between items-center p-3.5 gap-4 h-[62.5px] bg-[#15191F] border border-[#202632] rounded-[12px] cursor-pointer transition-colors hover:border-[#333845] ${
        isSelected ? "border-[#CCFF00]" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-3.5 flex-1 min-w-0">
        <div className="flex flex-row justify-center items-center w-5 h-5 shrink-0 text-white">
          <IconComponent size={20} weight="regular" />
        </div>
        <div className="flex flex-col items-start flex-1 min-w-0">
          <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] flex items-center text-white truncate w-full">
            {feature.title}
          </span>
          <span className="font-['Inter'] font-[400] text-[11px] leading-[16px] flex items-center text-[#7E8796] truncate w-full">
            {feature.description}
          </span>
        </div>
      </div>
      
      <div
        className={`box-border flex flex-col justify-center items-center w-[18px] h-[18px] rounded-[4px] shrink-0 transition-colors ${
          isSelected ? "bg-[#CCFF00] text-black" : "bg-[#000000] border border-[#202632]"
        }`}
      >
        {isSelected && <Check size={12} weight="bold" />}
      </div>
    </div>
  );
}
