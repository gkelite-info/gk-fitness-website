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
      Boolean(searchParams.get("code")) ||
      searchParams.get("type") === "recovery" ||
      searchParams.has("error") ||
      searchParams.has("error_code") ||
      hashParams.get("type") === "recovery" ||
      hashParams.has("error") ||
      hashParams.has("error_code") ||
      hash.includes("type=recovery") ||
      hashParams.has("access_token");

    if (isRecovery) {
      window.location.replace(`/reset-password${search}${hash}`);
    }
  }, [pathname]);

  return null;
}
