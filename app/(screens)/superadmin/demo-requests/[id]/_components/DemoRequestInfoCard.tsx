"use client";

import { DemoRequestItem } from "@/app/actions/demoRequests";

interface DemoRequestInfoCardProps {
  request: DemoRequestItem;
}

export function DemoRequestInfoCard({ request }: DemoRequestInfoCardProps) {
  const getPlanBadge = (plan: DemoRequestItem["plan"]) => {
    switch (plan) {
      case "Gold":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#714D08] text-[#FBBF24] border border-[#B45309]/50">
            Gold
          </span>
        );
      case "Silver":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1E293B] text-[#93C5FD] border border-[#3B82F6]/30">
            Silver
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1A2233] text-[#94A3B8] border border-[#334155]/40">
            Basic
          </span>
        );
    }
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
