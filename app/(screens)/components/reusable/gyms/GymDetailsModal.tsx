"use client";

import Image from "next/image";
import { X, MapPin, CalendarBlank, Users, Phone, Envelope } from "@phosphor-icons/react";
import { GymItem } from "./types";

interface GymDetailsModalProps {
  gym: GymItem | null;
  onClose: () => void;
}

export default function GymDetailsModal({ gym, onClose }: GymDetailsModalProps) {
  if (!gym) return null;

  const isActive = gym.status === "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#13151D] border border-[#222634] rounded-2xl shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#94A3B8] hover:text-white transition-colors"
        >
          <X size={20} weight="bold" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#262C3E]">
            <Image
              src={gym.imageUrl}
              alt={gym.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white truncate">{gym.name}</h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  isActive ? "bg-[#1E2713] text-[#D4FF32]" : "bg-red-950 text-red-400"
                }`}
              >
                {gym.status}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mt-1">
              <MapPin size={14} className="text-[#64748B]" />
              <span>{gym.city} • {gym.area}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mt-0.5">
              <CalendarBlank size={14} className="text-[#64748B]" />
              <span>{gym.since}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#171A24] border border-[#202534] mb-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Total</span>
            <span className="text-lg font-extrabold text-white mt-0.5">
              {gym.totalMembers}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Active</span>
            <span className="text-lg font-extrabold text-[#D4FF32] mt-0.5">
              {gym.activeMembers}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Inactive</span>
            <span className="text-lg font-extrabold text-[#EF4444] mt-0.5">
              {gym.inactiveMembers}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-xs text-[#94A3B8] mb-6">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#64748B]" />
            <span>{gym.phone || "+91 98765 43210"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Envelope size={14} className="text-[#64748B]" />
            <span>{gym.email || "support@gkfitness.in"}</span>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#D4FF32] text-black text-xs font-bold hover:bg-[#c2ed28]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
