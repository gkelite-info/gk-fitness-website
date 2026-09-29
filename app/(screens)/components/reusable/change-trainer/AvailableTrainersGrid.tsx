"use client";
import { Phone, EnvelopeSimple, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  image: string;
}

const trainers: Trainer[] = [
  { id: "1", name: "Amit Sharma", specialty: "Weight Loss", phone: "+91 98765 43211", email: "amit.sharma@fitzor.com", image: "" },
  { id: "2", name: "Sneha Kapoor", specialty: "Strength", phone: "+91 98765 43212", email: "sneha.kapoor@fitzor.com", image: "" },
  { id: "3", name: "Vikram Singh", specialty: "Cardio & Endurance", phone: "+91 98765 43213", email: "vikram.singh@fitzor.com", image: "" },
  { id: "4", name: "Neha Patel", specialty: "Yoga & Flexibility", phone: "+91 98765 43214", email: "neha.patel@fitzor.com", image: "" },
  { id: "5", name: "Karan Mehta", specialty: "CrossFit", phone: "+91 98765 43215", email: "karan.mehta@fitzor.com", image: "" },
];

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-[16px] sm:p-[20px] gap-[16px] w-full bg-[#121620] border border-[#232938] rounded-[16px]">
      <div className="flex flex-row items-center gap-[16px] min-w-0 w-full sm:w-auto">
        <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] border border-[#272E3F] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] rounded-[12px] overflow-hidden shrink-0">
          <Avatar src={trainer.image || undefined} alt={trainer.name} className="w-full h-full" />
        </div>
        <div className="flex flex-col items-start gap-[2px] sm:gap-[4px] min-w-0">
          <h3 className="font-sans font-bold text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-white truncate w-full">
            {trainer.name}
          </h3>
          <span className="font-sans font-semibold text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#CCFF00] truncate w-full">
            {trainer.specialty}
          </span>
          <div className="flex flex-col items-start gap-[2px] mt-[2px]">
            <div className="flex flex-row items-center gap-[6px] min-w-0">
              <Phone size={14} className="text-[#64748B] shrink-0" weight="fill" />
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] truncate">
                {trainer.phone}
              </span>
            </div>
            <div className="flex flex-row items-center gap-[6px] min-w-0">
              <EnvelopeSimple size={14} className="text-[#64748B] shrink-0" weight="fill" />
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[16px] text-[#94A3B8] truncate">
                {trainer.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => router.push(`/owner/users/${params.id}/change-trainer/${trainer.id}`)}
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

export default function AvailableTrainersGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-start gap-[16px] sm:gap-[20px] w-full pb-[8px]">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-[12px]">
          <h2 className="font-sans font-bold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[0.4px] text-white">
            Available Trainers
          </h2>
          <div className="flex items-center px-[10px] py-[2px] bg-[#1B2230] border border-[#273247] rounded-full shrink-0">
            <span className="font-sans font-semibold text-[11px] sm:text-[12px] leading-[16px] text-[#CCFF00]">
              24 Available
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
        {trainers.map(t => <TrainerCard key={t.id} trainer={t} />)}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={5}
        totalItems={24}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
