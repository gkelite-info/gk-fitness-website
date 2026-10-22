"use client";

import { X, ShieldCheck, CheckCircle, Barbell, CalendarCheck, CaretDown } from "@phosphor-icons/react";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import { useGlobalTrainers } from "@/lib/hooks/globalTrainers/useGlobalTrainers";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import { createTrainerRazorpayOrder } from "@/app/actions/customer/createTrainerRazorpayOrder";
import { verifyTrainerPaymentAndAssign } from "@/app/actions/customer/verifyTrainerPaymentAndAssign";

interface TrainerPaymentModalProps {
  trainerId?: string;
  trainerName?: string;
  trainerPrice?: number;
  specialization?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TrainerPaymentModal({
  trainerId,
  trainerName,
  trainerPrice,
  specialization,
  onClose,
  onSuccess,
}: TrainerPaymentModalProps) {
  const router = useRouter();
  const { user, profile } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: globalTrainers, isLoading: loadingTrainers } = useGlobalTrainers(true);

  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(trainerId || "");

  useEffect(() => {
    if (globalTrainers && globalTrainers.length > 0) {
      if (trainerId && globalTrainers.some((t: any) => t.globalTrainerId === trainerId)) {
        setSelectedTrainerId(trainerId);
      } else if (!selectedTrainerId || !globalTrainers.some((t: any) => t.globalTrainerId === selectedTrainerId)) {
        setSelectedTrainerId(globalTrainers[0].globalTrainerId);
      }
    }
  }, [globalTrainers, trainerId, selectedTrainerId]);

  const selectedTrainer = useMemo(() => {
    if (!globalTrainers || globalTrainers.length === 0) return null;
    return globalTrainers.find((t: any) => t.globalTrainerId === selectedTrainerId) || null;
  }, [globalTrainers, selectedTrainerId]);

  const activeTrainerName = selectedTrainer?.fullName || trainerName || "Personal Trainer";
  const activeTrainerPrice =
    selectedTrainer?.price != null && !isNaN(Number(selectedTrainer.price))
      ? Number(selectedTrainer.price)
      : Number(trainerPrice) || 499;
  const activeSpecialization = selectedTrainer?.specialization || specialization || "Fitness";

  const handlePayNow = async () => {
    if (!selectedTrainerId) return toast.error("Please select a trainer to continue.");
    if (!user?.id) return toast.error("User session expired. Please log in again.");

    try {
      setIsProcessing(true);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setIsProcessing(false);
        return toast.error("Failed to load Razorpay payment gateway SDK.");
      }

      const orderResult: any = await createTrainerRazorpayOrder({
        trainerId: selectedTrainerId,
        amount: activeTrainerPrice,
        trainerName: activeTrainerName,
      });

      if (!orderResult.success) {
        setIsProcessing(false);
        return toast.error(orderResult.error || "Failed to initiate payment gateway.");
      }

      const options: any = {
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency || "INR",
        name: "GK-Gym Life",
        description: `Personal Trainer Plan: ${activeTrainerName}`,
        prefill: {
          name: orderResult.customerName || profile?.name || "",
          email: orderResult.customerEmail || user?.email || "",
          contact: orderResult.customerPhone || "",
        },
        theme: { color: "#D7FF00" },
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "trainer-pay" });
            const verifyRes = await verifyTrainerPaymentAndAssign({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              trainerId: selectedTrainerId,
              amount: activeTrainerPrice,
            });

            if (verifyRes.success) {
              toast.success(`Booking confirmed with ${activeTrainerName}!`, { id: "trainer-pay" });
              onSuccess?.();
              onClose();
              if (typeof window !== "undefined") {
                window.location.href = "/customer";
              } else {
                router.refresh();
              }
            } else {
              toast.error(verifyRes.error || "Payment verification failed.", { id: "trainer-pay" });
            }
          } catch {
            toast.error("Payment confirmation failed on server.", { id: "trainer-pay" });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      if (orderResult.orderId) {
        options.order_id = orderResult.orderId;
      }

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(response.error?.description || "Payment failed or was cancelled.");
        setIsProcessing(false);
      });
      razorpayInstance.open();
    } catch {
      toast.error("An error occurred while connecting to Razorpay.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#262626] rounded-3xl w-full max-w-md flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#222222]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D7FF00]/15 flex items-center justify-center border border-[#D7FF00]/30">
              <Barbell size={18} className="text-[#D7FF00]" weight="fill" />
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold">Personal Trainer Plan</h2>
              <p className="text-[#8E8E93] text-xs">Direct 1-on-1 Coaching & Routine</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-[#8E8E93] text-[11px] uppercase tracking-wider font-semibold block mb-1.5">
              Choose Personal Trainer
            </label>
            <div className="relative">
              <select
                value={selectedTrainerId}
                onChange={(e) => setSelectedTrainerId(e.target.value)}
                className="w-full bg-[#1C1C1E] border border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-[#D7FF00]/60 transition-colors pr-8 cursor-pointer"
              >
                {loadingTrainers ? (
                  <option value="">Loading trainers...</option>
                ) : globalTrainers && globalTrainers.length > 0 ? (
                  globalTrainers
                    .filter((t: any) => !t.is_deleted && t.isActive !== false)
                    .map((t: any) => (
                      <option key={t.globalTrainerId} value={t.globalTrainerId}>
                        {t.fullName} • {t.specialization} (₹{t.price || 0}/mo)
                      </option>
                    ))
                ) : (
                  <option value={trainerId || ""}>
                    {activeTrainerName} (₹{activeTrainerPrice}/mo)
                  </option>
                )}
              </select>
              <CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] pointer-events-none" />
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[#8E8E93] text-[11px] uppercase tracking-wider font-semibold">Selected Trainer</span>
                <h3 className="text-white text-base font-bold">{activeTrainerName}</h3>
                <span className="text-[#D7FF00] text-xs font-medium capitalize">{activeSpecialization} Coach</span>
              </div>
              <div className="text-right">
                <span className="text-[#8E8E93] text-[11px] uppercase tracking-wider font-semibold">Monthly Fee</span>
                <div className="text-[#D7FF00] text-2xl font-bold">₹{activeTrainerPrice}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#262626] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#CCCCCC] text-xs">
                <CheckCircle size={15} className="text-[#34C759] shrink-0" weight="fill" />
                <span>1-Month Dedicated Personal Guidance</span>
              </div>
              <div className="flex items-center gap-2 text-[#CCCCCC] text-xs">
                <CheckCircle size={15} className="text-[#34C759] shrink-0" weight="fill" />
                <span>Custom Diet & Workout Routine Adjustments</span>
              </div>
              <div className="flex items-center gap-2 text-[#CCCCCC] text-xs">
                <CalendarCheck size={15} className="text-[#34C759] shrink-0" weight="fill" />
                <span>Flexible weekday timing & slot coordination</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1C200E] border border-[#3E4C14] rounded-2xl p-3.5 flex items-center gap-2.5">
            <ShieldCheck size={22} className="text-[#D7FF00] shrink-0" weight="fill" />
            <div className="flex-1">
              <p className="text-white text-xs font-semibold">Verified Razorpay Gateway</p>
              <p className="text-[#8E8E93] text-[11px]">Instant activation upon successful payment.</p>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-[#222222] bg-[#141414] flex flex-col gap-2.5">
          <button
            onClick={handlePayNow}
            disabled={isProcessing || !selectedTrainerId}
            className="w-full bg-[#D7FF00] hover:bg-[#bce000] text-black font-bold py-3.5 rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isProcessing ? (
              <span className="text-xs">Processing Booking...</span>
            ) : (
              <span className="text-sm">Pay ₹{activeTrainerPrice} & Assign Trainer</span>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#8E8E93] hover:text-white font-medium py-2.5 rounded-xl transition-colors text-xs cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
