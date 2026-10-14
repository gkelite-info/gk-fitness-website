import { supabase } from "@/lib/supabase";

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString =
    typeof window !== "undefined"
      ? window.atob(base64)
      : Buffer.from(base64, "base64").toString("binary");
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function getGymLogoUrl(logo?: string | null): string {
  if (!logo || !logo.trim()) {
    return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80";
  }
  if (logo.startsWith("http://") || logo.startsWith("https://")) {
    return logo;
  }
  const cleanPath = logo.startsWith("/") ? logo.slice(1) : logo;
  const { data } = supabase.storage.from("gym-logos").getPublicUrl(cleanPath);
  return (
    data?.publicUrl ||
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80"
  );
}

export async function uploadGymLogo(
  fileName: string,
  arrayBuffer: ArrayBuffer
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from("gym-logos")
    .upload(fileName, arrayBuffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) throw error;
  if (data) {
    const { data: publicUrlData } = supabase.storage
      .from("gym-logos")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  }
  return null;
}

export async function uploadGymQR(
  base64Data: string,
  gymId: string
): Promise<string | null> {
  const base64Str = base64Data.includes("base64,")
    ? base64Data.split("base64,")[1]
    : base64Data;
  const arrayBuffer = base64ToArrayBuffer(base64Str);
  const fileName = `${gymId}_qr.png`;

  const { data, error } = await supabase.storage
    .from("gymsQR")
    .upload(fileName, arrayBuffer, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) throw error;
  if (data) {
    const { data: publicUrlData } = supabase.storage
      .from("gymsQR")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  }
  return null;
}
