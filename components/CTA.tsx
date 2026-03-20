"use client";

import { useInView } from "@/hooks/useInView";

const bullets = [
  "Curriculum designed for all skill levels",
  "Partner with schools across New Brunswick",
  "All training kits and materials provided",
  "Taught by an expert with a Masters in EE",
];

export default function CTA() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-blob-delayed pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
              We teach children how to{" "}
              <span className="text-cyan-300 underline decoration-cyan-300/40">
                build and program robots
              </span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-7">
              Students stay engaged in a process that fosters{" "}
              <strong className="text-white font-semibold">resilience</strong>,{" "}
              <strong className="text-white font-semibold">problem-solving</strong>, and a{" "}
              <strong className="text-white font-semibold">passion for doing hard things</strong>.
              Our hands-on curriculum ensures every session is exciting, challenging, and rewarding.
            </p>

            {/* Quote */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-5">
              <div className="w-7 h-7 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-white/85 italic text-sm leading-relaxed">
                Every child has the potential to be an innovator. We just need to give them the tools, the guidance, and the space to dream big.
              </p>
              <p className="text-cyan-300 font-semibold text-xs mt-3">
                — Abdur Rahman Chowdhury, Founder
              </p>
            </div>
          </div>

          {/* Right */}
          <div className={`transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-7">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-3">
                Robotics and coding can take flight in your school
              </h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                RoboFlight is growing across New Brunswick, partnering with schools to deliver structured, curriculum-aligned sessions. Students don&apos;t just learn theory — they build things that fly, roll, and come to life.
              </p>

              <div className="flex flex-col gap-2.5 mb-7">
                {bullets.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/85 text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3.5 bg-white hover:bg-gray-100 text-blue-800 font-bold text-sm rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
