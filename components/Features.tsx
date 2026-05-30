"use client";

import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "All in One",
    description: "Coding, electronics, and robotics in one program — no juggling multiple courses.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Hands-on Building",
    description: "Students build real drones, robots, and RC planes they actually take home.",
    gradient: "from-cyan-500 to-sky-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Expert Instructor",
    description: "Learn from a Masters student in Electrical Engineering with a passion for robotics.",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Proven Results",
    description: "5+ years inspiring 100+ students across New Brunswick with real, measurable outcomes.",
    gradient: "from-blue-600 to-cyan-400",
  },
];

export default function Features() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <p className={`text-xs font-black tracking-widest uppercase text-blue-500 mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Why RoboFlight?
          </p>
          <h2 className={`text-3xl sm:text-5xl font-black text-slate-900 tracking-tight transition-all duration-700 delay-75 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Built for young{" "}
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>innovators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border-2 border-blue-50 hover:border-cyan-200 bg-white ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 80 + 100}ms` }}
            >
              {/* Colorful top panel */}
              <div className={`bg-gradient-to-br ${f.gradient} p-7 flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  {f.icon}
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-black text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
