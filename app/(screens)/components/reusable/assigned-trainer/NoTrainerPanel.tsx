"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import Avatar from "./../Avatar";

export default function NoTrainerPanel() {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 w-full bg-[#15181E] border border-[#212630] rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] min-h-[460px] h-full gap-8 relative overflow-hidden flex-1">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100px] w-[288px] h-[288px] bg-[rgba(204,255,0,0.05)] blur-[32px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-[384px]">
        
        <div className="relative flex justify-center items-center w-[96px] h-[96px] sm:w-[128px] sm:h-[128px] rounded-full shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] bg-[#1E232C] border border-[#2C3342]">
          <Avatar className="w-[96px] h-[96px] sm:w-[128px] sm:h-[128px] text-[#3B4352]" />
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="font-sans font-[800] text-[24px] sm:text-[30px] leading-[30px] sm:leading-[36px] tracking-[-0.5px] sm:tracking-[-0.75px] text-white m-0">
            No Trainer Assigned
          </h2>
          <p className="font-sans font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#9CA3AF] m-0 max-w-[364px]">
            This member doesn't have a trainer assigned yet.
          </p>
        </div>

        <button className="flex flex-row items-center justify-center gap-[8px] w-full max-w-[384px] h-[48px] sm:h-[56px] px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] bg-[#CCFF00] hover:bg-[#bce600] rounded-[14px] sm:rounded-[16px] transition-all cursor-pointer shadow-[0px_0px_20px_rgba(204,255,0,0.2)] sm:shadow-[0px_0px_25px_rgba(204,255,0,0.3)] mt-2">
          <Plus size={18} className="text-black sm:hidden" weight="bold" />
          <Plus size={20} className="text-black hidden sm:block" weight="bold" />
          <span className="font-sans font-[800] text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-black">
            Assign Trainer
          </span>
        </button>

      </div>
    </div>
  );
}
