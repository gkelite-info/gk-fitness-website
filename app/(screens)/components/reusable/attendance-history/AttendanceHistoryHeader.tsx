"use client";

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export default function AttendanceHistoryHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center w-full pb-2 gap-4">
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 bg-[#14171D] border border-[#232730] rounded-xl hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
      >
        <CaretLeft size={20} className="text-[#CBD5E1]" />
      </button>
      <h2 className="font-sans font-bold text-2xl sm:text-[30px] leading-9 tracking-[-0.75px] text-white m-0">
        Attendance History
      </h2>
    </div>
  );
}
