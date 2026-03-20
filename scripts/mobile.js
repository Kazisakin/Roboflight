const fs = require('fs');

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const gallery = `"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const images = [
  { src: "/gallery-1.jpg",  alt: "Instructor guiding students on robotics" },
  { src: "/gallery-5.jpg",  alt: "Hands-on robotics session" },
  { src: "/gallery-9.jpg",  alt: "Students building robot components" },
  { src: "/gallery-10.jpg", alt: "Wide classroom robotics session" },
  { src: "/gallery-11.jpg", alt: "Students working on electronics" },
];

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} width={1200} height={800} className="w-full h-full object-contain bg-black" sizes="(max-width: 768px) 100vw, 80vw" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Card({ img, delay, isInView, onClick, extraClass }: { img: typeof images[0]; delay: number; isInView: boolean; onClick: () => void; extraClass?: string }) {
  return (
    <div
      className={\`relative rounded-3xl overflow-hidden cursor-zoom-in group shadow-xl transition-all duration-700 \${extraClass ?? ""} \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
      style={{ transitionDelay: \`\${delay}ms\` }}
      onClick={onClick}
    >
      <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
      <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/25 transition-colors duration-300" />
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-blue-700 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-8 sm:mb-12">
          <h2 className={\`text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 sm:mb-4 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            We teach children how to{" "}
            <span className="text-cyan-300">build and program robots</span>
          </h2>
          <p className={\`text-blue-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things.
          </p>
        </div>

        {/* Mobile: 2-col grid stacked */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={\`relative rounded-2xl overflow-hidden cursor-zoom-in group shadow-lg h-40 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} \${i === 2 ? "col-span-2 h-48" : ""}\`}
              style={{ transitionDelay: \`\${i * 80 + 100}ms\` }}
              onClick={() => setLightbox(img)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Desktop: 3-col collage — center tall */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[500px] lg:h-[560px]">
          <Card img={images[0]} delay={100} isInView={isInView} onClick={() => setLightbox(images[0])} extraClass="col-start-1 row-start-1" />
          <Card img={images[3]} delay={260} isInView={isInView} onClick={() => setLightbox(images[3])} extraClass="col-start-1 row-start-2" />
          <Card img={images[2]} delay={180} isInView={isInView} onClick={() => setLightbox(images[2])} extraClass="col-start-2 row-start-1 row-span-2" />
          <Card img={images[1]} delay={200} isInView={isInView} onClick={() => setLightbox(images[1])} extraClass="col-start-3 row-start-1" />
          <Card img={images[4]} delay={320} isInView={isInView} onClick={() => setLightbox(images[4])} extraClass="col-start-3 row-start-2" />
        </div>

        <p className="text-center text-blue-200 text-xs mt-6 sm:mt-8">
          Real students, real projects — across New Brunswick schools.
        </p>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  );
}
`;

// ─── PRICING ─────────────────────────────────────────────────────────────────
const pricing = `"use client";

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
    <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden bg-blue-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/gallery-7.jpg" alt="Children learning robotics" fill className="object-cover object-center" sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-blue-950/88" />
      </div>

      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 text-cyan-300 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Transparent Pricing
          </span>
          <h2 className={\`text-2xl sm:text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            Simple, Affordable <span className="text-cyan-400">Pricing</span>
          </h2>
          <p className={\`text-blue-300 text-sm max-w-md mx-auto leading-relaxed transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            Invest in your child&apos;s future. Every kit, every lesson, every breakthrough — included.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-stretch sm:items-center">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={\`relative rounded-3xl transition-all duration-700 \${
                plan.featured
                  ? "bg-cyan-400 text-blue-950 shadow-2xl shadow-cyan-500/25 sm:scale-[1.04] z-10 order-first sm:order-none"
                  : "bg-white/8 border border-white/12 backdrop-blur-sm text-white hover:bg-white/12"
              } \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}\`}
              style={{ transitionDelay: \`\${index * 120 + 180}ms\` }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-5 py-1.5 bg-blue-950 text-cyan-400 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg border border-cyan-400/20">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-5 sm:p-7">
                <div className={\`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 \${plan.featured ? "bg-blue-950/15" : "bg-cyan-400/15"}\`}>
                  <span className={\`\${plan.featured ? "text-blue-950" : "text-cyan-400"}\`}>{plan.icon}</span>
                </div>

                <h3 className={\`text-sm font-bold mb-4 sm:mb-5 uppercase tracking-wider \${plan.featured ? "text-blue-900" : "text-white/60"}\`}>
                  {plan.name}
                </h3>

                <div className="mb-5 sm:mb-6">
                  <div className="flex items-end gap-1">
                    <span className={\`text-4xl sm:text-5xl font-black leading-none \${plan.featured ? "text-blue-950" : "text-white"}\`}>\${plan.price}</span>
                    <span className={\`text-sm mb-1.5 font-medium \${plan.featured ? "text-blue-900/60" : "text-white/40"}\`}>/month</span>
                  </div>
                  <p className={\`text-xs mt-1 \${plan.featured ? "text-blue-900/60" : "text-white/30"}\`}>No hidden fees · Kit included</p>
                </div>

                <ul className="flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div className={\`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 \${plan.featured ? "bg-blue-950/20" : "bg-cyan-400/20"}\`}>
                        <svg className={\`w-2.5 h-2.5 \${plan.featured ? "text-blue-950" : "text-cyan-400"}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={\`text-xs font-medium \${plan.featured ? "text-blue-900" : "text-white/70"}\`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className={\`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 hover:scale-[1.02] cursor-pointer \${
                    plan.featured
                      ? "bg-blue-950 hover:bg-blue-900 text-white shadow-lg"
                      : "bg-cyan-400 hover:bg-cyan-300 text-blue-950 shadow-md shadow-cyan-500/10"
                  }\`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10">
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
`;

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = `"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote: "It was a terrific way to engage students in the final weeks of school. Students in Grades 7 and 8 started from scratch on both the coding and circuitry fronts, and they've progressed to the point where they're preparing their robots to compete 'in the ring.' It has been a blast watching students learn through this hands-on endeavor.",
    name: "Matt Clements",
    role: "Principal",
    school: "McAdam High School",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote: "I was completely clueless about that stuff. I was soon able to do most of it myself, and I ended up doing about half the programming myself. I thought it was an interesting change from the regular classroom — it was fun!",
    name: "Lauren Messer",
    role: "Grade 8 Student",
    school: "McAdam High School",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
  },
  {
    quote: "Thanks to the clear explanations, hands-on projects, and supportive instructors, I was able to build a Robot car by the end of the course — something I never thought I could do. This course transformed my understanding and skills in robotics. I highly recommend it to anyone interested.",
    name: "Tousif Islam",
    role: "Computer Science Student",
    school: "University of New Brunswick",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
  },
];

export default function Testimonials() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (i: number) => {
    if (fading || i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 300);
  };

  const next = () => goTo((active + 1) % testimonials.length);
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const t = testimonials[active];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-blue-950">
      <div className="absolute inset-0">
        <Image src="/gallery-2.jpg" alt="Kids learning robotics" fill className="object-cover object-center" sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-blue-950/85" />
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={\`text-center mb-10 sm:mb-16 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 text-cyan-300 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            What people are <span className="text-cyan-400">saying</span>
          </h2>
          <p className="text-blue-300 text-sm max-w-md mx-auto leading-relaxed">
            Hear from students, parents, and educators who have experienced RoboFlight firsthand.
          </p>
        </div>

        {/* Main card */}
        <div className={\`transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
          <div className={\`transition-all duration-300 \${fading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}\`}>
            <div className="relative bg-white/10 border border-white/15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-md overflow-hidden">
              <div className="absolute top-4 right-6 sm:top-6 sm:right-8 text-[80px] sm:text-[120px] leading-none text-white/5 font-serif select-none">&ldquo;</div>

              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-start">
                {/* Avatar */}
                <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-3">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-blue-800 ring-2 ring-white/20">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-cyan-400 text-xs font-medium">{t.role}</p>
                    <p className="text-blue-400 text-xs mt-0.5">{t.school}</p>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed font-light italic relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={\`rounded-full transition-all duration-300 cursor-pointer \${i === active ? "w-8 h-2 bg-cyan-400" : "w-2 h-2 bg-white/25 hover:bg-white/50"}\`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-cyan-500/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnail row — hidden on small mobile, shown sm+ */}
          <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => goTo(i)}
                className={\`text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm \${i === active ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}\`}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden bg-blue-800 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="28px" />
                  </div>
                  <div>
                    <p className={\`text-[10px] sm:text-xs font-semibold \${i === active ? "text-white" : "text-white/60"}\`}>{item.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-blue-400">{item.role}</p>
                  </div>
                </div>
                <p className="text-white/40 text-[10px] sm:text-[11px] leading-relaxed line-clamp-2">{item.quote}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`;

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const contact = `"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/useInView";

interface FormData {
  name: string;
  email: string;
  phone: string;
  courses: string[];
  message: string;
}

const courseOptions = [
  { id: "basic-robotics",   label: "Basic Robotics",   icon: "⚙" },
  { id: "quadcopter-drone", label: "Quadcopter Drone", icon: "✦" },
  { id: "rc-plane",         label: "RC Plane Making",  icon: "▲" },
];

const info = [
  {
    label: "Email",
    value: "info@roboflight.ca",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "New Brunswick, Canada",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Partner Schools",
    value: "McAdam HS · Harvey HS · UNB",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", courses: [], message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCourseToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(id) ? prev.courses.filter((c) => c !== id) : [...prev.courses, id],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", courses: [], message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Enrol your child <span className="text-blue-600">today</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Interested in one of our programs? Fill in the form and we&apos;ll be in touch within one business day.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Info panel */}
          <div className={\`lg:col-span-2 transition-all duration-700 \${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}\`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-slate-700 text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-blue-600 rounded-2xl text-white">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="font-semibold text-sm mb-1">Safe & Secure</p>
                  <p className="text-blue-200 text-xs leading-relaxed">Your personal information is kept private and never shared. We follow Canadian privacy law (PIPEDA).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={\`lg:col-span-3 transition-all duration-700 delay-150 \${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}\`}>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 p-5 sm:p-8">

              {status === "success" && (
                <div className="mb-6 p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800 text-sm">Message sent!</p>
                    <p className="text-emerald-600 text-xs mt-0.5">We&apos;ll get back to you within one business day.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 sm:p-5 bg-red-50 border border-red-200 rounded-2xl">
                  <p className="font-semibold text-red-800 text-sm">Failed to send</p>
                  <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Full Name <span className="text-blue-500 normal-case tracking-normal">*</span>
                    </label>
                    <input
                      id="name" type="text" required placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                    <input
                      id="phone" type="tel" placeholder="+1 (506) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email Address <span className="text-blue-500 normal-case tracking-normal">*</span>
                  </label>
                  <input
                    id="email" type="email" required placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Program Interest</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {courseOptions.map((course) => {
                      const checked = formData.courses.includes(course.id);
                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => handleCourseToggle(course.id)}
                          className={\`flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 p-3 sm:p-3.5 rounded-xl border-2 text-left sm:text-center transition-all duration-200 cursor-pointer active:scale-95 \${
                            checked
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-100 bg-slate-50 text-slate-500 hover:border-blue-200"
                          }\`}
                        >
                          <span className="text-xl sm:text-lg flex-shrink-0">{course.icon}</span>
                          <span className={\`text-xs sm:text-[11px] font-semibold \${checked ? "text-blue-700" : "text-slate-600"}\`}>{course.label}</span>
                          {checked && (
                            <span className="ml-auto sm:ml-0 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
                  <textarea
                    id="message" rows={4}
                    placeholder="Tell us about your child's age, experience level, or any questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-slate-400 text-[11px]">
                  By submitting you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms" className="underline hover:text-slate-600">Terms of Service</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Gallery.tsx', gallery, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Pricing.tsx', pricing, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Testimonials.tsx', testimonials, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Contact.tsx', contact, 'utf8');
console.log('All done');
