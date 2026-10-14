import { Check } from "@phosphor-icons/react";

interface GymSuccessHeaderProps {
  isEdit: boolean;
}

export default function GymSuccessHeader({ isEdit }: GymSuccessHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center shrink-0">
      <div className="relative mb-3 sm:mb-4">
        <div className="absolute inset-0 rounded-full bg-[#D4FF32] opacity-25 blur-xl pointer-events-none" />
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#18260F] border-2 border-[#D4FF32] text-[#D4FF32] flex items-center justify-center shadow-[0_0_30px_rgba(212,255,50,0.35)]">
          <Check size={28} weight="bold" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
        {isEdit ? "Gym Updated Successfully!" : "Gym Registered Successfully!"}
      </h2>

      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mt-1.5 leading-relaxed">
        {isEdit
          ? "The gym and owner account details have been updated and are now active on the platform."
          : "The gym and owner account have been created and are now active on the platform."}
      </p>
    </div>
  );
}
