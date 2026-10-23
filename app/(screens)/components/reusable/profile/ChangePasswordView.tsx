"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CaretLeft,
  Lock,
  Eye,
  EyeClosed,
  ShieldCheck,
  Check,
  X,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

interface ChangePasswordViewProps {
  backHref?: string;
  portalTitle?: string;
}

export default function ChangePasswordView({
  backHref = "/superadmin/profile",
  portalTitle = "Super Admin",
}: ChangePasswordViewProps) {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) return toast.error("Please enter your current password");
    if (!newPassword) return toast.error("Please enter a new password");
    if (!confirmPassword) return toast.error("Please confirm your new password");
    if (newPassword !== confirmPassword) return toast.error("New passwords do not match");
    if (newPassword.length < 8) return toast.error("New password must be at least 8 characters");
    if (!/[A-Z]/.test(newPassword)) return toast.error("Password must contain at least 1 uppercase letter");
    if (!/[0-9]/.test(newPassword)) return toast.error("Password must contain at least 1 number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) return toast.error("Password must contain at least 1 special character");

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    router.push(backHref);
  };

  return (
    <>
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#101217] rounded-2xl border border-[#232631] p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative">
            <button
              type="button"
              onClick={handleCloseSuccess}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1C22] border border-[#232631] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} weight="bold" />
            </button>

            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#D4FF32] rounded-full flex items-center justify-center mt-2 mb-6 shadow-[0_0_20px_rgba(212,255,50,0.3)]">
              <Check size={36} weight="bold" className="text-black" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
              Password Updated Successfully!
            </h2>

            <p className="text-xs sm:text-sm text-[#94A3B8] mb-8 max-w-[320px]">
              Your password has been changed securely. You can now use your new password for your account.
            </p>

            <button
              type="button"
              onClick={handleCloseSuccess}
              className="w-full py-3 bg-[#D4FF32] hover:bg-[#c4f026] text-black font-bold text-sm sm:text-base rounded-xl transition-all shadow-[0_0_12px_rgba(212,255,50,0.25)] cursor-pointer"
            >
              Back to Profile
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-5xl mx-auto overflow-x-hidden min-w-0 pb-12">
        <div className="flex items-center gap-3 sm:gap-4 w-full shrink-0">
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#12141A] border border-[#232631] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
              Change Password
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
              Update your account password securely.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 sm:gap-6 items-start w-full">
          <div className="flex flex-col gap-4 sm:gap-5 flex-1 md:flex-[1.4] w-full">
            <div className="bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-6 flex flex-col gap-4 w-full">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4FF32] pointer-events-none">
                  <Lock size={18} weight="bold" />
                </div>
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#14161D] border border-[#222736] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors cursor-pointer"
                >
                  {showCurrent ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>

              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4FF32] pointer-events-none">
                  <Lock size={18} weight="bold" />
                </div>
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#14161D] border border-[#222736] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors cursor-pointer"
                >
                  {showNew ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>

              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4FF32] pointer-events-none">
                  <Lock size={18} weight="bold" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#14161D] border border-[#222736] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirm ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            <div className="hidden md:flex flex-row gap-3 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-[#D4FF32] hover:bg-[#c4f026] text-black font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
              <button
                type="button"
                onClick={() => router.push(backHref)}
                className="flex-1 h-12 bg-[#12141A] border border-[#232631] hover:bg-[#1A1C22] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 flex-1 w-full md:max-w-[360px]">
            <div className="bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-6 flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[rgba(212,255,50,0.1)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} weight="bold" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Password Requirements
                </h3>
              </div>

              <p className="text-xs text-[#94A3B8]">
                Your password must meet the following criteria:
              </p>

              <ul className="flex flex-col gap-2.5 pt-1">
                {[
                  "Minimum 8 characters",
                  "At least 1 uppercase letter",
                  "At least 1 number",
                  "At least 1 special character",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32] shrink-0" />
                    <span className="text-xs text-[#CBD5E1]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-6 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[rgba(212,255,50,0.1)] border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0">
                <Lock size={18} weight="bold" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  For your security
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  You may be asked to log in again after changing your password.
                </p>
              </div>
            </div>
          </div>

          <div className="flex md:hidden flex-col gap-3 w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#D4FF32] hover:bg-[#c4f026] text-black font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              onClick={() => router.push(backHref)}
              className="w-full h-12 bg-[#12141A] border border-[#232631] hover:bg-[#1A1C22] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
