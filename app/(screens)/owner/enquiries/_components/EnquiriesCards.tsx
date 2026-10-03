"use client";

import EnquiryKPICard from "@/app/(screens)/components/reusable/cards/EnquiryKPICard";
import { ChatCircle, Fire, User, Snowflake, Clock } from "@phosphor-icons/react";
import Link from "next/link";

export default function EnquiriesCards({ enquiries = [] }: { enquiries?: any[] }) {
  const totalEnquiries = enquiries.length;
  const hotEnquiries = enquiries.filter((e) => e.enquiryCategory === 'hot').length;
  const warmEnquiries = enquiries.filter((e) => e.enquiryCategory === 'warm').length;
  const coldEnquiries = enquiries.filter((e) => e.enquiryCategory === 'cold').length;
  const totalConverted = enquiries.filter((e) => e.status === 'converted').length;
  
  const dynamicMetrics = [
    {
      title: "Total Enquiries",
      value: totalEnquiries,
      trend: "up" as const,
      trendValue: "0%",
      trendLabel: "vs last month",
      icon: <ChatCircle size={16} weight="fill" />,
      iconBgColor: "#063327",
      iconColor: "#22C55E",
    },
    {
      title: "Hot Enquiries",
      value: hotEnquiries,
      trend: "up" as const,
      trendValue: "0",
      trendLabel: "this week",
      icon: <Fire size={16} weight="fill" />,
      iconBgColor: "#38161A",
      iconColor: "#EF4444",
    },
    {
      title: "Warm Enquiries",
      value: warmEnquiries,
      trend: "up" as const,
      trendValue: "0",
      trendLabel: "this week",
      icon: <User size={16} weight="fill" />,
      iconBgColor: "#332211",
      iconColor: "#F59E0B",
    },
    {
      title: "Cold Enquiries",
      value: coldEnquiries,
      trend: "none" as const,
      trendValue: "No change",
      icon: <Snowflake size={16} weight="fill" />,
      iconBgColor: "#0C2D3A",
      iconColor: "#38BDF8",
    },
    {
      title: "Total converted",
      value: totalConverted,
      trend: "up" as const,
      trendValue: "0",
      trendLabel: "this week",
      icon: <Clock size={16} weight="fill" />,
      iconBgColor: "#27173B",
      iconColor: "#A855F7",
      href: "/owner/enquiries/converted"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-full gap-3 shrink-0">
      {dynamicMetrics.map((metric, idx) => (
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
