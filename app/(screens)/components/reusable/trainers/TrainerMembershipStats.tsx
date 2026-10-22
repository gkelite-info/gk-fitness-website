"use client";

import { Users, CheckCircle, WarningCircle, CurrencyInr } from "@phosphor-icons/react";

interface StatsProps {
  stats: {
    totalClients: number;
    activeCount: number;
    expiringSoonCount: number;
    totalEarnings: number;
  };
}

export default function TrainerMembershipStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#8E8E93] text-xs font-medium uppercase tracking-wider">Total Clients</span>
          <div className="w-8 h-8 rounded-xl bg-[#1C200E] border border-[#3E4C14] flex items-center justify-center">
            <Users size={16} className="text-[#D7FF00]" weight="bold" />
          </div>
        </div>
        <div className="text-white text-2xl font-bold">{stats.totalClients}</div>
      </div>

      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#8E8E93] text-xs font-medium uppercase tracking-wider">Active</span>
          <div className="w-8 h-8 rounded-xl bg-[#132313] border border-[#1E4D2B] flex items-center justify-center">
            <CheckCircle size={16} className="text-[#34C759]" weight="fill" />
          </div>
        </div>
        <div className="text-[#34C759] text-2xl font-bold">{stats.activeCount}</div>
      </div>

      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#8E8E93] text-xs font-medium uppercase tracking-wider">Expiring Soon</span>
          <div className="w-8 h-8 rounded-xl bg-[#2D2012] border border-[#523B19] flex items-center justify-center">
            <WarningCircle size={16} className="text-[#FF9F0A]" weight="fill" />
          </div>
        </div>
        <div className="text-[#FF9F0A] text-2xl font-bold">{stats.expiringSoonCount}</div>
      </div>

      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#8E8E93] text-xs font-medium uppercase tracking-wider">Fees Collected</span>
          <div className="w-8 h-8 rounded-xl bg-[#1C200E] border border-[#3E4C14] flex items-center justify-center">
            <CurrencyInr size={16} className="text-[#D7FF00]" weight="bold" />
          </div>
        </div>
        <div className="text-white text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</div>
      </div>
    </div>
  );
}
