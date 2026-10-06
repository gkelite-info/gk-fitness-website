"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react";
import AddEquipmentForm from "../../add/_components/AddEquipmentForm";
import AddEquipmentPreview from "../../add/_components/AddEquipmentPreview";
import { useGymInventoryDetail } from "@/lib/hooks/inventory/useGymInventory";

export default function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [equipmentName, setEquipmentName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { data: detailData, isLoading } = useGymInventoryDetail(resolvedParams.id);

  useEffect(() => {
    if (detailData?.data) {
      setEquipmentName(detailData.data.equipmentName || "");
      if (detailData.data.image) {
        setImagePreview(detailData.data.image);
      }
    }
  }, [detailData]);

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full max-w-[1200px] mx-auto min-h-screen pb-20 gap-6">
      <div className="flex flex-row items-center gap-4 w-full">
        <Link 
          href="/owner/inventory"
          className="flex justify-center items-center w-10 h-10 bg-[#17191D] border border-[#23262D] rounded-xl hover:bg-white/5 transition-colors cursor-pointer shrink-0"
        >
          <CaretLeft size={20} className="text-[#CBD5E1]" />
        </Link>
        <div className="flex flex-col items-start gap-0.5">
          <h1 className="font-sans font-bold text-2xl leading-[30px] tracking-[-0.6px] text-white">
            Edit Equipment
          </h1>
            <span className="font-sans font-normal text-xs leading-[16px] text-[#8E929B]">
              Update equipment details for {resolvedParams.id}
            </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch w-full gap-6 h-full">
        <div className="w-full lg:w-[60%] flex flex-col shrink-0">
          <AddEquipmentForm 
            equipmentName={equipmentName}
            setEquipmentName={setEquipmentName} 
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            initialData={detailData?.data}
          />
        </div>
        <div className="w-full lg:w-[40%] flex flex-col shrink-0">
          <AddEquipmentPreview 
            equipmentName={equipmentName} 
            imagePreview={imagePreview} 
          />
        </div>
      </div>

    </div>
  );
}
