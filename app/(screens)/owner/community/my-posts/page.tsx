import { Suspense } from "react";
import MyPostsClient from "./_components/MyPostsClient";

export const metadata = {
  title: "My Posts - GK-Gym Life",
};

export default function MyPostsPage() {
  return (
    <div className="w-full min-h-screen bg-[#0E0F13] flex flex-col items-center justify-center relative">
      <Suspense 
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E0F13]">
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <span className="font-['Nimbus_Sans'] font-medium text-[16px] text-[#94A3B8]">
                Loading My Posts...
              </span>
            </div>
          </div>
        }
      >
        <MyPostsClient />
      </Suspense>
    </div>
  );
}
