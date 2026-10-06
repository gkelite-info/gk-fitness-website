"use client";
import { Copy, CalendarBlank } from "@phosphor-icons/react";
import { toast } from "react-hot-toast";

interface EquipmentProfileProps {
  equipment: any;
}

export default function EquipmentProfile({ equipment }: EquipmentProfileProps) {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(equipment.gymInventoryId);
    toast.success("ID copied to clipboard!");
  };

  return (
    <div className="flex flex-col sm:flex-row items-start p-6 gap-6 w-full bg-[#12171E] border border-[#1D2633] shadow-sm rounded-2xl">
      <div 
        className="w-full sm:w-[192px] h-[192px] sm:h-[144px] bg-[#1F2937] rounded-xl shrink-0 bg-cover bg-center ring-1 ring-[#1F2937]"
        style={{ backgroundImage: `url(${equipment.image || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'})` }}
      />
      <div className="flex flex-col items-start pt-1 gap-3 w-full flex-1">
        <div className="flex flex-row items-center gap-3">
          <h2 className="font-sans font-bold text-2xl leading-8 tracking-[-0.6px] text-white">
            {equipment.equipmentName}
          </h2>
          {equipment.is_Active !== false ? (
            <div className="flex flex-row items-center px-2.5 py-0.5 bg-[#1A2D16] border border-[#23451E] rounded-md">
              <span className="font-sans font-semibold text-xs leading-4 text-[#69DB3B]">
                Active
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center px-2.5 py-0.5 bg-[#2D1616] border border-[#451E1E] rounded-md">
              <span className="font-sans font-semibold text-xs leading-4 text-[#DB3B3B]">
                Inactive
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="font-sans font-normal text-sm leading-5 text-[#8C9BA9]">
            ID: {equipment.gymInventoryId}
          </span>
          <button 
            onClick={handleCopy}
            className="flex justify-center items-center w-5 h-5 rounded hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Copy size={16} className="text-[#657588] hover:text-white transition-colors" />
          </button>
        </div>
        <div className="flex flex-row items-center pt-1 gap-2">
          <CalendarBlank size={16} className="text-[#758496]" />
          <span className="font-sans font-normal text-sm leading-5 text-[#7E8B9B]">
            Purchase Date {new Date(equipment.purchaseDate).toLocaleDateString()}
          </span>
        </div>

      </div>

    </div>
  );
}
