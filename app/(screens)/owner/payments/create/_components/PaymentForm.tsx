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
import { useState, useMemo, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import { useGymMembershipPlans } from "@/lib/hooks/useGymMembershipPlans";
import { useSaveGymPayment } from "@/lib/hooks/useGymPayments";
import toast from "react-hot-toast";

interface PaymentFormProps {
  paymentMethod: "cash" | "qr";
  setPaymentMethod: (method: "cash" | "qr") => void;
  onSave?: (paymentDetails: any) => void;
  onFormChange?: (formData: any) => void;
}

export default function PaymentForm({ paymentMethod, setPaymentMethod, onSave, onFormChange }: PaymentFormProps) {
  const { user, roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;
  const userId = user?.id;

  const { data: customers = [] } = useGymCustomers(gymId);
  const { data: plans = [] } = useGymMembershipPlans(userId || null);
  const savePaymentMutation = useSaveGymPayment();

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentTime, setPaymentTime] = useState(new Date().toTimeString().substring(0, 5));
  const [transactionId, setTransactionId] = useState("");
  const [notes, setNotes] = useState("");

  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return customers;
    return customers.filter((c: any) => 
      c.fullName?.toLowerCase().includes(customerSearch.toLowerCase()) || 
      c.phone?.includes(customerSearch)
    );
  }, [customers, customerSearch]);

  const selectedCustomer = customers.find((c: any) => c.customerId === selectedCustomerId);
  const selectedPlan = plans.find((p: any) => p.planId === selectedPlanId);

  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        customer: selectedCustomer,
        plan: selectedPlan,
        amount,
        paymentDate,
        paymentTime,
        transactionId,
        notes
      });
    }
  }, [selectedCustomer, selectedPlan, amount, paymentDate, paymentTime, transactionId, notes, onFormChange]);

  const handleSave = () => {
    if (!selectedCustomerId || !selectedPlanId || !amount) {
      toast.error("Please select a member, a plan, and enter the amount.");
      return;
    }

    const payload = {
      customerId: selectedCustomerId,
      gymId: gymId,
      planId: selectedPlanId,
      paymentMethod: paymentMethod === 'qr' ? 'qrscan' : 'cash',
      amountPaid: parseFloat(amount),
      paymentDate,
      paymentTime,
      transactionId: paymentMethod === 'qr' ? transactionId : null,
      notes,
      paymentTakenBy: roleData?.[0]?.gymOwnerId || userId || "System"
    };

    savePaymentMutation.mutate(payload, {
      onSuccess: (data) => {
        if (onSave) {
          onSave({
            member: selectedCustomer?.fullName,
            planName: selectedPlan?.planName,
            planDuration: `${selectedPlan?.durationMonths} Month(s)`,
            amount: `₹${amount}`,
            method: paymentMethod,
            date: paymentDate,
            time: paymentTime,
            referenceId: paymentMethod === 'qr' ? transactionId : undefined
          });
        }
      },
      onError: (err) => {
        toast.error("Failed to save payment.");
        console.error(err);
      }
    });
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full lg:col-span-7 xl:col-span-8 relative">
      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Payment Method
        </span>
        <div className="box-border flex flex-row items-stretch p-1 gap-1 w-full h-[50px] bg-[#13161B] border border-[#282D36] rounded-[12px]">
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`flex flex-row justify-center items-center gap-2.5 flex-1 h-full rounded-[8px] transition-all duration-200 cursor-pointer ${paymentMethod === "cash"
              ? "bg-[#CCFF00] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
              : "bg-transparent hover:bg-[#1a1e26]"
              }`}
          >
            <Money size={16} weight={paymentMethod === "cash" ? "fill" : "bold"} className={paymentMethod === "cash" ? "text-black" : "text-[#D1D5DB]"} />
            <span className={`font-[${paymentMethod === "cash" ? "700" : "500"}] text-[12px] leading-[16px] text-center ${paymentMethod === "cash" ? "text-black" : "text-[#D1D5DB]"}`}>
              Cash
            </span>
          </button>
          <button
            onClick={() => setPaymentMethod("qr")}
            className={`flex flex-row justify-center items-center gap-2.5 flex-1 h-full rounded-[8px] transition-all duration-200 cursor-pointer ${paymentMethod === "qr"
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

      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Select Member
        </span>
        <div className="relative w-full">
          <div
            onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
            className="box-border flex flex-row items-center justify-between px-3.5 py-3 w-full min-h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px] cursor-pointer hover:border-[#38404f] transition-colors"
          >
            <div className="flex flex-row items-center gap-3 w-full">
              <User size={16} weight="bold" className="text-[#CCFF00] shrink-0" />
              <input
                type="text"
                placeholder="Search member by name or mobile..."
                value={isCustomerDropdownOpen ? customerSearch : (selectedCustomer?.fullName || "")}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  setIsCustomerDropdownOpen(true);
                }}
                className="w-full bg-transparent font-[400] text-[12px] leading-[14px] text-white placeholder-[#6B7280] focus:outline-none"
              />
            </div>
            <CaretDown size={14} weight="bold" className="text-[#6B7280] shrink-0 ml-2" />
          </div>
          {isCustomerDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-[#1A1E28] border border-[#282D36] rounded-[12px] shadow-lg max-h-[200px] overflow-y-auto z-50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c: any) => (
                  <div
                    key={c.customerId}
                    onClick={() => {
                      setSelectedCustomerId(c.customerId);
                      setCustomerSearch("");
                      setIsCustomerDropdownOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-[#252A36] cursor-pointer transition-colors border-b border-[#282D36] last:border-0"
                  >
                    <div className="text-white text-[12px] font-[500]">{c.fullName}</div>
                    <div className="text-[#9CA3AF] text-[11px]">{c.phone}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-[#9CA3AF] text-[12px]">No members found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Membership Plan
        </span>
        <div className="relative w-full">
          <div
            onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
            className="box-border flex flex-row items-center justify-between px-3.5 py-2.5 w-full min-h-[54px] bg-[#15181E] border border-[#282D36] rounded-[12px] cursor-pointer hover:border-[#38404f] transition-colors"
          >
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row justify-center items-center w-8 h-8 bg-[#202715] rounded-full shrink-0">
                <Crown size={16} weight="fill" className="text-[#CCFF00]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-[700] text-[12px] leading-[15px] text-white">
                  {selectedPlan ? selectedPlan.planName : "Select Membership Plan"}
                </span>
                <span className="font-[400] text-[11px] leading-[14px] text-[#9CA3AF]">
                  {selectedPlan ? `${selectedPlan.durationMonths} Month(s)` : "Choose a plan"}
                </span>
              </div>
            </div>
            <CaretDown size={14} weight="bold" className="text-[#6B7280] shrink-0 ml-2" />
          </div>
          {isPlanDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-[#1A1E28] border border-[#282D36] rounded-[12px] shadow-lg max-h-[200px] overflow-y-auto z-50">
              {plans.map((p: any) => (
                <div
                  key={p.planId}
                  onClick={() => {
                    setSelectedPlanId(p.planId);
                    setAmount(p.price?.toString() || "");
                    setIsPlanDropdownOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-[#252A36] cursor-pointer transition-colors border-b border-[#282D36] last:border-0 flex flex-row justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="text-white text-[12px] font-[500]">{p.planName}</span>
                    <span className="text-[#9CA3AF] text-[11px]">{p.durationMonths} Month(s)</span>
                  </div>
                  <span className="text-[#CCFF00] text-[12px] font-[600]">₹{p.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent font-[600] text-[12px] leading-[16px] text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-row items-start gap-2 px-1 mt-0.5">
            <Info size={14} weight="fill" className="text-[#CCFF01] shrink-0 mt-[1px]" />
            <span className="font-[400] text-[11px] leading-[14px] text-[#9CA3AF]">
              Amount is auto-filled based on the selected membership plan.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
            Payment Date
          </span>
          <div className="box-border flex flex-row items-center justify-between px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px] relative cursor-text">
            <div className="flex flex-row items-center gap-3 w-full">
              <CalendarBlank size={16} weight="bold" className="text-[#CCFF01] shrink-0" />
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full bg-transparent font-[500] text-[12px] leading-[16px] text-white focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
            Payment Time
          </span>
          <div className="box-border flex flex-row items-center justify-between px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px] relative cursor-text">
            <div className="flex flex-row items-center gap-3 w-full">
              <Clock size={16} weight="bold" className="text-[#CCFF01] shrink-0" />
              <input
                type="time"
                value={paymentTime}
                onChange={(e) => setPaymentTime(e.target.value)}
                className="w-full bg-transparent font-[500] text-[12px] leading-[16px] text-white focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {paymentMethod === "qr" && (
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
              Transaction Reference (Optional)
            </span>
            <div className="box-border flex flex-row items-center px-3.5 py-3 w-full h-[46px] bg-[#15181E] border border-[#282D36] rounded-[12px]">
              <FileText size={16} weight="bold" className="text-[#CCFF01] shrink-0 mr-3" />
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
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

      <div className="flex flex-col items-start gap-2 w-full">
        <span className="font-[600] text-[12px] leading-[16px] text-[#D1D5DB]">
          Notes (Optional)
        </span>
        <div className="box-border flex flex-col items-start p-3 w-full h-[74px] bg-[#15181E] border border-[#282D36] rounded-[12px] relative">
          <div className="flex flex-row items-start gap-3 w-full h-full">
            <PencilSimple size={16} weight="bold" className="text-[#CCFF01] shrink-0 mt-0.5" />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              className="w-full h-full bg-transparent font-[400] text-[12px] leading-[16px] text-white placeholder-[#6B7280] focus:outline-none resize-none"
            />
          </div>
          <span className="absolute bottom-2.5 right-3.5 font-[400] text-[10px] leading-[15px] text-[#6B7280]">
            {notes.length}/100
          </span>
        </div>
      </div>

      {paymentMethod === "cash" && (
        <div className="flex flex-row items-start gap-3 px-4 py-3 w-full bg-[#1A1810] border border-[#3E3812] rounded-[12px]">
          <Info size={16} weight="fill" className="text-[#F59E0B] shrink-0 mt-0.5" />
          <span className="font-[400] text-[12px] leading-[16px] text-[#F59E0B]">
            This payment will be recorded under the selected membership plan.
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-stretch md:items-center pt-2 gap-3 w-full">
        <button
          onClick={handleSave}
          disabled={savePaymentMutation.isPending}
          className="flex flex-col justify-center items-center py-3 w-full md:flex-1 h-[44px] bg-[#CCFF00] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(26,46,5,0.2),0px_4px_6px_-4px_rgba(26,46,5,0.2)] hover:bg-[#b8e600] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-[700] text-[14px] leading-[16px] text-center text-black">
            {savePaymentMutation.isPending ? "Saving..." : "Save Payment"}
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
