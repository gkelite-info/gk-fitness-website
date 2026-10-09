"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function LandingPillarsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      num: "01",
      title: "CRM & MEMBER TECHNOLOGY",
      desc: "Live manager dashboard for centralized member database, walk-in lead pipelines, renewal tracking, and real-time attendance insights.",
      image: "/images/landing_page/Gym Manager Reviewing Financial Dashboard.png",
    },
    {
      num: "02",
      title: "FRONT DESK & ENQUIRIES",
      desc: "High-speed front counter management with walk-in lead capture, trial passes, automated WhatsApp chats, and staff coordination.",
      image: "/images/landing_page/Neon Gym Reception Enquiries.png",
    },
    {
      num: "03",
      title: "WORKOUT SPLITS & COACHING",
      desc: "Push day routines, strength workout splits, and 1-on-1 personal trainer sessions prescribed directly to member devices.",
      image: "/images/landing_page/Push Day_ Stronger Than Yesterday.png",
    },
    {
      num: "04",
      title: "CUSTOM DIET & RETENTION",
      desc: "Calorie-counted weekly meal planners, nutrition guidelines, and trainer-approved diets that keep members consistent.",
      image: "/images/landing_page/Weekly Meal Planner at the Gym.png",
    },
    {
      num: "05",
      title: "EQUIPMENT & FLOOR AUDIT",
      desc: "Routine gym floor maintenance inspections, equipment health logs, and proactive repair alerts to eliminate downtime.",
      image: "/images/landing_page/Gym Staff Inspecting Equipment.png",
    },
    {
      num: "06",
      title: "EXPENSE & CASH FLOW CONTROL",
      desc: "Daily cash & UPI collection tracking, categorized vendor expense audits, and net profit balancing for gym owners.",
      image: "/images/landing_page/Gym Owner Reviewing Expenses.png",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener("resize", checkScrollState);
    return () => window.removeEventListener("resize", checkScrollState);
  }, []);

  return (
    <section className="relative w-full py-10 lg:py-16 bg-black text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight leading-[1.1]">
            EVERYTHING A GYM NEEDS TO GROW — <br className="hidden sm:block" />
            <span className="text-[#D4FF32] not-italic">
              IN ONE PARTNER.
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            From the software and hardware on your counter to on-ground staff management and member results.
          </p>
        </div>

        <div className="relative group/carousel">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-[40%] -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-[#15161C] border border-white/10 flex items-center justify-center text-white transition-all duration-300 shadow-xl ${
              canScrollLeft 
                ? "opacity-0 md:opacity-100 md:group-hover/carousel:opacity-100 md:group-hover/carousel:-translate-x-6 hover:bg-[#D4FF32] hover:text-black hover:scale-110 cursor-pointer" 
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <CaretLeft size={24} weight="bold" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[#15161C] border border-white/10 flex items-center justify-center text-white transition-all duration-300 shadow-xl ${
              canScrollRight 
                ? "opacity-0 md:opacity-100 md:group-hover/carousel:opacity-100 md:group-hover/carousel:translate-x-6 hover:bg-[#D4FF32] hover:text-black hover:scale-110 cursor-pointer" 
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <CaretRight size={24} weight="bold" />
          </button>

          <div 
            ref={carouselRef}
            onScroll={checkScrollState}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar scrollbar-none snap-x snap-mandatory px-4 -mx-4 sm:px-0 sm:mx-0"
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="w-[280px] sm:w-[320px] lg:w-[350px] shrink-0 rounded-2xl bg-[#0B0C10] border border-white/5 overflow-hidden snap-center group hover:border-[#D4FF32]/50 hover:bg-[#111216] transition-all duration-500 shadow-lg hover:shadow-[#D4FF32]/10 hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-black/40 to-transparent group-hover:from-[#111216] transition-colors duration-500" />
                  <span className="absolute bottom-4 left-5 text-4xl lg:text-5xl font-black italic text-white/90 drop-shadow-lg group-hover:text-[#D4FF32] transition-colors duration-300">
                    {pillar.num}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-start">
                  <h3 className="text-base lg:text-lg font-black italic uppercase tracking-wider text-white group-hover:text-[#D4FF32] transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
