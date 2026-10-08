import Image from "next/image";
import { Quote } from "lucide-react";
import Frame from "@/components/Frame";

export default function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-[#0a1530] py-28 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#22d3ee]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <span className="anim-up flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fbbf24] text-[#0a1530]">
            <Quote className="h-6 w-6" aria-hidden="true" />
          </span>
          <blockquote className="anim-up d1 mt-8 text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
            Students started from scratch on both the coding and circuitry fronts. It has been a blast watching them learn through this hands-on endeavor.
          </blockquote>
          <div className="anim-up d2 mt-10 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white ring-1 ring-white/20">MC</span>
            <span>
              <span className="block text-sm font-semibold text-white">Matt Clements</span>
              <span className="block text-sm text-slate-300">Principal, McAdam High School</span>
            </span>
          </div>
        </div>
        <Frame tone="dark" offset="tr" className="anim-up d2 order-first mx-auto aspect-[4/3] w-full max-w-md lg:order-none lg:aspect-[4/5] lg:max-w-sm">
          <Image src="/photos/high-school-robotics-class-new-brunswick.jpg" alt="High school students building robot cars during a RoboFlight session" fill className="object-cover" sizes="(max-width: 1024px) 80vw, 30vw" />
        </Frame>
      </div>
    </section>
  );
}
