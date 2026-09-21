"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import PaymentForm from "./_components/PaymentForm";
import PaymentSummary from "./_components/PaymentSummary";
import PaymentSuccessModal from "@/app/(screens)/components/reusable/modals/PaymentSuccessModal";

export default function AddPaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qr">("qr");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock payment details for demo
  const mockPaymentDetails = {
    member: "Rahul Sharma",
    planName: "Gold Membership",
    planDuration: "1 Month",
    amount: "₹3,999",
    method: paymentMethod,
    date: "29 Jul 2026",
    time: "06:42 PM",
    referenceId: paymentMethod === "qr" ? "UTR5578224193" : undefined
  };

  return (
    <>
      <div className="w-full h-full flex flex-col bg-[#0C0E11] overflow-y-auto scrollbar-themed relative">
        <div className="flex flex-col p-6 md:p-8 max-w-[1020px] mx-auto w-full gap-6 pb-8 md:pb-12">
          
          {/* Breadcrumb */}
          <div className="flex flex-row items-center gap-2 w-full">
            <span className="font-[400] text-[12px] leading-[16px] text-[#6B7280] cursor-pointer hover:text-white transition-colors" onClick={() => router.push('/owner/payments')}>
              Payments
            </span>
            <CaretRight size={12} weight="bold" className="text-[#6B7280]" />
            <span className="font-[500] text-[12px] leading-[16px] text-[#D1D5DB]">
              Add Payment
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col items-start gap-1 w-full mb-2">
            <h1 className="font-[700] text-[24px] md:text-[32px] leading-[32px] md:leading-[40px] tracking-[-0.6px] text-white m-0">
              Add Payment
            </h1>
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF]">
              Manually add payment received via QR or Cash
            </span>
          </div>

          {/* Grid Content Layout: Left Form & Right Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full relative">
            <PaymentForm 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod} 
              onSave={() => setIsModalOpen(true)}
            />
            <PaymentSummary paymentMethod={paymentMethod} />
          </div>
        </div>
      </div>

      <PaymentSuccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onViewPayments={() => router.push("/owner/payments")}
        onAddAnother={() => {
          setIsModalOpen(false);
          // In real app, reset form fields here
        }}
        paymentDetails={mockPaymentDetails}
      />
    </>
  );
}
