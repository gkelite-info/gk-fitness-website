"use client";

import { X } from "@phosphor-icons/react";
import { usePastGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import CustomersGrid, { Customer } from "./CustomersGrid";

interface PastCustomersModalProps {
  gymId: string;
  onClose: () => void;
}

export default function PastCustomersModal({ gymId, onClose }: PastCustomersModalProps) {
  const { data: pastCustomers, isLoading, isError } = usePastGymCustomers(gymId);

  const mappedCustomers: Customer[] = (pastCustomers || []).map((item: any) => {
    const joinedDate = item.createdAt ? new Date(item.createdAt) : null;
    const deletedDate = item.deletedAt ? new Date(item.deletedAt) : null;

    return {
      id: item.customerId,
      name: item.fullName || "Unknown",
      status: "Inactive",
      phone: item.phone || "No phone",
      plan: "N/A",
      joinedDate: joinedDate ? joinedDate.toLocaleDateString('en-GB') : "N/A",
      validTill: deletedDate ? `Left on ${deletedDate.toLocaleDateString('en-GB')}` : "N/A",
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#121417] border border-[#262B32] rounded-[24px] shadow-2xl flex flex-col overflow-hidden">
        <div className="flex flex-row items-center justify-between px-6 py-5 border-b border-[#262B32] bg-[#15181C]">
          <h2 className="font-sans font-bold text-[18px] text-white">
            Past Customers
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1B1F24] border border-[#262B32] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D2F829] hover:bg-[rgba(210,248,41,0.05)] transition-all cursor-pointer"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D2F829]"></div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <p className="text-[#F43F5E] text-sm">Failed to load past customers</p>
            </div>
          ) : mappedCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <p className="text-[#94A3B8] text-sm font-medium">No past customers found</p>
            </div>
          ) : (
            <CustomersGrid customers={mappedCustomers} />
          )}
        </div>
      </div>
    </div>
  );
}
