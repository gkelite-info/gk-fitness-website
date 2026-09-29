"use client";
import { use } from "react";
import Link from "next/link";
import { CaretLeft, PencilSimple } from "@phosphor-icons/react";
import EquipmentProfile from "./_components/EquipmentProfile";
import StockOverview from "./_components/StockOverview";
import StockHistory from "./_components/StockHistory";
import UpdateStockPanel from "./_components/UpdateStockPanel";


export default function EquipmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const equipmentId = resolvedParams.id;

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full max-w-[1280px] mx-auto min-h-screen pb-20 gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div className="flex flex-row items-center gap-4">
          <Link 
            href="/owner/inventory"
            className="flex justify-center items-center w-10 h-10 bg-[#131820] border border-[#202A36] rounded-xl shadow-sm hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <CaretLeft size={20} className="text-white" />
          </Link>
          <div className="flex flex-col items-start gap-0.5">
            <h1 className="font-sans font-bold text-2xl leading-[30px] tracking-[-0.6px] text-white">
              Equipment Details
            </h1>
            <span className="font-sans font-normal text-sm leading-5 text-[#7E8B9B]">
              View and manage equipment information
            </span>
          </div>
        </div>

        <Link 
          href={`/owner/inventory/edit/${equipmentId}`}
          className="flex flex-row items-center px-4 py-2.5 gap-2.5 h-[42px] bg-[#11171A] border border-[rgba(158,189,31,0.6)] rounded-xl shadow-sm hover:bg-[rgba(198,255,0,0.1)] transition-colors cursor-pointer"
        >
          <PencilSimple size={16} className="text-[#C6FF00]" />
          <span className="font-sans font-semibold text-sm leading-5 text-[#C6FF00]">
            Edit Equipment
          </span>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch w-full gap-6 mt-2 h-full">
        <div className="flex flex-col items-start gap-6 w-full lg:w-[60%] shrink-0">
          <EquipmentProfile id={equipmentId} />
          <StockOverview />
          <StockHistory />
        </div>
        <div className="flex flex-col w-full lg:w-[40%] shrink-0">
          <UpdateStockPanel />
        </div>
      </div>

    </div>
  );
}
