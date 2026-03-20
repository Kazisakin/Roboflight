"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface StatProps { end: number; suffix: string; label: string; }

function Stat({ end, suffix, label }: StatProps) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  );
}

const items = [
  { end: 100, suffix: "+", label: "Students Reached" },
  { end: 75,  suffix: "+", label: "Projects Completed" },
  { end: 5,   suffix: "+", label: "Years Experience" },
  { end: 3,   suffix: "",  label: "Partner Schools" },
];

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 divide-x-0 sm:divide-x divide-slate-100">
          {items.map((item) => <Stat key={item.label} {...item} />)}
        </div>
      </div>
    </section>
  );
}
