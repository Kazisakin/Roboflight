"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const skills = [
  {
    title: "Creativity, problem-solving, delayed gratification",
    description: "Students learn to think critically, persist through challenges, and appreciate long-term achievement.",
    color: "from-blue-500 to-cyan-400",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    title: "Coding literacy, circuit design, and soldering",
    description: "Practical technical skills forming the foundation of a career in engineering or technology.",
    color: "from-cyan-500 to-sky-400",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: "Readiness for a coding-driven workplace",
    description: "Future-proof skills preparing students for the rapidly evolving demands of the modern tech workforce.",
    color: "from-blue-600 to-sky-500",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
      </svg>
    ),
  },
];

export default function About() {
  const { ref: leftRef,  isInView: leftInView  } = useInView({ threshold: 0.2 });
  const { ref: rightRef, isInView: rightInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <div ref={leftRef} className={`relative transition-all duration-700 ${leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
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
          <div ref={rightRef} className={`transition-all duration-700 ${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3 text-blue-600">
              Why Choose Us?
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Meet{" "}
              <span style={{ background: "linear-gradient(135deg, #0ea5e9, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Abdur Rahman</span><br />Chowdhury
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              A Masters student in Electrical Engineering at UNB, with a lifelong passion for robotics and coding. Driven by a dream to one day build a Mars lander, he founded RoboFlight to bring hands-on STEM education to children across New Brunswick.
            </p>

            <div className="flex flex-col gap-3">
              {skills.map((skill, i) => (
                <div
                  key={skill.title}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 border-blue-50 bg-white hover:border-cyan-200 hover:shadow-lg hover:-translate-y-1 transition-all ${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                  style={{ transitionDelay: `${i * 80 + 200}ms` }}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    {skill.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">{skill.title}</p>
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
