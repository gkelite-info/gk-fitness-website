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
  icon: typeof User;
  color?: string;
}

const ALL_ACCOUNT_TYPES: AccountTypeItem[] = [
  { id: "individual", title: "Individual", icon: User, color: "#C3F400" },
  { id: "owner", title: "Gym Owner", icon: Buildings, color: "#C3F400" },
  { id: "customer", title: "Gym Customer", icon: User, color: "#C3F400" },
  { id: "gym_trainer", title: "Gym Trainer", icon: Barbell, color: "#C3F400" },
  { id: "global_trainer", title: "Global Trainer", icon: Globe, color: "#C3F400" },
];

function ChooseAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  const planId = searchParams.get("planId");
  const fromParam = searchParams.get("from");
  const isPlanFlow = Boolean(planId || fromParam === "plan");

  const accountTypes = isPlanFlow
    ? ALL_ACCOUNT_TYPES.filter((item) => item.id === "individual")
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
        const userRole = res.user.role.toLowerCase().trim().replace(/[-_]/g, "");
        if (userRole === "superadmin") {
          router.replace("/superadmin");
        } else if (userRole === "owner") {
          router.replace("/owner");
        } else if (userRole === "globaltrainer") {
          router.replace("/globaltrainer");
        } else if (userRole === "trainer" || userRole === "gymtrainer") {
          router.replace("/trainer");
        } else if (userRole === "customer" || userRole === "individual") {
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

    if (item.id === "customer") {
      router.push("/find-organization?type=customer");
    } else if (item.id === "gym_trainer") {
      router.push("/find-organization?type=gym_trainer");
    } else if (item.id === "owner") {
      router.push(`/login?type=owner&title=${encodeURIComponent("Gym Owner")}`);
    } else if (item.id === "global_trainer") {
      router.push(`/login?type=global_trainer&title=${encodeURIComponent("Global Trainer")}`);
    } else {
      router.push(`/login?type=individual&title=${encodeURIComponent("Individual")}${planParams}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl sm:text-3xl font-semibold tracking-widest text-white">GK</span>
            <div className="mx-2 text-[#D4FF32] rotate-[-45deg] flex items-center justify-center">
              <Barbell size={24} weight="fill" />
            </div>
            <span className="text-2xl sm:text-3xl font-semibold tracking-widest text-white">GYM</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-8 bg-[#333333]" />
            <span className="text-[#D4FF32] text-[10px] font-semibold tracking-[0.3em] mx-3 uppercase">
              LIFE
            </span>
            <div className="h-[1px] w-8 bg-[#333333]" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">
            Welcome to <span className="text-[#D4FF32]">GK-Gym Life</span>
          </h1>
          <p className="text-[#C6C6C7] text-sm font-normal">
            Choose your account type to continue
          </p>
          <div className="h-[2px] w-12 bg-[#D4FF32] mt-6 rounded-full mx-auto" />
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
                className="w-full bg-[#18181B] rounded-xl p-4 border border-[#27272A] hover:border-[#D4FF32]/60 hover:bg-[#202024] transition-all flex items-center justify-between group cursor-pointer text-left active:opacity-75 disabled:opacity-60"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#27272A] flex items-center justify-center bg-[#101012] shrink-0 text-[#D4FF32]">
                    <Icon size={24} weight="regular" />
                  </div>
                  <span className="text-white text-base font-semibold">{type.title}</span>
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

      <div className="w-full max-w-md mt-10 pt-4 flex items-center justify-center gap-2">
        <ShieldCheck size={20} weight="regular" className="text-[#D4FF32] shrink-0" />
        <span className="text-[#C6C6C7] text-sm font-medium">
          Your fitness journey, our priority.
        </span>
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
