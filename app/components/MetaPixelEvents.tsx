"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MetaPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const first = useRef(true);

  // PageView en navigaciones SPA (evita doble conteo en la primera carga)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fbq = (window as any).fbq;
    if (!fbq) return;

    if (first.current) {
      first.current = false;
      return;
    }
    fbq("track", "PageView");
  }, [pathname, searchParams]);

  // Contact cuando hacen click en tel / whatsapp (global)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href") || "";
      const isPhone = href.startsWith("tel:");
      const isWhatsApp =
        href.includes("wa.me") || href.includes("api.whatsapp.com");

      if (!isPhone && !isWhatsApp) return;

      const fbq = (window as any).fbq;
      if (fbq) fbq("track", "Contact");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
