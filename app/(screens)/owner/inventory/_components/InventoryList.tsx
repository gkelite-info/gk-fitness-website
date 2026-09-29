"use client";
import { useState } from "react";
import { Eye, PencilSimple, Trash } from "@phosphor-icons/react";
import Pagination from "../../../components/reusable/Pagination";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/reusable/ConfirmationModal";

const equipmentData = [
  {
    id: "EQ-001",
    name: "Treadmill",
    updatedAt: "Today, 09:20 AM",
    totalUnits: 5,
    available: 4,
    underMaint: 1,
    outOfService: 0,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "EQ-002",
    name: "Adjustable Bench",
    updatedAt: "Today, 08:46 AM",
    totalUnits: 10,
    available: 8,
    underMaint: 1,
    outOfService: 1,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "EQ-003",
    name: "Cable Crossover",
    updatedAt: "Yesterday, 06:30 PM",
    totalUnits: 2,
    available: 2,
    underMaint: 0,
    outOfService: 0,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "EQ-004",
    name: "Spin Bike",
    updatedAt: "Today, 10:15 AM",
    totalUnits: 6,
    available: 5,
    underMaint: 1,
    outOfService: 0,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function InventoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const totalItems = 128;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success("Equipment deleted successfully!");
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="flex flex-col items-start w-full gap-4">
      <h3 className="font-sans font-bold text-[18.6px] leading-[29px] tracking-[-0.46px] text-white">
        All Equipment
      </h3>
      <div className="flex flex-col items-start w-full gap-4">
        {equipmentData.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col xl:flex-row xl:items-center justify-between p-4 gap-6 w-full bg-[#121720] border border-[#1C2430] rounded-2xl"
          >
            <div className="flex flex-row items-center gap-4 w-full xl:w-auto xl:min-w-[270px]">
              <div 
                className="w-[116px] h-[83px] bg-[#1F2937] rounded-xl shrink-0 bg-cover bg-center ring-1 ring-[#1F2937]"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="flex flex-col items-start gap-0.5">
                <h4 className="font-sans font-semibold text-[16.6px] leading-[25px] text-white">
                  {item.name}
                </h4>
                <span className="font-mono font-normal text-[12.4px] leading-[17px] text-[#64748B]">
                  ID: {item.id}
                </span>
                <div className="flex flex-row items-center gap-1.5 mt-1">
                  <span className="font-sans font-normal text-[12.4px] leading-[17px] text-[#94A3B8]">
                    Last updated: {item.updatedAt}
                  </span>
                </div>
              </div>
            </div>
            {/* Right Side: Stats & Actions */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full xl:flex-1 gap-4 xl:gap-6 mt-4 xl:mt-0 pt-4 xl:pt-0 border-t border-[#1E2632] xl:border-none">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full xl:flex-1">
                <div className="flex flex-col items-start xl:items-center gap-0.5">
                  <span className="font-sans font-medium text-[11px] leading-[15px] text-[#64748B] uppercase tracking-wider">
                    Total Units
                  </span>
                  <span className="font-sans font-semibold text-[15px] leading-5 text-white">
                    {item.totalUnits}
                  </span>
                </div>

                <div className="flex flex-col items-start xl:items-center gap-0.5">
                  <span className="font-sans font-medium text-[11px] leading-[15px] text-[#64748B] uppercase tracking-wider">
                    Available
                  </span>
                  <span className="font-sans font-semibold text-[15px] leading-5 text-[#22C55E]">
                    {item.available}
                  </span>
                </div>

                <div className="flex flex-col items-start xl:items-center gap-0.5">
                  <span className="font-sans font-medium text-[11px] leading-[15px] text-[#64748B] uppercase tracking-wider whitespace-nowrap">
                    Under Maint.
                  </span>
                  <span className="font-sans font-semibold text-[15px] leading-5 text-[#F59E0B]">
                    {item.underMaint}
                  </span>
                </div>

                <div className="flex flex-col items-start xl:items-center gap-0.5">
                  <span className="font-sans font-medium text-[11px] leading-[15px] text-[#64748B] uppercase tracking-wider whitespace-nowrap">
                    Out of Service
                  </span>
                  <span className="font-sans font-semibold text-[15px] leading-5 text-[#EF4444]">
                    {item.outOfService}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row items-center gap-2 shrink-0 self-end xl:self-auto pt-2 xl:pt-0">
                <Link 
                  href={`/owner/inventory/${item.id}`}
                  className="flex justify-center items-center w-8 h-8 rounded-lg border border-transparent hover:border-[#2B3648] hover:bg-[#1A222D] transition-colors cursor-pointer group"
                >
                  <Eye size={16} className="text-[#64748B] group-hover:text-white transition-colors" />
                </Link>
                <Link 
                  href={`/owner/inventory/edit/${item.id}`}
                  className="flex justify-center items-center w-8 h-8 rounded-lg border border-transparent hover:border-[#2B3648] hover:bg-[#1A222D] transition-colors cursor-pointer group"
                >
                  <PencilSimple size={16} className="text-[#64748B] group-hover:text-white transition-colors" />
                </Link>
                <button 
                  onClick={() => handleDeleteClick(item.id)}
                  className="flex justify-center items-center w-8 h-8 rounded-lg border border-transparent hover:border-[#EF4444]/30 hover:bg-[#EF4444]/10 transition-colors cursor-pointer group"
                >
                  <Trash size={16} className="text-[#EF4444] group-hover:text-red-400 transition-colors" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <ConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Equipment"
        message={`Are you sure you want to delete this equipment? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
