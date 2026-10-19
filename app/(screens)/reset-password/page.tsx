"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LockKey, CaretLeft, CircleNotch, WarningCircle } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import {
  exchangeResetCodeAction,
  updatePasswordAction,
  verifyRecoveryTokenHashAction,
} from "@/app/actions/forgotPassword";
import {
  setClientRecoverySession,
  updateUserPasswordClient,
  exchangeResetCodeClient,
  verifyRecoveryTokenHashClient,
} from "@/app/api/auth/clientAuth";
import ResetPasswordForm from "./_components/ResetPasswordForm";
import ResetPasswordSuccess from "./_components/ResetPasswordSuccess";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isExplicitError, setIsExplicitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function initSession() {
      if (typeof window === "undefined") return;

      const hash = window.location.hash || "";
      const hashParams = new URLSearchParams(hash.replace(/^#/, ""));

      const errorCode = searchParams.get("error_code") || hashParams.get("error_code");
      const errorParam = searchParams.get("error") || hashParams.get("error");
      const errorDesc = searchParams.get("error_description") || hashParams.get("error_description");

      if (errorCode || errorParam) {
        setIsExplicitError(true);
        setErrorMessage(
          errorDesc
            ? decodeURIComponent(errorDesc.replace(/\+/g, " "))
            : "This password reset link is invalid or has expired. Please request a new link."
        );
        setInitializing(false);
        return;
      }

      if (tokenHash) {
        const clientRes = await verifyRecoveryTokenHashClient(tokenHash);
        if (!clientRes.success) {
          const verifyRes = await verifyRecoveryTokenHashAction(tokenHash);
          if (!verifyRes.success) {
            setIsExplicitError(true);
            setErrorMessage("This password reset link is invalid or has expired. Please request a new link.");
            setInitializing(false);
            return;
          }
        }
      }

      if (code) {
        const clientRes = await exchangeResetCodeClient(code);
        if (!clientRes.success) {
          const exchangeRes = await exchangeResetCodeAction(code);
          if (!exchangeRes.success) {
            setIsExplicitError(true);
            setErrorMessage("This password reset link is invalid or has expired. Please request a new link.");
            setInitializing(false);
            return;
          }
        }
      }

      const accessToken = searchParams.get("access_token") || hashParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token") || hashParams.get("refresh_token");

      if (accessToken) {
        await setClientRecoverySession(accessToken, refreshToken || undefined);
      }

      setInitializing(false);
    }

    initSession();
  }, [code, tokenHash, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const clientRes = await updateUserPasswordClient(password);
    if (clientRes.success) {
      toast.success("Password updated successfully!");
      setIsSuccess(true);
      setLoading(false);
      setTimeout(() => router.push("/login"), 2200);
      return;
    }

    const res = await updatePasswordAction(password);
    setLoading(false);

    if (res.success) {
      toast.success("Password updated successfully!");
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2200);
      return;
    }

    toast.error(
      clientRes.error || res.error || "Please request a fresh reset link from your email."
    );
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
          {initializing ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <CircleNotch size={32} weight="bold" className="text-[#D4FF32] animate-spin" />
              <p className="text-xs text-[#94A3B8]">Verifying your reset session...</p>
            </div>
          ) : isSuccess ? (
            <ResetPasswordSuccess />
          ) : isExplicitError ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-5 text-red-400">
                <WarningCircle size={28} weight="fill" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                Invalid or Expired Link
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mb-6 max-w-xs break-words">
                {errorMessage || "This password reset link is invalid or has expired. Please request a new link."}
              </p>
              <Link
                href="/forgot-password"
                className="cursor-pointer w-full h-12 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center text-sm shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] touch-manipulation"
              >
                Request New Link
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1D2218] border border-[#D4FF32]/30 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-[0_0_20px_rgba(212,255,50,0.15)]">
                <LockKey size={28} weight="duotone" className="text-[#D4FF32]" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 text-center">
                Create New Password
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#94A3B8] text-center max-w-[300px] mb-6 sm:mb-8">
                Your new password must be different from previous used passwords.
              </p>

              <ResetPasswordForm
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0D10]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
