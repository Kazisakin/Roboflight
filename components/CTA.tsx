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
    <section className="py-16 sm:py-24 bg-blue-600 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4 tracking-tight">
              We teach children how to{" "}
              <span className="text-cyan-200">build and program robots</span>
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-8">
              Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things. Our hands-on curriculum ensures every session is exciting, challenging, and rewarding.
            </p>
            <blockquote className="border-l-2 border-white/25 pl-5">
              <p className="text-white/75 italic text-sm leading-relaxed mb-2">
                &ldquo;Every child has the potential to be an innovator. We just need to give them the tools, the guidance, and the space to dream big.&rdquo;
              </p>
              <p className="text-cyan-200 text-xs font-medium">— Abdur Rahman Chowdhury, Founder</p>
            </blockquote>
          </div>

          {/* Right */}
          <div className={`transition-all duration-700 delay-150 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base font-semibold text-white mb-2">
                Robotics and coding can take flight in your school
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                RoboFlight partners with schools across New Brunswick to deliver structured, curriculum-aligned sessions.
              </p>

              <ul className="flex flex-col gap-3 mb-7">
                {bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/85 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full py-3 bg-white hover:bg-slate-50 text-blue-600 font-semibold text-sm rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
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
