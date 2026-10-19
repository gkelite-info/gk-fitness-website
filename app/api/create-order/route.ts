import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/helpers/razorpay/razorpayServer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const amount = Number(body.amount);
    const currency = body.currency || "INR";
    const receipt = body.receipt || `rcpt_${Date.now()}`;
    const notes = body.notes || {};

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1.00)" },
        { status: 400 }
      );
    }

    const client = getRazorpayClient();
    const order = await client.orders.create({
      amount: Math.round(amount),
      currency,
      receipt,
      notes,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order via API:", error);
    const statusCode = error?.statusCode || 500;
    const message = error?.error?.description || error?.message || "Failed to create order";
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
