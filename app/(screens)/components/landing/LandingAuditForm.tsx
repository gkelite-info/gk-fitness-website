"use client";

import { useState } from "react";
import { CircleNotch, CheckCircle, ArrowRight } from "@phosphor-icons/react";
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

export default function LandingAuditForm() {
  const [role, setRole] = useState<ConsultationRole>("owner");
  const [name, setName] = useState("");
  const [gymName, setGymName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeContact, setAgreeContact] = useState(true);
  const [agreeMeta, setAgreeMeta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<DemoFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof DemoFormValues, boolean>>>({});

  const handleBlur = (field: keyof DemoFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = field === "name" ? name : field === "gymName" ? gymName : field === "city" ? city : field === "phone" ? phone : agreeContact;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateDemoForm({ name, gymName, city, phone, agreeContact });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({ name: true, gymName: true, city: true, phone: true, agreeContact: true });
      const firstErr = Object.values(formErrors)[0];
      if (firstErr) toast.error(firstErr);
      return;
    }

    setLoading(true);
    const res = await submitConsultationRequest({
      fullName: name.trim(),
      gymName: gymName.trim(),
      phone,
      city: city.trim(),
      role,
      agreeContact,
      agreeMeta,
      memberCount: "N/A",
      notes: `Role: ${role}`,
    });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Demo requested successfully!");
      setSubmitted(true);
    } else {
      toast.error(res.error || "Submission failed. Please try again.");
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setGymName("");
    setCity("");
    setPhone("");
    setRole("owner");
    setAgreeContact(true);
    setAgreeMeta(false);
    setErrors({});
    setTouched({});
  };

  if (submitted) {
    return (
      <div className="w-full rounded-2xl bg-[#111216] border border-white/10 p-6 sm:p-8 text-center text-white">
        <div className="w-14 h-14 rounded-full bg-[#D4FF32]/20 border border-[#D4FF32]/40 flex items-center justify-center text-[#D4FF32] mx-auto mb-4">
          <CheckCircle size={32} weight="fill" />
        </div>
        <h3 className="text-xl font-bold">Demo Request Received!</h3>
        <p className="text-sm text-[#94A3B8] mt-2">
          Our operations specialist will review your gym floor metrics and call you today.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 h-10 px-6 rounded-xl bg-[#D4FF32] text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div id="audit-form" className="w-full rounded-2xl bg-[#111216] border border-white/10 p-5 sm:p-7 shadow-2xl">
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-black text-[#D4FF32] tracking-tight">
          Book Your Demo
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
          For owners and co-owners of gyms of 2,500+ sq ft, running or opening soon. No payment or plan selection is needed to request it.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <DemoBookingFields
          role={role}
          onRoleChange={setRole}
          name={name}
          onNameChange={handleNameChange}
          gymName={gymName}
          onGymNameChange={handleGymNameChange}
          city={city}
          onCityChange={handleCityChange}
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
    </div>
  );
}
