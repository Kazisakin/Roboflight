import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ProgramIcon, { accentCls } from "@/components/ProgramIcon";
import { Arrow, btnPrimary } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { programs } from "@/lib/programs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { fmtTime, hours, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Parent FAQ: Kids Robotics Classes in Fredericton | RoboFlight",
  description: "Ages, kits, schedules and free trial classes — answers to parents' questions about RoboFlight robotics, drone and RC plane classes in Fredericton.",
  path: "/faq",
  image: "/og/faq.jpg",
});

const weekdays = hours.slice(1, 6);
const sameWeekdays = weekdays.every((h) => h.open === weekdays[0].open && h.close === weekdays[0].close);
const hoursText = [
  ...(sameWeekdays && weekdays[0].open && weekdays[0].close ? [`Monday to Friday ${fmtTime(weekdays[0].open)}–${fmtTime(weekdays[0].close)}`] : []),
  ...[6, 0].map((i) => hours[i]).map((h) => (h.open && h.close ? `${h.day} ${fmtTime(h.open)}–${fmtTime(h.close)}` : `${h.day} closed`)),
].join("; ");

const general = [
  { q: "Where is RoboFlight?", a: `${site.address.full}. Free classes and all weekly programs run there.` },
  { q: "What are your hours?", a: `${hoursText}.` },
  { q: "How do I book a free trial class?", a: `Book online at roboflight.ca/book in under a minute — pick a program, a day and a time — or call ${site.phone}.` },
  { q: "Is the first class really free?", a: "Yes. The trial class is free with no obligation and no payment details needed." },
  { q: "Which program should my child start with?", a: `Most students start with Basic Robotics (${programs[0].ages.toLowerCase()}). Quadcopter Drone is ${programs[1].ages.toLowerCase()} and RC Plane Making is ${programs[2].ages.toLowerCase()}. Not sure? Choose "Not sure yet" when booking and we'll help.` },
  { q: "Who teaches the classes?", a: "Classes are led by RoboFlight's founder, a Masters student in Electrical Engineering at the University of New Brunswick with a lifelong passion for robotics." },
  { q: "Do you run programs in schools?", a: "Yes. RoboFlight runs curriculum-aligned sessions with McAdam High School, Harvey High School and at UNB. See our schools page or contact us to bring a program to your school." },
  { q: "Does my child need experience or their own laptop?", a: "No experience is needed, and a training kit and tools are provided for every student." },
];

function QA({ q, a }: { q: string; a: string }) {
  return (
    <details className="group py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
        <h3 className="t-h3 text-[#0f172a]">{q}</h3>
        <ChevronDown className="h-5 w-5 shrink-0 text-[#2563eb] transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <p className="t-body mt-3 max-w-2xl text-slate-600">{a}</p>
    </details>
  );
}

export default function FaqPage() {
  const seen = new Set(general.map((g) => g.q));
  const programFaqs = programs.flatMap((p) => p.faqs).filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true)));
  return (
    <main className="overflow-x-clip bg-white">
      <JsonLd data={[faqSchema([...general, ...programFaqs]), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <Navbar />
      <section className="border-b border-slate-200 bg-slate-50 pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">Parent FAQ</p>
          <h1 className="t-display mt-5 max-w-3xl text-[#0f172a]">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Kids robotics classes in Fredericton</span>
            Questions parents
            <br />
            <span className="text-[#2563eb]">ask us most.</span>
          </h1>
          <p className="t-lead mt-6 max-w-xl text-slate-600">
            Can&apos;t find your answer? Call <a href={site.phoneHref} className="font-semibold text-[#2563eb]">{site.phone}</a> or email <a href={`mailto:${site.email}`} className="font-semibold text-[#2563eb]">{site.email}</a>.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="t-h2 text-[#0f172a]">General</h2>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {general.map((f) => <QA key={f.q} {...f} />)}
          </div>

          {programs.map((p) => (
            <div key={p.slug} id={p.slug} className="mt-20 scroll-mt-32">
              <div className="flex flex-wrap items-center gap-4">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentCls[p.accent].tile}`}>
                  <ProgramIcon name={p.icon} className="h-6 w-6" />
                </span>
                <h2 className="t-h2 text-[#0f172a]">{p.title}</h2>
                <span className={`text-xs font-bold uppercase tracking-[0.16em] ${accentCls[p.accent].age}`}>{p.ages}</span>
              </div>
              <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {p.faqs.map((f) => <QA key={f.q} {...f} />)}
              </div>
              <Link href={`/programs/${p.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb]">
                About {p.title} <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}

          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#0a1530] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="t-h3 text-white">The best answer is a free class.</p>
              <p className="t-body mt-2 text-slate-300">Come see the workshop, meet the instructor and build something.</p>
            </div>
            <Link href="/book" className={btnPrimary}>Book a free class <Arrow /></Link>
          </div>
        </div>
      </section>
      <Footer />
      <RevealObserver />
    </main>
  );
}
