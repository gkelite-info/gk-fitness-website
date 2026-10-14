import { Suspense } from "react";
import SuperAdminUsersView from "@/app/(screens)/components/reusable/superadmin-users/SuperAdminUsersView";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuperAdminUsersPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialTab =
    typeof resolvedParams?.tab === "string" ? resolvedParams.tab : "owners";

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <SuperAdminUsersView initialTab={initialTab} />
    </Suspense>
  );
}
