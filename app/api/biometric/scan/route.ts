import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    if (!deviceId) {
      return NextResponse.json(
        { success: false, error: "Missing deviceId parameter" },
        { status: 400 }
      );
    }

    // Safely parse the incoming payload from the biometric device
    let payload = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        payload = await request.json();
      } catch (e) {
        console.warn("[Biometric Scan API] Failed to parse JSON body");
      }
    } else {
      try {
        const text = await request.text();
        if (text) {
          payload = { raw: text };
        }
      } catch (e) {
        // Ignore
      }
    }

    // Log the received scan for debugging
    console.log(`[Biometric Scan API] Scan received from deviceId: ${deviceId}`);
    console.log("[Biometric Scan API] Payload:", payload);

    // TODO: In a production environment, this is where you would process the 
    // scan payload (e.g. matching fingerprint/face ID) and insert a log entry 
    // into the Supabase database.

    return NextResponse.json(
      {
        success: true,
        message: "Scan event received successfully",
        deviceId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("[Biometric Scan API] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json(
    { success: true, message: "Biometric Scan API is active." },
    { status: 200 }
  );
}
