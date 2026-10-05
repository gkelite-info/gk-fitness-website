import { Suspense } from "react";
import CommunityClient from "./_components/CommunityClient";

export const metadata = {
  title: "Community - GK-Gym Life",
};

export default function CommunityPage() {
  return (
    <div className="w-full min-h-screen bg-[#0E0F13] flex flex-col items-center justify-center relative">
      <Suspense 
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E0F13]">
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <span className="font-['Nimbus_Sans'] font-medium text-[16px] text-[#94A3B8]">
                Loading Community...
              </span>
            </div>
          </div>
        }
      >
        <CommunityClient />
      </Suspense>
    </div>
  );
}
