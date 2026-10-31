import { supabase } from '@/lib/supabase';
import { verifyPassword, hashPassword } from '@/lib/helpers/auth/passwordHelper';
import { saveFallbackAuthUser } from '@/lib/helpers/auth/fallbackAuthHelper';

export async function handleSignIn(identifier: string, passwordInput: string) {
  let authData: any = null;
  let authError: any = null;
  const cleanIdentifier = identifier.trim();
  const cleanPassword = passwordInput;

  const firstAttempt = await supabase.auth.signInWithPassword({
    email: cleanIdentifier,
    password: cleanPassword,
  });

  if (!firstAttempt.error) {
    authData = firstAttempt.data;
    authError = null;
  } else {
    if (cleanPassword.trim() !== cleanPassword) {
      const secondAttempt = await supabase.auth.signInWithPassword({
        email: cleanIdentifier,
        password: cleanPassword.trim(),
      });
      if (!secondAttempt.error) {
        authData = secondAttempt.data;
        authError = null;
      } else {
        authError = firstAttempt.error;
      }
    } else {
      authError = firstAttempt.error;
    }
  }

  if (authError) {
    try {
      let userQuery = supabase
        .from('users')
        .select('userId, name, email, phone, role, status, isEmailVerified, isPhoneVerified, password');

      if (cleanIdentifier.includes('@')) {
        userQuery = userQuery.ilike('email', cleanIdentifier.toLowerCase());
      } else {
        const cleanDigits = cleanIdentifier.replace(/[^0-9]/g, '');
        const last10 = cleanDigits.slice(-10);
        userQuery = userQuery.or(`phone.ilike.%${last10}%,email.ilike.%${last10}%`);
      }

      const { data: dbUser } = await userQuery.maybeSingle();

      if (dbUser && dbUser.password) {
        const isMatch = await verifyPassword(cleanPassword, dbUser.password);
        if (isMatch) {
          if (!dbUser.password.startsWith('$2')) {
            try {
              const upgradedHash = await hashPassword(cleanPassword);
              await supabase.from('users').update({ password: upgradedHash }).eq('userId', dbUser.userId);
            } catch (upgradeErr) {
              console.warn('[SignIn] Failed to auto-upgrade password:', upgradeErr);
            }
          }

          authError = null;
          authData = {
            user: {
              id: dbUser.userId,
              email: dbUser.email,
              user_metadata: {
                role: dbUser.role,
                name: dbUser.name,
                phone: dbUser.phone,
              },
            },
          };

          await saveFallbackAuthUser({
            id: dbUser.userId,
            email: dbUser.email,
            role: dbUser.role,
            name: dbUser.name,
          });

          if (!dbUser.isEmailVerified) {
            try {
              await supabase.from('users').update({ isEmailVerified: true }).eq('userId', dbUser.userId);
            } catch {}
          }
        }
      }
    } catch (fallbackCheckErr) {
      console.error('[SignIn] Error checking database password fallback:', fallbackCheckErr);
    }
  }

  if (authError) {
    const errorMsg = authError.message?.toLowerCase().includes('invalid login credentials')
      ? 'Invalid email or password. Please check your credentials.'
      : (authError.message || 'Invalid credentials or check role');
    throw new Error(errorMsg);
  }

  return authData;
}
