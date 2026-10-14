"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Sparkle, CircleNotch, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import CustomerSignupFields from "@/app/(screens)/components/reusable/CustomerSignupFields";
import {
  SignupFormValues,
  SignupFormErrors,
  validateSignupField,
  validateSignupForm,
} from "@/lib/validations/signupValidation";
import { signupCustomerAction } from "@/app/actions/signup";

interface LandingSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planId?: string | null;
}

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  gender: "male",
  dob: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  address: "",
};

export default function LandingSignupModal({
  isOpen,
  onClose,
  planName,
}: LandingSignupModalProps) {
  const router = useRouter();
  const [values, setValues] = useState<SignupFormValues>(initialValues);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof SignupFormValues, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof SignupFormValues, val: any) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const err = validateSignupField(field, val);
      setErrors((prev) => ({ ...prev, [field]: err || undefined }));
    }
  };

  const handleBlur = (field: keyof SignupFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateSignupField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: err || undefined }));
  };

  const handleResetAndClose = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setShowPassword(false);
    setLoading(false);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateSignupForm(values);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({
        name: true,
        email: true,
        password: true,
        phone: true,
        pincode: true,
      });
      const firstErr = Object.values(formErrors)[0];
      if (firstErr) toast.error(firstErr);
      return;
    }

    setLoading(true);
    const res = await signupCustomerAction(values);
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Account registered successfully!");
      setSubmitted(true);
      setTimeout(() => {
        handleResetAndClose();
        router.push(res.redirectUrl || "/login");
      }, 1500);
    } else {
      toast.error(res.error || "Failed to create account. Please try again.");
    }
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
                <h3 className="text-base sm:text-lg font-bold text-white">Create Account</h3>
                {planName && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#D4FF32]/15 text-[#D4FF32] border border-[#D4FF32]/25">
                    {planName}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Sign up as a customer to access your workouts, diets, and membership.
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
              <h4 className="text-xl font-bold text-white">Signup Successful!</h4>
              <p className="text-sm text-[#94A3B8] mt-2 max-w-sm">
                Your customer profile has been created. Redirecting you to your account...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <CustomerSignupFields
                values={values}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
                showPassword={showPassword}
                onToggleShowPassword={() => setShowPassword((prev) => !prev)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,255,50,0.35)] active:scale-[0.98] cursor-pointer disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <>
                    <CircleNotch size={18} className="animate-spin text-black" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Complete Sign Up
                    <ArrowRight size={16} weight="bold" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-[#94A3B8]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    onClick={handleResetAndClose}
                    className="text-[#D4FF32] hover:underline font-semibold"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
