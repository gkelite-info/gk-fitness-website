import { ReactNode } from "react";
import PortalLayout from "@/app/(screens)/components/layout/PortalLayout";

export default function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PortalLayout>
      <div className="w-full h-full flex justify-center">
        <div className="w-full max-w-[1600px]">
          {children}
        </div>
      </div>
    </PortalLayout>
  );
}
