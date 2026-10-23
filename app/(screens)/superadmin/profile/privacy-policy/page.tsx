import PrivacyPolicy from "@/app/privacy-policy/page";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Privacy Policy | SuperAdmin | GK-Gym Life",
  description: "View the privacy policy for GK-Gym Life.",
};

export default function SuperAdminPrivacyPolicyPage() {
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-themed bg-[#0A0A0A] relative">
      <div className="w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 flex items-center gap-3 sm:gap-4">
        <Link 
          href="/superadmin/profile"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
        >
          <ArrowLeft size={16} weight="bold" />
        </Link>
        <span className="font-bold text-xl text-white tracking-tight">Back to Profile</span>
      </div>
      <div className="w-full max-w-5xl mx-auto mt-2 pb-10">
        <PrivacyPolicy />
      </div>
    </div>
  );
}
