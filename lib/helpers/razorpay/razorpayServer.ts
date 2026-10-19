import Razorpay from "razorpay";
import crypto from "crypto";

export function getRazorpayClient() {
  const key_id = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "").trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

  if (!key_id || !key_secret) {
    throw new Error("Razorpay API Key or Secret is not configured in environment variables.");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

export interface CreateOrderParams {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export async function createRazorpayOrderInstance({
  amount,
  currency = "INR",
  receipt,
  notes,
}: CreateOrderParams) {
  const client = getRazorpayClient();
  const order = await client.orders.create({
    amount: Math.round(amount * 100),
    currency,
    receipt: receipt || `rcpt_${Date.now()}`,
    notes,
  });

  return order;
}

export interface VerifySignatureParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: VerifySignatureParams): boolean {
  const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  if (!secret) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

export async function fetchRazorpayOrder(orderId: string) {
  const client = getRazorpayClient();
  return await client.orders.fetch(orderId);
}

export async function fetchRazorpayOrderPayments(orderId: string) {
  const client = getRazorpayClient();
  return await client.orders.fetchPayments(orderId);
}
