"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LockKey,
  CircleNotch,
  X,
  CheckCircle,
  WarningCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";
import {
  exchangeResetCodeAction,
  validateRecoverySessionAction,
  updatePasswordAction,
} from "@/app/actions/forgotPassword";
import {
  setClientRecoverySession,
  checkClientSession,
  updateUserPasswordClient,
} from "@/app/api/auth/clientAuth";
import ResetPasswordForm from "@/app/(screens)/reset-password/_components/ResetPasswordForm";

export default function ResetPasswordModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const s = window.location.search || "";
    const h = window.location.hash || "";
    return (
      s.includes("code=") ||
      s.includes("type=recovery") ||
      s.includes("error=") ||
      s.includes("error_code=") ||
      h.includes("access_token=") ||
      h.includes("type=recovery") ||
      h.includes("error=")
    );
  });
  const [initializing, setInitializing] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/reset-password") return;

    const search = window.location.search || "";
    const hash = window.location.hash || "";
    const urlParams = new URLSearchParams(search);
    const hashParams = new URLSearchParams(hash.replace(/^#/, ""));

    const code = urlParams.get("code");
    const accessToken = urlParams.get("access_token") || hashParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token") || hashParams.get("refresh_token");

    const errorCode = urlParams.get("error_code") || hashParams.get("error_code");
    const errorParam = urlParams.get("error") || hashParams.get("error");
    const errorDesc = urlParams.get("error_description") || hashParams.get("error_description");

    const isRecovery =
      code ||
      errorCode ||
      errorParam ||
      urlParams.get("type") === "recovery" ||
      hashParams.get("type") === "recovery" ||
      hash.includes("type=recovery") ||
      (accessToken && hash.includes("recovery"));

    if (!isRecovery) return;

    setIsOpen(true);

    if (errorCode || errorParam) {
      setErrorMessage(
        errorDesc
          ? decodeURIComponent(errorDesc.replace(/\+/g, " "))
          : "Your password reset link is invalid or has expired. Please request a new one."
      );
      setSessionValid(false);
      setInitializing(false);
      return;
    }

    setInitializing(true);

    async function verifyRecovery() {
      if (accessToken) {
        const clientRes = await setClientRecoverySession(accessToken, refreshToken || undefined);
        if (clientRes.success) {
          setSessionValid(true);
          setInitializing(false);
          return;
        }
      }

      if (code) {
        const exchangeRes = await exchangeResetCodeAction(code);
        if (exchangeRes.success) {
          setSessionValid(true);
          setInitializing(false);
          return;
        }
      }

      const [serverRes, clientRes] = await Promise.all([
        validateRecoverySessionAction(),
        checkClientSession(),
      ]);

      if (serverRes.success || clientRes.success) {
        setSessionValid(true);
      } else {
        setSessionValid(false);
      }
      setInitializing(false);
    }

    verifyRecovery();
  }, [pathname, searchParams]);

  if (!isOpen || pathname === "/reset-password") return null;

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  const handleGoToLogin = () => {
    handleClose();
    router.push("/login");
  };

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

    const res = await updatePasswordAction(password);
    if (res.success) {
      toast.success("Password reset successfully!");
      setSubmitted(true);
      setLoading(false);
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", window.location.pathname);
      }
      setTimeout(() => {
        handleGoToLogin();
      }, 1800);
      return;
    }

    const clientRes = await updateUserPasswordClient(password);
    setLoading(false);

    if (clientRes.success) {
      toast.success("Password reset successfully!");
      setSubmitted(true);
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", window.location.pathname);
      }
      setTimeout(() => {
        handleGoToLogin();
      }, 1800);
      return;
    }

    toast.error(clientRes.error || res.error || "Failed to update password");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#14151A] border border-[#232631] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#232631] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1D2218] border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32] shrink-0">
              <LockKey size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Reset Password</h3>
              <p className="text-xs text-[#94A3B8]">Choose your new account password</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2028] transition-colors cursor-pointer shrink-0"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          {initializing ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <CircleNotch size={32} weight="bold" className="text-[#D4FF32] animate-spin shrink-0" />
              <p className="text-xs text-[#94A3B8]">Verifying recovery link...</p>
            </div>
          ) : submitted ? (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1D2218] border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32] mb-4 shadow-[0_0_24px_rgba(212,255,50,0.2)]">
                <CheckCircle size={36} weight="fill" />
              </div>
              <h4 className="text-xl font-bold text-white">Password Updated!</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 mb-6 max-w-xs">
                Your password has been changed successfully. Redirecting you to login...
              </p>
              <button
                type="button"
                onClick={handleGoToLogin}
                className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,255,50,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>Proceed to Login</span>
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          ) : !sessionValid ? (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-4 text-red-400">
                <WarningCircle size={28} weight="fill" />
              </div>
              <h4 className="text-lg font-bold text-white">Link Expired or Invalid</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 mb-6 max-w-xs">
                {errorMessage || "This password reset link is invalid or has expired. Please request a new link."}
              </p>
              <div className="flex flex-col gap-2.5 w-full">
                <Link
                  href="/forgot-password"
                  onClick={handleClose}
                  className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-bold text-sm flex items-center justify-center transition-all shadow-[0_4px_20px_rgba(212,255,50,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  Request New Link
                </Link>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full h-11 rounded-xl bg-[#15161C] hover:bg-[#1A1C23] border border-[#232631] text-[#94A3B8] hover:text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <ResetPasswordForm
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              loading={loading}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
