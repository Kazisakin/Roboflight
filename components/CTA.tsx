"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Package, School } from "lucide-react";
import Frame from "@/components/Frame";
import { DarkEyebrow, btnGhostDark, btnPrimary } from "@/components/ui";

const bullets = [
  { Icon: BookOpen, t: "Curriculum designed for all skill levels" },
  { Icon: School, t: "Partner with schools across New Brunswick" },
  { Icon: Package, t: "All training kits and materials provided" },
  { Icon: GraduationCap, t: "Taught by an expert with a Masters in EE" },
];

export default function CTA() {
  const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative overflow-hidden bg-[#0a1530] py-28 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-20 h-[480px] w-[480px] rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <Frame tone="dark" offset="bl" className="anim-up aspect-[4/3] lg:aspect-[4/5]">
          <Image src="/photos/student-wiring-robot-car-school-program.jpg" alt="A student wiring a robot car during a school session" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
        </Frame>
        <div>
          <DarkEyebrow className="anim-up">For schools</DarkEyebrow>
          <h2 className="t-h2 anim-up d1 mt-6 text-white">
            100+ students.
            <br />
            <span className="text-[#38bdf8]">3 schools.</span>
            <br />
            Zero boring lessons.
          </h2>
          <p className="anim-up d2 mt-7 max-w-md t-lead text-slate-300">
            Robotics and coding can take flight in your school. RoboFlight partners with schools across New Brunswick to deliver structured, curriculum-aligned sessions.
          </p>
          <ul className="anim-up d3 mt-8 grid gap-4 sm:grid-cols-2">
            {bullets.map(({ Icon, t }) => (
              <li key={t} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#38bdf8]/10 text-[#38bdf8] ring-1 ring-[#38bdf8]/20">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-2">{t}</span>
              </li>
            ))}
          </ul>
          <div className="anim-up d4 mt-10 flex flex-wrap gap-3">
            <button onClick={goContact} className={`${btnPrimary} cursor-pointer`}>Bring RoboFlight to your school <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            <Link href="/book" className={btnGhostDark}>Book a free class</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
