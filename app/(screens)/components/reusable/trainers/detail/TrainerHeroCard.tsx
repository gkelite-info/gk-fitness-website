import {
  Star,
  Briefcase,
  Globe,
  Phone,
  MapPin,
  EnvelopeSimple,
  CalendarBlank,
  CalendarCheck,
  Translate,
} from "@phosphor-icons/react";
import Avatar from "../../Avatar";
import { TrainerItem } from "../types";

interface TrainerHeroCardProps {
  trainer: TrainerItem;
}

export default function TrainerHeroCard({ trainer }: TrainerHeroCardProps) {
  const trainerEmail = `${trainer.name.toLowerCase().replace(/\s+/g, ".")}@gym.com`;

  return (
    <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col xl:flex-row justify-between items-start gap-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 min-w-0 flex-1 w-full sm:w-auto">
        <div className="relative shrink-0 self-center sm:self-auto mb-2 sm:mb-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[#222E42] shadow-md bg-[#141B26]">
            <Avatar
              src={trainer.avatarUrl}
              gender={trainer.gender}
              alt={trainer.name}
              shape="rounded"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#10B981] text-black font-extrabold text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full shadow-md whitespace-nowrap z-10">
            ACTIVE
          </span>
        </div>

        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight break-words">
            {trainer.name}
          </h2>

          <span className="text-xs sm:text-sm font-semibold text-[#94A3B8]">
            {trainer.specialization}
          </span>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#94A3B8] flex-wrap mt-0.5">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <Star size={13} weight="fill" className="text-[#EAB308]" />
              {trainer.rating}
            </span>
            <span className="text-[#475569]">•</span>
            <span className="inline-flex items-center gap-1">
              <Briefcase size={13} className="text-[#64748B]" />
              {trainer.experienceYears}+ Years Experience
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <span className="bg-[#2A173B] border border-[#52257A] text-[#C084FC] text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Globe size={13} weight="bold" />
              Global Trainer
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#64748B] mt-1">
            Available across all gyms on the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 w-full xl:w-auto xl:min-w-[420px] pt-4 xl:pt-0 border-t xl:border-t-0 border-[#1C2536] text-xs text-[#CBD5E1]">
        <div className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#64748B] shrink-0">
            <Phone size={14} />
          </div>
          <span className="truncate font-medium">+91 98765 43210</span>
        </div>

        <div className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#64748B] shrink-0">
            <MapPin size={14} />
          </div>
          <span className="truncate font-medium">Bangalore, Karnataka</span>
        </div>

        <div className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#64748B] shrink-0">
            <EnvelopeSimple size={14} />
          </div>
          <span className="truncate font-medium">{trainerEmail}</span>
        </div>

        <div className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#64748B] shrink-0">
            <CalendarBlank size={14} />
          </div>
          <span className="truncate font-medium">{trainer.experienceYears}+ Years Experience</span>
        </div>

        <div className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#64748B] shrink-0">
            <CalendarCheck size={14} />
          </div>
          <span className="truncate font-medium">Joined on 12 Jan 2023</span>
        </div>

        <div className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#141B26] border border-[#222E42] flex items-center justify-center text-[#64748B] shrink-0">
            <Translate size={14} />
          </div>
          <span className="truncate font-medium">English, Hindi</span>
        </div>
      </div>
    </div>
  );
}
