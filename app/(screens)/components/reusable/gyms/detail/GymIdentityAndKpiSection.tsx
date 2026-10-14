import {
  Barbell,
  MapPin,
  CalendarBlank,
  IdentificationCard,
  Users,
} from "@phosphor-icons/react";

interface GymIdentityAndKpiSectionProps {
  gymName: string;
  status: "active" | "inactive";
  location: string;
  registeredDate: string;
  gymCode: string;
  totalCustomers: number;
  totalTrainers: number;
}

export default function GymIdentityAndKpiSection({
  gymName,
  status,
  location,
  registeredDate,
  gymCode,
  totalCustomers,
  totalTrainers,
}: GymIdentityAndKpiSectionProps) {
  const isActive = status === "active";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full min-w-0">
      <div className="lg:col-span-7 bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-4 sm:gap-5 shadow-sm">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#141B26] border border-[#232E42] flex flex-col items-center justify-center shrink-0 self-center sm:self-auto shadow-inner">
          <Barbell size={28} weight="bold" className="text-[#D4FF32]" />
          <span className="text-[10px] font-black text-[#94A3B8] tracking-widest mt-0.5">
            LOGO
          </span>
        </div>

        <div className="flex flex-col gap-1.5 min-w-0 flex-1 w-full sm:w-auto">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 flex-wrap">
            <h2
              title={gymName}
              className="text-xl sm:text-2xl font-extrabold text-white tracking-tight truncate max-w-full"
            >
              {gymName}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? "bg-[rgba(2,44,34,0.6)] border border-[rgba(6,95,70,0.5)] text-[#34D399]"
                  : "bg-[rgba(69,26,3,0.6)] border border-[rgba(146,64,14,0.5)] text-[#FB923C]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-[#34D399]" : "bg-[#FB923C]"
                }`}
              />
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div
            title={location}
            className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm text-[#94A3B8]"
          >
            <MapPin size={15} className="text-[#64748B] shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#94A3B8]">
            <CalendarBlank size={15} className="text-[#64748B] shrink-0" />
            <span>Registered on {registeredDate}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-[#D4FF32]">
            <IdentificationCard size={15} className="shrink-0" />
            <span>Gym ID: {gymCode}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] mb-3">
            <Users size={20} weight="bold" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
            {totalCustomers}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mt-2">
            TOTAL CUSTOMERS
          </span>
        </div>

        <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] mb-3">
            <Barbell size={20} weight="bold" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
            {totalTrainers}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mt-2">
            TOTAL TRAINERS
          </span>
        </div>
      </div>
    </div>
  );
}
