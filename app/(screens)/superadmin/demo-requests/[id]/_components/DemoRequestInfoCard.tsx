"use client";

import { DemoRequestItem } from "@/app/actions/demoRequests";

interface DemoRequestInfoCardProps {
  request: DemoRequestItem;
}

export function DemoRequestInfoCard({ request }: DemoRequestInfoCardProps) {
  const getPlanBadge = (plan: DemoRequestItem["plan"]) => {
    const p = (plan || "Basic").toLowerCase();
    if (p.includes("platinum")) {
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#A855F7]/20 text-[#C084FC] border border-[#A855F7]/45 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
          Platinum
        </span>
      );
    }
    if (p.includes("gold")) {
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/45 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          Gold
        </span>
      );
    }
    if (p.includes("silver")) {
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/45 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
          Silver
        </span>
      );
    }
    return (
      <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/45 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
        {plan || "Basic"}
      </span>
    );
  };

  return (
    <div className="w-full bg-[#0E131E] border border-[#1C2638] rounded-2xl p-6 sm:p-8 space-y-8">
      <div>
        <h2 className="text-base font-bold text-white mb-5 tracking-tight">
          Owner Details
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-0">
            <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
              Full Name
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {request.ownerName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-0">
            <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
              Mobile Number
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white font-mono">
              {request.mobile}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-0">
            <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
              Email
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {request.email}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1C2638]/70 pt-8">
        <h2 className="text-base font-bold text-white mb-5 tracking-tight">
          Gym Details
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-0">
            <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
              Gym Name
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {request.gymName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-0">
            <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
              Gym City
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {request.city}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-0">
            <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
              Approx. Members
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {request.members}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1C2638]/70 pt-8">
        <h2 className="text-base font-bold text-white mb-5 tracking-tight">
          Plan Interest
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2 sm:gap-0">
          <span className="text-xs sm:text-sm text-[#8E99AB] w-44 shrink-0">
            Interested Plan
          </span>
          <div>{getPlanBadge(request.plan)}</div>
        </div>
      </div>
    </div>
  );
}
