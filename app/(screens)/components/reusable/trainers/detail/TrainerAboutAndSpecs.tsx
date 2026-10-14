import { Globe, Barbell, Fire, Lightning, PersonSimpleRun } from "@phosphor-icons/react";
import { TrainerItem } from "../types";

interface TrainerAboutAndSpecsProps {
  trainer: TrainerItem;
}

export default function TrainerAboutAndSpecs({
  trainer,
}: TrainerAboutAndSpecsProps) {
  const firstName = trainer.name.split(" ")[0];

  const specs = [
    { label: "Strength Training", icon: Barbell },
    { label: "Fat Loss", icon: Fire },
    { label: "Muscle Building", icon: Lightning },
    { label: "Functional Training", icon: PersonSimpleRun },
  ];

  return (
    <div className="flex flex-col gap-5 w-full min-w-0">
      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-4 rounded-full bg-[#D4FF32]" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            About {firstName}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          Passionate about helping people become the best version of themselves. Specializes in strength training and muscle building with a focus on technique, consistency and long-term results.
        </p>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-3.5">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-4 rounded-full bg-[#D4FF32]" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Specializations
          </h3>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {specs.map((s) => {
            const Icon = s.icon;
            return (
              <span
                key={s.label}
                className="bg-[#141B26] border border-[#222E42] text-xs font-semibold text-[#CBD5E1] px-3.5 py-2 rounded-xl inline-flex items-center gap-2 shadow-sm"
              >
                <Icon size={14} className="text-[#94A3B8]" />
                {s.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#2A173B] border border-[#52257A] flex items-center justify-center text-[#C084FC] shrink-0 shadow-inner">
          <Globe size={20} weight="bold" />
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          This trainer is a part of the Global Trainer program and is available to all gyms and members across the platform.
        </p>
      </div>
    </div>
  );
}
