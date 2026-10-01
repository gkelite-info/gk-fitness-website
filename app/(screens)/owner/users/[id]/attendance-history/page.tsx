import AttendanceHistoryView from "@/app/(screens)/components/reusable/attendance-history/AttendanceHistoryView";

export default async function AttendanceHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen bg-[#0A0C11] overflow-y-auto">
      <AttendanceHistoryView customerId={resolvedParams.id} />
    </div>
  );
}
