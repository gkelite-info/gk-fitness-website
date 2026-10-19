"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Key, CaretLeft } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { requestPasswordResetAction } from "@/app/actions/forgotPassword";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import ForgotPasswordSuccess from "./_components/ForgotPasswordSuccess";

function ForgotPasswordContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    const res = await requestPasswordResetAction(cleanEmail);
    setLoading(false);

    if (!res.success) {
      toast.error(res.error || "Failed to send reset link");
      return;
    }

    toast.success("Password reset link sent!");
    setSubmitted(true);
    setCooldown(60);
  };

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return;
    setResendLoading(true);
    const res = await requestPasswordResetAction(email.trim());
    setResendLoading(false);

    if (!res.success) {
      toast.error(res.error || "Failed to resend reset link");
      return;
    }

    toast.success("New reset link sent to your email!");
    setCooldown(60);
  };

  return (
    <div className="min-h-screen bg-[#0C0D10] text-white flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden">
      <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#D4FF32]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-sm sm:max-w-md relative z-10 flex flex-col">
        <Link
          href="/login"
          className="cursor-pointer inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors mb-6 sm:mb-8 self-start touch-manipulation"
        >
          <CaretLeft size={18} weight="bold" />
          <span>Back to Login</span>
        </Link>

        <div className="w-full bg-[#14161C]/80 border border-[#232631] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <ForgotPasswordSuccess
              email={email}
              onResend={handleResend}
              resendLoading={resendLoading}
              cooldown={cooldown}
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1D2218] border border-[#D4FF32]/30 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-[0_0_20px_rgba(212,255,50,0.15)]">
                <Key size={28} weight="duotone" className="text-[#D4FF32]" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 text-center">
                Forgot Password?
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#94A3B8] text-center max-w-[300px] mb-6 sm:mb-8">
                Enter your registered email address and we will send you a link to reset your password.
              </p>

              <ForgotPasswordForm
                email={email}
                setEmail={setEmail}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0D10]" />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
