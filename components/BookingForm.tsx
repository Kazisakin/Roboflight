"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Calendar, { fromISO } from "@/components/Calendar";
import ProgramIcon, { accentCls } from "@/components/ProgramIcon";
import { AlertTriangle, CalendarDays, Clock, Gift, MapPin, Rocket, Timer, Users } from "lucide-react";
import { Arrow } from "@/components/ui";
import { programs } from "@/lib/programs";
import { fmtTime, hours, site, slotsFor } from "@/lib/site";
import { hasConsent, metaCookies, newEventId, track, trackBooking } from "@/lib/track";

const NOT_SURE = "not-sure";
const ages = ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18+"];

const longDate = (iso: string) => fromISO(iso).toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });

function Step({ n, title, done, children, hint }: { n: number; title: string; done: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <section id={`step-${n}`} className="scroll-mt-36 border-t border-slate-200 py-10 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-center gap-4">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${done ? "bg-[#2563eb] text-white" : "border border-slate-300 text-[#2563eb]"}`}>
          {done ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ) : String(n).padStart(2, "0")}
        </span>
        <div>
          <h2 className="t-h3 text-[#0f172a]">{title}</h2>
          {hint && <p className="mt-0.5 text-sm text-slate-500">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function makeICS(title: string, iso: string, time: string) {
  const [y, m, d] = iso.split("-");
  const [hh] = time.split(":");
  const start = `${y}${m}${d}T${hh}0000`;
  const end = `${y}${m}${d}T${String(Number(hh) + 1).padStart(2, "0")}0000`;
  const loc = site.address.full.replace(/,/g, "\\,");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RoboFlight//Booking//EN", "BEGIN:VEVENT",
    `UID:${Date.now()}@roboflight.ca`, `DTSTART;TZID=${site.timeZone}:${start}`, `DTEND;TZID=${site.timeZone}:${end}`,
    `SUMMARY:RoboFlight free trial — ${title}`, `LOCATION:${loc}`, `DESCRIPTION:Free trial class at RoboFlight. Questions? ${site.phone}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

export default function BookingForm() {
  const params = useSearchParams();
  const initial = params.get("program");
  const [program, setProgram] = useState<string>(programs.some((p) => p.slug === initial) ? initial! : "");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ parentName: "", email: "", phone: "", childName: "", childAge: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [tried, setTried] = useState(false);

  const slots = useMemo(() => (date ? slotsFor(fromISO(date).getDay()) : []), [date]);
  const programTitle = program === NOT_SURE ? "Not sure yet — help me choose" : programs.find((p) => p.slug === program)?.title ?? "";
  const detailsOk = form.parentName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.phone.trim().length >= 7;
  const ready = !!(program && date && time && detailsOk);
  const selectedProgram = programs.find((p) => p.slug === program);
  const ageNum = form.childAge === "18+" ? 18 : Number(form.childAge);
  const ageWarning = selectedProgram && form.childAge && ageNum < selectedProgram.minAge
    ? `${selectedProgram.title} is for ${selectedProgram.ages.toLowerCase()}. We'll suggest the best fit when we confirm.`
    : "";
  // Funnel steps (GA4) — one event each time a step becomes complete.
  useEffect(() => { if (program) track("book_step_complete", { step: 1, program }); }, [program]);
  useEffect(() => { if (date && time) track("book_step_complete", { step: 2, program }); }, [date, time]); // eslint-disable-line react-hooks/exhaustive-deps
  const stepsDone = [!!program, !!(date && time), !!detailsOk].filter(Boolean).length;
  const missing = [!program && "a program", !date && "a day", !time && "a time", !detailsOk && "your contact details"].filter(Boolean) as string[];

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!ready) {
      const first = !program ? 1 : !(date && time) ? 2 : 3;
      document.getElementById(`step-${first}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setStatus("loading");
    const eventId = newEventId();
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program, date, time, ...form, eventId, consent: hasConsent(), ...metaCookies(), pageUrl: window.location.href }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        trackBooking({ program, eventId, email: form.email, phone: form.phone });
      }
      else { setStatus("error"); setError(data.error || "Something went wrong. Please try again."); }
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  };

  const input = "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#0f172a] placeholder:text-slate-400 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 sm:text-sm";
  const bad = (cond: boolean) => (tried && cond ? "border-red-400" : "border-slate-200");
  const label = "mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500";

  /* ── Success ─────────────────────────────────────────── */
  if (status === "success" && date && time) {
    const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(makeICS(programTitle, date, time))}`;
    return (
      <div className="mx-auto max-w-2xl py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)]">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="t-h2 mt-8 text-[#0f172a]">You&apos;re booked<span className="text-[#2563eb]">!</span></h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-600">
          We&apos;ve sent a confirmation to <strong className="text-[#0f172a]">{form.email}</strong>. We&apos;ll reach out if anything changes.
        </p>
        <dl className="mx-auto mt-10 max-w-md divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white text-left">
          {[["Program", programTitle], ["Date", longDate(date)], ["Time", fmtTime(time)], ["Where", site.address.full]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 px-6 py-4">
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{k}</dt>
              <dd className="text-right text-sm font-semibold text-[#0f172a]">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={ics} download="roboflight-trial.ics" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
            Add to my calendar
          </a>
          <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-[#0f172a] transition hover:border-[#2563eb] hover:text-[#2563eb]">
            Get directions
          </a>
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-600 hover:text-[#0f172a]">Back to home</Link>
        </div>
      </div>
    );
  }

  /* ── Summary (shared by desktop sidebar + mobile) ─────── */
  const Summary = (
    <div className="rounded-2xl bg-[#0a1530] p-7 text-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#fbbf24]">Your free class</p>
      <dl className="mt-6 space-y-5">
        {([
          [Rocket, "Program", programTitle || "—"],
          [Users, "Ages", selectedProgram?.ages ?? "—"],
          [CalendarDays, "Day", date ? longDate(date) : "—"],
          [Clock, "Time", time ? fmtTime(time) : "—"],
          [Timer, "Length", site.trialLength],
          [Gift, "Cost", "Free · no obligation"],
        ] as const).map(([Icon, k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
            <dt className="flex items-center gap-2 text-xs text-slate-400"><Icon className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />{k}</dt>
            <dd className={`text-right text-sm font-semibold ${v === "—" ? "text-slate-500" : "text-white"}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 rounded-xl bg-white/[0.06] p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-white"><MapPin className="h-3.5 w-3.5 text-[#38bdf8]" aria-hidden="true" /> Where</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">{site.address.full}</p>
        <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#38bdf8] hover:underline">
          Open in Google Maps <Arrow className="h-3 w-3" />
        </a>
      </div>
    </div>
  );

  return (
    <form id="booking" onSubmit={submit} noValidate className="grid gap-12 pb-28 lg:grid-cols-[1fr_360px] lg:gap-16 lg:pb-0">
      <div>
        {/* 01 Program */}
        <Step n={1} title="Choose a program" done={!!program} hint="You can switch programs later — this just helps us prepare.">
          <div className="grid gap-3 sm:grid-cols-3">
            {programs.map((p) => {
              const on = program === p.slug;
              return (
                <button key={p.slug} type="button" onClick={() => setProgram(p.slug)} aria-pressed={on}
                  className={`group cursor-pointer overflow-hidden rounded-2xl border-2 bg-white text-left transition ${on ? "border-[#2563eb] shadow-[0_8px_24px_rgba(37,99,235,0.18)]" : "border-slate-200 hover:border-[#2563eb]/50"}`}>
                  <div className="relative aspect-[16/10] bg-[#0a1530]">
                    <Image src={p.hero} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 240px" />
                    {on && (
                      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb] text-white">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                  </div>
                  <div className="relative p-4 pt-7">
                    <span className={`absolute -top-5 left-4 flex h-10 w-10 items-center justify-center rounded-xl ring-4 ring-white ${on ? "bg-[#2563eb] text-white" : `bg-white shadow-md ${accentCls[p.accent].age}`}`}>
                      <ProgramIcon name={p.icon} className="h-5 w-5" />
                    </span>
                    <p className={`text-sm font-semibold ${on ? "text-[#2563eb]" : "text-[#0f172a]"}`}>{p.title}</p>
                    <p className={`mt-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] ${accentCls[p.accent].age}`}><Users className="h-3 w-3" aria-hidden="true" />{p.ages}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{p.build}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setProgram(NOT_SURE)} aria-pressed={program === NOT_SURE}
            className={`mt-3 w-full cursor-pointer rounded-xl border-2 px-5 py-3.5 text-left text-sm font-semibold transition ${program === NOT_SURE ? "border-[#2563eb] text-[#2563eb]" : "border-slate-200 text-slate-700 hover:border-[#2563eb]/50"}`}>
            Not sure yet — help me choose
          </button>
          {tried && !program && <p className="mt-3 text-sm text-red-600">Please choose a program.</p>}
        </Step>

        {/* 02 Day & time */}
        <Step n={2} title="Pick a day & time" done={!!(date && time)} hint="Greyed-out days are when we're closed.">
          <div className="grid gap-8 md:grid-cols-[1fr_200px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <Calendar value={date} onChange={(d) => { setDate(d); setTime(null); }} isOpen={(wd) => !!hours[wd].open} />
            </div>
            <div>
              <p className={label}>{date ? `Times · ${fromISO(date).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })}` : "Times"}</p>
              {!date ? (
                <p className="rounded-xl border border-dashed border-slate-300 p-5 text-sm leading-relaxed text-slate-500">Choose a day on the calendar to see available times.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
                  {slots.map((s) => {
                    const on = time === s;
                    return (
                      <button key={s} type="button" onClick={() => setTime(s)} aria-pressed={on}
                        className={`cursor-pointer rounded-xl border-2 px-3 py-3 text-sm font-semibold tabular-nums transition ${on ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-slate-200 bg-white text-[#0f172a] hover:border-[#2563eb] hover:text-[#2563eb]"}`}>
                        {fmtTime(s)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {tried && (!date || !time) && <p className="mt-3 text-sm text-red-600">Please pick a day and a time.</p>}
        </Step>

        {/* 03 Details */}
        <Step n={3} title="Your details" done={!!detailsOk} hint="We'll only use these to confirm your class.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="parentName" className={label}>Parent / guardian name *</label>
              <input id="parentName" autoComplete="name" value={form.parentName} onChange={set("parentName")} placeholder="Jane Smith" className={`${input} ${bad(!form.parentName.trim())}`} />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone *</label>
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} placeholder="(506) 000-0000" className={`${input} ${bad(form.phone.trim().length < 7)}`} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className={label}>Email *</label>
              <input id="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" className={`${input} ${bad(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))}`} />
            </div>
            <div>
              <label htmlFor="childName" className={label}>Student&apos;s first name</label>
              <input id="childName" value={form.childName} onChange={set("childName")} placeholder="Alex" className={`${input} border-slate-200`} />
            </div>
            <div>
              <label htmlFor="childAge" className={label}>Student&apos;s age</label>
              <select id="childAge" value={form.childAge} onChange={set("childAge")} className={`${input} border-slate-200 cursor-pointer`}>
                <option value="">Select age</option>
                {ages.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              {ageWarning && (
                <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-700">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {ageWarning}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className={label}>Anything we should know?</label>
              <textarea id="notes" rows={3} value={form.notes} onChange={set("notes")} placeholder="Experience level, accessibility needs, questions…" className={`${input} border-slate-200 resize-none`} />
            </div>
          </div>
          {tried && !detailsOk && <p className="mt-3 text-sm text-red-600">Please add your name, a valid email and phone number.</p>}
        </Step>

        {/* Mobile summary */}
        <div className="lg:hidden">{Summary}</div>

        {status === "error" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-800">We couldn&apos;t book that</p>
            <p className="mt-1 text-sm text-red-700">{error} You can also call us at <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.</p>
          </div>
        )}

        <div className="mt-8 hidden lg:block">
          <button type="submit" disabled={status === "loading"}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2563eb] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.3)] transition hover:bg-[#1d4ed8] disabled:opacity-60">
            {status === "loading" ? "Booking…" : <>Book my free class <Arrow /></>}
          </button>
          {tried && !ready && <p className="mt-3 text-center text-sm text-slate-500">Still needed: {missing.join(", ")}.</p>}
          <p className="mt-4 text-center text-xs text-slate-500">
            By booking you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>. No payment needed.
          </p>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-36 space-y-6">
          {Summary}
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">What to expect</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-600">
              {["Meet the instructor and see the workshop", "Hands-on mini build with real parts", "Time for parents to ask questions", "All tools and materials provided"].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-slate-500">{date && time ? `${fromISO(date).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })} · ${fmtTime(time)}` : "Free trial class"}</p>
            <p className="truncate text-sm font-semibold text-[#0f172a]">{ready ? "Ready to book" : `${stepsDone} of 3 steps done`}</p>
          </div>
          <button type="submit" form="booking" disabled={status === "loading"}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#2563eb] px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60">
            {status === "loading" ? "Booking…" : <>Book free <Arrow className="h-3.5 w-3.5" /></>}
          </button>
        </div>
      </div>
    </form>
  );
}
