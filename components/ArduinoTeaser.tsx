"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";

function RedirectModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-blue-950 border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
          </svg>
        </div>

        <h3 className="text-white font-black text-xl mb-2">Ready to Build?</h3>
        <p className="text-blue-300 text-sm mb-6 leading-relaxed">
          The full interactive builder is on its own page — with checklists, code, and tips for every step.
        </p>

        <Link
          href="/build"
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-black text-sm rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95"
        >
          Open the Builder
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <button
          onClick={onClose}
          className="mt-3 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors cursor-pointer"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

const stepPreviews = [
  { id: 1, label: "Gather Parts", color: "bg-blue-500" },
  { id: 2, label: "Build Chassis", color: "bg-cyan-500" },
  { id: 3, label: "Wire Motors", color: "bg-indigo-500" },
  { id: 4, label: "Connect Arduino", color: "bg-blue-600" },
  { id: 5, label: "Upload Code", color: "bg-cyan-600" },
  { id: 6, label: "Drive!", color: "bg-blue-700" },
];

export default function ArduinoTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-20 bg-blue-950 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <span className="inline-block px-3 py-1 bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
                Try It Yourself
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                Build Your Own{" "}
                <span className="text-cyan-400">Arduino Robot Car</span>
              </h2>
              <p className="text-blue-300 text-sm leading-relaxed mb-6">
                Our interactive step-by-step guide lets kids build a real working robot car. Check off each task, follow the wiring diagrams, and upload your first real Arduino code.
              </p>

              {/* Steps preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                {stepPreviews.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2.5 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${i * 80 + 200}ms` }}
                  >
                    <span className={`w-5 h-5 rounded-full ${s.color} flex items-center justify-center text-[10px] font-black text-white flex-shrink-0`}>{s.id}</span>
                    <span className="text-blue-200 text-xs font-medium">{s.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-black text-sm rounded-full transition-all duration-200 shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Start Building
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right: Visual card */}
            <div
              className={`transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              onClick={() => setShowModal(true)}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-800 to-blue-900 border border-white/10 p-6 cursor-pointer hover:border-cyan-400/30 transition-all duration-300 group">
                {/* Mock step card */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-400 text-[10px] font-semibold uppercase">Step 1 of 6</p>
                      <p className="text-white font-black text-sm">Gather Your Parts</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Arduino Uno board", "L298N motor driver", "2× DC motors"].map((item, i) => (
                      <div key={item} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${i === 0 ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/5"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 0 ? "bg-cyan-400 border-cyan-400" : "border-white/30"}`}>
                          {i === 0 && (
                            <svg className="w-2.5 h-2.5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs font-medium ${i === 0 ? "text-cyan-300 line-through" : "text-white"}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/6 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                  </div>
                  <span className="text-blue-300 text-xs font-bold">17%</span>
                </div>

                {/* Open hint */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-3 py-1.5 bg-cyan-400 text-blue-900 text-[10px] font-black rounded-full">
                    Open Builder
                  </div>
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
