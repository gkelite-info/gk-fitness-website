"use client";

import Image from "next/image";
import { useMemo } from "react";
import { MapPin, CalendarBlank, Users, CaretRight, PencilSimple, Trash } from "@phosphor-icons/react";
import { GymItem } from "../gyms/types";
import { useGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import { getGymLogoUrl } from "@/lib/helpers/gym/gymHelper";

interface GymCardProps {
  gym: GymItem;
  onSelect?: (gym: GymItem) => void;
  onEdit?: (gym: GymItem) => void;
  onDelete?: (gym: GymItem) => void;
}

export default function GymCard({ gym, onSelect, onEdit, onDelete }: GymCardProps) {
  const isActive = gym.status === "active";
  const { data: customers = [] } = useGymCustomers(gym.id);

  const activeCount = useMemo(() => {
    if (!customers || customers.length === 0) return gym.activeMembers;
    return customers.filter((c: any) => !c.is_deleted && (c.isActive ?? c.is_Active ?? false)).length;
  }, [customers, gym.activeMembers]);

  const inactiveCount = useMemo(() => {
    if (!customers || customers.length === 0) return gym.inactiveMembers;
    return customers.filter((c: any) => !c.is_deleted && !(c.isActive ?? c.is_Active ?? false)).length;
  }, [customers, gym.inactiveMembers]);

  const totalCount = useMemo(() => {
    if (!customers || customers.length === 0) return gym.totalMembers;
    return customers.filter((c: any) => !c.is_deleted).length;
  }, [customers, gym.totalMembers]);

  const logoUrl = useMemo(() => {
    return getGymLogoUrl(gym.imageUrl);
  }, [gym.imageUrl]);

  return (
    <div className="w-full bg-[#13151D] border border-[#222634] hover:border-[#343B4E] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] min-w-0 overflow-hidden">
      <div>
        <div className="flex items-start gap-3.5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#252A38] bg-[#1B1E28]">
            <Image
              src={logoUrl}
              alt={gym.name}
              fill
              sizes="(max-width: 768px) 64px, 64px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-white font-bold text-base tracking-tight break-words leading-snug">
              {gym.name}
            </h3>

            <div className="flex items-center gap-1.5 text-[#94A3B8] text-xs mt-1">
              <MapPin size={13} weight="bold" className="text-[#64748B] shrink-0" />
              <span className="break-words">
                {gym.city} • {gym.area}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#94A3B8] text-xs mt-1">
              <CalendarBlank size={13} weight="bold" className="text-[#64748B] shrink-0" />
              <span>{gym.since}</span>
            </div>

            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isActive ? "bg-[#D4FF32] shadow-[0_0_8px_#D4FF32]" : "bg-[#EF4444] shadow-[0_0_8px_#EF4444]"
                }`}
              />
              <span
                className={`text-xs font-semibold capitalize ${
                  isActive ? "text-[#D4FF32]" : "text-[#EF4444]"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-[#1C202B] flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              MEMBERS
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Users size={16} weight="fill" className="text-[#94A3B8] shrink-0" />
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                {totalCount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(gym);
                }}
                aria-label={`Edit ${gym.name}`}
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#1A1D27] hover:bg-[#262B3A] border border-[#262C3E] text-[#94A3B8] hover:text-[#D4FF32] hover:border-[#D4FF32]/40 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <PencilSimple size={15} weight="bold" />
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(gym);
                }}
                aria-label={`Delete ${gym.name}`}
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#1A1D27] hover:bg-[#2C1920] border border-[#262C3E] text-[#94A3B8] hover:text-[#EF4444] hover:border-[#EF4444]/40 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Trash size={15} weight="bold" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onSelect?.(gym)}
              aria-label={`View ${gym.name} in ${gym.area}`}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#1A1D27] hover:bg-[#262B3A] border border-[#262C3E] text-[#94A3B8] hover:text-[#D4FF32] hover:border-[#D4FF32]/40 flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs min-w-0">
          <span className="text-[#D4FF32] font-semibold truncate">{activeCount} Active</span>
          <span className="text-[#64748B] shrink-0">•</span>
          <span className="text-[#EF4444] font-medium truncate">{inactiveCount} Inactive</span>
        </div>
      </div>
    </div>
  );
}
