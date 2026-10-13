import { User, Barbell, Crown } from "@phosphor-icons/react";
import Avatar from "../../Avatar";
import { MemberProfileDetails } from "./types";

interface MemberProfileBannerProps {
  profile: MemberProfileDetails;
}

export default function MemberProfileBanner({ profile }: MemberProfileBannerProps) {
  const isActive = profile.status === "active";

  const getRoleLabel = () => {
    if (profile.role === "trainer") return "Trainer ID";
    if (profile.role === "owner") return "Owner ID";
    return "Customer ID";
  };

  const renderRoleIcon = () => {
    if (profile.role === "trainer") {
      return <Barbell size={20} weight="fill" className="text-[#D4FF32]" />;
    }
    if (profile.role === "owner") {
      return <Crown size={20} weight="fill" className="text-[#D4FF32]" />;
    }
    return <User size={20} weight="fill" className="text-[#D4FF32]" />;
  };

  return (
    <div className="w-full min-w-0 bg-[#141720] border border-[#1E2433] rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 min-w-0 w-full sm:w-auto text-center sm:text-left">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-[#262C3E] shadow-xl mx-auto sm:mx-0">
          <Avatar
            src={profile.avatarSrc}
            gender={profile.gender}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center sm:items-start min-w-0">
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug break-words">
            {profile.name}
          </h2>

          <div className="flex flex-col items-center sm:items-start gap-0.5 mt-1">
            <span className="text-xs text-[#94A3B8] font-medium leading-none">
              {getRoleLabel()}
            </span>
            <span className="text-sm sm:text-base font-bold text-[#D4FF32] tracking-wide leading-tight">
              {profile.codeId}
            </span>
          </div>

          <div className="mt-2.5 flex justify-center sm:justify-start">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isActive
                  ? "bg-[#162111] border border-[#2D3E14] text-[#D4FF32]"
                  : "bg-[#2A1215] border border-red-900/40 text-[#FB7185]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isActive ? "bg-[#D4FF32] shadow-[0_0_8px_#D4FF32]" : "bg-[#FB7185]"
                }`}
              />
              <span className="capitalize">{profile.status}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex w-11 h-11 rounded-full bg-[#182012] border border-[#2A3715] items-center justify-center shrink-0">
        {renderRoleIcon()}
      </div>
    </div>
  );
}
