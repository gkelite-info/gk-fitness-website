"use client";

import { Star } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useParams } from "next/navigation";
import Avatar from "./../Avatar";

export default function MatchingTrainersCard() {
  const trainers = [
    { initials: "RV", name: "Rahul Verma", spec: "Strength & Conditioning", rating: "4.9" },
    { initials: "PN", name: "Priya Nair", spec: "Functional & Mobility", rating: "4.8" },
    { initials: "AM", name: "Arjun Mehta", spec: "Hypertrophy & Rehab", rating: "4.7" }
  ];
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col items-start p-[24px] w-full h-full flex-1 bg-[#15181E] border border-[#212630] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] gap-[16px]">
      
      <div className="flex flex-row justify-between items-center w-full gap-3">
        <h4 className="font-sans font-bold text-[14px] leading-[20px] tracking-[0.7px] uppercase text-white m-0 break-words flex-1 min-w-0">
          Available Matching Trainers
        </h4>
        <button 
          onClick={() => router.push(`/owner/users/${params.id}/change-trainer`)}
          className="font-sans font-semibold text-[12px] leading-[16px] text-[#CCFF00] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 whitespace-nowrap shrink-0"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col w-full gap-[14px]">
        {trainers.map((t, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-[14px] w-full bg-[#1B1F27] border border-[#252B37] rounded-[12px] gap-[14px] sm:gap-[19px]">
            
            <div className="flex flex-row items-center gap-[12px] w-full sm:w-auto sm:flex-1 min-w-0">
              <Avatar className="w-[40px] h-[40px] shrink-0" alt={t.name} />
              
              <div className="flex flex-col items-start min-w-0 flex-1 -mt-0.5">
                <h5 className="font-sans font-bold text-[14px] leading-[20px] text-white m-0 break-words w-full">
                  {t.name}
                </h5>
                <div className="flex flex-row items-center gap-[4px] mt-0.5 w-full flex-wrap">
                  <span className="font-sans font-normal text-[11px] leading-[16px] text-[#9CA3AF] break-words">
                    {t.spec}
                  </span>
                  <div className="w-1 h-1 bg-[#475569] rounded-full shrink-0" />
                  <div className="flex flex-row items-center gap-0.5">
                    <Star size={10} className="text-[#F59E0B]" weight="fill" />
                    <span className="font-sans font-medium text-[11px] leading-[16px] text-[#9CA3AF]">
                      {t.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex justify-center items-center px-[14px] py-[6px] bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 border border-[#CCFF00]/30 rounded-[8px] transition-all cursor-pointer w-full sm:w-auto shrink-0">
              <span className="font-sans font-bold text-[12px] leading-[16px] text-[#CCFF00]">
                Assign
              </span>
            </button>
            
          </div>
        ))}
      </div>
      
    </div>
  );
}
