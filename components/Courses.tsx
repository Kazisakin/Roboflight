"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const courses = [
  {
    title: "Quadcopter Drone",
    description: "Dive into the world of drones, understand flight dynamics, and build your own functional drone. Students learn aerodynamics, electronics, and programming.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    imageAlt: "Quadcopter drone in flight",
    badge: "Fan Favourite",
    badgeStyle: "bg-blue-100 text-blue-700",
    tags: ["Flight Dynamics", "Electronics", "Programming"],
  },
  {
    title: "Basic Robotics",
    description: "Learn the fundamentals of robotics and apply your knowledge to exciting hands-on projects. Build robot cars, explore sensors, and write code that brings robots to life.",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    imageAlt: "Robotics project with Arduino",
    badge: "Most Popular",
    badgeStyle: "bg-cyan-400 text-blue-900",
    tags: ["Robotics Basics", "Coding", "Sensors"],
  },
  {
    title: "RC Plane Making",
    description: "Design, build, and fly your own remote-controlled planes. Explore the principles of aeronautics while developing mechanical and electronic skills.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    imageAlt: "RC plane being built and flown outdoors",
    badge: "Advanced",
    badgeStyle: "bg-sky-100 text-sky-700",
    tags: ["Aeronautics", "RC Systems", "Design"],
  },
];

export default function Courses() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="programs" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 rotate-180">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div ref={ref} className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Our Programs
          </span>
          <h2 className={`text-2xl sm:text-3xl font-black text-blue-900 mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Courses <span className="text-cyan-500">Offered</span>
          </h2>
          <p className={`text-gray-400 text-sm max-w-lg mx-auto transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Three exciting programs designed to ignite curiosity and build real-world technical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 120 + 180}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${course.badgeStyle}`}>
                  {course.badge}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-blue-900 mb-2">{course.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{course.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-semibold border border-blue-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-1.5 text-blue-700 font-semibold text-xs hover:text-cyan-600 transition-colors duration-200 group/link cursor-pointer"
                >
                  Learn More
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,25 C360,0 1080,50 1440,25 L1440,50 L0,50 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
