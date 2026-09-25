"use client";

import EnquiryKPICard from "@/app/(screens)/components/reusable/cards/EnquiryKPICard";
import { ChatCircle, Fire, User, Snowflake, Clock } from "@phosphor-icons/react";
import Link from "next/link";

const metrics = [
  {
    title: "Total Enquiries",
    value: 48,
    trend: "up" as const,
    trendValue: "12%",
    trendLabel: "vs last month",
    icon: <ChatCircle size={16} weight="fill" />,
    iconBgColor: "#063327",
    iconColor: "#22C55E",
  },
  {
    title: "Hot Enquiries",
    value: 12,
    trend: "up" as const,
    trendValue: "3",
    trendLabel: "this week",
    icon: <Fire size={16} weight="fill" />,
    iconBgColor: "#38161A",
    iconColor: "#EF4444",
  },
  {
    title: "Warm Enquiries",
    value: 18,
    trend: "up" as const,
    trendValue: "5",
    trendLabel: "this week",
    icon: <User size={16} weight="fill" />,
    iconBgColor: "#332211",
    iconColor: "#F59E0B",
  },
  {
    title: "Cold Enquiries",
    value: 10,
    trend: "none" as const,
    trendValue: "No change",
    icon: <Snowflake size={16} weight="fill" />,
    iconBgColor: "#0C2D3A",
    iconColor: "#38BDF8",
  },
  {
    title: "Total converted",
    value: 8,
    trend: "up" as const,
    trendValue: "5",
    trendLabel: "this week",
    icon: <Clock size={16} weight="fill" />,
    iconBgColor: "#27173B",
    iconColor: "#A855F7",
    href: "/owner/enquiries/converted"
  }
];

export default function EnquiriesCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-full gap-3 shrink-0">
      {metrics.map((metric, idx) => (
        metric.href ? (
          <Link href={metric.href} key={idx} className="block transition-transform hover:scale-[1.02]">
            <EnquiryKPICard {...metric} />
          </Link>
        ) : (
          <EnquiryKPICard key={idx} {...metric} />
        )
      ))}
    </div>
  );
}
