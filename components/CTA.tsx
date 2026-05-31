"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { FloatingLightbulb, SketchyIcons } from "@/components/SceneDecorations";

const bullets = [
  "Curriculum designed for all skill levels",
  "Partner with schools across New Brunswick",
  "All training kits and materials provided",
  "Taught by an expert with a Masters in EE",
];

const CONFETTI_COLORS = ["#22d3ee", "#fbbf24", "#a78bfa", "#f97316", "#34d399", "#f472b6", "#ffffff"];

interface Piece { id: number; cx: string; cy: string; color: string; size: number }

export default function CTA() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [pieces, setPieces] = useState<Piece[]>([]);
  const counter = useRef(0);

  const burst = () => {
    const next: Piece[] = Array.from({ length: 22 }, (_, i) => {
      const angle = (i / 22) * 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 60 + Math.random() * 80;
      return {
        id: counter.current++,
        cx: `${Math.cos(rad) * dist}px`,
        cy: `${Math.sin(rad) * dist - 30}px`,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 6 + 4,
      };
    });
    setPieces(next);
    setTimeout(() => setPieces([]), 750);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden section-parallax">
      {/* Sketchy icons + floating lightbulb */}
      <SketchyIcons variant="education" />
      <FloatingLightbulb className="absolute top-6 left-10 z-10 opacity-90" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              We teach children how to{" "}
              <span className="text-cyan-300">build and program robots</span>
            </h2>
            <p className="text-blue-100 text-[15px] leading-[1.8] mb-8">
              Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things. Our hands-on curriculum ensures every session is exciting, challenging, and rewarding.
            </p>
            <blockquote className="border-l-2 border-cyan-400/40 pl-5">
              <p className="text-white/90 italic text-[15px] leading-[1.8] mb-2">
                &ldquo;Every child has the potential to be an innovator. We just need to give them the tools, the guidance, and the space to dream big.&rdquo;
              </p>
              <p className="text-cyan-200 text-sm font-medium">— Abdur Rahman Chowdhury, Founder</p>
            </blockquote>
          </div>

          {/* Right */}
          <div className={`transition-all duration-700 delay-150 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-2">
                Robotics and coding can take flight in your school
              </h3>
              <p className="text-blue-100 text-[15px] leading-[1.8] mb-6">
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
                    <span className="text-white text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="relative">
                {pieces.map((p) => (
                  <div
                    key={p.id}
                    className="absolute pointer-events-none rounded-sm"
                    style={{
                      width: p.size, height: p.size,
                      background: p.color,
                      top: "50%", left: "50%",
                      animation: "confetti-fall 0.7s ease-out forwards",
                      ["--cx" as string]: p.cx,
                      ["--cy" as string]: p.cy,
                    }}
                  />
                ))}
                <button
                  onClick={() => { burst(); const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full py-3 bg-white hover:bg-cyan-50 text-blue-700 font-bold text-sm rounded-2xl transition-all duration-200 hover:scale-[1.03] cursor-pointer shadow-lg relative z-10"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
