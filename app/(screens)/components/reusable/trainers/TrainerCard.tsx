"use client";

import { Star, Briefcase, CaretRight, Eye, PencilSimple, Trash, CalendarBlank } from "@phosphor-icons/react";
import Avatar from "../Avatar";
import { TrainerItem } from "./types";

interface TrainerCardProps {
  trainer: TrainerItem;
  variant?: "global" | "gym";
  onClick?: (trainer: TrainerItem) => void;
  onView?: (trainer: TrainerItem) => void;
  onEdit?: (trainer: TrainerItem) => void;
  onDelete?: (trainer: TrainerItem) => void;
}

export default function TrainerCard({
  trainer,
  variant = "global",
  onClick,
  onView,
  onEdit,
  onDelete,
}: TrainerCardProps) {
  const isActive = trainer.status === "active";

  if (variant === "gym") {
    return (
      <div
        onClick={() => onClick?.(trainer)}
        className="w-full bg-[#0F141E] border border-[#1C2536] hover:border-[#2A374E] rounded-2xl p-4 sm:p-5 transition-all duration-200 group cursor-pointer shadow-sm"
      >
        <div className="flex sm:hidden flex-col gap-3 w-full">
          <div className="flex items-start justify-between gap-2.5 w-full">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <Avatar
                src={trainer.avatarUrl}
                gender={trainer.gender}
                alt={trainer.name}
                className="w-12 h-12 rounded-full border-2 border-[#222E42] shrink-0 mt-0.5"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white group-hover:text-[#D4FF32] transition-colors leading-tight">
                    {trainer.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                      isActive
                        ? "bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] text-[#10B981]"
                        : "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#D4FF32] mt-1 leading-tight">
                  {trainer.specialization}
                </span>
              </div>
            </div>

            <div className="w-7 h-7 flex items-center justify-center text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5">
              <CaretRight size={17} weight="bold" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#94A3B8]">
            <span className="inline-flex items-center gap-1 font-medium shrink-0 whitespace-nowrap">
              <Star size={13} weight="fill" className="text-[#EAB308]" />
              <strong className="text-white font-semibold">{trainer.rating}</strong>
              <span className="text-[#64748B]">({trainer.reviewCount})</span>
            </span>

            <span className="text-[#334155]">•</span>

            <span className="inline-flex items-center gap-1 font-medium shrink-0 whitespace-nowrap">
              <Briefcase size={13} className="text-[#64748B]" />
              <span>{trainer.experienceYears}+ Years Experience</span>
            </span>
          </div>

          {trainer.skills && trainer.skills.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {trainer.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#141B26] border border-[#222E42] text-[10px] text-[#94A3B8] px-2.5 py-0.5 rounded-md font-medium whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Avatar
              src={trainer.avatarUrl}
              gender={trainer.gender}
              alt={trainer.name}
              className="w-16 h-16 rounded-full border-2 border-[#222E42] shrink-0"
            />

            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white group-hover:text-[#D4FF32] transition-colors leading-snug break-words">
                {trainer.name}
              </h3>

              <span className="text-sm font-semibold text-[#D4FF32] mt-0.5 leading-snug break-words">
                {trainer.specialization}
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-[#94A3B8]">
                <span className="inline-flex items-center gap-1 font-medium shrink-0 whitespace-nowrap">
                  <Star size={13} weight="fill" className="text-[#EAB308]" />
                  <strong className="text-white font-semibold">{trainer.rating}</strong>
                  <span className="text-[#64748B]">({trainer.reviewCount})</span>
                </span>

                <span className="inline-flex items-center gap-1 font-medium shrink-0 whitespace-nowrap">
                  <Briefcase size={13} className="text-[#64748B]" />
                  <span>{trainer.experienceYears}+ Years Experience</span>
                </span>
              </div>

              {trainer.skills && trainer.skills.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  {trainer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#141B26] border border-[#222E42] text-[11px] text-[#94A3B8] px-2.5 py-0.5 rounded-md font-medium whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                isActive
                  ? "bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] text-[#10B981]"
                  : "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>

            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0">
              <CaretRight size={18} weight="bold" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick?.(trainer)}
      className="bg-[#0F141E] border border-[#1C2536] hover:border-[#2A374E] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 transition-all duration-200 group shadow-sm"
    >
      <div className="flex items-start justify-between gap-2.5 sm:gap-3 w-full">
        <div className="flex items-start gap-3 sm:gap-3.5 flex-1 min-w-0">
          <Avatar
            src={trainer.avatarUrl}
            gender={trainer.gender}
            alt={trainer.name}
            className="w-12 h-12 rounded-full border border-[#222E42] shrink-0 mt-0.5"
          />

          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4FF32] transition-colors leading-snug break-words">
              {trainer.name}
            </h3>

            <span className="text-xs font-semibold text-[#D4FF32] mt-0.5 leading-snug break-words">
              {trainer.specialization}
            </span>

            <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 mt-1.5 text-xs text-[#94A3B8]">
              <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Star size={13} weight="fill" className="text-[#EAB308]" />
                <strong className="text-white font-semibold">{trainer.rating}</strong>
                <span className="text-[#64748B]">({trainer.reviewCount})</span>
              </span>

              <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
                <CalendarBlank size={13} className="text-[#94A3B8]" />
                <span>{trainer.experienceYears}+ Years</span>
              </span>
            </div>

            {trainer.sourceType === "gym" || trainer.gymName ? (
              <div className="flex flex-col mt-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  FROM GYM
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 leading-tight">
                  {trainer.gymName || "Gold Fitness"}
                </span>
              </div>
            ) : (
              <div className="mt-2.5 text-xs text-[#94A3B8]">
                Added Directly
              </div>
            )}
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 ${
            isActive
              ? "bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.3)] text-[#10B981]"
              : "bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-[#1C2536] flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {trainer.skills?.map((skill) => (
            <span
              key={skill}
              className="bg-[#141B26] border border-[#222E42] text-[11px] text-[#94A3B8] px-2.5 py-1 rounded-md font-medium whitespace-nowrap"
            >
              {skill}
            </span>
          ))}

          {trainer.extraSkillsCount !== undefined && trainer.extraSkillsCount > 0 && (
            <span className="bg-[#141B26] border border-[#222E42] text-[11px] text-[#94A3B8] px-2.5 py-1 rounded-md font-medium">
              +{trainer.extraSkillsCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(trainer);
            }}
            title="View Details"
            aria-label="View Details"
            className="w-8 h-8 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(trainer);
            }}
            title="Edit Trainer"
            aria-label="Edit Trainer"
            className="w-8 h-8 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <PencilSimple size={16} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(trainer);
            }}
            title="Delete Trainer"
            aria-label="Delete Trainer"
            className="w-8 h-8 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#EF4444] hover:bg-[#2A1417] hover:border-[#EF4444] transition-colors cursor-pointer"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
