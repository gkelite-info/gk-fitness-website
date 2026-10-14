import { TrendUp, UsersThree, ThumbsUp } from "@phosphor-icons/react";
import { TrainerItem } from "../types";

interface TrainerCertsAndPerformanceProps {
  trainer: TrainerItem;
}

export default function TrainerCertsAndPerformance({
  trainer,
}: TrainerCertsAndPerformanceProps) {
  return (
    <div className="flex flex-col gap-5 w-full min-w-0">
      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-4 rounded-full bg-[#D4FF32]" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <div className="bg-[#141B26] border border-[#222E42] rounded-xl p-3.5 flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-[11px] font-black text-[#DC2626] tracking-tighter">
                ACE
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">
                ACE Certified
              </span>
              <span className="text-[10px] text-[#94A3B8] truncate mt-0.5">
                American Council on Exercise
              </span>
            </div>
          </div>

          <div className="bg-[#141B26] border border-[#222E42] rounded-xl p-3.5 flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-[10px] font-black text-[#0284C7] tracking-tighter">
                NASM
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">
                NASM-CPT
              </span>
              <span className="text-[10px] text-[#94A3B8] truncate mt-0.5">
                National Academy of Sports Medicine
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-4 rounded-full bg-[#D4FF32]" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Performance Overview
          </h3>
        </div>

        <div className="bg-[#141B26] border border-[#222E42] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] shrink-0">
              <TrendUp size={16} weight="bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-white">
                {trainer.rating}
              </span>
              <span className="text-[10px] text-[#94A3B8]">
                ({trainer.reviewCount} Reviews)
              </span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-[#222E42]" />

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] shrink-0">
              <UsersThree size={16} weight="bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-white">
                230+
              </span>
              <span className="text-[10px] text-[#94A3B8]">
                Clients Trained
              </span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-[#222E42]" />

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] shrink-0">
              <ThumbsUp size={16} weight="bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-white">
                98%
              </span>
              <span className="text-[10px] text-[#94A3B8]">
                Client Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
