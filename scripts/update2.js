const fs = require('fs');

// ── Schools.tsx — circular profile logo style ───────────────────────────────
const schools = `"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const schools = [
  {
    name: "McAdam High School",
    location: "McAdam, NB",
    description: "Bringing robotics and drone education to students in the McAdam community.",
    logo: "/mcadam-school.png",
    dark: false,
  },
  {
    name: "Harvey High School",
    location: "Harvey, NB",
    description: "Empowering Harvey students with hands-on coding and electronics skills.",
    logo: "/harvey-school.jpeg",
    dark: false,
  },
  {
    name: "RoboFlight UNB",
    location: "Fredericton, NB",
    description: "University of New Brunswick campus hub for advanced robotics and innovation.",
    logo: "/unb_logo_white.png",
    dark: true,
  },
];

export default function Schools() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-24 bg-blue-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-700/60 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-700/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-white/10 text-cyan-300 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 border border-white/15">
            Where We Teach
          </span>
          <h2 className={\`text-2xl sm:text-3xl font-black text-white mb-3 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            Partner <span className="text-cyan-400">Schools</span>
          </h2>
          <p className={\`text-blue-300 text-sm max-w-md mx-auto transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            RoboFlight is proudly active in schools across New Brunswick, bringing STEM education where it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schools.map((school, index) => (
            <div
              key={school.name}
              className={\`flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}\`}
              style={{ transitionDelay: \`\${index * 120 + 180}ms\` }}
            >
              {/* Circular logo */}
              <div className="relative mb-6">
                {/* Outer decorative ring */}
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-cyan-400/20 animate-spin" style={{ animationDuration: "18s" }} />
                {/* Circle */}
                <div className={\`relative w-28 h-28 rounded-full overflow-hidden border-4 shadow-xl flex items-center justify-center \${school.dark ? "bg-blue-800 border-blue-600" : "bg-white border-white/80"}\`}>
                  <div className="relative w-20 h-20">
                    <Image
                      src={school.logo}
                      alt={school.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                </div>
                {/* Active dot */}
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-blue-900 shadow-md" />
              </div>

              <h3 className="text-base font-bold text-white mb-1">{school.name}</h3>

              <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs mb-3">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{school.location}</span>
              </div>

              <p className="text-blue-200 text-xs leading-relaxed mb-5">{school.description}</p>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-300 text-[10px] font-semibold uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                Active Program
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-white/10 pt-10">
          {[
            { value: "3", label: "Partner Schools" },
            { value: "NB", label: "Province" },
            { value: "100+", label: "Students Reached" },
            { value: "Canada", label: "Country" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-black text-cyan-400 mb-1">{item.value}</p>
              <p className="text-blue-300 text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// ── Testimonials.tsx — bg image with opacity ────────────────────────────────
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
    <section className="py-24 relative overflow-hidden bg-blue-950">
      {/* Background image with opacity */}
      <div className="absolute inset-0">
        <Image
          src="/gallery-2.jpg"
          alt="Kids learning robotics"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={80}
        />
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-blue-950/85" />
      </div>

      {/* Glow blobs on top of overlay */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={\`text-center mb-16 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 text-cyan-300 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            What people are <span className="text-cyan-400">saying</span>
          </h2>
          <p className="text-blue-300 text-sm max-w-md mx-auto leading-relaxed">
            Hear from students, parents, and educators who have experienced RoboFlight firsthand.
          </p>
        </div>

        {/* Main card */}
        <div className={\`transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
          <div className={\`transition-all duration-300 \${fading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}\`}>
            <div className="relative bg-white/10 border border-white/15 rounded-3xl p-8 sm:p-12 backdrop-blur-md overflow-hidden">
              {/* Large quote mark */}
              <div className="absolute top-6 right-8 text-[120px] leading-none text-white/5 font-serif select-none">&ldquo;</div>

              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
                {/* Avatar column */}
                <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-3">
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-blue-800 ring-2 ring-white/20">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="lg:mt-1">
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

                {/* Quote */}
                <blockquote className="text-white/80 text-base sm:text-lg leading-relaxed font-light italic relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={\`rounded-full transition-all duration-300 cursor-pointer \${i === active ? "w-8 h-2 bg-cyan-400" : "w-2 h-2 bg-white/25 hover:bg-white/50"}\`}
                />
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

          {/* Thumbnail row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => goTo(i)}
                className={\`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm \${i === active ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}\`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-blue-800 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="28px" />
                  </div>
                  <div>
                    <p className={\`text-xs font-semibold \${i === active ? "text-white" : "text-white/60"}\`}>{item.name}</p>
                    <p className="text-[10px] text-blue-400">{item.role}</p>
                  </div>
                </div>
                <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2">{item.quote}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Schools.tsx', schools, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Testimonials.tsx', testimonials, 'utf8');
console.log('done');
