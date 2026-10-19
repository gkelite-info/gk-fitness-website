"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AuthRecoveryRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/reset-password") return;

    const search = window.location.search || "";
    const hash = window.location.hash || "";
    const searchParams = new URLSearchParams(search);
    const hashParams = new URLSearchParams(hash.replace(/^#/, ""));

    const isRecovery =
      searchParams.get("type") === "recovery" ||
      hashParams.get("type") === "recovery" ||
      hash.includes("type=recovery") ||
      (Boolean(hashParams.get("access_token")) && hash.includes("type=recovery")) ||
      Boolean(searchParams.get("token_hash")) ||
      ((searchParams.has("error") || hashParams.has("error")) &&
        (hash.includes("type=recovery") ||
          search.includes("type=recovery") ||
          searchParams.get("error_code") === "otp_expired" ||
          hashParams.get("error_code") === "otp_expired"));

    if (isRecovery) {
      window.location.replace(`/reset-password${search}${hash}`);
    }
  }, [pathname]);

  return null;
}
