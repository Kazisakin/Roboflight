"use client";

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
          <h2 className={`text-2xl sm:text-3xl font-black text-white mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Partner <span className="text-cyan-400">Schools</span>
          </h2>
          <p className={`text-blue-300 text-sm max-w-md mx-auto transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            RoboFlight is proudly active in schools across New Brunswick, bringing STEM education where it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schools.map((school, index) => (
            <div
              key={school.name}
              className={`flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 120 + 180}ms` }}
            >
              {/* Circular logo */}
              <div className="relative mb-6">
                {/* Outer decorative ring */}
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-cyan-400/20 animate-spin" style={{ animationDuration: "18s" }} />
                {/* Circle */}
                <div className={`relative w-28 h-28 rounded-full overflow-hidden border-4 shadow-xl flex items-center justify-center ${school.dark ? "bg-blue-800 border-blue-600" : "bg-white border-white/80"}`}>
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
