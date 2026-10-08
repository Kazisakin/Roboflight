"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { CalendarDays, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { programs } from "@/lib/programs";
import { fmtTime, hours, site } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/#programs" },
  { label: "Working hours", href: "/#hours" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Stories", href: "/#stories" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Parent guides", href: "/blog" },
  { label: "For schools", href: "/schools" },
  { label: "Book a free class", href: "/book" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: site.social.youtube,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const heading = "text-[11px] font-bold uppercase tracking-[0.16em] text-[#fbbf24]";
  const link = "text-sm text-slate-300 transition hover:text-white";
  const weekdays = hours.slice(1, 6);
  const sameWeekdays = weekdays.every((h) => h.open === weekdays[0].open && h.close === weekdays[0].close);
  const hourRows = sameWeekdays
    ? [{ k: "Mon – Fri", h: weekdays[0] }, { k: "Saturday", h: hours[6] }, { k: "Sunday", h: hours[0] }]
    : [1, 2, 3, 4, 5, 6, 0].map((i) => ({ k: hours[i].day, h: hours[i] }));

  return (
    <footer className="relative overflow-hidden bg-[#0c1a4e] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#22d3ee]/10 blur-3xl" />

      {/* CTA row */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className={heading}>Free trial class</p>
              <h2 className="t-h2 mt-5 max-w-2xl text-white">Ready to take flight?</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">Book a free class online in under a minute, or give us a call — we&apos;re happy to help you choose.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
              <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0f172a] transition hover:bg-[#e0f2fe]">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> Book a free class
              </Link>
              <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Location + map */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className={`${heading} flex items-center gap-2`}><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Find us</p>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </p>
            <p className="mt-8 flex items-center gap-2 text-xs font-semibold text-slate-300"><Clock className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" /> Working hours</p>
            <dl className="mt-3 space-y-2.5 text-sm">
              {hourRows.map(({ k, h }) => (
                <div key={k} className="flex max-w-xs justify-between gap-6 border-b border-white/10 pb-2.5">
                  <dt className="text-slate-400">{k}</dt>
                  <dd className="tabular-nums text-slate-200">{h.open && h.close ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
                <Navigation className="h-4 w-4" aria-hidden="true" /> Get directions
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50">
                <Mail className="h-4 w-4" aria-hidden="true" /> {site.email}
              </a>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a1530] sm:min-h-[380px]">
            <iframe
              title={`Map showing RoboFlight at ${site.address.full}`}
              src={site.mapEmbed}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo variant="white" size="md" />
            <p className="mt-7 max-w-sm t-body text-slate-300">
              Inspiring the next generation of innovators through hands-on robotics, drone building, and coding education in Fredericton, New Brunswick.
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              Serving {site.serviceArea.slice(0, -1).join(", ")} and {site.serviceArea.at(-1)}.
            </p>
            <div className="mt-8 flex gap-2">
              {socialLinks.filter((s) => s.href).map((s) => (
                <a key={s.label} href={s.href} aria-label={`RoboFlight on ${s.label}`} target="_blank" rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/40 hover:text-white">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className={heading}>Explore</p>
            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((l) => <li key={l.label}><Link href={l.href} className={link}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <p className={heading}>Programs</p>
            <ul className="mt-6 space-y-3.5">
              {programs.map((p) => <li key={p.slug}><Link href={`/programs/${p.slug}`} className={link}>{p.title}</Link></li>)}
              <li><Link href="/build" className={link}>Online robot builder</Link></li>
            </ul>
          </div>

          <div>
            <p className={heading}>Contact</p>
            <ul className="mt-6 space-y-3.5 text-sm text-slate-300">
              <li><a href={site.phoneHref} className="flex items-center gap-2.5 transition hover:text-white"><Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition hover:text-white"><Mail className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />{site.email}</a></li>
              <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />{site.address.city}, {site.address.region}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} RoboFlight. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link href="/cookies" className="transition hover:text-white">Cookies</Link>
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
