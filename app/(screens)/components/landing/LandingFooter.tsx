import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function LandingFooter() {
  return (
    <footer className="w-full bg-[#08090C] border-t border-[#232631] py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#15161C] border border-[#232631] flex items-center justify-center">
                  <Image
                    src="/512x512 2.png"
                    alt="GK Fitness Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-white text-base tracking-tight">GK FITNESS</span>
                  <span className="text-[10px] font-black text-[#D4FF32] uppercase tracking-wider">
                    Powered Gyms Ecosystem
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
                The modern gym operating system designed to eliminate daily operational chaos, automate member retention, and optimize revenue growth.
              </p>
            </div>

            <div className="mt-6 text-xs text-[#94A3B8]">
              Ready to automate your fitness center? Partner with GK Fitness today.
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94A3B8]">
              <li>Biometric Hardware Sync</li>
              <li>Lead & Enquiry CRM</li>
              <li>Finance & Daily Auditing</li>
              <li>Trainer & PT Booking</li>
              <li>WhatsApp Expiry Alerts</li>
              <li>Pro-Shop & Inventory POS</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94A3B8]">
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  Gym Owner Portal <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  Trainer & Coach Portal <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  Member App Portal <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  Superadmin Portal <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Access & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94A3B8]">
              <li>
                <Link href="/login" className="hover:text-[#D4FF32] font-semibold transition-colors">
                  Sign In to System
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="hover:text-white transition-colors">
                  Account Management
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C1E26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} GK Fitness Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#D4FF32] font-medium">Enterprise Grade Security & 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
