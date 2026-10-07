import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { CaretRight, Check } from "@phosphor-icons/react/dist/ssr";

export interface CustomerData {
  id: string;
  name: string;
  custId: string;
  plan: string;
  planColor: string;
  planBg: string;
  attendance: string;
  isPresent: boolean;
  phone?: string;
  attendanceId?: string;
  hasNoPlan: boolean;
}

interface Props {
  customers: CustomerData[];
  isBulkMode: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleIndividual: (id: string) => void;
}

export default function ManualAttendanceTable({ customers, isBulkMode, selectedIds, onToggleSelect, onToggleIndividual }: Props) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="hidden lg:grid grid-cols-[4fr_2.5fr_3.5fr_2fr] w-full px-5 py-2">
        <div className="flex items-center">
          <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#8B949E]">
            Member Name & ID
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#8B949E]">
            Membership Plan
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#8B949E]">
            Last Attendance
          </span>
        </div>
        <div className="flex items-center justify-end pr-2">
          <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#8B949E]">
            Actions
          </span>
        </div>
      </div>

      {customers.map((cust) => (
        <div
          key={cust.id}
          onClick={() => isBulkMode && !cust.hasNoPlan && onToggleSelect(cust.id)}
          className={`w-full flex flex-col lg:grid lg:grid-cols-[4fr_2.5fr_3.5fr_2fr] lg:items-center p-4 gap-3 lg:gap-0 bg-[#171B24] border border-[#232936] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[16px] transition-colors ${isBulkMode && !cust.hasNoPlan ? "cursor-pointer hover:bg-[#1A1F2B]" : ""} ${cust.hasNoPlan && isBulkMode ? "opacity-75" : ""}`}
        >
          <div className="flex flex-row items-start lg:items-center gap-3.5 w-full">
            {isBulkMode && (
              <div className="flex items-center justify-center shrink-0">
                <input
                  type="checkbox"
                  checked={selectedIds.has(cust.id)}
                  onChange={() => !cust.hasNoPlan && onToggleSelect(cust.id)}
                  onClick={(e) => e.stopPropagation()} // Prevent double trigger with row
                  disabled={cust.hasNoPlan}
                  className={`w-[18px] h-[18px] rounded-[4px] border-[#2C3344] bg-[#0D1017] accent-[#C8FF00] ${cust.hasNoPlan ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                />
              </div>
            )}
            <Avatar
              gender={cust.name.includes("Neha") || cust.name.includes("Priya") || cust.name.includes("Sneha") || cust.name.includes("Ananya") ? "female" : "male"}
              className="w-11 h-11"
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-semibold text-[14px] leading-[20px] tracking-[-0.35px] text-white">
                {cust.name}
              </span>
              <span className="font-sans font-medium text-[12px] leading-[16px] tracking-[0.3px] text-[#8B949E]">
                ID: {cust.custId}
              </span>

              <div className="flex flex-col gap-2 mt-2 lg:hidden">
                <div className="flex items-center">
                  <div
                    className="flex flex-row items-center px-3 py-1 gap-1.5 rounded-[6px] border w-fit"
                    style={{ backgroundColor: cust.planBg, borderColor: cust.planBg.replace("0.1)", "0.2)") }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cust.planColor }} />
                    <span className="font-sans font-semibold text-[12px] leading-[16px]" style={{ color: cust.planColor }}>
                      {cust.plan}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-sans font-medium text-[12px] leading-[16px] text-[#E2E8F0]">
                    {cust.attendance}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <div
              className="flex flex-row items-center px-3 py-1 gap-1.5 rounded-[6px] border w-fit"
              style={{ backgroundColor: cust.planBg, borderColor: cust.planBg.replace("0.1)", "0.2)") }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cust.planColor }} />
              <span className="font-sans font-semibold text-[12px] leading-[16px]" style={{ color: cust.planColor }}>
                {cust.plan}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <span className="font-sans font-medium text-[12px] leading-[16px] text-[#E2E8F0]">
              {cust.attendance}
            </span>
          </div>

          <div className="flex flex-row items-center justify-end gap-3 w-full lg:w-auto mt-1 lg:mt-0">
            {cust.hasNoPlan ? (
              <button
                disabled
                className="flex flex-row justify-center items-center px-3 py-2 gap-1.5 min-w-[98px] bg-[#0E1117] border border-[#232936] rounded-lg opacity-50 cursor-not-allowed"
              >
                <Check size={14} color="#8B949E" weight="bold" />
                <span className="font-sans font-medium text-[12px] leading-[16px] text-[#8B949E]">
                  No Plan
                </span>
              </button>
            ) : cust.isPresent ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleIndividual(cust.id);
                }}
                className="flex flex-row justify-center items-center px-3 py-2 gap-1.5 min-w-[98px] bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-lg cursor-pointer hover:bg-[rgba(200,255,0,0.15)] transition-colors group"
              >
                <Check size={14} color="#C8FF00" weight="bold" />
                <span className="font-sans font-semibold text-[12px] leading-[16px] text-[#C8FF00] group-hover:text-red-400 group-hover:hidden">
                  Present
                </span>
                <span className="font-sans font-semibold text-[12px] leading-[16px] text-red-400 hidden group-hover:block">
                  Undo
                </span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleIndividual(cust.id);
                }}
                className="flex flex-row justify-center items-center px-3 py-2 gap-1.5 min-w-[98px] bg-[#0E1117] border border-[#232936] rounded-lg hover:bg-[#1A1C23] transition-colors cursor-pointer"
              >
                <Check size={14} color="#E2E8F0" weight="bold" />
                <span className="font-sans font-medium text-[12px] leading-[16px] text-[#E2E8F0]">
                  Mark Present
                </span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
