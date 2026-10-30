"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";

interface LoginHeroPanelProps {
  onOpenMobileForm: (e?: React.SyntheticEvent) => void;
}

export default function LoginHeroPanel({ onOpenMobileForm }: LoginHeroPanelProps) {
  return (
    <div className="w-[100vw] lg:w-1/2 h-full relative flex flex-col justify-end p-8 sm:p-12">
      <Image
        src="/images/gk-gym-life-edited.jpg"
        alt="GK - Gym Life Interior"
        fill
        priority
        className="object-cover object-[20%_center] lg:object-center absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0C0D10] via-[#0C0D10]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

      <div className="relative z-20 flex flex-col gap-4">
        <div className="w-16 h-1 bg-[#D4FF32] rounded-full mb-2" />
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          GK - <span className="text-[#D4FF32]">Gym Life.</span>
        </h1>
        <p className="text-[#94A3B8] max-w-md font-medium text-sm sm:text-base">
          The premium management portal for GK - Gym Life. Streamline your operations, track your athletes, and conquer your goals.
        </p>

        <button
          type="button"
          onClick={onOpenMobileForm}
          onTouchEnd={(e) => {
            e.preventDefault();
            onOpenMobileForm(e);
          }}
          className="cursor-pointer lg:hidden mt-8 w-full h-14 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] touch-manipulation z-30"
        >
          Access Portal <ArrowRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}

