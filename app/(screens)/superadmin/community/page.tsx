import { Suspense } from "react";
import CommunityClient from "../../owner/community/_components/CommunityClient";

export const metadata = {
  title: "Community - GK-Gym Life",
};

export default function CommunityPage() {
  return (
    <div className="w-full min-h-screen bg-[#0E0F13] flex flex-col relative">
      <Suspense fallback={null}>
        <CommunityClient />
      </Suspense>
    </div>
  );
}
