"use client";

import { useState } from "react";
import { CircleNotch, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { submitConsultationRequest } from "@/app/actions/consultation";

export default function LandingAuditForm() {
  const [role, setRole] = useState("Owner / Co-owner");
  const [operating, setOperating] = useState("Yes, operating now");
  const [floorArea, setFloorArea] = useState("");
  const [name, setName] = useState("");
  const [gymName, setGymName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeContact, setAgreeContact] = useState(true);
  const [agreeMeta, setAgreeMeta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !gymName.trim() || !phone.trim() || !city.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!agreeContact) {
      toast.error("Please agree to let GK Fitness contact you regarding this enquiry.");
      return;
    }

    setLoading(true);
    const res = await submitConsultationRequest({
      fullName: name,
      gymName,
      phone,
      city,
      memberCount: `${floorArea || "2500+"} sq ft (${operating})`,
      notes: `Role: ${role}`,
    });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Audit requested successfully!");
      setSubmitted(true);
    } else {
      toast.error(res.error || "Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="w-full rounded-2xl bg-[#111216] border border-white/10 p-6 sm:p-8 text-center text-white">
        <div className="w-14 h-14 rounded-full bg-[#D4FF32]/20 border border-[#D4FF32]/40 flex items-center justify-center text-[#D4FF32] mx-auto mb-4">
          <CheckCircle size={32} weight="fill" />
        </div>
        <h3 className="text-xl font-bold">Audit Request Received!</h3>
        <p className="text-sm text-[#94A3B8] mt-2">
          Our operations specialist will review your gym floor metrics and call you today.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 h-10 px-6 rounded-xl bg-[#D4FF32] text-black font-extrabold text-xs uppercase tracking-wider"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div id="audit-form" className="w-full rounded-2xl bg-[#111216] border border-white/10 p-5 sm:p-7 shadow-2xl">
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Book your free gym audit
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
          For owners and co-owners of gyms of 2,500+ sq ft, running or opening soon. No payment or plan selection is needed to request it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            What is your role in this gym?
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none"
          >
            <option value="Owner / Co-owner">Owner / Co-owner</option>
            <option value="General Manager">General Manager / Center Head</option>
            <option value="Opening new gym">Opening a new gym</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Is your gym currently operating?
          </label>
          <select
            value={operating}
            onChange={(e) => setOperating(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none"
          >
            <option value="Yes, operating now">Yes, operating now</option>
            <option value="Opening soon">Opening soon (in next 30-60 days)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Gym floor area (sq ft)
          </label>
          <input
            type="text"
            placeholder="Minimum 2,500 sq ft"
            value={floorArea}
            onChange={(e) => setFloorArea(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none placeholder:text-[#525769]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Your name
          </label>
          <input
            type="text"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
              Gym name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Iron Fitness Hub"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
              Gym city
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Delhi NCR, Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Your Indian mobile number
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white text-sm focus:border-[#D4FF32] outline-none"
          />
        </div>

        <div className="space-y-2 pt-1">
          <label className="flex items-start gap-2.5 text-xs text-[#94A3B8] cursor-pointer">
            <input
              type="checkbox"
              checked={agreeContact}
              onChange={(e) => setAgreeContact(e.target.checked)}
              className="mt-0.5 rounded accent-[#D4FF32] h-4 w-4 shrink-0"
            />
            <span>I agree that GK Fitness may contact me about this gym business enquiry.</span>
          </label>

          <label className="flex items-start gap-2.5 text-xs text-[#94A3B8] cursor-pointer">
            <input
              type="checkbox"
              checked={agreeMeta}
              onChange={(e) => setAgreeMeta(e.target.checked)}
              className="mt-0.5 rounded accent-[#D4FF32] h-4 w-4 shrink-0"
            />
            <span>Optional: allow GK Fitness to share hashed contact identifiers and enquiry outcomes with Meta to measure its ads.</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,255,50,0.35)] active:scale-[0.98] cursor-pointer disabled:opacity-50 mt-4"
        >
          {loading ? (
            <>
              <CircleNotch size={18} className="animate-spin text-black" />
              Submitting...
            </>
          ) : (
            <>
              Request my free audit
              <ArrowRight size={16} weight="bold" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-[#94A3B8]">
          Send it and we call the same day.
        </p>
      </form>
    </div>
  );
}
