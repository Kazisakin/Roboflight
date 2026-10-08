"use client";

import { Clock, GraduationCap, Rocket, Users, type LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const items = [
  { end: 100, suffix: "+", label: "Students reached", Icon: Users },
  { end: 75,  suffix: "+", label: "Projects built", Icon: Rocket },
  { end: 5,   suffix: "+", label: "Years experience", Icon: Clock },
  { end: 3,   suffix: "",  label: "Partner schools", Icon: GraduationCap },
];

function Stat({ end, suffix, label, i, Icon }: { end: number; suffix: string; label: string; i: number; Icon: LucideIcon }) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref} className={`anim-up d${i + 1} text-center sm:text-left ${i > 0 ? "sm:border-l sm:border-slate-200 sm:pl-10" : ""}`}>
      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <p className="text-4xl font-semibold tabular-nums tracking-tight text-[#2563eb] sm:text-5xl">
        {count}{suffix}
      </p>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-4 py-16 sm:grid-cols-4 sm:px-6 sm:py-20 lg:px-8">
        {items.map((s, i) => <Stat key={s.label} {...s} i={i} />)}
      </div>
    </section>
  );
}
