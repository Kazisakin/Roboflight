"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ADS_CALL_LABEL, ADS_ID, GA_ID, META_PIXEL_ID } from "@/lib/track";

type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; __rfConsent?: boolean; dataLayer?: unknown[] };

const CONSENT_KEY = "cookie-consent";

function loadMetaPixel() {
  const win = window as W;
  if (!META_PIXEL_ID || win.fbq) return;
  /* Meta's standard base code, written out so it only runs after consent. */
  type Fbq = ((...a: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; push: unknown; loaded: boolean; version: string };
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args); else n.queue.push(args);
  } as Fbq;
  n.queue = []; n.push = n; n.loaded = true; n.version = "2.0";
  win.fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", META_PIXEL_ID);
  n("track", "PageView");
}

function grant() {
  const win = window as W;
  win.__rfConsent = true;
  win.gtag?.("consent", "update", { ad_storage: "granted", analytics_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
  loadMetaPixel();
}

/**
 * Loads Google tag (GA4 + Google Ads) in Consent Mode v2 — everything starts "denied"
 * and is only granted when the visitor clicks "Accept all". Meta Pixel loads only after consent.
 */
export default function Analytics() {
  const pathname = usePathname();
  const googleIds = [GA_ID, ADS_ID].filter(Boolean);

  // Apply a stored choice on load, and listen for the banner.
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch { /* blocked storage */ }
    if (stored === "accepted") grant();
    const onConsent = (e: Event) => { if ((e as CustomEvent).detail === "accepted") grant(); };
    window.addEventListener("rf-consent", onConsent);
    return () => window.removeEventListener("rf-consent", onConsent);
  }, []);

  // Page views on client-side navigation (first view is sent by config).
  useEffect(() => {
    const win = window as W;
    win.fbq?.("track", "PageView");
    if (pathname.startsWith("/programs/")) win.gtag?.("event", "program_view", { program: pathname.split("/").at(-1) });
  }, [pathname]);

  // Phone, directions and email clicks anywhere on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const win = window as W;
      if (href.startsWith("tel:")) {
        win.gtag?.("event", "phone_click", { location: pathname });
        if (ADS_ID && ADS_CALL_LABEL) win.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_CALL_LABEL}` });
        win.fbq?.("track", "Contact");
      } else if (href.includes("google.com/maps")) {
        win.gtag?.("event", "directions_click", { location: pathname });
      } else if (href.startsWith("mailto:")) {
        win.gtag?.("event", "email_click", { location: pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  if (!googleIds.length) return null;

  return (
    <>
      <Script id="gtag-consent" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
        try { if (localStorage.getItem('${CONSENT_KEY}') === 'accepted') { window.__rfConsent = true; gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' }); } } catch (e) {}
        gtag('js', new Date());
        ${googleIds.map((id) => `gtag('config', '${id}');`).join("\n        ")}
      `}</Script>
      <Script id="gtag-src" src={`https://www.googletagmanager.com/gtag/js?id=${googleIds.at(0)}`} strategy="afterInteractive" />
    </>
  );
}
