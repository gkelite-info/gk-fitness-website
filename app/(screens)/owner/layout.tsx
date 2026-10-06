import { ReactNode } from "react";
import PortalLayout from "@/app/(screens)/components/layout/PortalLayout";

export default function OwnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PortalLayout>
      <div className="w-full h-full flex justify-center print:h-auto print:block">
        <div className="w-full max-w-[1600px] print:max-w-none print:w-auto">
          {children}
        </div>
      </div>
    </PortalLayout>
  );
}
