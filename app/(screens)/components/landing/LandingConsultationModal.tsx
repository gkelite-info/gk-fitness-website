"use client";

import { useState } from "react";
import { X, Sparkle, CircleNotch, CheckCircle } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { submitConsultationRequest, ConsultationFormData } from "@/app/actions/consultation";

interface LandingConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LandingConsultationModal({ isOpen, onClose }: LandingConsultationModalProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: "",
    gymName: "",
    phone: "",
    city: "",
    memberCount: "100 - 300",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.gymName.trim() || !formData.phone.trim()) {
      toast.error("Please fill in your name, gym name, and phone number.");
      return;
    }

    setLoading(true);
    const res = await submitConsultationRequest(formData);
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Consultation request received!");
      setSubmitted(true);
    } else {
      toast.error(res.error || "Failed to submit request.");
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      gymName: "",
      phone: "",
      city: "",
      memberCount: "100 - 300",
      notes: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#14151A] border border-[#232631] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#232631] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32]">
              <Sparkle size={18} weight="fill" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Book Free Consultation</h3>
              <p className="text-xs text-[#94A3B8]">Transform your gym with GK Fitness</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2028] transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32] mb-4">
                <CheckCircle size={36} weight="fill" />
              </div>
              <h4 className="text-xl font-bold text-white">Request Received!</h4>
              <p className="text-sm text-[#94A3B8] mt-2 max-w-sm">
                Thank you for your interest. A GK Fitness operations specialist will get in touch with you shortly to schedule your live walkthrough.
              </p>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-6 h-11 px-6 rounded-xl bg-[#D4FF32] text-black font-bold text-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    Gym / Fitness Club Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Iron Pulse Gym"
                    value={formData.gymName}
                    onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Bangalore"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    Current Active Members
                  </label>
                  <select
                    value={formData.memberCount}
                    onChange={(e) => setFormData({ ...formData, memberCount: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
                  >
                    <option value="Under 100">Under 100 members</option>
                    <option value="100 - 300">100 - 300 members</option>
                    <option value="300 - 600">300 - 600 members</option>
                    <option value="600+">600+ members</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Specific Challenges (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We struggle with proxy attendance and lost renewal follow-ups..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,50,0.3)] active:scale-[0.98] cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <CircleNotch size={18} className="animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  "Confirm Free Consultation"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
