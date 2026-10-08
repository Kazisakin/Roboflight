"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try { consent = localStorage.getItem("cookie-consent"); } catch { /* storage blocked */ }
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie-consent", "accepted"); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("rf-consent", { detail: "accepted" }));
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem("cookie-consent", "declined"); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("rf-consent", { detail: "declined" }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-[#f8fafc] shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#0f172a]">We use cookies</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            We use cookies for site analytics (Google Analytics) and to measure our ads (Google Ads, Meta). Nothing is set unless you accept. See our{" "}
            <Link href="/cookies" className="underline hover:text-[#2563eb]">Cookie Policy</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-[#2563eb]">Privacy Policy</Link> for details.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={decline} className="flex-1 cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 transition hover:border-[#0f172a] sm:flex-none">
            Decline non-essential
          </button>
          <button onClick={accept} className="flex-1 cursor-pointer rounded-full bg-[#2563eb] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1d4ed8] sm:flex-none">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
