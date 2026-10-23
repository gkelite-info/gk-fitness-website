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
    process.env.RAZORPAY_KEY ||
    readEnvVarFromFile("NEXT_PUBLIC_RAZORPAY_KEY_ID") ||
    readEnvVarFromFile("RAZORPAY_KEY_ID") ||
    readEnvVarFromFile("RAZORPAY_KEY") ||
    ""
  ).trim().replace(/^["']|["']$/g, "");

  let key_secret = (
    process.env.RAZORPAY_KEY_SECRET ||
    process.env.RAZORPAY_SECRET ||
    process.env.RAZORPAY_SECRET_KEY ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET ||
    readEnvVarFromFile("RAZORPAY_KEY_SECRET") ||
    readEnvVarFromFile("RAZORPAY_SECRET") ||
    readEnvVarFromFile("RAZORPAY_SECRET_KEY") ||
    ""
  ).trim().replace(/^["']|["']$/g, "");

  // Safe fallback for known test key: ensures orders and verification work in test mode
  if (!key_secret && (key_id === "rzp_test_TqwG7MrUzYzzb9" || !key_id)) {
    key_secret = "CaXu6htzhcPKbCE5dlXwTsOF";
  }

  return { key_id: key_id || "rzp_test_TqwG7MrUzYzzb9", key_secret };
}

export function getRazorpayClient() {
  const { key_id, key_secret } = getRazorpayCredentials();

  if (!key_id || !key_secret) {
    throw new Error(
      `Razorpay API Key or Secret is missing (key_id=${key_id ? "configured" : "missing"}, key_secret=${key_secret ? "configured" : "missing"}). Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables.`
    );
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
    console.warn("[verifyRazorpaySignature] Missing verification params:", {
      hasOrderId: Boolean(orderId),
      hasSignature: Boolean(signature),
      hasPaymentId: Boolean(paymentId),
    });
    return false;
  }

  const { key_secret } = getRazorpayCredentials();
  if (!key_secret) {
    console.error("[verifyRazorpaySignature] Razorpay secret is not configured on server.");
    return false;
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const matches = generatedSignature === signature;
    if (!matches) {
      console.warn("[verifyRazorpaySignature] Signature mismatch!", {
        orderId,
        paymentId,
        receivedSigLen: signature?.length,
        generatedSigLen: generatedSignature?.length,
      });
    }
    return matches;
  } catch (err) {
    console.error("[verifyRazorpaySignature] Error in HMAC calculation:", err);
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
