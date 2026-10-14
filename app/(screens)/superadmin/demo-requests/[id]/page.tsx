import { getDemoRequestByIdAction } from "@/app/actions/demoRequests";
import { DemoRequestDetailsClient } from "./_components/DemoRequestDetailsClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DemoRequestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getDemoRequestByIdAction(id);

  if (!res.success || !res.data) {
    notFound();
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-101px)]">
      <DemoRequestDetailsClient request={res.data} />
    </div>
  );
}
