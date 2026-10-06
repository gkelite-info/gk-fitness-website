"use client";
import { useState, useMemo } from "react";
import InventoryFilterBar from "./_components/InventoryFilterBar";
import InventoryList from "./_components/InventoryList";
import InventoryStats from "./_components/InventoryStats";
import { useGymInventoryList } from "@/lib/hooks/inventory/useGymInventory";
import { useUser } from "@/app/context/UserContext";

export default function InventoryPage() {
  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId || null;
  const { data: inventoryData = [], isLoading } = useGymInventoryList(gymId);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = useMemo(() => {
    if (!searchTerm) return inventoryData;
    return inventoryData.filter((item: any) =>
      item.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gymInventoryId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventoryData, searchTerm]);

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full max-w-[1200px] mx-auto min-h-screen pb-20">
      <div className="flex flex-col items-start gap-1 w-full mb-6">
        <h2 className="font-sans font-bold text-2xl lg:text-[25px] leading-[33px] tracking-[-0.6px] text-white">
          Manage Inventory
        </h2>
        <p className="font-sans font-normal text-sm lg:text-[14.5px] leading-[21px] text-[#94A3B8]">
          Track and manage your gym equipment
        </p>
      </div>

      <InventoryStats inventoryData={inventoryData} />
      <InventoryFilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <InventoryList inventoryData={filteredInventory} isLoading={isLoading} />
    </div>
  );
}
