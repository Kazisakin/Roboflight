"use client";

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
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
        <div className={`transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className={`transition-all duration-300 ${fading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}>
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
                <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-8 h-2 bg-cyan-400" : "w-2 h-2 bg-white/25 hover:bg-white/50"}`} />
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
                className={`text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm ${i === active ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}`}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden bg-blue-800 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="28px" />
                  </div>
                  <div>
                    <p className={`text-[10px] sm:text-xs font-semibold ${i === active ? "text-white" : "text-white/60"}`}>{item.name}</p>
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
