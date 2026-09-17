import {ReactNode} from "react";
import TopHeader from "@/app/(screens)/components/layout/TopHeader";

export default function OwnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0C0D10] text-white flex flex-col">
      <TopHeader />
      <main className="flex-1 flex justify-center w-full">
        <div className="w-full max-w-[1600px] overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
