import { LockKey } from "@phosphor-icons/react";

export default function AccountInfoSection() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
        <LockKey size={15} weight="bold" />
        <span>ACCOUNT INFORMATION</span>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="bg-[#141B26] border border-[#222E42] rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] shrink-0">
            <LockKey size={16} weight="bold" />
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Login credentials will be generated automatically and shared with the trainer via the provided email address upon creation.
          </p>
        </div>
      </div>
    </div>
  );
}
