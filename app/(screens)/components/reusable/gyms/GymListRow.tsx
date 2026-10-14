"use client";

import Image from "next/image";
import { useMemo } from "react";
import { MapPin, CalendarBlank, Users, CaretRight, PencilSimple, Trash } from "@phosphor-icons/react";
import { GymItem } from "./types";
import { useGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import { getGymLogoUrl } from "@/lib/helpers/gym/gymHelper";

interface GymListRowProps {
  gym: GymItem;
  onSelect?: (gym: GymItem) => void;
  onEdit?: (gym: GymItem) => void;
  onDelete?: (gym: GymItem) => void;
}

export default function GymListRow({ gym, onSelect, onEdit, onDelete }: GymListRowProps) {
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
    <div className="w-full bg-[#13151D] border border-[#222634] hover:border-[#343B4E] rounded-xl p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 group hover:shadow-lg min-w-0 overflow-hidden">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#252A38] bg-[#1B1E28]">
          <Image
            src={logoUrl}
            alt={gym.name}
            fill
            sizes="48px"
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-white font-bold text-sm sm:text-base break-words">
            {gym.name} - {gym.area}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#94A3B8] mt-1.5">
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-[#64748B] shrink-0" />
              <span className="break-words">{gym.city}</span>
            </span>
            <span className="flex items-center gap-1">
              <CalendarBlank size={13} className="text-[#64748B] shrink-0" />
              <span>{gym.since}</span>
            </span>
            <div className="flex items-center gap-1.5">
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

      <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#1C202B] min-w-0 w-full md:w-auto">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <Users size={18} weight="fill" className="text-[#94A3B8] shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white leading-none">
              {totalCount.toLocaleString()} Members
            </span>
            <div className="flex items-center gap-1.5 text-[11px] mt-1 min-w-0">
              <span className="text-[#D4FF32] font-semibold truncate">{activeCount} Active</span>
              <span className="text-[#64748B] shrink-0">•</span>
              <span className="text-[#EF4444] font-medium truncate">{inactiveCount} Inactive</span>
            </div>
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
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg bg-[#1A1D27] hover:bg-[#262B3A] border border-[#262C3E] text-[#94A3B8] hover:text-[#D4FF32] flex items-center justify-center transition-all cursor-pointer active:scale-95"
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
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg bg-[#1A1D27] hover:bg-[#2C1920] border border-[#262C3E] text-[#94A3B8] hover:text-[#EF4444] flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <Trash size={15} weight="bold" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onSelect?.(gym)}
            aria-label={`View details for ${gym.name}`}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg bg-[#1A1D27] hover:bg-[#262B3A] border border-[#262C3E] text-[#94A3B8] hover:text-[#D4FF32] flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
