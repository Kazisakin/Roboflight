"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const plans = [
  {
    name: "Quadcopter Drone",
    price: 250,
    featured: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    features: [
      "1 Session per week",
      "Learn Flight Dynamics",
      "Build a Functional Drone",
      "Training Kit Provided",
      "Expert Instruction",
      "Take Home Your Drone",
    ],
  },
  {
    name: "Basic Robotics",
    price: 150,
    featured: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    features: [
      "1 Session per week",
      "Robotics Fundamentals",
      "Build Robot Car",
      "Training Kit Provided",
      "Expert Instruction",
    ],
  },
  {
    name: "RC Plane Making",
    price: 200,
    featured: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    features: [
      "1 Session per week",
      "Principles of Aeronautics",
      "Build a Flying RC Plane",
      "Training Kit Provided",
      "Expert Instruction",
    ],
  },
];

export default function Pricing() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-blue-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/gallery-7.jpg"
          alt="Children learning robotics"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-blue-950/88" />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 text-cyan-300 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Transparent Pricing
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Simple, Affordable <span className="text-cyan-400">Pricing</span>
          </h2>
          <p className={`text-blue-300 text-sm max-w-md mx-auto leading-relaxed transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Invest in your child&apos;s future. Every kit, every lesson, every breakthrough — included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl transition-all duration-700 ${
                plan.featured
                  ? "bg-cyan-400 text-blue-950 shadow-2xl shadow-cyan-500/25 scale-[1.04] z-10"
                  : "bg-white/8 border border-white/12 backdrop-blur-sm text-white hover:bg-white/12 hover:-translate-y-1"
              } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 120 + 180}ms` }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-5 py-1.5 bg-blue-950 text-cyan-400 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg border border-cyan-400/20">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-7">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 ${plan.featured ? "bg-blue-950/15" : "bg-cyan-400/15"}`}>
                  <span className={`${plan.featured ? "text-blue-950" : "text-cyan-400"}`}>{plan.icon}</span>
                </div>

                <h3 className={`text-sm font-bold mb-5 uppercase tracking-wider ${plan.featured ? "text-blue-900" : "text-white/60"}`}>
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-black leading-none ${plan.featured ? "text-blue-950" : "text-white"}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm mb-1.5 font-medium ${plan.featured ? "text-blue-900/60" : "text-white/40"}`}>
                      /month
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${plan.featured ? "text-blue-900/60" : "text-white/30"}`}>
                    No hidden fees · Kit included
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? "bg-blue-950/20" : "bg-cyan-400/20"}`}>
                        <svg className={`w-2.5 h-2.5 ${plan.featured ? "text-blue-950" : "text-cyan-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-xs font-medium ${plan.featured ? "text-blue-900" : "text-white/70"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    plan.featured
                      ? "bg-blue-950 hover:bg-blue-900 text-white shadow-lg"
                      : "bg-cyan-400 hover:bg-cyan-300 text-blue-950 shadow-md shadow-cyan-500/10"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-10">
          {[
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Kit included in every plan" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Flexible monthly billing" },
            { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Group & school rates available" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-white/50 text-xs">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
