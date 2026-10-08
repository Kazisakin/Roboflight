import Link from "next/link";
import { ArrowRight, Gamepad2, Users } from "lucide-react";
import ProgramIcon, { accentCls } from "@/components/ProgramIcon";
import { programs } from "@/lib/programs";

function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="120" height="72" viewBox="0 0 120 72">
      {Array.from({ length: 6 * 10 }).map((_, i) => (
        <circle key={i} cx={6 + (i % 10) * 12} cy={6 + Math.floor(i / 10) * 12} r="1.6" fill="currentColor" />
      ))}
    </svg>
  );
}

export default function Courses() {
  return (
    <section id="programs" className="relative scroll-mt-32 overflow-hidden bg-slate-50 py-28 sm:py-32">
      <DotGrid className="pointer-events-none absolute right-8 top-16 hidden text-[#2563eb]/20 md:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="anim-up section-label">Pick a path</p>
            <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
              Three ways
              <br />
              <span className="text-[#2563eb]">to take flight.</span>
            </h2>
          </div>
          <p className="anim-up d2 max-w-sm t-lead text-slate-600">
            Every program grows from circuits to code to a finished build — no experience needed, just curiosity.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
          {programs.map((p, i) => {
            const a = accentCls[p.accent];
            const dark = !!p.featured;
            return (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className={`anim-up d${i + 1} group relative flex flex-col overflow-hidden p-8 transition duration-300 hover:-translate-y-1.5 ${
                  dark
                    ? "bg-[#0a1530] text-white [clip-path:polygon(0_0,calc(100%-44px)_0,100%_44px,100%_100%,0_100%)] rounded-l-3xl rounded-br-3xl md:-my-3 md:py-11"
                    : "rounded-3xl border border-slate-200 bg-white hover:border-[#2563eb]/40 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                }`}
              >
                {/* Big faint number */}
                {!dark && (
                  <span aria-hidden="true" className="absolute right-7 top-6 text-6xl font-bold tracking-tight text-slate-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                {dark && (
                  <span className="absolute right-12 top-5 rounded-full bg-[#fbbf24] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a1530]">
                    {p.tag}
                  </span>
                )}

                <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${dark ? a.tileDark : a.tile}`}>
                  <ProgramIcon name={p.icon} className="h-7 w-7" strokeWidth={1.8} />
                </span>

                <h3 className={`t-h3 relative mt-7 ${dark ? "text-white" : "text-[#0f172a]"}`}>{p.title}</h3>
                <p className={`relative mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-[#fbbf24]" : a.age}`}>
                  <Users className="h-3.5 w-3.5" aria-hidden="true" /> {p.ages}
                </p>
                <p className={`relative mt-5 flex-1 t-body ${dark ? "text-slate-300" : "text-slate-600"}`}>{p.short}</p>

                <span className={`relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-3 ${dark ? "text-white" : "text-[#0f172a] group-hover:text-[#2563eb]"}`}>
                  View program <ArrowRight className={`h-4 w-4 ${dark ? "text-[#38bdf8]" : a.age}`} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Builder strip */}
        <Link href="/build" className="anim-up group mt-10 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-5 transition hover:border-[#2563eb] sm:flex-row sm:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a1530] text-[#38bdf8]">
            <Gamepad2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-[#0f172a]">Not ready yet? Try the free online robot builder.</span>
            <span className="mt-0.5 block text-sm text-slate-500">Drag parts onto a circuit, then drive the car you built — right in your browser.</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] transition-all group-hover:gap-2.5">
            Open the builder <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
