import { PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

export interface DeviceData {
  id: string | number;
  name: string;
  status: "Active" | "Offline";
  sn: string;
  ip: string;
}

interface DeviceCardProps {
  device: DeviceData;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export default function DeviceCard({ device, onEdit, onDelete }: DeviceCardProps) {
  const isActive = device.status === "Active";

  return (
    <div className="flex flex-col justify-between items-start p-6 bg-[#141720] border border-[#202532] rounded-2xl w-full">
      {/* Top Section */}
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-row justify-between items-start w-full gap-4">
          <h4 className="font-sans font-semibold text-base leading-6 tracking-[-0.4px] text-white break-words flex-1 min-w-0">
            {device.name}
          </h4>
          <div
            className={`flex flex-row items-center px-2.5 py-0.5 gap-1.5 rounded-full border shrink-0 mt-0.5 ${
              isActive
                ? "bg-[#11261A] border-[#1D422A]"
                : "bg-[#2B1619] border-[#492227]"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? "bg-[#22C55E]" : "bg-[#EF4444]"
              }`}
            />
            <span
              className={`font-sans font-medium text-xs leading-4 ${
                isActive ? "text-[#22C55E]" : "text-[#EF4444]"
              }`}
            >
              {device.status}
            </span>
          </div>
        </div>

        <span className="font-['Sora'] font-normal text-[13px] leading-5 text-[#A1A1AA] break-all">
          SN: {device.sn}
        </span>
      </div>

      {/* IP Info & Actions Section */}
      <div className="flex flex-row justify-between items-end sm:items-center pt-4 mt-6 w-full border-t border-[#1B202C] gap-4">
        <div className="flex flex-col items-start gap-[3px] flex-1 min-w-0">
          <span className="font-sans font-medium text-xs leading-4 text-[#71717A] shrink-0">
            IP Address
          </span>
          <div className="w-full overflow-x-auto no-scrollbar scrollbar-hide flex flex-row pb-0.5">
            <span className="font-sans font-semibold text-sm leading-5 tracking-[0.35px] text-white whitespace-nowrap">
              {device.ip}
            </span>
          </div>
        </div>
        
        <div className="flex flex-row items-center gap-2 shrink-0">
          <button
            onClick={() => onEdit?.(device.id)}
            className="flex justify-center items-center w-8 h-8 bg-[#1A202C] rounded-lg hover:bg-[#2D3748] transition-colors cursor-pointer"
          >
            <PencilSimple size={16} color="#A1A1AA" weight="regular" />
          </button>
          <button
            onClick={() => onDelete?.(device.id)}
            className="flex justify-center items-center w-8 h-8 bg-[#2A171D] rounded-lg hover:bg-[#3D212A] transition-colors cursor-pointer"
          >
            <Trash size={16} color="#EF4444" weight="regular" />
          </button>
        </div>
      </div>
    </div>
  );
}
