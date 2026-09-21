import Image from "next/image";

export type PaymentMethod = "GPay" | "PhonePe" | "Paytm";

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
}

export default function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  if (method === "GPay") {
    return (
      <div className="box-border flex flex-row items-center px-2.5 py-1 gap-1.5 h-[26px] w-fit bg-[#1E2330] border border-[#2B3345] rounded-[4px]">
        <div className="flex flex-row justify-center items-center w-3.5 h-3.5 shrink-0 rounded-full overflow-hidden bg-white">
          <Image src="/logos/gpay-final.png" alt="GPay" width={14} height={14} className="w-full h-full object-contain" />
        </div>
        <span className="font-['Plus_Jakarta_Sans'] font-[500] text-[11px] leading-[16px] text-white">
          GPay
        </span>
      </div>
    );
  }

  if (method === "PhonePe") {
    return (
      <div className="box-border flex flex-row items-center px-2.5 py-1 gap-1.5 h-[26px] w-fit bg-[#1E2330] border border-[#2B3345] rounded-[4px]">
        <div className="flex flex-row justify-center items-center w-3.5 h-3.5 shrink-0 rounded-full overflow-hidden">
          <Image src="/logos/phonepe.png" alt="PhonePe" width={14} height={14} className="w-full h-full object-contain" />
        </div>
        <span className="font-['Plus_Jakarta_Sans'] font-[500] text-[11px] leading-[16px] text-white">
          PhonePe
        </span>
      </div>
    );
  }

  if (method === "Paytm") {
    return (
      <div className="box-border flex flex-row items-center px-2 py-0.5 h-[26px] w-fit bg-[#1E2330] border border-[#2B3345] rounded-[4px]">
        <span className="font-['Plus_Jakarta_Sans'] font-[800] text-[11px] leading-[20px] tracking-[-0.55px] text-[#00B9F1]">
          Paytm
        </span>
      </div>
    );
  }

  return null;
}

