import { ReactNode } from "react";
import CustomerHeader from "./components/CustomerHeader";
import AppDeepLinkBanner from "./components/AppDeepLinkBanner";

export default function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col font-['Nimbus_Sans']">
      <AppDeepLinkBanner />
      <CustomerHeader />
      <main className="flex-1 w-full max-w-[600px] mx-auto px-5 pt-6 pb-24">
        {children}
      </main>
    </div>
  );
}
