"use client";

import { ArrowLeft, CheckCircle, Wallet, CalendarBlank, Bank, QrCode, Ticket, CalendarPlus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface DetailRow {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ActivitySummary {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface TransactionDetailsViewProps {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  amountTitle?: string;
  amountStatus?: string;
  amountStatusColor?: "success" | "warning" | "error"; 
  amount?: string;
  amountDateText?: string;
  summaryData?: DetailRow[];
  successMessage?: string;
  activityData?: ActivitySummary[];
}

export default function TransactionDetailsView({
  onBack,
  title = "Payout Details",
  subtitle = "Review FitPass payout information",
  amountTitle = "May 2026 Payout",
  amountStatus = "Paid",
  amountStatusColor = "success",
  amount = "₹18,500",
  amountDateText = "Paid on 31 May 2026",
  summaryData,
  successMessage = "Your payout has been successfully processed and credited to your account.",
  activityData,
}: TransactionDetailsViewProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Default summary data based on the design
  const defaultSummaryData: DetailRow[] = summaryData || [
    { icon: <Wallet size={18} weight="regular" />, label: "Amount Due", value: "₹18,500" },
    { icon: <CalendarBlank size={18} weight="regular" />, label: "Calculated Date", value: "31 May 2026" },
    { icon: <Bank size={18} weight="regular" />, label: "Payment Method", value: "Bank Transfer" },
  ];

  // Default activity data based on the design
  const defaultActivityData: ActivitySummary[] = activityData || [
    { icon: <QrCode size={16} className="text-[#CCFF00]" />, label: "Total Check-Ins", value: "186" },
    { icon: <Ticket size={16} className="text-[#CCFF00]" />, label: "Day Pass Visits", value: "64" },
    { icon: <CalendarPlus size={16} className="text-[#CCFF00]" />, label: "Monthly Pass Visits", value: "122" },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-transparent max-w-5xl mx-auto pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 pb-6 border-b border-[#1D222B]">
        <div className="flex flex-row items-center gap-3">
          <button 
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex flex-col items-start gap-0.5">
            <h1 className="font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
              {title}
            </h1>
            <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8]">
              {subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area - Using CSS Grid for SaaS Desktop Look */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-6 w-full">
        
        {/* Left Column - Core Details */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          
          {/* Payout Hero Card - Premium Gradient & Accent */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#111418] to-[#161B22] border border-[#1D222B] rounded-[16px] p-5 flex flex-col gap-0.5 shadow-[0_8px_32px_-12px_rgba(204,255,0,0.05)]">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent opacity-70" />
            
            <div className="flex flex-row items-center justify-between mb-2 z-10">
              <span className="font-[600] text-[13px] text-[#94A3B8] uppercase tracking-wider">
                {amountTitle}
              </span>
              <div className="px-2.5 py-1 rounded-full bg-[#CCFF00]/10 ring-1 ring-inset ring-[#CCFF00]/20 flex items-center justify-center">
                <span className="font-[700] text-[11px] text-[#CCFF00] tracking-wide">
                  {amountStatus}
                </span>
              </div>
            </div>
            
            <h1 className="font-[700] text-[32px] md:text-[36px] text-[#CCFF00] tracking-tight mb-2 z-10">
              {amount}
            </h1>
            
            <div className="flex flex-row items-center gap-1.5 text-[#CCFF00] z-10">
              <CheckCircle size={16} weight="fill" />
              <span className="font-[500] text-[13px]">
                {amountDateText}
              </span>
            </div>
            
            {/* Decorative Background Element */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#CCFF00] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* FitPass Activity Summary - Grid of Mini Cards */}
          <div className="flex flex-col gap-2">
            <h3 className="font-[600] text-[13px] leading-[16px] text-white px-1 uppercase tracking-wider">
              Activity Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {defaultActivityData.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 bg-[#111418] border border-[#1D222B] rounded-[16px] p-3.5 hover:border-[#2A313C] transition-colors">
                  <div className="w-7 h-7 rounded-full border border-[#1D222B] bg-[#1A1F26] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-[500] text-[11px] text-[#64748B]">
                      {item.label}
                    </span>
                    <span className="font-[700] text-[15px] text-[#CCFF00]">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Success Banner - Accent Border Style */}
          <div className="flex flex-row items-start md:items-center gap-3 p-3.5 bg-[#141A10] border border-[#CCFF00]/20 border-l-4 border-l-[#CCFF00] rounded-[12px]">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#CCFF00] shrink-0 bg-[#CCFF00]/10">
              <CheckCircle size={16} weight="fill" />
            </div>
            <p className="font-[500] text-[12px] leading-[18px] text-[#CCFF00]/80">
              {successMessage}
            </p>
          </div>

        </div>

        {/* Right Column - Summary & Details */}
        <div className="flex flex-col gap-5 lg:col-span-1 h-full">
          
          <div className="flex flex-col gap-3 h-full">
            <h3 className="font-[600] text-[14px] leading-[16px] text-white px-1 uppercase tracking-wider">
              Transaction Breakdown
            </h3>
            {/* Receipt Style Container */}
            <div className="flex flex-col bg-[#111418] border border-[#1D222B] rounded-[16px] overflow-hidden shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] h-full justify-between">
              <div className="flex flex-col p-2">
                {defaultSummaryData.map((row, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-row items-center justify-between p-4 ${idx !== defaultSummaryData.length - 1 ? 'border-b border-dashed border-[#2A313C]' : ''}`}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1F26] flex items-center justify-center text-[#94A3B8]">
                        {row.icon}
                      </div>
                      <span className="font-[500] text-[13px] text-[#94A3B8]">
                        {row.label}
                      </span>
                    </div>
                    <span className="font-[700] text-[14px] text-white">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Receipt Total Footer */}
              <div className="bg-[#0C0E11] p-5 border-t border-[#1D222B] flex flex-row items-center justify-between mt-auto">
                <span className="font-[600] text-[12px] text-[#64748B] uppercase tracking-widest">Total Settled</span>
                <span className="font-[700] text-[16px] text-[#CCFF00]">{amount}</span>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
