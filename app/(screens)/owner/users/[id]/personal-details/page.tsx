import PersonalDetailsClient from "./PersonalDetailsClient";

export default async function PersonalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return <PersonalDetailsClient id={resolvedParams.id} />;
}
