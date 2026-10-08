import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, Package, School } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import Schools from "@/components/Schools";
import QuoteBand from "@/components/QuoteBand";
import Frame from "@/components/Frame";
import { Arrow, DarkEyebrow, btnGhostDark, btnPrimary } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Robotics Programs for Schools in New Brunswick | RoboFlight",
  description: "Curriculum-aligned robotics, coding and electronics sessions for New Brunswick schools. All kits provided. Partner schools include McAdam HS and Harvey HS.",
  path: "/schools",
  image: "/og/schools.jpg",
});

const offer = [
  { Icon: BookOpen, t: "Curriculum designed for all skill levels", d: "Students start from scratch on coding and circuitry and finish with a working robot." },
  { Icon: Package, t: "All training kits and materials provided", d: "Arduino boards, motor drivers, motors, wheels and tools — nothing for the school to buy." },
  { Icon: GraduationCap, t: "Taught by an expert", d: "Led by a Masters student in Electrical Engineering at UNB." },
  { Icon: School, t: "Already running in NB schools", d: "McAdam High School, Harvey High School and at the University of New Brunswick." },
];

export default function SchoolsPage() {
  return (
    <main className="overflow-x-clip">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "For schools", path: "/schools" }])} />
      <Navbar />
      <section className="relative overflow-hidden bg-[#0a1530]">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[#2563eb]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-44">
          <div>
            <DarkEyebrow className="hero-up">For principals &amp; teachers</DarkEyebrow>
            <h1 className="t-display hero-up d1 mt-7 text-white">
              <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Robotics programs for New Brunswick schools</span>
              Robotics can take flight
              <br />
              <span className="text-[#38bdf8]">in your school.</span>
            </h1>
            <p className="t-lead hero-up d2 mt-7 max-w-xl text-slate-300">
              RoboFlight partners with schools across New Brunswick to deliver structured, hands-on robotics and coding sessions — kits, instruction and curriculum included.
            </p>
            <div className="hero-up d3 mt-10 flex flex-wrap gap-3">
              <Link href="/#contact" className={btnPrimary}>Ask about a school program <Arrow /></Link>
              <a href={site.phoneHref} className={btnGhostDark}>Call {site.phone}</a>
            </div>
          </div>
          <Frame tone="dark" offset="br" className="hero-up d2 order-first aspect-[4/3] lg:order-none">
            <Image src="/photos/student-wiring-robot-car-school-program.jpg" alt="High school students wiring robot cars during a RoboFlight school session" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          </Frame>
        </div>
      </section>

      <section className="bg-white py-28 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="anim-up section-label">What schools get</p>
          <h2 className="t-h2 anim-up d1 mt-5 max-w-2xl text-[#0f172a]">Everything included, <span className="text-[#2563eb]">nothing to buy.</span></h2>
          <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {offer.map(({ Icon, t, d }, i) => (
              <div key={t} className={`anim-up d${i + 1} flex gap-5`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                <div>
                  <h3 className="t-h3 text-[#0f172a]">{t}</h3>
                  <p className="t-body mt-2 text-slate-600">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand />
      <Schools />
      <Footer />
      <RevealObserver />
    </main>
  );
}
