"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdUnit({
  client,
  slot,
  variant,
}: {
  client: string;
  slot: string;
  variant: "wide" | "box";
}) {
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      requested.current = false;
    }
  }, []);

  return (
    <aside className={`ad-space ad-space-${variant}`} aria-label="광고">
      <span className="ad-label">광고</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
