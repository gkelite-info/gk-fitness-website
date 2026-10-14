"use client";

import { useState, useEffect } from "react";
import { X, Sparkle, CircleNotch, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { submitConsultationRequest, ConsultationRole } from "@/app/actions/consultation";
import DemoBookingFields from "@/app/(screens)/components/reusable/DemoBookingFields";
import {
  capitalizeWords,
  sanitizeIndianMobile,
  validateField,
  validateDemoForm,
  DemoFormErrors,
  DemoFormValues,
} from "@/lib/validations/demoValidation";

interface LandingConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: string;
  subscriptionPlanId?: string | null;
}

export default function LandingConsultationModal({ 
  isOpen, 
  onClose,
  selectedRole = "Gym Owner",
  subscriptionPlanId = null,
}: LandingConsultationModalProps) {
  const [role, setRole] = useState<ConsultationRole>("owner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gymName, setGymName] = useState("");
  const [city, setCity] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeContact, setAgreeContact] = useState(true);
  const [agreeMeta, setAgreeMeta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<DemoFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof DemoFormValues, boolean>>>({});

  useEffect(() => {
    if (selectedRole) {
      const lower = selectedRole.toLowerCase();
      if (lower.includes("customer")) setRole("customer");
      else if (lower.includes("trainer")) setRole("trainer");
      else setRole("owner");
    }
  }, [selectedRole]);

  if (!isOpen) return null;

  const handleBlur = (field: keyof DemoFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val =
      field === "name"
        ? name
        : field === "email"
        ? email
        : field === "gymName"
        ? gymName
        : field === "city"
        ? city
        : field === "memberCount"
        ? memberCount
        : field === "phone"
        ? phone
        : agreeContact;
    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err || undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeIndianMobile(e.target.value);
    setPhone(sanitized);
    if (touched.phone) {
      const err = validateField("phone", sanitized);
      setErrors((prev) => ({ ...prev, phone: err || undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = capitalizeWords(e.target.value);
    setName(formatted);
    if (touched.name) {
      const err = validateField("name", formatted);
      setErrors((prev) => ({ ...prev, name: err || undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      const err = validateField("email", val);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    }
  };

  const handleGymNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = capitalizeWords(e.target.value);
    setGymName(formatted);
    if (touched.gymName) {
      const err = validateField("gymName", formatted);
      setErrors((prev) => ({ ...prev, gymName: err || undefined }));
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = capitalizeWords(e.target.value);
    setCity(formatted);
    if (touched.city) {
      const err = validateField("city", formatted);
      setErrors((prev) => ({ ...prev, city: err || undefined }));
    }
  };

  const handleMemberCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMemberCount(val);
    if (touched.memberCount) {
      const err = validateField("memberCount", val);
      setErrors((prev) => ({ ...prev, memberCount: err || undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateDemoForm({ name, email, gymName, city, memberCount, phone, agreeContact });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({ name: true, email: true, gymName: true, city: true, memberCount: true, phone: true, agreeContact: true });
      const firstErr = Object.values(formErrors)[0];
      if (firstErr) toast.error(firstErr);
      return;
    }

    setLoading(true);
    const res = await submitConsultationRequest({
      fullName: name.trim(),
      email: email.trim(),
      gymName: gymName.trim(),
      phone,
      city: city.trim(),
      role,
      agreeContact,
      agreeMeta,
      memberCount: memberCount.trim(),
      subscriptionPlanId,
      notes: selectedRole ? `Plan: ${selectedRole} | Role: ${role}` : `Role: ${role}`,
    });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Demo request received!");
      setSubmitted(true);
    } else {
      toast.error(res.error || "Failed to submit demo request.");
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setGymName("");
    setCity("");
    setMemberCount("");
    setPhone("");
    setRole("owner");
    setAgreeContact(true);
    setAgreeMeta(false);
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#14151A] border border-[#232631] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#232631] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32]">
              <Sparkle size={18} weight="fill" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Book Your Demo</h3>
                {selectedRole && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#D4FF32]/15 text-[#D4FF32] border border-[#D4FF32]/25">
                    {selectedRole}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                For owners and co-owners of gyms of 2,500+ sq ft, running or opening soon. No payment or plan selection is needed to request it.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2028] transition-colors cursor-pointer shrink-0"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto scrollbar-themed">
          {submitted ? (
            <div className="text-center py-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32] mb-4">
                <CheckCircle size={36} weight="fill" />
              </div>
              <h4 className="text-xl font-bold text-white">Demo Request Received!</h4>
              <p className="text-sm text-[#94A3B8] mt-2 max-w-sm">
                Thank you for your interest. A GK- Gym Life specialist will connect with you today for a personalized walkthrough tailored to your needs.
              </p>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-6 h-11 px-6 rounded-xl bg-[#D4FF32] text-black font-bold text-sm cursor-pointer hover:bg-[#C2EF2B] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <DemoBookingFields
                role={role}
                onRoleChange={setRole}
                name={name}
                onNameChange={handleNameChange}
                email={email}
                onEmailChange={handleEmailChange}
                gymName={gymName}
                onGymNameChange={handleGymNameChange}
                city={city}
                onCityChange={handleCityChange}
                memberCount={memberCount}
                onMemberCountChange={handleMemberCountChange}
                phone={phone}
                onPhoneChange={handlePhoneChange}
                agreeContact={agreeContact}
                onAgreeContactChange={(val) => {
                  setAgreeContact(val);
                  if (touched.agreeContact) {
                    setErrors((prev) => ({ ...prev, agreeContact: validateField("agreeContact", val) || undefined }));
                  }
                }}
                agreeMeta={agreeMeta}
                onAgreeMetaChange={setAgreeMeta}
                errors={errors}
                touched={touched}
                onBlur={handleBlur}
              />

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
                    Request For Demo
                    <ArrowRight size={16} weight="bold" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#94A3B8]">
                Send it and we call the same day.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
