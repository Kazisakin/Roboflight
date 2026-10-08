"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const COOKIE = "rf_trial_popup_dismissed";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find(r => r.startsWith(name + "=")) ?? null;
}
function setCookie(name: string, days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=1; expires=${exp}; path=/; SameSite=Lax`;
}

export default function AdmissionPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (getCookie(COOKIE)) return;
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 380);
    setCookie(COOKIE, 3);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
      style={{ background: "rgba(10,21,48,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-title"
    >
      <div className={`relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ${closing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
        <div className="relative h-56 w-full overflow-hidden bg-[#0a1530]">
          <Image src="/photos/kids-robot-car-kit-robotics-class.jpg" alt="Students smiling with their robot car kit" fill className="object-cover object-[center_25%]" sizes="600px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1530] via-[#0a1530]/40 to-transparent" />
          <div className="absolute inset-x-6 bottom-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#fbbf24]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#fbbf24]">Free trial class</span>
            </div>
            <h2 id="admission-title" className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight text-white">
              Your first class
              <br />
              <span className="text-[#38bdf8]">is on us.</span>
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-600">
            Let your child try robotics, drones or RC planes with a free, no-obligation trial class in Fredericton. Pick a day and time online in under a minute.
          </p>

          <div className="mt-6 grid grid-cols-3 border-y border-slate-200">
            {[
              { val: "Free", label: "Trial class" },
              { val: "1 hr", label: "Hands-on" },
              { val: "100+", label: "Students" },
            ].map((s, i) => (
              <div key={s.label} className={`py-4 ${i > 0 ? "border-l border-slate-200 pl-4" : ""}`}>
                <p className="text-2xl font-semibold tracking-tight text-[#2563eb]">{s.val}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/book"
            onClick={dismiss}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] py-4 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            Book a free class
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <button onClick={dismiss} className="mt-3 w-full cursor-pointer py-2 text-xs font-medium text-slate-500 transition hover:text-[#0f172a]">
            Maybe later
          </button>
        </div>

        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#0a1530]/40 text-white backdrop-blur transition hover:bg-[#0a1530]/70"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
