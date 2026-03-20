const fs = require('fs');

// ─── HERO ─────────────────────────────────────────────────────────────────────
const hero = `"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Single soft glow — no dot grids, no rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="order-2 lg:order-1">
          <div
            className={\`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-cyan-400 text-xs font-medium mb-6 transition-all duration-700 \${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Coding · Electronics · Robotics
          </div>

          <h1
            className={\`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5 transition-all duration-700 \${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
            style={{ transitionDelay: "0.2s" }}
          >
            Robotics, Coding{" "}
            <span className="text-cyan-400">&amp; Circuitry</span>
          </h1>

          <p
            className={\`text-base text-white/50 max-w-md mb-8 leading-relaxed transition-all duration-700 \${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
            style={{ transitionDelay: "0.3s" }}
          >
            Empowering the next generation of innovators through hands-on robotics, drone building, and coding education across New Brunswick.
          </p>

          <div
            className={\`flex flex-wrap gap-3 transition-all duration-700 \${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
            style={{ transitionDelay: "0.4s" }}
          >
            <button
              onClick={() => scrollTo("programs")}
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold text-sm rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Explore Programs
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium text-sm rounded-full transition-all duration-200 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div
            className={\`flex gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/8 transition-all duration-700 \${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
            style={{ transitionDelay: "0.55s" }}
          >
            {[
              { val: "100+", label: "Students" },
              { val: "75+",  label: "Projects" },
              { val: "3",    label: "Schools" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white">{s.val}</p>
                <p className="text-white/35 text-xs mt-0.5 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — student image */}
        <div
          className={\`order-1 lg:order-2 flex items-center justify-center transition-all duration-700 \${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}\`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="relative w-72 h-72 sm:w-[26rem] sm:h-[26rem]">
            {/* Soft ring */}
            <div className="absolute inset-0 rounded-full border border-white/8" />
            {/* Glow */}
            <div className="absolute inset-4 rounded-full bg-cyan-400/8 blur-2xl" />
            {/* Image */}
            <div className="absolute inset-5 rounded-full overflow-hidden border border-white/12 shadow-2xl shadow-slate-950">
              <Image
                src="/studenttop.png"
                alt="Student with robotics"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 240px, 320px"
                priority
                unoptimized
              />
            </div>
            {/* Badge top-right */}
            <div className={\`absolute -top-1 right-0 sm:right-2 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float \${mounted ? "" : "opacity-0"}\`} style={{ animationDelay: "0.3s" }}>
              <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-xs leading-none">Hands-on</p>
                <p className="text-slate-400 text-[10px]">Learning</p>
              </div>
            </div>
            {/* Badge bottom-left */}
            <div className={\`absolute -bottom-1 left-0 sm:-left-2 bg-blue-600 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float \${mounted ? "" : "opacity-0"}\`} style={{ animationDelay: "1.2s" }}>
              <div className="w-6 h-6 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-xs leading-none">STEM Skills</p>
                <p className="text-blue-300 text-[10px]">For every child</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={\`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 \${mounted ? "opacity-100" : "opacity-0"}\`} style={{ transitionDelay: "1s" }}>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
`;

// ─── STATS ─────────────────────────────────────────────────────────────────────
const stats = `"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface StatProps { end: number; suffix: string; label: string; }

function Stat({ end, suffix, label }: StatProps) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  );
}

const items = [
  { end: 100, suffix: "+", label: "Students Reached" },
  { end: 75,  suffix: "+", label: "Projects Completed" },
  { end: 5,   suffix: "+", label: "Years Experience" },
  { end: 3,   suffix: "",  label: "Partner Schools" },
];

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 divide-x-0 sm:divide-x divide-slate-100">
          {items.map((item) => <Stat key={item.label} {...item} />)}
        </div>
      </div>
    </section>
  );
}
`;

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const features = `"use client";

import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "All in One",
    description: "Coding, electronics, and robotics in one comprehensive program — no juggling multiple courses.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Hands-on Learning",
    description: "Students build real drones, robots, and RC planes — applying knowledge to tangible projects.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Expert Instruction",
    description: "Learn from an instructor with a Masters in Electrical Engineering and a passion for robotics.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Proven Track Record",
    description: "5+ years inspiring 100+ students across New Brunswick with structured, curriculum-aligned sessions.",
  },
];

export default function Features() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <p className={\`text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}>
            Why RoboFlight?
          </p>
          <h2 className={\`text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight transition-all duration-700 delay-75 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}>
            Built for young{" "}
            <span className="text-blue-600">innovators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={\`bg-white p-6 sm:p-8 transition-all duration-700 hover:bg-slate-50 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
              style={{ transitionDelay: \`\${i * 80 + 100}ms\` }}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// ─── COURSES ─────────────────────────────────────────────────────────────────
const courses = `"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const courses = [
  {
    title: "Quadcopter Drone",
    description: "Understand flight dynamics, build your own functional drone, and learn aerodynamics, electronics, and programming.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    imageAlt: "Quadcopter drone in flight",
    badge: "Fan Favourite",
    tags: ["Flight Dynamics", "Electronics", "Programming"],
  },
  {
    title: "Basic Robotics",
    description: "Learn robotics fundamentals, build robot cars, explore sensors, and write code that brings your robots to life.",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    imageAlt: "Robotics project with Arduino",
    badge: "Most Popular",
    tags: ["Robotics Basics", "Coding", "Sensors"],
  },
  {
    title: "RC Plane Making",
    description: "Design, build, and fly your own remote-controlled planes while developing aeronautical and mechanical skills.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    imageAlt: "RC plane flying outdoors",
    badge: "Advanced",
    tags: ["Aeronautics", "RC Systems", "Design"],
  },
];

export default function Courses() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="programs" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <p className={\`text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}>
            Our Programs
          </p>
          <h2 className={\`text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight transition-all duration-700 delay-75 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}>
            Courses <span className="text-blue-600">Offered</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {courses.map((course, i) => (
            <div
              key={course.title}
              className={\`group rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1 bg-white \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}\`}
              style={{ transitionDelay: \`\${i * 100 + 150}ms\` }}
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <span className={\`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold \${course.badge === "Most Popular" ? "bg-cyan-400 text-slate-900" : "bg-white/90 text-slate-700"}\`}>
                  {course.badge}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{course.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 bg-slate-50 text-slate-500 rounded-full text-[11px] font-medium border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-blue-600 font-medium text-sm flex items-center gap-1.5 hover:gap-3 transition-all duration-200 cursor-pointer group/btn"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
const about = `"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const skills = [
  { title: "Creativity, problem-solving, delayed gratification", description: "Students learn to think critically, persist through challenges, and appreciate long-term achievement." },
  { title: "Coding literacy, circuit design, and soldering",     description: "Practical technical skills forming the foundation of a career in engineering or technology." },
  { title: "Readiness for a coding-driven workplace",            description: "Future-proof skills preparing students for the rapidly evolving demands of the modern tech workforce." },
];

export default function About() {
  const { ref: leftRef,  isInView: leftInView  } = useInView({ threshold: 0.2 });
  const { ref: rightRef, isInView: rightInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <div ref={leftRef} className={\`relative transition-all duration-700 \${leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}\`}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-100">
              <Image src="/gallery-3.jpg" alt="Student building a robot" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            {/* Floating credential */}
            <div className="absolute -bottom-4 -right-3 sm:-right-5 bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-xs">Electrical Engineering</p>
                <p className="text-slate-400 text-[10px]">Masters Student · UNB</p>
              </div>
            </div>
            {/* Small overlay image */}
            <div className="absolute -top-4 -left-3 sm:-left-5 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg border-4 border-white hidden sm:block">
              <Image src="/gallery-6.jpg" alt="Instructor with students" fill className="object-cover" sizes="112px" />
            </div>
          </div>

          {/* Content */}
          <div ref={rightRef} className={\`transition-all duration-700 \${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}\`}>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Why Choose Us?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
              Meet{" "}
              <span className="text-blue-600">Abdur Rahman</span><br />Chowdhury
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              A Masters student in Electrical Engineering at UNB, with a lifelong passion for robotics and coding. Driven by a dream to one day build a Mars lander, he founded RoboFlight to bring hands-on STEM education to children across New Brunswick.
            </p>

            <div className="flex flex-col gap-3">
              {skills.map((skill, i) => (
                <div
                  key={skill.title}
                  className={\`flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-100 transition-colors \${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}\`}
                  style={{ transitionDelay: \`\${i * 80 + 200}ms\` }}
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm mb-0.5">{skill.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
`;

// ─── CTA ─────────────────────────────────────────────────────────────────────
const cta = `"use client";

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
          <div className={\`transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
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
          <div className={\`transition-all duration-700 delay-150 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
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
`;

// ─── ARDUINO TEASER ──────────────────────────────────────────────────────────
const arduino = `"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";

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
  { id: 1, label: "Gather Parts",     color: "bg-blue-600" },
  { id: 2, label: "Build Chassis",    color: "bg-blue-500" },
  { id: 3, label: "Wire Motors",      color: "bg-cyan-500" },
  { id: 4, label: "Connect Arduino",  color: "bg-blue-600" },
  { id: 5, label: "Upload Code",      color: "bg-cyan-600" },
  { id: 6, label: "Drive!",           color: "bg-blue-700" },
];

export default function ArduinoTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className={\`transition-all duration-700 \${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}\`}>
              <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">Try It Yourself</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
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
                    className={\`flex items-center gap-2.5 px-3 py-2.5 bg-white/5 border border-white/8 rounded-xl transition-all duration-500 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}
                    style={{ transitionDelay: \`\${i * 60 + 200}ms\` }}
                  >
                    <span className={\`w-5 h-5 rounded-full \${s.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0\`}>{s.id}</span>
                    <span className="text-white/60 text-xs font-medium">{s.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold text-sm rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Start Building
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right — card preview */}
            <div
              className={\`transition-all duration-700 delay-200 \${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}\`}
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
                    <div key={item} className={\`flex items-center gap-3 px-3 py-2.5 rounded-xl border \${i === 0 ? "border-cyan-400/30 bg-cyan-400/8" : "border-white/8 bg-white/4"}\`}>
                      <div className={\`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 \${i === 0 ? "bg-cyan-400 border-cyan-400" : "border-white/20"}\`}>
                        {i === 0 && <svg className="w-2.5 h-2.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={\`text-xs font-medium \${i === 0 ? "text-cyan-300 line-through" : "text-white/70"}\`}>{item}</span>
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
`;

// ─── SCHOOLS ─────────────────────────────────────────────────────────────────
const schools = `"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const schools = [
  { name: "McAdam High School", location: "McAdam, NB", description: "Bringing robotics and drone education to students in the McAdam community.", logo: "/mcadam-school.png", dark: false },
  { name: "Harvey High School",  location: "Harvey, NB",  description: "Empowering Harvey students with hands-on coding and electronics skills.",     logo: "/harvey-school.jpeg", dark: false },
  { name: "RoboFlight UNB",      location: "Fredericton, NB", description: "University of New Brunswick campus hub for advanced robotics and innovation.", logo: "/unb_logo_white.png", dark: true },
];

export default function Schools() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <p className={\`text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}>
            Where We Teach
          </p>
          <h2 className={\`text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3 transition-all duration-700 delay-75 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}>
            Partner <span className="text-blue-600">Schools</span>
          </h2>
          <p className={\`text-slate-500 text-sm max-w-md mx-auto transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}\`}>
            RoboFlight is active in schools across New Brunswick, bringing STEM education where it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {schools.map((school, i) => (
            <div
              key={school.name}
              className={\`flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-8 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
              style={{ transitionDelay: \`\${i * 100 + 150}ms\` }}
            >
              {/* Logo */}
              <div className={\`relative w-20 h-20 rounded-2xl overflow-hidden mb-5 flex items-center justify-center border \${school.dark ? "bg-blue-800 border-blue-700" : "bg-white border-slate-100 shadow-sm"}\`}>
                <div className="relative w-14 h-14">
                  <Image src={school.logo} alt={school.name} fill className="object-contain" sizes="56px" unoptimized />
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-green-600 text-[10px] font-semibold uppercase tracking-wide">Active</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-1">{school.name}</h3>

              <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {school.location}
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">{school.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center pt-10 border-t border-slate-200">
          {[
            { value: "3",      label: "Partner Schools" },
            { value: "NB",     label: "Province" },
            { value: "100+",   label: "Students Reached" },
            { value: "Canada", label: "Country" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-bold text-blue-600 mb-1">{item.value}</p>
              <p className="text-slate-400 text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Hero.tsx', hero, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Stats.tsx', stats, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Features.tsx', features, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Courses.tsx', courses, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/About.tsx', about, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/CTA.tsx', cta, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/ArduinoTeaser.tsx', arduino, 'utf8');
fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Schools.tsx', schools, 'utf8');
console.log('All minimal components written');
