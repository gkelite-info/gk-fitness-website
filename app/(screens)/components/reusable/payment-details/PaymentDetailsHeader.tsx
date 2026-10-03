"use client";

import { useState } from "react";
import { CaretLeft, DownloadSimple, Spinner, PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { downloadPdf } from "./utils/downloadPdf";
import { PaymentDetailsData } from "./types";
import { sendPaymentSuccessEmail } from "@/lib/helpers/emailService";

export default function PaymentDetailsHeader({ data }: { data?: PaymentDetailsData & { gymName?: string } }) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadPdf("payment-invoice-content", "payment-invoice.pdf");
      toast.success("Invoice downloaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to download invoice.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!data || !data.email || data.email === "--") {
      toast.error("Customer does not have a valid email address.");
      return;
    }
    
    setIsSendingEmail(true);
    try {
      const result = await sendPaymentSuccessEmail({
        email: data.email,
        name: data.memberName,
        memberCode: data.memberCode,
        amount: data.amountPaid,
        transactionId: data.transactionId,
        planName: data.membershipPlan,
        date: data.paymentDate + (data.paymentTime !== "--" ? " " + data.paymentTime : ""),
        gymName: data.gymName
      });

      if (result.success) {
        toast.success("Receipt sent to customer successfully!");
      } else {
        toast.error(result.error || "Failed to send email.");
      }
    } catch (error: any) {
      toast.error("Failed to send email.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pb-2 gap-4">
      <div className="flex flex-wrap sm:flex-nowrap flex-row items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-9 h-9 bg-[#131722] border border-[#1F2433] rounded-xl hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        >
          <CaretLeft size={16} className="text-[#CBD5E1]" />
        </button>
        <h2 className="font-sans font-bold text-xl sm:text-2xl leading-8 tracking-[-0.6px] text-white m-0 whitespace-nowrap">
          Payment Details
        </h2>
        
        <div className="flex flex-row items-center px-2.5 py-1 gap-1.5 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] rounded-full h-[26px] shrink-0">
          <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full shrink-0" />
          <span className="font-sans font-semibold text-xs text-[#34D399] whitespace-nowrap">
            Completed & Verified
          </span>
        </div>
      </div>

      <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
        <button 
          onClick={handleSendEmail}
          disabled={isSendingEmail || !data || !data.email || data.email === "--"}
          className={`flex flex-row justify-center items-center px-4 py-2 gap-2 bg-[#131722] border border-[#1E2638] rounded-xl hover:bg-[#1E2638] transition-colors h-8 w-full sm:w-auto ${isSendingEmail || !data || !data.email || data.email === "--" ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isSendingEmail ? (
            <Spinner size={14} weight="bold" className="text-[#CBD5E1] shrink-0 animate-spin" />
          ) : (
            <PaperPlaneRight size={14} weight="bold" className="text-[#CBD5E1] shrink-0" />
          )}
          <span className="font-sans font-semibold text-xs text-[#CBD5E1] text-center whitespace-nowrap">
            {isSendingEmail ? "Sending..." : "Send via Email"}
          </span>
        </button>

        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex flex-row justify-center items-center px-4 py-2 gap-2 bg-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.3)] rounded-xl hover:bg-[#bce600] transition-colors h-8 w-full sm:w-auto ${isDownloading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isDownloading ? (
            <Spinner size={14} weight="bold" className="text-black shrink-0 animate-spin" />
          ) : (
            <DownloadSimple size={14} weight="bold" className="text-black shrink-0" />
          )}
          <span className="font-sans font-bold text-xs text-black text-center whitespace-nowrap">
            {isDownloading ? "Downloading..." : "Download PDF Invoice"}
          </span>
        </button>
      </div>
    </div>
  );
}
