"use client";

import { useState } from "react";
import { X } from "@phosphor-icons/react";
import { GymItem } from "./types";

interface AddGymModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newGym: GymItem) => void;
}

export default function AddGymModal({ isOpen, onClose, onAdd }: AddGymModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("Hyderabad, India");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [members, setMembers] = useState(250);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !area.trim()) return;

    const activeMembers = Math.round(members * 0.88);
    const inactiveMembers = members - activeMembers;

    const newGym: GymItem = {
      id: `gym-${Date.now()}`,
      name: name.trim(),
      city: city.trim(),
      area: area.trim(),
      since: `Since ${new Date().toLocaleString("default", { month: "short" })} ${new Date().getFullYear()}`,
      status,
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",
      totalMembers: members,
      activeMembers,
      inactiveMembers,
    };

    onAdd(newGym);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#13151D] border border-[#222634] rounded-2xl shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#94A3B8] hover:text-white transition-colors"
        >
          <X size={20} weight="bold" />
        </button>

        <h2 className="text-xl font-bold text-white mb-1">Add New Gym</h2>
        <p className="text-xs text-[#94A3B8] mb-5">
          Register a new gym branch to the platform
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Gym Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gold Fitness"
              className="w-full h-10 px-3.5 rounded-xl bg-[#181B24] border border-[#262C3E] text-sm text-white focus:outline-none focus:border-[#D4FF32]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                City / Region
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#181B24] border border-[#262C3E] text-sm text-white focus:outline-none focus:border-[#D4FF32]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                Area / Branch
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Jubilee Hills"
                className="w-full h-10 px-3.5 rounded-xl bg-[#181B24] border border-[#262C3E] text-sm text-white focus:outline-none focus:border-[#D4FF32]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                Initial Members
              </label>
              <input
                type="number"
                min="0"
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl bg-[#181B24] border border-[#262C3E] text-sm text-white focus:outline-none focus:border-[#D4FF32]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                className="w-full h-10 px-3 rounded-xl bg-[#181B24] border border-[#262C3E] text-sm text-white focus:outline-none focus:border-[#D4FF32]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#1C202B]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4FF32] text-black text-xs font-bold hover:bg-[#c2ed28] transition-all"
            >
              Add Gym
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
