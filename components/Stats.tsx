"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { SketchyIcons } from "@/components/SceneDecorations";

interface StatProps { end: number; suffix: string; label: string; icon: React.ReactNode; }

function Stat({ end, suffix, label, icon }: StatProps) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref} className="flex flex-col items-center text-center group">
      <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3 text-cyan-300 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-4xl sm:text-5xl font-black text-white tabular-nums leading-none mb-1">
        {count}<span className="text-cyan-300">{suffix}</span>
      </p>
      <p className="text-blue-100 text-[15px] font-medium">{label}</p>
    </div>
  );
}

const items = [
  {
    end: 100, suffix: "+", label: "Students Reached",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    end: 75, suffix: "+", label: "Projects Built",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    end: 5, suffix: "+", label: "Years Experience",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    end: 3, suffix: "", label: "Partner Schools",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function Stats() {
  return (
    <section className="py-14 sm:py-20 relative overflow-hidden section-parallax">
      <SketchyIcons variant="robotics" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-6">
          {items.map((item) => <Stat key={item.label} {...item} />)}
        </div>
      </div>
    </section>
  );
}
