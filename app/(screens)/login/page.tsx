"use client";

import { useState, useRef } from "react";
import { EnvelopeSimple, LockKey, CircleNotch, ArrowRight, Eye, EyeSlash, CaretLeft } from "@phosphor-icons/react";
import { loginUser } from "@/app/api/auth/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address", { id: "login-email-empty" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", { id: "login-email-invalid" });
      return;
    }

    if (!password) {
      toast.error("Please enter your password", { id: "login-password-empty" });
      return;
    }

    setLoading(true);

    const { error: authError, role } = await loginUser(email, password);

    if (authError) {
      toast.error(authError, { id: "login-auth-error" });
      setLoading(false);
      return;
    }

    toast.success("Successfully logged in!", { id: "login-success" });

    if (role === "superadmin") {
      router.push("/superadmin");
    } else if (role === "owner") {
      router.push("/owner");
    } else if (role === "trainer") {
      router.push("/trainer");
    } else if (role === "globaltrainer") {
      router.push("/globaltrainer");
    } else if (role === "customer") {
      router.push("/customer");
    } else {
      router.push("/");
    }

    router.refresh();
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const openMobileForm = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setShowMobileForm(true);
  };

  const closeMobileForm = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setShowMobileForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0C0D10] text-white overflow-hidden relative">
      <motion.div
        className="flex flex-row w-[200vw] lg:w-full h-[100dvh] lg:h-screen lg:!transform-none"
        animate={{ x: showMobileForm ? "-100vw" : "0vw" }}
        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        initial={false}
      >
        <div className="w-[100vw] lg:w-1/2 h-full relative flex flex-col justify-end p-8 sm:p-12">
          <Image
            src="/images/gym-hero.jpg"
            alt="GK-Fitness Interior"
            fill
            priority
            className="object-cover absolute inset-0 z-0"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0C0D10] via-[#0C0D10]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

          <div className="relative z-20 flex flex-col gap-4">
            <div className="w-16 h-1 bg-[#D4FF32] rounded-full mb-2" />
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Elevate Your <br /> <span className="text-[#D4FF32]">Fitness.</span>
            </h1>
            <p className="text-[#94A3B8] max-w-md font-medium text-sm sm:text-base">
              The premium management portal for GK-Fitness. Streamline your operations, track your athletes, and conquer your goals.
            </p>

            <button
              type="button"
              onClick={openMobileForm}
              onTouchEnd={(e) => {
                e.preventDefault();
                openMobileForm(e);
              }}
              className="cursor-pointer lg:hidden mt-8 w-full h-14 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] touch-manipulation z-30"
            >
              Access Portal <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div className="w-[100vw] lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-8 relative bg-[#0C0D10]">
          <div className="hidden lg:block absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4FF32]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full max-w-sm sm:max-w-md relative z-10">
            <button
              type="button"
              onClick={closeMobileForm}
              onTouchEnd={(e) => {
                e.preventDefault();
                closeMobileForm(e);
              }}
              className="cursor-pointer lg:hidden flex items-center gap-2 text-[#94A3B8] hover:text-white mb-4 sm:mb-8 transition-colors font-semibold text-sm touch-manipulation"
            >
              <CaretLeft size={20} weight="bold" /> Back to Home
            </button>

            <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1D2218] border border-[#D4FF32]/30 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,255,50,0.15)]">
                <LockKey size={28} weight="duotone" className="text-[#D4FF32]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">Welcome Back</h2>
              <p className="text-xs sm:text-sm font-medium text-[#94A3B8] max-w-[280px] sm:max-w-full">
                Sign in to access your portal and manage your gym operations.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wide ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <EnvelopeSimple
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#D4FF32] transition-colors"
                    weight="fill"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    placeholder="alex@gkfitness.com"
                    className="w-full h-12 sm:h-14 bg-[#15161C] border border-[#232631] rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:bg-[#1A1C23] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wide">
                    Password
                  </label>
                  <a href="#" className="cursor-pointer text-xs font-semibold text-[#D4FF32] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <LockKey
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#D4FF32] transition-colors"
                    weight="fill"
                  />
                  <input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 sm:h-14 bg-[#15161C] border border-[#232631] rounded-xl pl-12 pr-12 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:bg-[#1A1C23] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors flex items-center justify-center p-1"
                  >
                    {showPassword ? <EyeSlash size={20} weight="fill" /> : <Eye size={20} weight="fill" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full h-12 sm:h-14 mt-2 sm:mt-4 bg-[#D4FF32] hover:bg-[#c2ef2b] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(212,255,50,0.5)] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {loading ? (
                  <CircleNotch size={24} weight="bold" className="animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={20} weight="bold" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
