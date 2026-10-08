"use client";

import { ArrowRight, GraduationCap, MapPin, PlayCircle, Sparkles, Users, Wrench } from "lucide-react";
import Frame from "@/components/Frame";
import Slideshow from "@/components/Slideshow";
import { DarkEyebrow, btnGhostDark, btnPrimary } from "@/components/ui";

const slides = [
  { src: "/photos/kids-robotics-coding-class-fredericton.jpg",  alt: "Two students smiling beside their robot car kit", caption: "Kits on the table, grins all round" },
  { src: "/photos/robot-car-competition-kids.jpg", alt: "Students driving the robot cars they built in a ring", caption: "Robot battle day" },
  { src: "/photos/kids-robot-car-kit-robotics-class.jpg",  alt: "Students smiling with their robot car kit", caption: "First robot, first win" },
  { src: "/photos/kids-testing-robot-cars.jpg",  alt: "Students testing robot cars on a round table", caption: "Testing, tuning, trying again" },
  { src: "/photos/student-controlling-robot-car-tablet.jpg", alt: "A student steering a robot car from a tablet", caption: "Driving from a tablet" },
  { src: "/photos/kids-thumbs-up-robotics-class-fredericton.jpg",  alt: "Students giving a thumbs up during a session", caption: "Thumbs up from the class" },
];

export default function Hero() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden bg-[#0a1530]">
      {/* Background: blueprint grid + glows (no photo) */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#2563eb]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#22d3ee]/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:min-h-screen lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pb-20 lg:pt-36">
        <div>
          <DarkEyebrow className="hero-up">Coding · Electronics · Robotics</DarkEyebrow>

          <h1 className="t-display hero-up d1 mt-7 text-white">
            <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Robotics &amp; coding classes for kids in Fredericton</span>
            Robotics, coding
            <br />
            <span className="text-[#38bdf8]">&amp; circuitry.</span>
          </h1>

          <p className="hero-up d2 mt-8 max-w-xl t-lead text-slate-300">
            Empowering the next generation of innovators through hands-on robotics, drone building, and coding education in Fredericton, New Brunswick.
          </p>

          <div className="hero-up d3 mt-10 flex flex-wrap gap-3">
            <button onClick={() => go("programs")} className={`${btnPrimary} cursor-pointer px-8 py-4 text-base`}>
              Explore programs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button onClick={() => go("promise")} className={`${btnGhostDark} cursor-pointer px-8 py-4 text-base`}>
              <PlayCircle className="h-5 w-5" aria-hidden="true" /> Watch a class
            </button>
          </div>

          <ul className="hero-up d5 mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { Icon: Users, v: "100+", l: "Students" },
              { Icon: GraduationCap, v: "3", l: "Partner schools" },
              { Icon: MapPin, v: "NB", l: "Fredericton" },
            ].map(({ Icon, v, l }) => (
              <li key={l} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-[#38bdf8] ring-1 ring-white/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-semibold leading-none text-white">{v}</span>
                  <span className="mt-1 block text-[11px] text-slate-300">{l}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Framed rotating photos */}
        <div className="hero-up d2 relative order-first mx-auto w-full max-w-[520px] lg:order-none lg:max-w-none">
          <Frame tone="dark" offset="br" className="aspect-[4/3] sm:aspect-square lg:aspect-[4/5]">
            <Slideshow slides={slides} priority />
          </Frame>

          {/* Floating badges */}
          <div className="absolute -left-3 top-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_rgba(10,21,48,0.35)] sm:-left-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]"><Wrench className="h-4.5 w-4.5" aria-hidden="true" /></span>
            <span>
              <span className="block text-xs font-semibold text-[#0f172a]">Hands-on builds</span>
              <span className="block text-[11px] text-slate-500">Real kits, real code</span>
            </span>
          </div>
          <div className="absolute -right-2 bottom-16 flex items-center gap-3 rounded-2xl bg-[#fbbf24] px-4 py-3 shadow-[0_16px_40px_rgba(10,21,48,0.35)] sm:-right-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a1530] text-[#fbbf24]"><Sparkles className="h-4.5 w-4.5" aria-hidden="true" /></span>
            <span>
              <span className="block text-xs font-bold text-[#0a1530]">Ages 8 and up</span>
              <span className="block text-[11px] font-medium text-[#0a1530]/75">First class is free</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
