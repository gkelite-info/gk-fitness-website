"use client";

import { useState } from "react";
import Image from "next/image";
import { UserGear, Barbell, User, ShieldStar, GlobeHemisphereWest, Check } from "@phosphor-icons/react";

export default function LandingRolesShowcase() {
  const [activeRole, setActiveRole] = useState<number>(0);

  const roles = [
    {
      title: "Gym Owner",
      roleBadge: "Executive Command",
      icon: UserGear,
      image: "/images/landing/owner-dashboard.jpg",
      imageAlt: "Gym Owner Management Dashboard",
      headline: "Complete Operational & Financial Command From Any Device",
      description: "Everything you need to step away from daily reception counter firefighting. Real-time collections, live footfall, expiry pipelines, expense approvals, and staff oversight in one screen.",
      highlights: [
        "Live financial dashboard with daily collections & categorized expense audits",
        "Flexible membership plans with installment schedules & digital GST receipts",
        "Direct biometric controller management (register, sync, or deactivate members)",
        "Automated WhatsApp notification logs and member renewal tracking",
      ],
      previewStats: [
        { label: "Active Revenue", value: "₹4.8L/mo" },
        { label: "Daily Check-ins", value: "410+ entries" },
        { label: "Pending Dues", value: "Tracked live" },
      ],
    },
    {
      title: "Floor Trainer",
      roleBadge: "Personal Coaches",
      icon: Barbell,
      image: "/images/landing/trainer-session.jpg",
      imageAlt: "Floor Trainer Coaching Client",
      headline: "Deliver Premium Training & Eliminate Missed PT Sessions",
      description: "Dedicated mobile portal for your in-house fitness coaches. Trainers assign personalized workout routines, build custom meal plans, and track completed 1-on-1 PT sessions.",
      highlights: [
        "Client directory with personal health, goals, and emergency contact info",
        "Workout routine builder with video demonstrations & exercise sets",
        "Personalized macro nutrition & daily meal plan assignment",
        "1-on-1 PT session check-in and package deduction logging",
      ],
      previewStats: [
        { label: "Client Roster", value: "24 Athletes" },
        { label: "Sessions Today", value: "8 Completed" },
        { label: "Meal Plans", value: "Active & Synced" },
      ],
    },
    {
      title: "Global Trainer",
      roleBadge: "Online Remote Coaching",
      icon: GlobeHemisphereWest,
      image: "/images/landing/global-trainer.jpg",
      imageAlt: "Global Online Fitness Trainer",
      headline: "Unlock Global Recurring Revenue With Remote Coaching",
      description: "Expand your gym beyond physical walls. Global Trainers handle remote client leads, conduct online consultations, and deliver digital workout regimens worldwide.",
      highlights: [
        "Global online lead pipeline and virtual consultation booking",
        "Remote workout regimen & diet delivery via client portal",
        "Direct video guide libraries and transformation monitoring",
        "Global revenue sharing and automated commission tracking",
      ],
      previewStats: [
        { label: "Remote Athletes", value: "65+ Global" },
        { label: "Active Plans", value: "Remote Custom" },
        { label: "Client Retainers", value: "Global Payouts" },
      ],
    },
    {
      title: "Member / Athlete",
      roleBadge: "Members & Athletes",
      icon: User,
      image: "/images/landing/member-app.jpg",
      imageAlt: "Member Fitness Mobile App Experience",
      headline: "A Premium Digital Fitness Experience in Their Pocket",
      description: "Members stay informed about their plan validity, attendance streak, customized workouts, diet plans, and assigned trainer sessions, creating high member satisfaction.",
      highlights: [
        "Personal biometric check-in history & attendance streak tracker",
        "Assigned workout plans with exercise demo videos and sets/reps",
        "Customized daily meal plans with macro breakdowns",
        "Digital membership card with real-time expiry countdown & receipts",
      ],
      previewStats: [
        { label: "Membership", value: "Annual Gold" },
        { label: "Plan Validity", value: "Active • 214 Days" },
        { label: "Attendance Streak", value: "18 Days" },
      ],
    },
    {
      title: "Superadmin",
      roleBadge: "Multi-Branch & Franchise",
      icon: ShieldStar,
      image: "/images/landing/hero-biometric.jpg",
      imageAlt: "Superadmin Fleet Control",
      headline: "Multi-Branch Governance & Enterprise Fleet Oversight",
      description: "For fitness chains and multi-location operators. Monitor cross-branch performance, manage roles, audit system health, and scale without friction.",
      highlights: [
        "Multi-branch comparative analytics and collection benchmarks",
        "Granular role-based permissions (Owner, Manager, Trainer, Global Trainer)",
        "System health logs, API diagnostics, and biometric sync status",
        "Centralized configuration for plans, taxes, and tenant settings",
      ],
      previewStats: [
        { label: "Network Size", value: "Multi-Branch" },
        { label: "Total Members", value: "12,000+" },
        { label: "System Uptime", value: "99.98%" },
      ],
    },
  ];

  const current = roles[activeRole];
  const CurrentIcon = current.icon;

  return (
    <section id="portals" className="w-full py-16 lg:py-24 bg-[#08090C] border-b border-[#232631]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32] px-3 py-1 rounded-full bg-[#15161C] border border-[#232631]">
            Connected Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-4">
            Dedicated Portals For Every Stakeholder
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8]">
            One integrated platform with tailored experiences for gym owners, personal trainers, remote coaches, gym members, and multi-location admins.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            const isSelected = activeRole === idx;
            return (
              <button
                key={role.title}
                type="button"
                onClick={() => setActiveRole(idx)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#D4FF32] text-black shadow-[0_0_20px_rgba(212,255,50,0.3)] font-bold"
                    : "bg-[#14151A] text-[#94A3B8] border border-[#232631] hover:text-white hover:border-[#383C4D]"
                }`}
              >
                <Icon size={18} weight={isSelected ? "bold" : "regular"} className="shrink-0" />
                <span className="whitespace-nowrap">{role.title}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-[#14151A] border border-[#232631] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1E2028] border border-[#2B2E3A] text-xs font-semibold text-[#D4FF32] w-fit mb-4">
                <CurrentIcon size={16} weight="bold" />
                {current.roleBadge}
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                {current.headline}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {current.description}
              </p>

              <div className="mt-6 space-y-3">
                {current.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 text-sm text-[#E2E8F0]">
                    <div className="w-5 h-5 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} weight="bold" className="text-[#D4FF32]" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#232631] shadow-xl">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D10] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <span>{current.title} View</span>
                  <span className="text-[#D4FF32]">Live Interactive</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#0C0D10] border border-[#232631] p-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {current.previewStats.map((stat) => (
                    <div key={stat.label} className="p-2.5 rounded-lg bg-[#15161C] border border-[#232631]">
                      <span className="text-[11px] text-[#94A3B8] block truncate">{stat.label}</span>
                      <span className="text-sm sm:text-base font-black text-white mt-0.5 block">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
