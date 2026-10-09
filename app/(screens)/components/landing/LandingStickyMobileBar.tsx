"use client";

import { Phone, WhatsappLogo } from "@phosphor-icons/react";

export default function LandingStickyMobileBar() {
  const scrollToAudit = () => {
    const el = document.getElementById("audit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#090A0E]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center gap-2">
      <button
        type="button"
        onClick={scrollToAudit}
        className="flex-1 h-12 rounded-xl bg-[#D4FF32] hover:bg-[#bde62b] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center shadow-lg shadow-[#D4FF32]/10 active:scale-[0.98] cursor-pointer"
      >
        Request my free audit
      </button>

      <a
        href="https://wa.me/919090639005?text=Hi,%20I%20want%20to%20know%20more%20about%20GK%20Fitness%20Powered%20Gyms"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-xl bg-[#15161C] border border-white/10 flex items-center justify-center text-[#25D366] hover:bg-white/10 transition-colors shrink-0"
      >
        <WhatsappLogo size={22} weight="fill" />
      </a>

      <a
        href="tel:+919090639005"
        aria-label="Call GK Fitness"
        className="w-12 h-12 rounded-xl bg-[#15161C] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
      >
        <Phone size={20} weight="bold" />
      </a>
    </div>
  );
}
