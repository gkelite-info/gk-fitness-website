import AppDeepLinkBanner from "@/app/(screens)/customer/components/AppDeepLinkBanner";
import GlobalTrainerHeader from "./components/GlobalTrainerHeader";

export default function GlobalTrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col text-white">
      <AppDeepLinkBanner />
      <GlobalTrainerHeader />
      <main className="flex-1 w-full max-w-[600px] mx-auto px-5 pt-6 pb-24">
        {children}
      </main>
    </div>
  );
}
