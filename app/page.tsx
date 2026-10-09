import type { Metadata } from "next";
import LandingPageClient from "@/app/(screens)/components/landing/LandingPageClient";

export const metadata: Metadata = {
  title: "GK Fitness Powered Gyms | Scale Gym Revenue Without Operational Chaos",
  description:
    "Turn your gym into a scalable profit engine. GK Fitness Powered Gyms combines biometric hardware sync, CRM lead pipelines, automated WhatsApp renewal alerts, and deep finance tracking.",
  keywords: [
    "gym management software",
    "biometric attendance for gym",
    "gym crm",
    "gk fitness",
    "gym operating system",
    "gym revenue growth",
  ],
};

export default function HomePage() {
  return <LandingPageClient />;
}
