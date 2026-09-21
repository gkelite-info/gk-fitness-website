"use client";

import { 
  Money, 
  QrCode, 
  User, 
  Crown, 
  CalendarBlank, 
  Clock, 
  FileText,
  PencilSimple,
  CaretDown,
  Info
} from "@phosphor-icons/react";

interface PaymentFormProps {
  paymentMethod: "cash" | "qr";
  setPaymentMethod: (method: "cash" | "qr") => void;
  onSave?: () => void;
}

export default function PaymentForm({ paymentMethod, setPaymentMethod, onSave }: PaymentFormProps) {
  return (
    <div className="flex flex-col items-start gap-5 w-full lg:col-span-7 xl:col-span-8 relative">
      
      {/* Payment Method Toggle */}
      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Payment Method
        </span>
        <div className="box-border flex flex-row items-stretch p-1 gap-1 w-full h-[50px] bg-[#13161B] border border-[#282D36] rounded-[12px]">
          {/* Cash Tab */}
          <button 
            onClick={() => setPaymentMethod("cash")}
            className={`flex flex-row justify-center items-center gap-2.5 flex-1 h-full rounded-[8px] transition-all duration-200 cursor-pointer ${
              paymentMethod === "cash" 
                ? "bg-[#CCFF00] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" 
                : "bg-transparent hover:bg-[#1a1e26]"
            }`}
          >
            <Money size={16} weight={paymentMethod === "cash" ? "fill" : "bold"} className={paymentMethod === "cash" ? "text-black" : "text-[#D1D5DB]"} />
            <span className={`font-[${paymentMethod === "cash" ? "700" : "500"}] text-[12px] leading-[16px] text-center ${paymentMethod === "cash" ? "text-black" : "text-[#D1D5DB]"}`}>
              Cash
            </span>
          </button>
          {/* QR Code Tab */}
          <button 
            onClick={() => setPaymentMethod("qr")}
            className={`flex flex-row justify-center items-center gap-2.5 flex-1 h-full rounded-[8px] transition-all duration-200 cursor-pointer ${
              paymentMethod === "qr" 
                ? "bg-[#CCFF00] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" 
                : "bg-transparent hover:bg-[#1a1e26]"
            }`}
          >
            <QrCode size={16} weight={paymentMethod === "qr" ? "fill" : "bold"} className={paymentMethod === "qr" ? "text-black" : "text-[#D1D5DB]"} />
            <span className={`font-[${paymentMethod === "qr" ? "700" : "500"}] text-[12px] leading-[16px] text-center ${paymentMethod === "qr" ? "text-black" : "text-[#D1D5DB]"}`}>
              QR Code
            </span>
          </button>
        </div>
      </div>

      {/* Select Member */}
      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Select Member
        </span>
        <div className="box-border flex flex-row items-center justify-between px-3.5 py-3 w-full min-h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px] cursor-pointer hover:border-[#38404f] transition-colors">
          <div className="flex flex-row items-center gap-3 w-full">
            <User size={16} weight="bold" className="text-[#CCFF00] shrink-0" />
            <input 
              type="text" 
              placeholder="Search member by name or mobile..."
              className="w-full bg-transparent font-[400] text-[12px] leading-[14px] text-white placeholder-[#6B7280] focus:outline-none"
            />
          </div>
          <CaretDown size={14} weight="bold" className="text-[#6B7280] shrink-0 ml-2" />
        </div>
      </div>

      {/* Membership Plan */}
      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Membership Plan
        </span>
        <div className="box-border flex flex-row items-center justify-between px-3.5 py-2.5 w-full min-h-[54px] bg-[#15181E] border border-[#282D36] rounded-[12px] cursor-pointer hover:border-[#38404f] transition-colors">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row justify-center items-center w-8 h-8 bg-[#202715] rounded-full shrink-0">
              <Crown size={16} weight="fill" className="text-[#CCFF00]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-[700] text-[12px] leading-[15px] text-white">
                Gold Membership
              </span>
              <span className="font-[400] text-[11px] leading-[14px] text-[#9CA3AF]">
                1 Month
              </span>
            </div>
          </div>
          <CaretDown size={14} weight="bold" className="text-[#6B7280] shrink-0 ml-2" />
        </div>
      </div>

      {/* Grid for Amount & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {/* Amount Input Column */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
            Amount
          </span>
          <div className="box-border flex flex-row items-center px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px]">
            <span className="font-[700] text-[14px] leading-[20px] text-[#CCFF00] mr-2">
              ₹
            </span>
            <input 
              type="text" 
              defaultValue="3,999"
              className="w-full bg-transparent font-[600] text-[12px] leading-[16px] text-white focus:outline-none"
            />
          </div>
          {/* Info Subtext Pill */}
          <div className="flex flex-row items-start gap-2 px-1 mt-0.5">
            <Info size={14} weight="fill" className="text-[#CCFF01] shrink-0 mt-[1px]" />
            <span className="font-[400] text-[11px] leading-[14px] text-[#9CA3AF]">
              Amount is auto-filled based on the selected membership plan.
            </span>
          </div>
        </div>

        {/* Payment Date Column */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
            Payment Date
          </span>
          <div className="box-border flex flex-row items-center justify-between px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px] cursor-pointer">
            <div className="flex flex-row items-center gap-3">
              <CalendarBlank size={16} weight="bold" className="text-[#CCFF01] shrink-0" />
              <span className="font-[500] text-[12px] leading-[16px] text-white">
                29 Jul 2026
              </span>
            </div>
            <CaretDown size={14} weight="bold" className="text-[#6B7280] shrink-0" />
          </div>
        </div>
      </div>

      {/* Grid for Time & Transaction Ref */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {/* Payment Time */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
            Payment Time
          </span>
          <div className="box-border flex flex-row items-center justify-between px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px] cursor-pointer">
            <div className="flex flex-row items-center gap-3">
              <Clock size={16} weight="bold" className="text-[#CCFF01] shrink-0" />
              <span className="font-[500] text-[12px] leading-[16px] text-white">
                06:42 PM
              </span>
            </div>
            <CaretDown size={14} weight="bold" className="text-[#6B7280] shrink-0" />
          </div>
        </div>

        {/* Transaction Reference (Optional) - Only show if QR */}
        {paymentMethod === "qr" && (
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
              Transaction Reference (Optional)
            </span>
            <div className="box-border flex flex-row items-center px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px]">
              <FileText size={16} weight="bold" className="text-[#CCFF01] shrink-0 mr-3" />
              <input 
                type="text" 
                placeholder="Enter UTR / Transaction ID"
                className="w-full bg-transparent font-[400] text-[12px] leading-[14px] text-white placeholder-[#6B7280] focus:outline-none"
              />
            </div>
            <div className="flex flex-row items-start px-1 mt-0.5">
              <span className="font-[400] text-[11px] leading-[16px] text-[#6B7280]">
                Enter UTR or Transaction ID from your bank statement (if any).
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Notes (Optional) */}
      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Notes (Optional)
        </span>
        <div className="box-border flex flex-col items-start p-3 w-full h-[74px] bg-[#15181E] border border-[#282D36] rounded-[12px] relative">
          <div className="flex flex-row items-start gap-3 w-full h-full">
            <PencilSimple size={16} weight="bold" className="text-[#CCFF01] shrink-0 mt-0.5" />
            <textarea 
              placeholder="Add any notes..."
              className="w-full h-full bg-transparent font-[400] text-[12px] leading-[16px] text-white placeholder-[#6B7280] focus:outline-none resize-none"
            />
          </div>
          <span className="absolute bottom-2.5 right-3.5 font-[400] text-[10px] leading-[15px] text-[#6B7280]">
            0/100
          </span>
        </div>
      </div>

      {/* Cash Info Message (Mobile Only) */}
      {paymentMethod === "cash" && (
        <div className="flex flex-row items-start gap-3 px-4 py-3 w-full bg-[#1A1810] border border-[#3E3812] rounded-[12px]">
          <Info size={16} weight="fill" className="text-[#F59E0B] shrink-0 mt-0.5" />
          <span className="font-[400] text-[12px] leading-[16px] text-[#F59E0B]">
            This payment will be recorded under the selected membership plan.
          </span>
        </div>
      )}

      {/* Form Action Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center pt-2 gap-3 w-full">
        <button 
          onClick={onSave}
          className="flex flex-col justify-center items-center py-3 w-full md:flex-1 h-[44px] bg-[#CCFF00] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(26,46,5,0.2),0px_4px_6px_-4px_rgba(26,46,5,0.2)] hover:bg-[#b8e600] transition-colors cursor-pointer"
        >
          <span className="font-[700] text-[14px] leading-[16px] text-center text-black">
            Save Payment
          </span>
        </button>
        <button className="box-border flex flex-col justify-center items-center py-3 w-full md:w-[128px] h-[44px] bg-[#181B21] border border-[#282D36] rounded-[12px] hover:bg-[#1f232a] transition-colors cursor-pointer">
          <span className="font-[600] text-[14px] leading-[16px] text-center text-[#D1D5DB]">
            Cancel
          </span>
        </button>
      </div>

    </div>
  );
}
