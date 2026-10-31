export const SECURE_SESSION_STORAGE_KEY = '_gk_sec_tkn_8f19a_';
const APP_CIPHER_SECRET = 'GK_FITNESS_SECURE_TOKEN_SEAL_V1_7c8d9e2a1b5f';

export interface FallbackAuthUser {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

function utf8ToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function sha256Hex(data: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function generateKeyStream(secret: string, nonce: string, byteLength: number): Promise<Uint8Array> {
  let hexStream = '';
  let blockIndex = 0;
  while (hexStream.length < byteLength * 2) {
    const hash = await sha256Hex(`${secret}:${nonce}:${blockIndex++}`);
    hexStream += hash;
  }
  return hexToBytes(hexStream.slice(0, byteLength * 2));
}

export async function encryptSecretPayload(plainText: string): Promise<string> {
  const nonceBytes = crypto.getRandomValues(new Uint8Array(16));
  const nonceHex = bytesToHex(nonceBytes);
  const plainBytes = utf8ToBytes(plainText);
  const keyStream = await generateKeyStream(APP_CIPHER_SECRET, nonceHex, plainBytes.length);
  const cipherBytes = new Uint8Array(plainBytes.length);
  for (let i = 0; i < plainBytes.length; i++) {
    cipherBytes[i] = plainBytes[i] ^ keyStream[i];
  }
  const cipherHex = bytesToHex(cipherBytes);
  const tag = await sha256Hex(`${APP_CIPHER_SECRET}:auth_tag:${nonceHex}:${cipherHex}`);
  return `v1.${nonceHex}.${cipherHex}.${tag}`;
}

export async function decryptSecretPayload(sealed: string): Promise<string | null> {
  const parts = sealed.split('.');
  if (parts.length !== 4 || parts[0] !== 'v1') return null;
  const [, nonceHex, cipherHex, tag] = parts;
  const expectedTag = await sha256Hex(`${APP_CIPHER_SECRET}:auth_tag:${nonceHex}:${cipherHex}`);
  if (expectedTag !== tag) return null;
  const cipherBytes = hexToBytes(cipherHex);
  const keyStream = await generateKeyStream(APP_CIPHER_SECRET, nonceHex, cipherBytes.length);
  const plainBytes = new Uint8Array(cipherBytes.length);
  for (let i = 0; i < cipherBytes.length; i++) {
    plainBytes[i] = cipherBytes[i] ^ keyStream[i];
  }
  return bytesToUtf8(plainBytes);
}

export async function saveFallbackAuthUser(user: FallbackAuthUser): Promise<void> {
  if (typeof window === 'undefined') return;
  const plainJson = JSON.stringify(user);
  const sealedToken = await encryptSecretPayload(plainJson);
  localStorage.setItem(SECURE_SESSION_STORAGE_KEY, sealedToken);
}

export async function getFallbackAuthUser(): Promise<FallbackAuthUser | null> {
  if (typeof window === 'undefined') return null;
  const sealed = localStorage.getItem(SECURE_SESSION_STORAGE_KEY);
  if (!sealed) return null;
  const decrypted = await decryptSecretPayload(sealed);
  if (!decrypted) return null;
  try {
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

export async function clearFallbackAuthUser(): Promise<void> {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SECURE_SESSION_STORAGE_KEY);
}
