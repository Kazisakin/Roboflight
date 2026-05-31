"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { FloatingRobot } from "@/components/SceneDecorations";

const courses = [
  {
    title: "Quadcopter Drone",
    description: "Understand flight dynamics, build your own functional drone, and learn aerodynamics, electronics, and programming.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    imageAlt: "Quadcopter drone in flight",
    badge: "Fan Favourite",
    badgeColor: "bg-blue-600 text-white",
    tags: ["Flight Dynamics", "Electronics", "Programming"],
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Basic Robotics",
    description: "Learn robotics fundamentals, build robot cars, explore sensors, and write code that brings your robots to life.",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    imageAlt: "Robotics project with Arduino",
    badge: "Most Popular",
    badgeColor: "bg-cyan-400 text-blue-950",
    tags: ["Robotics Basics", "Coding", "Sensors"],
    accent: "from-cyan-500 to-sky-400",
  },
  {
    title: "RC Plane Making",
    description: "Design, build, and fly your own remote-controlled planes while developing aeronautical and mechanical skills.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    imageAlt: "RC plane flying outdoors",
    badge: "Advanced",
    badgeColor: "bg-sky-500 text-white",
    tags: ["Aeronautics", "RC Systems", "Design"],
    accent: "from-sky-500 to-blue-500",
  },
];

export default function Courses() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="programs" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #eff6ff 0%, #e0f2fe 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <FloatingRobot className="absolute bottom-10 right-10 z-10 opacity-70" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <p className={`section-eyebrow text-blue-500 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Our Programs</p>
          <h2 className={`text-3xl sm:text-5xl font-black text-slate-900 tracking-tight transition-all duration-700 delay-75 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Courses{" "}
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Offered</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8">
          {courses.map((course, i) => (
            <div
              key={course.title}
              className={`group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-blue-200 bg-white ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${i * 100 + 150}ms`,
                transition: "opacity 0.7s, transform 0.7s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.animation = "wiggle-once 0.45s ease-in-out";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 48px rgba(56,189,248,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.animation = "";
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide shadow-lg ${course.badgeColor}`}>
                  {course.badge}
                </span>
              </div>

              {/* Colored accent bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${course.accent}`} />

              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-600 text-[15px] leading-[1.75] mb-4">{course.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {course.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold border border-blue-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full py-3 rounded-2xl font-black text-sm transition-all duration-200 hover:scale-[1.03] cursor-pointer text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #3b82f6)" }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
