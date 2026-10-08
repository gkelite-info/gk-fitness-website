"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Eye, EyeClosed, ShieldCheck, Check, X } from "@phosphor-icons/react";
import toast from "react-hot-toast";

export default function ChangePasswordClient() {
  const router = useRouter();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    
    if (!confirmPassword) {
      toast.error("Please confirm your new password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    setIsSuccess(true);
  };

  return (
    <>
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#12141A] rounded-[24px] border border-[#232631] p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative mx-auto">
            <button 
              onClick={() => {
                setIsSuccess(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1C22] border border-[#232631] hover:bg-[#232631] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
            >
              <X size={16} weight="bold" />
            </button>
            
            <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] bg-[#C8FF00] rounded-full flex items-center justify-center mt-2 mb-6 sm:mb-8">
              <Check size={36} weight="bold" className="text-black sm:w-12 sm:h-12 w-9 h-9" />
            </div>
            
            <h2 className="font-['Nimbus_Sans'] font-bold text-[20px] sm:text-2xl text-white leading-tight mb-3 sm:mb-4">
              Password Updated<br />Successfully!
            </h2>
            
            <p className="font-['Nimbus_Sans'] text-[13px] sm:text-sm text-[#94A3B8] mb-8 sm:mb-10 max-w-[280px]">
              Your password has been changed. You can now use your new password to log in to your account.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => router.push('/owner/profile')}
                className="w-full py-3.5 bg-[#C8FF00] hover:bg-[#b3e600] text-black font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl transition-colors cursor-pointer"
              >
                Go to Profile
              </button>
              <button 
                onClick={() => router.push('/owner')}
                className="w-full py-3.5 bg-[#12141A] border border-[#232631] hover:bg-[#1A1C22] text-white font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full overflow-y-auto scrollbar-themed bg-[#0A0A0A] relative pb-10">
        <div className="w-full max-w-xl md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button 
          onClick={() => router.push('/owner/profile')}
          className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>
        <div className="flex flex-col">
          <span className="font-['Nimbus_Sans'] font-bold text-[20px] text-white tracking-tight">Change Password</span>
          <span className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8] mt-1">Update your account password securely.</span>
        </div>
      </div>

      <div className="w-full max-w-xl md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-6 w-full">
          
          <div className="flex flex-col md:flex-row gap-6 items-start w-full">
            <div className="flex flex-col gap-6 flex-[1.2] lg:flex-[1.5] w-full">
              <div className="bg-[#12141A] border border-[#232631] rounded-[20px] p-5 sm:p-6 flex flex-col gap-4">
                
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8FF00]">
                    <Lock size={18} weight="regular" />
                  </div>
                  <input 
                    type={showCurrent ? "text" : "password"}
                    name="currentPasswordOff"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-[52px] bg-[#181A20] border border-[#232631] rounded-xl pl-12 pr-12 font-['Nimbus_Sans'] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#C8FF00]/50 transition-colors"
                    autoComplete="off"
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

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8FF00]">
                    <Lock size={18} weight="regular" />
                  </div>
                  <input 
                    type={showNew ? "text" : "password"}
                    name="newPasswordOff"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-[52px] bg-[#181A20] border border-[#232631] rounded-xl pl-12 pr-12 font-['Nimbus_Sans'] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#C8FF00]/50 transition-colors"
                    autoComplete="off"
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

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8FF00]">
                    <Lock size={18} weight="regular" />
                  </div>
                  <input 
                    type={showConfirm ? "text" : "password"}
                    name="confirmPasswordOff"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-[52px] bg-[#181A20] border border-[#232631] rounded-xl pl-12 pr-12 font-['Nimbus_Sans'] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#C8FF00]/50 transition-colors"
                    autoComplete="off"
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

              <div className="hidden md:flex flex-row gap-3 lg:gap-4 w-full">
                <button 
                  type="submit"
                  className="flex-1 h-[52px] bg-[#C8FF00] hover:bg-[#b3e600] text-black font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
                >
                  Update Password
                </button>
                <button 
                  type="button"
                  onClick={() => router.push('/owner/profile')}
                  className="flex-1 h-[52px] bg-[#12141A] border border-[#232631] hover:bg-[#1A1C22] text-white font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 flex-1 w-full md:max-w-[340px] lg:max-w-[400px]">
              <div className="bg-[#12141A] border border-[#232631] rounded-[20px] p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-[36px] h-[36px] bg-[#C8FF00]/10 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} weight="regular" className="text-[#C8FF00]" />
                  </div>
                  <h3 className="font-['Nimbus_Sans'] font-bold text-[15px] text-white">Password Requirements</h3>
                </div>
                
                <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8] mb-1">
                  Your password must meet the following criteria:
                </p>
                
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#C8FF00] rounded-full ml-1 shrink-0" />
                    <span className="font-['Nimbus_Sans'] text-[13px] text-[#E2E8F0]">Minimum 8 characters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#C8FF00] rounded-full ml-1 shrink-0" />
                    <span className="font-['Nimbus_Sans'] text-[13px] text-[#E2E8F0]">At least 1 uppercase letter</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#C8FF00] rounded-full ml-1 shrink-0" />
                    <span className="font-['Nimbus_Sans'] text-[13px] text-[#E2E8F0]">At least 1 number</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#C8FF00] rounded-full ml-1 shrink-0" />
                    <span className="font-['Nimbus_Sans'] text-[13px] text-[#E2E8F0]">At least 1 special character</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#12141A] border border-[#232631] rounded-[20px] p-5 sm:p-6 flex items-start gap-3">
                <div className="w-[36px] h-[36px] bg-[#C8FF00]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Lock size={20} weight="regular" className="text-[#C8FF00]" />
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <h3 className="font-['Nimbus_Sans'] font-bold text-[14px] text-white">For your security</h3>
                  <p className="font-['Nimbus_Sans'] text-[12px] text-[#94A3B8] leading-relaxed">
                    You may be asked to log in again after changing your password.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:hidden flex-col sm:flex-row gap-3 mt-2 w-full">
            <button 
              type="submit"
              className="w-full sm:flex-1 h-[52px] bg-[#C8FF00] hover:bg-[#b3e600] text-black font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
            >
              Update Password
            </button>
            <button 
              type="button"
              onClick={() => router.push('/owner/profile')}
              className="w-full sm:flex-1 h-[52px] bg-[#12141A] border border-[#232631] hover:bg-[#1A1C22] text-white font-['Nimbus_Sans'] font-bold text-[15px] rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
