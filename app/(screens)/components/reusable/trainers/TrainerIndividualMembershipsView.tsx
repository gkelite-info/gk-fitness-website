"use client";

import { MagnifyingGlass, ArrowsClockwise, Users } from "@phosphor-icons/react";
import { useState, useTransition } from "react";
import TrainerMembershipStats from "./TrainerMembershipStats";
import TrainerClientRow from "./TrainerClientRow";
import {
  TrainerClientsResponse,
  getTrainerIndividualClients,
} from "@/app/actions/trainer/getTrainerIndividualClients";

interface ViewProps {
  initialData: TrainerClientsResponse;
}

export default function TrainerIndividualMembershipsView({ initialData }: ViewProps) {
  const [data, setData] = useState<TrainerClientsResponse>(initialData);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "expiring" | "pending" | "expired">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (filter: "all" | "active" | "expiring" | "pending" | "expired") => {
    setActiveFilter(filter);
    startTransition(async () => {
      const res = await getTrainerIndividualClients(filter, searchQuery);
      setData(res);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    startTransition(async () => {
      const res = await getTrainerIndividualClients(activeFilter, val);
      setData(res);
    });
  };

  const handleRefresh = () => {
    startTransition(async () => {
      const res = await getTrainerIndividualClients(activeFilter, searchQuery);
      setData(res);
    });
  };

  const filters = [
    { key: "all", label: "All Clients" },
    { key: "active", label: `Active (${data.stats.activeCount})` },
    { key: "expiring", label: `Expiring Soon (${data.stats.expiringSoonCount})` },
    { key: "pending", label: "Pending Review" },
    { key: "expired", label: "Expired" },
  ] as const;

  return (
    <div className="flex flex-col">
      <TrainerMembershipStats stats={data.stats} />

      <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-white text-lg font-bold">Individual Customer Memberships</h2>
            <p className="text-[#8E8E93] text-xs mt-0.5">
              Assigned clients from individual_customer_trainers & coaching subscriptions
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 md:w-64">
              <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
              <input
                type="text"
                placeholder="Search client by name or phone..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-[#1C1C1E] border border-[#2A2A2A] rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#D7FF00]/60 transition-colors"
              />
            </div>

            <button
              onClick={handleRefresh}
              disabled={isPending}
              className="p-2.5 bg-[#1C1C1E] border border-[#2A2A2A] hover:border-[#D7FF00]/40 rounded-xl text-[#8E8E93] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Client Memberships"
            >
              <ArrowsClockwise size={16} className={isPending ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === f.key
                  ? "bg-[#D7FF00] text-black shadow-md shadow-[#D7FF00]/10"
                  : "bg-[#1C1C1E] border border-[#2A2A2A] text-[#8E8E93] hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {data.clients.length === 0 ? (
          <div className="py-14 text-center border border-dashed border-[#262626] rounded-2xl">
            <Users size={36} className="mx-auto text-[#444444] mb-3" />
            <h3 className="text-white text-sm font-semibold mb-1">No Client Memberships Found</h3>
            <p className="text-[#8E8E93] text-xs max-w-sm mx-auto">
              {searchQuery
                ? `No clients matched "${searchQuery}". Try a different keyword.`
                : "No individual customer assignments found for this filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left hidden md:table">
              <thead>
                <tr className="border-b border-[#222222] text-[#8E8E93] text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Client Name</th>
                  <th className="py-3 px-4 font-semibold">Schedule & Days</th>
                  <th className="py-3 px-4 font-semibold">Assigned & Expiry</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Fee / Month</th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client) => (
                  <TrainerClientRow key={client.individualCustomerTrainerId} client={client} />
                ))}
              </tbody>
            </table>

            <div className="md:hidden">
              {data.clients.map((client) => (
                <TrainerClientRow key={client.individualCustomerTrainerId} client={client} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
