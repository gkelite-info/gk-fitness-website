"use client";
import { Phone, EnvelopeSimple, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";

// We can use any for now or define a proper type
interface AvailableTrainersGridProps {
  trainers: any[];
  isLoading?: boolean;
  customerId: string;
}

function TrainerCard({ trainer, customerId }: { trainer: any, customerId: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-[16px] sm:p-[20px] gap-[16px] w-full bg-[#121620] border border-[#232938] rounded-[16px]">
      <div className="flex flex-row items-center gap-[16px] min-w-0 w-full sm:w-auto">
        <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] border border-[#272E3F] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] rounded-[12px] overflow-hidden shrink-0">
          <Avatar src={trainer.users?.profilePhoto || trainer.image || undefined} alt={trainer.fullName || trainer.name} className="w-full h-full" />
        </div>
        <div className="flex flex-col items-start gap-[2px] sm:gap-[4px] min-w-0">
          <h3 className="font-sans font-bold text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-white truncate w-full">
            {trainer.fullName || trainer.name}
          </h3>
          <span className="font-sans font-semibold text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#CCFF00] truncate w-full">
            {trainer.specialization || trainer.specialty || "General Training"}
          </span>
          <div className="flex flex-col items-start gap-[2px] mt-[2px]">
            <div className="flex flex-row items-center gap-[6px] min-w-0">
              <Phone size={14} className="text-[#64748B] shrink-0" weight="fill" />
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] truncate">
                {trainer.users?.phone || trainer.phone || "No phone"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-[6px] min-w-0">
              <EnvelopeSimple size={14} className="text-[#64748B] shrink-0" weight="fill" />
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] truncate">
                {trainer.users?.email || trainer.email || "No email"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => router.push(`/owner/users/${customerId}/change-trainer/${trainer.gymTrainerId || trainer.id}`)}
        className="flex flex-row items-center justify-center px-[20px] sm:px-[24px] py-[10px] gap-[8px] h-[40px] sm:h-[42px] bg-[#121808]/40 border border-[#CCFF00] rounded-[12px] w-full sm:w-auto hover:bg-[#1a230b]/60 transition-colors shrink-0 cursor-pointer"
      >
        <span className="font-sans font-semibold text-[13px] sm:text-[14px] leading-[20px] tracking-[0.35px] text-[#CCFF00]">
          Assign
        </span>
        <CaretRight size={16} className="text-[#CCFF00]" weight="bold" />
      </button>
    </div>
  );
}

export default function AvailableTrainersGrid({ trainers, isLoading, customerId }: AvailableTrainersGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(trainers.length / itemsPerPage));
  const displayedTrainers = trainers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col items-start gap-[16px] sm:gap-[20px] w-full pb-[8px]">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-[12px]">
          <h2 className="font-sans font-bold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[0.4px] text-white">
            Available Trainers
          </h2>
          <div className="flex items-center px-[10px] py-[2px] bg-[#1B2230] border border-[#273247] rounded-full shrink-0">
            <span className="font-sans font-semibold text-[11px] sm:text-[12px] leading-[16px] text-[#CCFF00]">
              {trainers.length} Available
            </span>
          </div>
        </div>
        <div className="hidden sm:flex flex-row items-center gap-[8px]">
          <span className="font-sans font-normal text-[12px] leading-[16px] text-[#94A3B8]">
            Sort by:
          </span>
          <select className="bg-[#131720] border border-[#252C3C] text-[#CBD5E1] text-[12px] rounded-[8px] px-[10px] py-[4px] outline-none cursor-pointer">
            <option>Highest Rated</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] sm:gap-[20px] w-full">
        {isLoading ? (
          <div className="text-[#94A3B8] p-4 col-span-1 lg:col-span-2 text-center">Loading trainers...</div>
        ) : displayedTrainers.length === 0 ? (
          <div className="text-[#94A3B8] p-4 col-span-1 lg:col-span-2 text-center">No trainers available.</div>
        ) : (
          displayedTrainers.map(t => <TrainerCard key={t.gymTrainerId || t.id} trainer={t} customerId={customerId} />)
        )}
      </div>

      {!isLoading && trainers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={trainers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
