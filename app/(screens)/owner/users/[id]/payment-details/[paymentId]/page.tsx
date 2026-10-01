import PaymentDetailsView from "../../../../../components/reusable/payment-details/PaymentDetailsView";

export default async function PaymentDetailsPage({ params }: { params: Promise<{ id: string; paymentId: string }> }) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-col w-full h-full bg-[#111319]">
      <PaymentDetailsView userId={resolvedParams.id} paymentId={resolvedParams.paymentId} />
    </div>
  );
}
