"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import Frame from "@/components/Frame";
import { fmtTime, hours, site } from "@/lib/site";

/** Current weekday + minutes in RoboFlight's time zone. */
function nowLocal() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: site.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, mins: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}
const toMins = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

export default function Hours() {
  const [today, setToday] = useState<number | null>(null);
  const [openNow, setOpenNow] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => {
      const { day, mins } = nowLocal();
      const h = hours[day];
      setToday(day);
      setOpenNow(!!(h.open && h.close && mins >= toMins(h.open) && mins < toMins(h.close)));
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  // Monday-first order for display
  const order = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section id="hours" className="scroll-mt-32 bg-white py-28 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Photo */}
        <div className="anim-up relative">
          <Frame tone="light" offset="bl" className="aspect-[4/3] lg:aspect-[4/5]">
            <Image src="/photos/students-coding-robots-workshop.jpg" alt="Students working together at a RoboFlight session" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1530]/90 via-[#0a1530]/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#fbbf24]"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Visit us</p>
                <p className="mt-2 text-lg font-semibold leading-snug text-white">{site.address.line1}<br />{site.address.city}, {site.address.region} {site.address.postal}</p>
              </div>
              {openNow !== null && (
                <span className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur ${openNow ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40" : "bg-white/10 text-white ring-1 ring-white/25"}`}>
                  <span className={`h-2 w-2 rounded-full ${openNow ? "bg-emerald-400" : "bg-slate-400"}`} />
                  {openNow ? "Open now" : "Closed now"}
                </span>
              )}
            </div>
          </Frame>
        </div>

        {/* Hours */}
        <div>
          <p className="anim-up section-label"><Clock className="h-4 w-4" aria-hidden="true" /> Working hours</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            Come build
            <br />
            <span className="text-[#2563eb]">with us.</span>
          </h2>
          <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
            Drop by during our hours, or book a free trial class online in under a minute.
          </p>

          <dl className="anim-up d3 mt-10 border-t border-slate-200">
            {order.map((d) => {
              const h = hours[d];
              const isToday = today === d;
              return (
                <div key={h.day} className={`flex items-center justify-between border-b border-slate-200 px-3 py-3.5 ${isToday ? "rounded-lg bg-[#2563eb]/[0.06]" : ""}`}>
                  <dt className={`flex items-center gap-3 text-sm ${isToday ? "font-semibold text-[#2563eb]" : "font-medium text-[#0f172a]"}`}>
                    {h.day}
                    {isToday && <span className="rounded-full bg-[#2563eb] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Today</span>}
                  </dt>
                  <dd className={`text-sm tabular-nums ${h.open ? "text-[#0f172a]" : "text-slate-400"}`}>
                    {h.open && h.close ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed"}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="anim-up d4 mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> Book a free class
            </Link>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-[#0f172a] transition hover:border-[#2563eb] hover:text-[#2563eb]">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
