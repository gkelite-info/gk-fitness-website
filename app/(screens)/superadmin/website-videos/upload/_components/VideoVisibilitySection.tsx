"use client";

interface VideoVisibilitySectionProps {
  isVisible: boolean;
  onToggle: (val: boolean) => void;
}

export function VideoVisibilitySection({
  isVisible,
  onToggle,
}: VideoVisibilitySectionProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-[#1C2333]">
      <div className="flex flex-col gap-0.5">
        <h4 className="text-sm sm:text-base font-semibold text-white m-0">
          Visible on Website
        </h4>
        <p className="text-xs sm:text-sm text-[#94A3B8] m-0 font-normal">
          When enabled, this video will be displayed on the GK-Gym Life website.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isVisible}
        onClick={() => onToggle(!isVisible)}
        className={`cursor-pointer relative inline-flex h-7 w-13 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isVisible ? "bg-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.4)]" : "bg-[#222938]"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-black shadow-md ring-0 transition duration-200 ease-in-out ${
            isVisible ? "translate-x-6 bg-white" : "translate-x-0 bg-[#64748B]"
          }`}
        />
      </button>
    </div>
  );
}
