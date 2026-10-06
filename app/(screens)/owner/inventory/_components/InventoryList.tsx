"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, PencilSimple, Trash, CircleNotch } from "@phosphor-icons/react";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import toast from "react-hot-toast";
import { getEquipmentImageUrl } from "@/lib/helpers/gymInventory/gymInventory";
import { useUser } from "@/app/context/UserContext";
import { useDeleteGymInventory } from "@/lib/hooks/inventory/useGymInventory";

interface InventoryListProps {
  inventoryData?: any[];
  isLoading?: boolean;
}


export default function InventoryList({ inventoryData = [], isLoading = false }: InventoryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const totalItems = inventoryData.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId || "";
  const deleteMutation = useDeleteGymInventory(gymId);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMutation.mutateAsync(itemToDelete);
      toast.success("Equipment deleted successfully!");
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete equipment.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 w-full mt-4 bg-[#121720] border border-[#1C2430] rounded-2xl">
        <CircleNotch size={32} className="text-[#D2FF00] animate-spin mb-4" />
        <span className="font-sans text-[#8590A2]">Loading inventory...</span>
      </div>
    );
  }

  const paginatedData = inventoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col items-start w-full gap-4">
      <h3 className="font-sans font-bold text-[18.6px] leading-[29px] tracking-[-0.46px] text-white">
        All Equipment
      </h3>
      <div className="flex flex-col items-start w-full gap-4">
        {paginatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 w-full bg-[#121720] border border-[#1C2430] rounded-2xl">
            <span className="font-sans text-[#8590A2]">No equipment found.</span>
          </div>
        ) : paginatedData.map((item) => (
          <div 
            key={item.gymInventoryId} 
            className="flex flex-col xl:flex-row xl:items-center justify-between p-4 gap-6 w-full bg-[#121720] border border-[#1C2430] rounded-2xl"
          >
            <div className="flex flex-row items-center gap-4 w-full xl:w-auto xl:min-w-[270px]">
              <div 
                className="w-[116px] h-[83px] bg-[#1F2937] rounded-xl shrink-0 bg-cover bg-center ring-1 ring-[#1F2937]"
                style={{ backgroundImage: `url(${getEquipmentImageUrl(item.image) || '/placeholder-equipment.png'})` }}
              />
              <div className="flex flex-col items-start gap-0.5">
                <h4 className="font-sans font-semibold text-[16.6px] leading-[25px] text-white">
                  {item.equipmentName}
                </h4>
                <span className="font-mono font-normal text-[12.4px] leading-[17px] text-[#64748B]">
                  ID: {item.gymInventoryId?.slice(0, 8)}...
                </span>
                <div className="flex flex-row items-center gap-1.5 mt-1">
                  <span className="font-sans font-normal text-[12.4px] leading-[17px] text-[#94A3B8]">
                    Last updated: {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
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
                    {item.quantity}
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
              <div className="flex flex-row items-center justify-end gap-2 shrink-0 w-full xl:w-auto pt-4 xl:pt-0 mt-2 xl:mt-0 border-t border-[#1E2632] xl:border-none">
                <Link 
                  href={`/owner/inventory/${item.gymInventoryId}`}
                  className="flex justify-center items-center w-8 h-8 rounded-lg border border-transparent hover:border-[#2B3648] hover:bg-[#1A222D] transition-colors cursor-pointer group"
                >
                  <Eye size={16} className="text-[#64748B] group-hover:text-white transition-colors" />
                </Link>
                <Link 
                  href={`/owner/inventory/edit/${item.gymInventoryId}`}
                  className="flex justify-center items-center w-8 h-8 rounded-lg border border-transparent hover:border-[#2B3648] hover:bg-[#1A222D] transition-colors cursor-pointer group"
                >
                  <PencilSimple size={16} className="text-[#64748B] group-hover:text-white transition-colors" />
                </Link>
                <button 
                  onClick={() => handleDeleteClick(item.gymInventoryId)}
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
        isConfirming={deleteMutation.isPending}
        confirmingText="Deleting..."
      />
    </div>
  );
}
