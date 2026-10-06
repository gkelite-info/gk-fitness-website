"use client";
import { Camera, TextT, Cube, ChatText, Image as ImageIcon } from "@phosphor-icons/react";

interface AddEquipmentPreviewProps {
  equipmentName: string;
  imagePreview: string | null;
}

export default function AddEquipmentPreview({ equipmentName, imagePreview }: AddEquipmentPreviewProps) {
  
  const displayName = equipmentName.trim() || "Treadmill";

  return (
    <div className="flex flex-col items-start gap-6 w-full h-full">
      <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#151719] border border-[#22252B] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] h-full flex-1">
        <div className="flex flex-col items-start gap-0.5 w-full">
          <h2 className="font-sans font-semibold text-base leading-6 text-white">
            Equipment Preview
          </h2>
          <p className="font-sans font-normal text-xs leading-4 text-[#8E929B]">
            This is how your equipment will appear in the inventory list after saving.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center p-6 w-full h-full min-h-[250px] bg-[#111215] border border-[#1F2229] rounded-2xl">
          {imagePreview ? (
            <div 
              className="w-[176px] h-[176px] rounded-full border border-[#1F2937] mb-3 bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${imagePreview})` }}
            />
          ) : (
            <div className="flex justify-center items-center w-[176px] h-[176px] rounded-full bg-[#151719] border border-[#1F2937] mb-3 shrink-0">
              <ImageIcon size={48} className="text-[#334155]" />
            </div>
          )}
          <h3 className="font-sans font-semibold text-lg text-white mb-1 mt-2">
            {displayName}
          </h3>
          <span className="font-sans font-normal text-xs leading-4 text-[#8E929B] text-center px-2">
            {imagePreview ? "This is how your equipment will appear." : "Upload an image and add details to see a preview here."}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start p-6 sm:p-7 gap-5 w-full bg-[#151719] border border-[#22252B] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <h3 className="font-sans font-semibold text-sm leading-5 text-white">
          Tips for a great listing
        </h3>
        
        <div className="flex flex-col items-start gap-5 w-full mt-1">
          <div className="flex flex-row items-center gap-4 w-full">
            <div className="flex justify-center items-center w-10 h-10 bg-[#1D2025] border border-[#2B2F38] rounded-xl shrink-0 shadow-sm">
              <Camera size={18} className="text-[#D4F400]" />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <h4 className="font-sans font-semibold text-[13px] leading-[16px] text-white">
                Use a clear, well-lit image
              </h4>
              <p className="font-sans font-normal text-[11.5px] leading-4 text-[#8E929B]">
                Helps with easy identification in your inventory.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 w-full">
            <div className="flex justify-center items-center w-10 h-10 bg-[#1D2025] border border-[#2B2F38] rounded-xl shrink-0 shadow-sm">
              <div className="flex justify-center items-center bg-[#D4F401] rounded-[4px] p-0.5">
                <TextT size={14} weight="bold" className="text-black" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <h4 className="font-sans font-semibold text-[13px] leading-[16px] text-white">
                Be specific with the name
              </h4>
              <p className="font-sans font-normal text-[11.5px] leading-4 text-[#8E929B]">
                Use a clear and recognizable name.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 w-full">
            <div className="flex justify-center items-center w-10 h-10 bg-[#1D2025] border border-[#2B2F38] rounded-xl shrink-0 shadow-sm">
              <Cube size={18} className="text-[#D4F400]" />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <h4 className="font-sans font-semibold text-[13px] leading-[16px] text-white">
                Add the correct quantity
              </h4>
              <p className="font-sans font-normal text-[11.5px] leading-4 text-[#8E929B]">
                Keep your inventory accurate.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 w-full">
            <div className="flex justify-center items-center w-10 h-10 bg-[#1D2025] border border-[#2B2F38] rounded-xl shrink-0 shadow-sm">
              <div className="flex justify-center items-center bg-[#D4F401] rounded-[4px] p-0.5">
                <ChatText size={14} weight="fill" className="text-black" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <h4 className="font-sans font-semibold text-[13px] leading-[16px] text-white">
                Include relevant notes
              </h4>
              <p className="font-sans font-normal text-[11.5px] leading-4 text-[#8E929B]">
                Mention brand, model, condition, or any other details.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
