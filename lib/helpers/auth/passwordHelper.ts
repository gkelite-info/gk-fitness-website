import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 10;

async function sha256Browser(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  try {
    const nodeCrypto = await import('crypto');
    return nodeCrypto.createHash('sha256').update(message).digest('hex');
  } catch {
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}

export async function hashPassword(password: string): Promise<string> {
  const cleanPassword = password.trim();
  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  return bcrypt.hashSync(cleanPassword, salt);
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!password || !storedHash) return false;
  const rawPassword = password;
  const trimmedPassword = password.trim();

  if (
    storedHash.startsWith('$2a$') ||
    storedHash.startsWith('$2b$') ||
    storedHash.startsWith('$2y$')
  ) {
    try {
      if (bcrypt.compareSync(rawPassword, storedHash)) return true;
      if (bcrypt.compareSync(trimmedPassword, storedHash)) return true;
    } catch (bcryptErr) {
      console.warn('[passwordHelper] Bcrypt compare error:', bcryptErr);
    }
  }

  try {
    const sha = await sha256Browser(rawPassword);
    const shaTrimmed = await sha256Browser(trimmedPassword);
    if (storedHash === sha || storedHash === shaTrimmed) {
      return true;
    }
  } catch (shaErr) {
    console.warn('[passwordHelper] SHA-256 fallback error:', shaErr);
  }

  if (storedHash === rawPassword || storedHash === trimmedPassword) {
    return true;
  }
  return false;
}
