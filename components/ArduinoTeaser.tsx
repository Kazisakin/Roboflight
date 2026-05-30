"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { FloatingCrystal, SketchyIcons } from "@/components/SceneDecorations";

function RedirectModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
          </svg>
        </div>
        <h3 className="text-slate-900 font-bold text-lg mb-2">Ready to Build?</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">The full interactive builder has checklists, code snippets, and tips for every step.</p>
        <Link href="/build" className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-95">
          Open the Builder
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <button onClick={onClose} className="mt-3 text-slate-400 hover:text-slate-600 text-xs font-medium transition-colors cursor-pointer">Maybe later</button>
      </div>
    </div>
  );
}

const steps = [
  { id: 1, label: "Gather Parts",     color: "from-blue-500 to-cyan-400" },
  { id: 2, label: "Build Chassis",    color: "from-cyan-500 to-blue-400" },
  { id: 3, label: "Wire Motors",      color: "from-sky-500 to-cyan-400" },
  { id: 4, label: "Connect Arduino",  color: "from-blue-600 to-sky-400" },
  { id: 5, label: "Upload Code",      color: "from-cyan-600 to-blue-500" },
  { id: 6, label: "Drive!",           color: "from-blue-500 to-cyan-300" },
];

export default function ArduinoTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/12 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Sketchy icons + crystal */}
        <SketchyIcons variant="robotics" />
        <FloatingCrystal className="absolute bottom-12 left-8 z-10 opacity-80" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <p className="text-xs font-black tracking-widest uppercase text-cyan-400 mb-3">Try It Yourself</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Build Your Own{" "}
                <span className="text-cyan-400">Arduino Robot Car</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Our interactive step-by-step guide lets kids build a real working robot car — with checklists, wiring diagrams, and real Arduino code.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                {steps.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2.5 px-3 py-2.5 bg-white/6 border border-cyan-400/10 rounded-xl hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${i * 60 + 200}ms` }}
                  >
                    <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>{s.id}</span>
                    <span className="text-white/60 text-xs font-medium">{s.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 font-black text-base rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-xl shadow-cyan-500/30 text-blue-950"
                style={{ background: "linear-gradient(135deg, #22d3ee, #38bdf8)" }}
              >
                Start Building
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right — card preview */}
            <div
              className={`transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              onClick={() => setShowModal(true)}
            >
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5 sm:p-6 cursor-pointer hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider">Step 1 of 6</p>
                    <p className="text-white font-semibold text-sm">Gather Your Parts</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  {["Arduino Uno board", "L298N motor driver", "2× DC motors"].map((item, i) => (
                    <div key={item} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${i === 0 ? "border-cyan-400/30 bg-cyan-400/8" : "border-white/8 bg-white/4"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-cyan-400 border-cyan-400" : "border-white/20"}`}>
                        {i === 0 && <svg className="w-2.5 h-2.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-xs font-medium ${i === 0 ? "text-cyan-300 line-through" : "text-white/70"}`}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className="w-1/6 h-full bg-cyan-400 rounded-full" />
                  </div>
                  <span className="text-white/40 text-xs">17%</span>
                </div>

                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-cyan-400 text-xs font-medium">Open the full builder</span>
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {showModal && <RedirectModal onClose={() => setShowModal(false)} />}
    </>
  );
}
