"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, WhatsappLogo } from "@phosphor-icons/react";

export default function LandingHeader() {
  const scrollToAudit = () => {
    const el = document.getElementById("audit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090A0E]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-[#15161C] border border-white/10 flex items-center justify-center shadow-md">
            <Image
              src="/512x512 2.png"
              alt="GK- Gym Life Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-black text-white text-base sm:text-lg tracking-tight">GK-Gym Life</span>
            </div>
            <span className="text-[10px] text-[#94A3B8] font-medium tracking-wide hidden sm:inline whitespace-nowrap">
              Gym Operations Management
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="tel:+919090639005"
            aria-label="Call GK- Gym Life"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <Phone size={18} weight="bold" />
          </a>

          <a
            href="https://wa.me/919090639005?text=Hi,%20I%20want%20to%20know%20more%20about%20GK-%20Gym%20Life%20Powered%20Gyms"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 flex items-center justify-center text-[#25D366] transition-colors"
          >
            <WhatsappLogo size={20} weight="fill" />
          </a>

          <Link
            href="/login"
            className="h-9 sm:h-10 px-4 rounded-xl border border-white/10 bg-[#15161C] hover:bg-[#1E2028] text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition-all"
          >
            Login
          </Link>

          <button
            type="button"
            onClick={scrollToAudit}
            className="hidden md:flex h-10 px-5 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black text-xs sm:text-sm font-black italic uppercase tracking-wider items-center justify-center shadow-[0_4px_15px_rgba(212,255,50,0.3)] active:scale-[0.98] cursor-pointer"
          >
            Book Your Demo
          </button>
        </div>
      </div>
    </header>
  );
}
