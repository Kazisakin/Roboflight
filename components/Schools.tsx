"use client";

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
          <p className={`text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Where We Teach
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3 transition-all duration-700 delay-75 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Partner <span className="text-blue-600">Schools</span>
          </h2>
          <p className={`text-slate-500 text-sm max-w-md mx-auto transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            RoboFlight is active in schools across New Brunswick, bringing STEM education where it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {schools.map((school, i) => (
            <div
              key={school.name}
              className={`flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-8 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100 + 150}ms` }}
            >
              {/* Logo */}
              <div className={`relative w-20 h-20 rounded-2xl overflow-hidden mb-5 flex items-center justify-center border ${school.dark ? "bg-blue-800 border-blue-700" : "bg-white border-slate-100 shadow-sm"}`}>
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
