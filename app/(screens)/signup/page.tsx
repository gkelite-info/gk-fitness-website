"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CaretLeft,
  CircleNotch,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { signupCustomerAction } from "@/app/actions/signup";
import { useSubscriptions } from "@/lib/hooks/superadmin/subscriptions/subscriptions";
import SignupFormFields from "./_components/SignupFormFields";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type") || "individual";
  const planIdFromQuery = searchParams.get("planId") || "";
  const planNameFromQuery = searchParams.get("planName") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [dob, setDob] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedPlanId, setSelectedPlanId] = useState(planIdFromQuery);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: customerSubscriptions, isLoading: isLoadingPlans } = useSubscriptions(
    undefined,
    "customer"
  );

  const plansList = useMemo(() => {
    if (customerSubscriptions && customerSubscriptions.length > 0) {
      return customerSubscriptions
        .filter((p: any) => !p.is_deleted && p.isActive !== false)
        .map((p: any) => ({
          subscriptionPlanId: p.subscriptionPlanId,
          planName: p.planName,
          price: p.price !== null && p.price !== undefined ? Number(p.price) : null,
        }));
    }
    return [];
  }, [customerSubscriptions]);

  useEffect(() => {
    if (typeId === "owner") {
      router.replace("/login?type=owner&title=Gym%20Owner");
    }
  }, [typeId, router]);

  useEffect(() => {
    if (plansList.length === 0) return;

    if (selectedPlanId && plansList.some((p) => p.subscriptionPlanId === selectedPlanId)) {
      return;
    }

    if (planIdFromQuery && plansList.some((p) => p.subscriptionPlanId === planIdFromQuery)) {
      setSelectedPlanId(planIdFromQuery);
      return;
    }

    if (planNameFromQuery) {
      const matched = plansList.find(
        (p) => p.planName?.toLowerCase() === planNameFromQuery.toLowerCase()
      );
      if (matched) {
        setSelectedPlanId(matched.subscriptionPlanId);
        return;
      }
    }

    if (plansList[0]?.subscriptionPlanId) {
      setSelectedPlanId(plansList[0].subscriptionPlanId);
    }
  }, [plansList, planIdFromQuery, planNameFromQuery, selectedPlanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Please enter your full name");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email address");
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) return toast.error("Please enter a valid 10-digit mobile number");
    if (!dob) return toast.error("Please select your date of birth");
    if (!selectedPlanId) return toast.error("Please select a membership plan");
    if (!gender) return toast.error("Please select your gender");
    if (!streetAddress.trim()) return toast.error("Please enter your address");
    if (!country.trim()) return toast.error("Please enter your country");
    if (!state.trim()) return toast.error("Please enter your state");
    if (!city.trim()) return toast.error("Please enter your city");
    const cleanPincode = pincode.replace(/\D/g, "");
    if (!cleanPincode || cleanPincode.length < 6) return toast.error("Please enter a valid 6-digit PIN code");
    if (!password || password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    setLoading(true);

    const res = await signupCustomerAction({
      name: name.trim(),
      email: email.trim(),
      phone: cleanPhone,
      gender,
      dob: dob || undefined,
      gymName: "Individual Customer",
      memberCount: "1",
      subscriptionPlanId: selectedPlanId,
      address: streetAddress.trim(),
      country: country.trim() || "India",
      state: state.trim(),
      city: city.trim(),
      pincode: cleanPincode,
      password,
    });

    if (!res.success) {
      toast.error(res.error || "Failed to create account");
      setLoading(false);
      return;
    }

    setIsSuccess(true);
    setLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0C0D10] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#14161C] border border-white/10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center mx-auto text-[#D4FF32]">
            <CheckCircle size={32} weight="fill" />
          </div>
          <h2 className="text-2xl font-bold text-white">Account Created!</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Please check your email to verify your account before logging in.
          </p>
          <Link
            href="/login?type=individual"
            className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-[#D4FF32] text-black font-bold text-sm uppercase tracking-wider hover:bg-[#C2EF2B] transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0D10] text-white py-8 sm:py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/choose-account"
            className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors"
          >
            <CaretLeft size={16} weight="bold" /> Back
          </Link>
          <span className="text-xs font-semibold text-[#64748B]">Customer Signup</span>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#14161C] border border-white/10 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Sign up as an Individual Customer to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <SignupFormFields
              name={name} setName={setName}
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              gender={gender} setGender={setGender}
              dob={dob} setDob={setDob}
              streetAddress={streetAddress} setStreetAddress={setStreetAddress}
              country={country} setCountry={setCountry}
              state={state} setState={setState}
              city={city} setCity={setCity}
              pincode={pincode} setPincode={setPincode}
              password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
              showPassword={showPassword} setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword}
              selectedPlanId={selectedPlanId} setSelectedPlanId={setSelectedPlanId}
              plans={plansList} isLoadingPlans={isLoadingPlans}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <CircleNotch size={18} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Complete Sign Up
                  <ArrowRight size={16} weight="bold" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#94A3B8] mt-6">
            Already have an account?{" "}
            <Link href="/login?type=individual" className="text-[#D4FF32] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0D10]" />}>
      <SignupContent />
    </Suspense>
  );
}
