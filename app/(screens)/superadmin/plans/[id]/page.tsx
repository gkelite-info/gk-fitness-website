"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CurrencyInr, User, List, CalendarBlank, CheckCircle, PencilSimple, Prohibit } from "@phosphor-icons/react";
import ConfirmationModal from "../../../components/reusable/ConfirmationModal";
import toast from "react-hot-toast";

export default function PlanDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const [planData, setPlanData] = useState({
    name: "Gold",
    badge: "White Label",
    status: "Active",
    price: "3,499",
    billingCycle: "/ month",
    planFor: "Gym Owner",
    createdOn: "Jan 15, 2024",
    lastUpdated: "Mar 10, 2024",
    features: [
      "Own Gym Label",
      "Inventory Management",
      "Biometric Management System",
      "Basic Reports",
      "Multiple Owner Login",
      "Advanced Analytics",
      "Customer Management",
      "Member App Access",
      "Attendance Tracking",
      "Priority Support"
    ]
  });

  const isInactive = planData.status.toLowerCase() === "inactive" || planData.status.toLowerCase() === "deactivated";
  const statusBgStyle = isInactive ? "bg-red-500/10" : "bg-[#13281B]";
  const statusBorderStyle = isInactive ? "border-red-500/20" : "border-[#1E462D]";
  const statusDotColor = isInactive ? "text-red-500" : "text-[#4ADE80]";
  const statusTextColor = isInactive ? "text-red-500" : "text-[#4ADE80]";

  const handleDeactivate = () => {
    setIsDeactivating(true);
    setTimeout(() => {
      setIsDeactivating(false);
      setIsDeactivateModalOpen(false);
      setPlanData(prev => ({ ...prev, status: "Deactivated" }));
      localStorage.setItem(`mock_plan_status_${id}`, "Deactivated");
      toast.success("Plan deactivated successfully!", { id: "deactivate-success" });
    }, 1000);
  };

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col items-center bg-[#0C0D10] text-white overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => router.back()} 
              className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#9CA3AF] hover:text-white"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
              Plan Details
            </h1>
          </div>
          <p className="text-[12px] font-normal text-[#9CA3AF] ml-[52px] sm:ml-[56px]">
            View subscription plan details and included features.
          </p>
        </div>

        <div className="w-full flex flex-col p-6 sm:p-8 rounded-xl bg-[#101620] border border-[#1D2634]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight">{planData.name}</h2>
              {planData.badge && (
                <div className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A2029] text-[#D1D5DB] border border-[#303744]">
                  {planData.badge}
                </div>
              )}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusBgStyle} border ${statusBorderStyle} shrink-0`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isInactive ? "bg-red-500" : "bg-[#4ADE80]"}`} />
                <span className={`text-[10px] font-bold ${statusTextColor} uppercase tracking-wider`}>{planData.status}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={() => router.push(`/superadmin/plans/edit/${id}`)}
                className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg text-black font-bold text-xs hover:brightness-110 transition-all active:scale-[0.98]"
              >
                <PencilSimple size={14} weight="bold" /> <span className="whitespace-nowrap">Edit Plan</span>
              </button>
              <button
                onClick={() => setIsDeactivateModalOpen(true)}
                className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 border border-red-500/30 hover:border-red-500 bg-transparent hover:bg-red-500/10 rounded-lg text-red-500 font-bold text-xs transition-colors"
              >
                <Prohibit size={14} weight="bold" /> <span className="whitespace-nowrap">Deactivate Plan</span>
              </button>
            </div>
          </div>

          <div className="flex items-end gap-1 mt-6">
            <span className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight flex items-center gap-1">
              <CurrencyInr size={32} weight="bold" className="mb-1" />
              {planData.price}
            </span>
            <span className="text-xs font-medium text-[#9CA3AF] mb-2 sm:mb-3">{planData.billingCycle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 py-6 my-6 border-y border-[#1D2634]">
            <div className="flex items-center gap-3 sm:border-r border-[#1D2634] pr-4">
              <div className="p-2 rounded-full border border-[#232B36] bg-[#1A2029] shrink-0">
                <User size={18} weight="regular" className="text-[#9CA3AF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-[#6B7280] whitespace-nowrap">Plan For</span>
                <span className="text-[13px] font-bold text-white break-words">{planData.planFor}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:border-r border-[#1D2634] pr-4">
              <div className="p-2 rounded-full border border-[#232B36] bg-[#1A2029] shrink-0">
                <List size={18} weight="regular" className="text-[#9CA3AF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-[#6B7280] whitespace-nowrap">Total Features</span>
                <span className="text-[13px] font-bold text-white break-words">{planData.features.length} Features</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:border-r lg:border-r border-[#1D2634] pr-4">
              <div className="p-2 rounded-full border border-[#232B36] bg-[#1A2029] shrink-0">
                <CalendarBlank size={18} weight="regular" className="text-[#9CA3AF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-[#6B7280] whitespace-nowrap">Created On</span>
                <span className="text-[13px] font-bold text-white break-words">{planData.createdOn}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border border-[#232B36] bg-[#1A2029] shrink-0">
                <CalendarBlank size={18} weight="regular" className="text-[#9CA3AF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-[#6B7280] whitespace-nowrap">Last Updated</span>
                <span className="text-[13px] font-bold text-white break-words">{planData.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-bold text-white">Features Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {planData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 w-full bg-[#131920] border border-[#232B36] rounded-xl px-4 py-3.5">
                  <CheckCircle size={18} weight="fill" className="text-[#BBF246] shrink-0" />
                  <span className="text-xs font-semibold text-white break-words">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Plan"
        message={`Are you sure you want to deactivate the ${planData.name} plan? Gym owners on this plan will not be able to renew it.`}
        confirmText="Yes, Deactivate"
        isConfirming={isDeactivating}
        isDestructive={true}
      />
    </div>
  );
}
