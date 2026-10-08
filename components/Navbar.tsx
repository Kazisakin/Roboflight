"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { Arrow } from "@/components/ui";
import { programs } from "@/lib/programs";
import ProgramIcon, { accentCls } from "@/components/ProgramIcon";
import { site } from "@/lib/site";

const links = [
  { label: "Home",    href: "/",         id: "home" },
  { label: "Hours",   href: "/#hours",   id: "hours" },
  { label: "Gallery", href: "/#gallery", id: "gallery" },
  { label: "FAQ",     href: "/faq",      id: "faq" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

function PhoneIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.62 2.63a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0122 16.92z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const [active, setActive] = useState(isHome ? "home" : "");
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!isHome) return;
      let current = "home";
      for (const id of ["programs", ...links.map((l) => l.id)]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 170) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close the Programs dropdown on outside click / Escape
  useEffect(() => {
    if (!progOpen) return;
    const onDown = (e: MouseEvent) => { if (!progRef.current?.contains(e.target as Node)) setProgOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setProgOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [progOpen]);

  const progActive = pathname.startsWith("/programs") || active === "programs";
  const linkCls = (on: boolean) =>
    `relative rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${on ? "bg-white/[0.12] text-white" : "text-white/75 hover:bg-white/[0.06] hover:text-white"}`;
  const underline = (on: boolean) => (on ? "hidden" : "hidden");

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <header
        className={`mx-auto max-w-6xl border border-white/15 text-white backdrop-blur-xl transition-all duration-300 ${open ? "rounded-3xl" : "rounded-[2rem]"} ${
          scrolled || open ? "bg-[#0a1530]/92 shadow-[0_16px_44px_rgba(10,21,48,0.45)]" : "bg-[#0a1530]/80 shadow-[0_12px_36px_rgba(10,21,48,0.3)]"
        }`}
      >
        <div className="pl-5 pr-2 sm:pl-6">
          <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-[60px]" : "h-[66px]"}`}>
            <Link href="/" className="shrink-0" aria-label="RoboFlight — Home" onClick={() => setOpen(false)}>
              <Logo variant="white" size="md" />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
              <Link href="/" className={`group ${linkCls(active === "home" && isHome)}`}>
                Home<span aria-hidden="true" className={`${underline(active === "home" && isHome)} group-hover:scale-x-100`} />
              </Link>

              {/* Programs dropdown */}
              <div ref={progRef} className="relative" onMouseEnter={() => setProgOpen(true)} onMouseLeave={() => setProgOpen(false)}>
                <button
                  type="button"
                  className={`group flex cursor-pointer items-center gap-1 ${linkCls(progActive)}`}
                  aria-expanded={progOpen}
                  aria-haspopup="true"
                  onClick={() => setProgOpen((o) => !o)}
                >
                  Programs
                  <svg className={`h-3.5 w-3.5 transition-transform ${progOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
                  <span aria-hidden="true" className={`${underline(progActive)} group-hover:scale-x-100`} />
                </button>
                <div className={`absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3 transition-all duration-200 ${progOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(10,21,48,0.18)]">
                    {programs.map((p) => (
                      <Link key={p.slug} href={`/programs/${p.slug}`} onClick={() => setProgOpen(false)} className="group/item flex gap-4 rounded-xl p-3 transition hover:bg-slate-50">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accentCls[p.accent].tile}`}><ProgramIcon name={p.icon} className="h-5 w-5" /></span>
                        <span>
                          <span className="block text-sm font-semibold text-[#0f172a] group-hover/item:text-[#2563eb]">{p.title}</span>
                          <span className={`mt-0.5 block text-[11px] font-bold uppercase tracking-[0.16em] ${accentCls[p.accent].age}`}>{p.ages}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{p.build}</span>
                        </span>
                      </Link>
                    ))}
                    <Link href="/build" onClick={() => setProgOpen(false)} className="mt-1 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold text-[#0f172a] transition hover:text-[#2563eb]">
                      Try the free online robot builder <Arrow className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {links.slice(1).map((l) => {
                const on = (isHome && active === l.id) || pathname === l.href;
                return (
                  <Link key={l.id} href={l.href} className={`group ${linkCls(on)}`}>
                    {l.label}<span aria-hidden="true" className={`${underline(on)} group-hover:scale-x-100`} />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/book"
                className="hidden items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(37,99,235,0.45)] transition hover:bg-[#1d4ed8] sm:inline-flex"
              >
                Book a free class <Arrow className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-[2px] w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-1.5 block h-[2px] w-5 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                  <span className={`absolute left-0 block h-[2px] w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`overflow-y-auto transition-all duration-300 lg:hidden ${open ? "max-h-[calc(100vh-110px)] border-t border-white/10 opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="px-5 pb-6 pt-2 sm:px-6">
            <Link href="/book" onClick={() => setOpen(false)} className="mb-2 mt-2 flex items-center justify-center gap-2 rounded-full bg-[#2563eb] px-6 py-4 text-base font-semibold text-white sm:hidden">
              Book a free class <Arrow />
            </Link>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-2xl font-semibold tracking-tight text-white">
              <span className="text-[11px] font-bold tracking-[0.16em] text-slate-500">01</span>Home
            </Link>
            <div className="border-b border-white/10 py-4">
              <p className="flex items-baseline gap-4 text-2xl font-semibold tracking-tight text-white">
                <span className="text-[11px] font-bold tracking-[0.16em] text-slate-500">02</span>Programs
              </p>
              <div className="mt-3 grid gap-1 pl-9">
                {programs.map((p) => (
                  <Link key={p.slug} href={`/programs/${p.slug}`} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg py-2 text-base font-medium ${pathname === `/programs/${p.slug}` ? "text-[#2563eb]" : "text-slate-200"}`}>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${accentCls[p.accent].tile}`}><ProgramIcon name={p.icon} className="h-4 w-4" /></span>
                    {p.title}
                    <span className={`ml-auto text-[11px] font-bold uppercase tracking-[0.14em] ${accentCls[p.accent].age}`}>{p.ages}</span>
                  </Link>
                ))}
                <Link href="/build" onClick={() => setOpen(false)} className="rounded-lg py-2 text-base font-medium text-slate-200">Online robot builder</Link>
              </div>
            </div>
            {links.slice(1).map((l, i) => (
              <Link key={l.id} href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-2xl font-semibold tracking-tight text-white">
                <span className="text-[11px] font-bold tracking-[0.16em] text-slate-500">{String(i + 3).padStart(2, "0")}</span>{l.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white">
              <PhoneIcon className="h-4 w-4" /> Call {site.phone}
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}
