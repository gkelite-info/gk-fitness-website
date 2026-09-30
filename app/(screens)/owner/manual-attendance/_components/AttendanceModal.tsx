import { Check } from "@phosphor-icons/react/dist/ssr";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  count: number;
}

export default function AttendanceModal({ isOpen, onClose, count }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative flex flex-col items-center justify-center p-8 bg-[#171A21] shadow-[0px_8.68421px_13.0263px_-2.60526px_rgba(0,0,0,0.1),0px_3.47368px_5.21053px_-3.47368px_rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.05)] rounded-[13.89px] w-full max-w-[320px]">
        
        {/* Glow behind Check Icon */}
        <div className="absolute top-8 w-24 h-24 bg-[#C8FF00] rounded-full blur-[40px] opacity-20 pointer-events-none" />
        
        {/* Check Icon */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#C8FF00] border-[8px] border-[rgba(200,255,0,0.15)] mb-6 shrink-0">
          <Check size={24} weight="bold" color="#000000" />
        </div>

        {/* Text */}
        <h2 className="font-sans font-bold text-[20px] leading-[28px] text-white text-center mb-2">
          Attendance Marked
        </h2>
        <p className="font-sans font-normal text-[14px] leading-[20px] text-[#8B949E] text-center mb-8 max-w-[200px]">
          {count} customer{count !== 1 ? 's' : ''} marked present successfully.
        </p>

        {/* Button */}
        <button 
          onClick={onClose}
          className="flex flex-row items-center justify-center w-full h-[42px] bg-[#C8FF00] rounded-xl hover:bg-[#d4ff32] transition-colors cursor-pointer"
        >
          <span className="font-sans font-bold text-[14px] leading-[20px] text-black">
            Done
          </span>
        </button>
      </div>
    </div>
  );
}
