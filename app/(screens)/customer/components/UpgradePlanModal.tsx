"use client";

import { X, CheckCircle, Info } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getAvailablePlans } from "@/app/actions/customer/getAvailablePlans";

interface UpgradePlanModalProps {
  gymId: string;
  onClose: () => void;
}

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

export default function UpgradePlanModal({ gymId, onClose }: UpgradePlanModalProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      if (gymId) {
        const fetchedPlans = await getAvailablePlans(gymId);
        setPlans(fetchedPlans);
      }
      setLoading(false);
    }
    fetchPlans();
  }, [gymId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#222222] rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#222222]">
          <h2 className="text-white text-xl font-bold">Membership Plans</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-2 border-[#D7FF00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : plans.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="bg-[#1A1A1A] rounded-xl p-4 flex gap-3 items-start border border-[#2A2A2A]">
                <Info size={20} className="text-[#D7FF00] shrink-0 mt-0.5" weight="fill" />
                <p className="text-[#8E8E93] text-xs leading-relaxed">
                  To avoid app store fees, please contact your gym directly or visit the front desk to purchase or renew a plan. Your account will automatically sync once activated.
                </p>
              </div>

              {plans.map((plan) => (
                <div key={plan.planId} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#3A3A3A] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{plan.planName}</h3>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-[#D7FF00]" weight="fill" />
                        <span className="text-[#8E8E93] text-xs">
                          {plan.durationMonths} Month{plan.durationMonths > 1 ? 's' : ''} Access
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-xl font-bold">${plan.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <span className="text-[#8E8E93] text-sm">No plans available right now.</span>
              <span className="text-[#8E8E93] text-xs mt-1">Please contact your gym.</span>
            </div>
          )}
        </div>
        
        <div className="p-5 border-t border-[#222222] bg-[#141414]">
          <button 
            onClick={onClose}
            className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
