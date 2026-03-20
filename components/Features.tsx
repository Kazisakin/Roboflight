"use client";

import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "All in One",
    description: "Coding, electronics, and robotics all in one comprehensive program — no need to juggle multiple courses.",
    accent: "border-blue-500",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Hands-on Learning",
    description: "Students build real drones, robots, and RC planes — applying knowledge to tangible, exciting projects.",
    accent: "border-cyan-500",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Learn From Experts",
    description: "Master your craft with an instructor holding a Masters in Electrical Engineering and a lifelong passion for robotics.",
    accent: "border-sky-500",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "5+ Years Experience",
    description: "Proven track record of inspiring over 100 students across New Brunswick with structured, curriculum-aligned sessions.",
    accent: "border-indigo-500",
  },
];

export default function Features() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-100/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-100/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Why RoboFlight?
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-black text-blue-900 mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Acquire practical expertise,{" "}
            <span className="text-cyan-500">gear up</span> for STEM careers.
          </h2>
          <p className={`text-gray-400 text-sm max-w-lg mx-auto transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Everything your child needs to thrive in the technology-driven world — all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-white rounded-2xl p-6 border-t-4 ${feature.accent} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-default ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${index * 80 + 180}ms`,
                transitionProperty: "opacity, transform, box-shadow",
                transitionDuration: "600ms, 600ms, 300ms",
              }}
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
