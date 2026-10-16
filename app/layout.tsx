import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gkgymlife.com"),
  title: {
    default: "GK-Gym Life | Boost Your Gym's Revenue and Simplify Your Daily Operations",
    template: "%s | GK- Gym Life",
  },
  description:
    "GK-Gym Life Powered Gyms Ecosystem - All-in-one gym operating system combining biometric hardware sync, CRM lead pipelines, automated WhatsApp renewal alerts, trainer scheduling, POS inventory, and deep finance tracking.",
  keywords: [
    "GK-Gym Life",
    "GK Gym Life",
    "GK Fitness",
    "GK Gym Life Powered Gyms",
    "gym management software",
    "gym operating system",
    "gym management system",
    "fitness club management software",
    "gym CRM",
    "gym CRM software",
    "biometric attendance for gym",
    "gym biometric access control",
    "gym attendance machine",
    "facial recognition gym attendance",
    "fingerprint gym attendance",
    "gym turnstile integration",
    "RFID gym check in",
    "automated gym access",
    "gym entry control",
    "gym lead management",
    "gym enquiry tracking",
    "gym sales pipeline",
    "gym lead conversion",
    "automated WhatsApp renewal alerts",
    "gym WhatsApp automation",
    "membership expiry reminder",
    "gym member retention software",
    "gym billing software",
    "gym payment gateway",
    "gym recurring payments",
    "Razorpay gym integration",
    "gym subscription management",
    "gym invoice software",
    "gym revenue auditing",
    "gym financial reports",
    "daily gym cashflow audit",
    "personal trainer management software",
    "PT session booking",
    "personal training tracking",
    "trainer workout planner",
    "gym diet planner software",
    "fitness coach management",
    "gym member mobile app",
    "gym owner portal",
    "trainer portal",
    "superadmin gym management",
    "multi branch gym software",
    "multi gym management software",
    "fitness franchise management",
    "gym inventory management",
    "pro shop POS for gyms",
    "gym equipment tracking",
    "gym maintenance software",
    "gym community feed",
    "fitness challenge tracking",
    "workout progress tracking",
    "body composition tracking",
    "water intake tracking",
    "scale gym revenue",
    "eliminate gym operational chaos",
    "cloud based gym software",
    "all in one gym platform",
    "modern fitness center software",
    "best gym software India",
    "smart gym automation",
    "contactless gym check in",
    "gym member attendance tracking"
  ],
  icons: {
    icon: "/512x512 2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <UserProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#14151A',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.05)'
                },
                success: {
                  iconTheme: { primary: '#D4FF32', secondary: '#000' }
                }
              }}
            />
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
