"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Buildings,
  Barbell,
  Globe,
  CaretRight,
  ShieldCheck,
  CircleNotch,
} from "@phosphor-icons/react";
import { getCurrentUserRole } from "@/app/api/auth/actions";
import toast from "react-hot-toast";

interface AccountTypeItem {
  id: string;
  title: string;
  typeId: string;
  icon: typeof User;
}

const ALL_ACCOUNT_TYPES: AccountTypeItem[] = [
  {
    id: "individual",
    title: "Individual",
    typeId: "individual",
    icon: User,
  },
  {
    id: "owner",
    title: "Gym Owner",
    typeId: "owner",
    icon: Buildings,
  },
];

function ChooseAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  const planId = searchParams.get("planId");
  const fromParam = searchParams.get("from");
  const isPlanFlow = Boolean(planId || fromParam === "plan");

  const accountTypes = isPlanFlow
    ? ALL_ACCOUNT_TYPES.filter((item) => item.id !== "owner")
    : ALL_ACCOUNT_TYPES;

  useEffect(() => {
    const verified = searchParams.get("verified");
    const errorParam = searchParams.get("error");

    if (verified === "true") {
      toast.success("Email verified successfully! Please sign in to continue.", {
        id: "email-verified-toast",
      });
    } else if (errorParam) {
      toast.error("Verification link expired or invalid.", {
        id: "email-error-toast",
      });
    }

    const checkSession = async () => {
      const res = await getCurrentUserRole();
      if (res.success && res.user?.role) {
        const userRole = res.user.role.toLowerCase();
        if (userRole === "superadmin") {
          router.replace("/superadmin");
        } else if (userRole === "owner") {
          router.replace("/owner");
        } else if (userRole === "trainer" || userRole === "global_trainer" || userRole === "globaltrainer") {
          router.replace("/trainer");
        } else {
          router.replace("/customer");
        }
      }
    };

    checkSession();
  }, [router, searchParams]);

  const handleSelectAccount = (item: AccountTypeItem) => {
    setNavigatingId(item.id);
    const planName = searchParams.get("planName");
    const planParams = planId
      ? `&planId=${encodeURIComponent(planId)}&planName=${encodeURIComponent(planName || "")}`
      : "";
    router.push(`/login?type=${item.typeId}&title=${encodeURIComponent(item.title)}${planParams}`);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-2xl sm:text-3xl font-black tracking-widest text-white">GK</span>
            <div className="w-7 h-7 flex items-center justify-center text-[#D4FF32] rotate-[-45deg]">
              <Barbell size={22} weight="fill" />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-widest text-white">GYM</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#333333]" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4FF32] uppercase">
              LIFE
            </span>
            <span className="w-8 h-[1px] bg-[#333333]" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Welcome to <span className="text-[#D4FF32]">GK-Gym Life</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#C6C6C7] font-normal">
            Choose your account type to continue
          </p>
          <div className="w-12 h-[2px] bg-[#D4FF32] rounded-full mx-auto mt-5" />
        </div>

        <div className="w-full space-y-3.5">
          {accountTypes.map((type) => {
            const Icon = type.icon;
            const isNavigating = navigatingId === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleSelectAccount(type)}
                disabled={!!navigatingId}
                className="w-full h-16 px-4 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-[#D4FF32]/60 hover:bg-[#202024] transition-all flex items-center justify-between group cursor-pointer text-left active:opacity-75"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#101012] border border-[#27272A] flex items-center justify-center shrink-0 text-[#D4FF32]">
                    <Icon size={22} weight="bold" />
                  </div>
                  <span className="font-semibold text-base text-white">
                    {type.title}
                  </span>
                </div>

                <div className="shrink-0 flex items-center">
                  {isNavigating ? (
                    <CircleNotch size={20} className="animate-spin text-[#D4FF32]" />
                  ) : (
                    <CaretRight
                      size={20}
                      weight="bold"
                      className="text-[#D4FF32] group-hover:translate-x-0.5 transition-transform"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md mt-10 pt-4 flex items-center justify-center gap-2 text-xs text-[#C6C6C7]">
        <ShieldCheck size={18} weight="fill" className="text-[#D4FF32] shrink-0" />
        <span>Your fitness journey, our priority.</span>
      </div>
    </div>
  );
}

export default function ChooseAccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090B] text-white" />}>
      <ChooseAccountContent />
    </Suspense>
  );
}
