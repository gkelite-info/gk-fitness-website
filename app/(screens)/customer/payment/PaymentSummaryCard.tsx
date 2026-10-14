"use client";

interface PaymentSummaryCardProps {
  planName?: string;
  durationMonths?: number;
  price?: number;
}

export default function PaymentSummaryCard({
  planName,
  durationMonths = 1,
  price = 0,
}: PaymentSummaryCardProps) {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#8E8E93] text-xs">Selected Plan</span>
        <span className="text-white text-xs font-semibold">
          {planName || "-"}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#8E8E93] text-xs">Validity</span>
        <span className="text-white text-xs font-semibold">
          {durationMonths} Month{durationMonths > 1 ? "s" : ""}
        </span>
      </div>
      <div className="border-t border-[#222222] pt-3 flex justify-between items-center">
        <span className="text-white text-sm font-bold">Total Amount</span>
        <span className="text-[#D7FF00] text-xl font-bold">
          ₹{price}
        </span>
      </div>
    </div>
  );
}
