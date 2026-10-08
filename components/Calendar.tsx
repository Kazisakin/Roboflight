"use client";

import { useMemo, useState } from "react";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const fromISO = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };

/** Accessible month calendar. `isOpen(weekday)` decides which days can be picked. */
export default function Calendar({
  value, onChange, isOpen, daysAhead = 60,
}: { value: string | null; onChange: (iso: string) => void; isOpen: (weekday: number) => boolean; daysAhead?: number }) {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const min = useMemo(() => { const t = new Date(today); t.setDate(t.getDate() + 1); return t; }, [today]);
  const max = useMemo(() => { const t = new Date(today); t.setDate(t.getDate() + daysAhead); return t; }, [today, daysAhead]);
  const [view, setView] = useState(() => { const v = value ? fromISO(value) : min; return new Date(v.getFullYear(), v.getMonth(), 1); });

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(first.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))];

  const canPrev = view > new Date(min.getFullYear(), min.getMonth(), 1);
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= max;
  const shift = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));

  return (
    <div className="select-none">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-[#0f172a] transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-[#0f172a]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <p className="text-base font-semibold tracking-tight text-[#0f172a]" aria-live="polite">{MONTHS[view.getMonth()]} {view.getFullYear()}</p>
        <button type="button" onClick={() => shift(1)} disabled={!canNext} aria-label="Next month"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-[#0f172a] transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-[#0f172a]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEK.map((w) => (
          <div key={w} className="pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{w}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />;
          const iso = toISO(d);
          const available = d >= min && d <= max && isOpen(d.getDay());
          const selected = value === iso;
          const isToday = d.getTime() === today.getTime();
          return (
            <button
              key={iso}
              type="button"
              disabled={!available}
              onClick={() => onChange(iso)}
              aria-pressed={selected}
              aria-label={d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }) + (available ? "" : " — unavailable")}
              className={`relative flex aspect-square min-h-10 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tabular-nums transition
                ${selected ? "bg-[#2563eb] text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)]"
                  : available ? "bg-[#2563eb]/[0.07] text-[#0f172a] hover:bg-[#2563eb]/15 hover:text-[#2563eb]"
                  : "cursor-not-allowed text-slate-300"}`}
            >
              {d.getDate()}
              {isToday && <span className={`absolute bottom-1.5 h-1 w-1 rounded-full ${selected ? "bg-white" : "bg-slate-400"}`} />}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#2563eb]/15" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#2563eb]" /> Selected</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-slate-200" /> Closed</span>
      </div>
    </div>
  );
}
