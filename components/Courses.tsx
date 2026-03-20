"use client";

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
          <p className={`text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Our Programs
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight transition-all duration-700 delay-75 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Courses <span className="text-blue-600">Offered</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {courses.map((course, i) => (
            <div
              key={course.title}
              className={`group rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1 bg-white ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 100 + 150}ms` }}
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
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${course.badge === "Most Popular" ? "bg-cyan-400 text-slate-900" : "bg-white/90 text-slate-700"}`}>
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
