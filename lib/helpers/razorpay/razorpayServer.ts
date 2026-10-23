import Razorpay from "razorpay";
import crypto from "crypto";
import fs from "fs";
import path from "path";

function readEnvVarFromFile(key: string): string {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, "");
      }
    }
  } catch {}
  return "";
}

export function getRazorpayCredentials() {
  const key_id = (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY_ID ||
    readEnvVarFromFile("NEXT_PUBLIC_RAZORPAY_KEY_ID") ||
    readEnvVarFromFile("RAZORPAY_KEY_ID") ||
    ""
  ).trim();

  const key_secret = (
    process.env.RAZORPAY_KEY_SECRET ||
    readEnvVarFromFile("RAZORPAY_KEY_SECRET") ||
    ""
  ).trim();

  return { key_id, key_secret };
}

export function getRazorpayClient() {
  const { key_id, key_secret } = getRazorpayCredentials();

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
  orderId?: string | null;
  paymentId: string;
  signature?: string | null;
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: VerifySignatureParams): boolean {
  if (!orderId || !signature || !paymentId) {
    return false;
  }

  const { key_secret } = getRazorpayCredentials();
  if (!key_secret) {
    return false;
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return generatedSignature === signature;
  } catch {
    return false;
  }
}

export async function fetchRazorpayOrder(orderId: string) {
  const client = getRazorpayClient();
  return await client.orders.fetch(orderId);
}

export async function fetchRazorpayOrderPayments(orderId: string) {
  const client = getRazorpayClient();
  return await client.orders.fetchPayments(orderId);
}

export async function fetchRazorpayPayment(paymentId: string) {
  const client = getRazorpayClient();
  return await client.payments.fetch(paymentId);
}

export async function captureRazorpayPayment(paymentId: string, amount: number, currency = "INR") {
  const client = getRazorpayClient();
  return await client.payments.capture(paymentId, amount, currency);
}
