import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/helpers/razorpay/razorpayServer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { order_id, payment_id, signature } = body;

    if (!order_id || !payment_id || !signature) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: order_id, payment_id, signature" },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      orderId: order_id,
      paymentId: payment_id,
      signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Error verifying payment signature:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
