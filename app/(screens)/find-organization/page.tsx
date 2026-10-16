"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MagnifyingGlass,
  CaretRight,
  CaretLeft,
  Buildings,
  Barbell,
  CircleNotch,
} from "@phosphor-icons/react";
import { searchGymsAction } from "@/app/actions/auth";

interface GymItem {
  gymId: string;
  gymName: string;
  city?: string;
  state?: string;
  logo?: string | null;
  isActive?: boolean;
}

function FindOrganizationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type") || "customer";

  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<GymItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      const res = await searchGymsAction(searchQuery);
      if (res.success && res.data) {
        setGyms(res.data);
      }
      setLoading(false);
      setInitialLoaded(true);
    };

    const timer = setTimeout(() => {
      fetchGyms();
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectGym = (gym: GymItem) => {
    const params = new URLSearchParams();
    params.set("type", typeId);
    params.set("gymId", gym.gymId);
    params.set("gymName", gym.gymName);
    if (gym.logo) params.set("gymLogo", gym.logo);
    router.push(`/login?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-lg">
        <button
          type="button"
          onClick={() => router.push("/choose-account")}
          className="w-10 h-10 rounded-full bg-[#121212] border border-[#1E1E1E] flex items-center justify-center text-white hover:border-[#D4FF32]/60 hover:text-[#D4FF32] transition-colors mb-6 cursor-pointer"
        >
          <CaretLeft size={20} weight="bold" />
        </button>

        <div className="mb-6">
          <span className="text-[#D4FF32] text-xs font-bold uppercase tracking-widest block mb-1">
            Welcome
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Find Your Gym
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
            Select your organization to continue with the sign in process and access your account.
          </p>
        </div>

        <div className="relative mb-6">
          <MagnifyingGlass
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or city..."
            className="w-full h-12 bg-[#121212] border border-[#1E1E1E] rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#D4FF32] transition-all"
          />
        </div>

        <div className="space-y-3 min-h-[260px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <CircleNotch size={28} className="animate-spin text-[#D4FF32]" />
              <span className="text-xs text-[#8E8E93]">Searching gyms...</span>
            </div>
          ) : gyms.length > 0 ? (
            gyms.map((gym) => (
              <button
                key={gym.gymId}
                type="button"
                onClick={() => handleSelectGym(gym)}
                className="w-full p-4 rounded-xl bg-[#121212] border border-[#1E1E1E] hover:border-[#D4FF32]/60 hover:bg-[#18181B] transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center shrink-0 overflow-hidden text-[#D4FF32]">
                    {gym.logo ? (
                      <img
                        src={gym.logo}
                        alt={gym.gymName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Buildings size={22} weight="bold" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#D4FF32] transition-colors">
                      {gym.gymName}
                    </h2>
                    <p className="text-xs text-[#8E8E93]">
                      {[gym.city, gym.state].filter(Boolean).join(", ") || "Active Gym"}
                    </p>
                  </div>
                </div>
                <CaretRight
                  size={20}
                  className="text-[#6B6B6B] group-hover:text-[#D4FF32] group-hover:translate-x-1 transition-all shrink-0"
                  weight="bold"
                />
              </button>
            ))
          ) : initialLoaded ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#121212] border border-[#1E1E1E] flex items-center justify-center mb-3 text-[#D4FF32]">
                <Barbell size={28} weight="duotone" />
              </div>
              <p className="text-sm font-medium text-[#8E8E93]">
                {searchQuery.trim()
                  ? "No gyms found matching your search."
                  : "Enter a gym name to search."}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full max-w-lg mt-8 pt-4 flex items-center justify-center gap-1.5 text-xs text-[#6B6B6B] border-t border-white/[0.06]">
        <span>Gym not listed?</span>
        <a
          href="/contact"
          className="text-[#8E8E93] hover:text-[#D4FF32] underline font-medium transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default function FindOrganizationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090B] text-white" />}>
      <FindOrganizationContent />
    </Suspense>
  );
}
