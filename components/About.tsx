"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const skills = [
  {
    title: "Creativity, problem-solving, delayed gratification",
    description: "Students learn to think critically, persist through challenges, and appreciate long-term achievement.",
  },
  {
    title: "Coding literacy, circuit design, and soldering",
    description: "Practical technical skills that form the foundation of a career in engineering or technology.",
  },
  {
    title: "Readiness for a workplace that values coding",
    description: "Future-proof skills preparing students for the rapidly evolving demands of the modern tech workforce.",
  },
];

export default function About() {
  const { ref: leftRef, isInView: leftInView } = useInView({ threshold: 0.2 });
  const { ref: rightRef, isInView: rightInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div
            ref={leftRef}
            className={`relative transition-all duration-700 ${leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="/gallery-3.jpg"
                alt="Student smiling while building a robot"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>

            {/* Credential badge */}
            <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-3 border border-gray-100 max-w-[200px] sm:max-w-none">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-xs">Electrical Engineering</p>
                <p className="text-gray-400 text-[10px]">Masters Student &middot; UNB</p>
              </div>
            </div>

            {/* Small overlay image */}
            <div className="absolute -top-5 -left-4 sm:-left-6 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg border-4 border-white hidden sm:block">
              <Image
                src="/gallery-6.jpg"
                alt="Instructor guiding students through robot build"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div
            ref={rightRef}
            className={`transition-all duration-700 ${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
              Why Choose Us?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-4 leading-tight">
              Meet Your Instructor,{" "}
              <span className="text-cyan-500">Abdur Rahman Chowdhury</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Abdur Rahman Chowdhury is a Masters student in Electrical Engineering at the University of New Brunswick, with a lifelong passion for robotics and coding. Driven by a dream to one day build a Mars lander, he founded RoboFlight to bring hands-on STEM education to children across New Brunswick.
            </p>

            <div className="flex flex-col gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  className={`flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-300 ${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                  style={{ transitionDelay: `${index * 90 + 200}ms` }}
                >
                  <div className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 text-xs mb-0.5">{skill.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{skill.description}</p>
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
