import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { Arrow, DarkEyebrow, btnGhostDark, btnPrimary } from "@/components/ui";
import { getProgram, programs } from "@/lib/programs";
import Frame from "@/components/Frame";
import Slideshow from "@/components/Slideshow";
import ProgramIcon, { accentCls } from "@/components/ProgramIcon";
import LearnIcon from "@/components/LearnIcon";
import { CalendarDays, CalendarRange, Check, Gift, Package, Phone, Rocket, Users } from "lucide-react";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";
import { articles } from "@/lib/blog";
import { JsonLd, breadcrumbSchema, courseSchema, faqSchema } from "@/lib/seo";
import { ChevronDown } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

/** Search titles/descriptions per program (keep titles under 60 chars, descriptions under 155). */
const seo: Record<string, { title: string; description: string; h1: string }> = {
  "basic-robotics": {
    title: "Kids Robotics & Arduino Class, Fredericton | RoboFlight",
    description: "Kids build and code their own Arduino robot car. Weekly hands-on robotics class in Fredericton, NB. Kit included. Free first class.",
    h1: "Kids robotics & Arduino class in Fredericton",
  },
  "quadcopter-drone": {
    title: "Drone Building Class for Kids, Fredericton | RoboFlight",
    description: "Kids build, wire and fly their own quadcopter drone, then take it home. Weekly class in Fredericton, NB. Try a free class.",
    h1: "Drone building class for kids in Fredericton",
  },
  "rc-plane-making": {
    title: "RC Plane Building Class for Teens, Fredericton | RoboFlight",
    description: "Design, build and fly a remote-controlled plane. Aeronautics, electronics and real flight in Fredericton, NB. Free trial class.",
    h1: "RC plane building class in Fredericton",
  },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProgram((await params).slug);
  if (!p) return {};
  const m = seo[p.slug];
  return pageMeta({ title: m.title, description: m.description, path: `/programs/${p.slug}`, image: `/og/${p.slug}.jpg` });
}

export default async function ProgramPage({ params }: Params) {
  const p = getProgram((await params).slug);
  if (!p) notFound();
  const others = programs.filter((o) => o.slug !== p.slug);
  const bookHref = `/book?program=${p.slug}`;

  return (
    <main className="overflow-x-clip">
      <JsonLd data={[
        courseSchema(p),
        faqSchema(p.faqs),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/#programs" }, { name: p.title, path: `/programs/${p.slug}` }]),
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a1530]">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[#2563eb]/25 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-40">
          <div>
            <nav aria-label="Breadcrumb" className="hero-up mb-8 flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="transition hover:text-white">Home</Link><span>/</span>
              <Link href="/#programs" className="transition hover:text-white">Programs</Link><span>/</span>
              <span className="text-slate-200">{p.title}</span>
            </nav>
            <div className="hero-up flex flex-wrap items-center gap-3">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentCls[p.accent].tileDark}`}>
                <ProgramIcon name={p.icon} className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-[#fbbf24] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1530]">{p.ages}</span>
              <span className="rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">{p.tag}</span>
            </div>
            <h1 className="t-display hero-up d1 mt-7 max-w-3xl text-white">
              <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">{seo[p.slug].h1}</span>
              {p.tagline[0]}
              <br />
              <span className="text-[#38bdf8]">{p.tagline[1]}</span>
            </h1>
            <p className="hero-up d2 mt-7 max-w-xl t-lead text-slate-300">{p.intro}</p>
            <div className="hero-up d3 mt-10 flex flex-wrap gap-3">
              <Link href={bookHref} className={btnPrimary}><CalendarDays className="h-4 w-4" aria-hidden="true" /> Book a free class</Link>
              <a href="#learn" className={btnGhostDark}>What you&apos;ll learn</a>
            </div>
          </div>
          <div className="hero-up d2 relative order-first mx-auto w-full max-w-[520px] lg:order-none lg:max-w-none">
            <Frame tone="dark" offset="br" className="aspect-[4/3] sm:aspect-square lg:aspect-[4/5]">
              <Slideshow priority slides={[{ src: p.hero, alt: p.heroAlt }, ...p.gallery]} showCaption={false} />
            </Frame>
            <div className="absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_rgba(10,21,48,0.35)] sm:-left-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]"><Rocket className="h-4 w-4" aria-hidden="true" /></span>
              <span>
                <span className="block text-[11px] text-slate-500">You&apos;ll build</span>
                <span className="block max-w-[180px] text-xs font-semibold leading-snug text-[#0f172a]">{p.build}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { Icon: Users, k: "Age requirement", v: p.ages },
            { Icon: CalendarRange, k: "Schedule", v: "1 session per week" },
            { Icon: Package, k: "Materials", v: "Training kit provided" },
            { Icon: Gift, k: "First class", v: "Free trial — no obligation" },
          ].map((f, i) => (
            <div key={f.k} className={`anim-up d${i + 1} pr-4 ${i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}`}>
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]"><f.Icon className="h-5 w-5" aria-hidden="true" /></span>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{f.k}</p>
              <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[#0f172a]">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section id="learn" className="scroll-mt-32 bg-white py-28 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="anim-up section-label">What you&apos;ll learn</p>
            <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
              Real skills,
              <br />
              <span className="text-[#2563eb]">built by hand.</span>
            </h2>
          </div>
          <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {p.learn.map((l, i) => (
              <div key={l.title} className={`anim-up d${i + 1} group`}>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
                    <LearnIcon name={l.icon} className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-h3 mt-6 text-[#0f172a]">{l.title}</h3>
                <p className="mt-4 t-body text-slate-600">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-white pb-28 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {p.gallery.map((g, i) => (
            <div key={g.src} className={`anim-up d${i + 1} relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0a1530]`}>
              <Image src={g.src} alt={g.alt} fill className="object-cover transition duration-700 hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="border-t border-slate-200 bg-slate-50 py-28 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="anim-up section-label">The journey</p>
              <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
                From first session
                <br />
                to <span className="text-[#2563eb]">finished build.</span>
              </h2>
            </div>
            <ul className="anim-up d2 grid gap-3 sm:grid-cols-2">
              {p.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white"><Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /></span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((m, i) => (
              <li key={m.title} className={`anim-up d${(i % 3) + 1} rounded-2xl border border-slate-200 bg-white p-7`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-xs font-semibold text-[#2563eb]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-6 text-[#0f172a]">{m.title}</h3>
                <p className="mt-2 t-body text-slate-600">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 bg-white py-28 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-8">
          <div>
            <p className="anim-up section-label">Parent questions</p>
            <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
              {p.title}
              <br />
              <span className="text-[#2563eb]">FAQ.</span>
            </h2>
            <p className="t-lead anim-up d2 mt-6 max-w-md text-slate-600">
              Something else on your mind? Call <a href={site.phoneHref} className="font-semibold text-[#2563eb]">{site.phone}</a> or see the <Link href="/faq" className="font-semibold text-[#2563eb]">full FAQ</Link>.
            </p>
            <ul className="anim-up d3 mt-8 space-y-3">
              {articles.filter((a) => a.related.includes(p.slug)).map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="group inline-flex items-start gap-2 text-sm font-semibold text-[#0f172a] hover:text-[#2563eb]">
                    <Arrow className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" /> {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="anim-up d2 divide-y divide-slate-200 border-y border-slate-200">
            {p.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <h3 className="t-h3 text-[#0f172a]">{f.q}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#2563eb] transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="t-body mt-3 max-w-xl text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-[#0a1530]">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#2563eb]/25 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
          <DarkEyebrow center className="anim-up">Free trial class</DarkEyebrow>
          <h2 className="t-h2 anim-up d1 mt-6 text-white">
            Try {p.title}
            <br />
            <span className="text-[#38bdf8]">on us.</span>
          </h2>
          <p className="anim-up d2 mx-auto mt-7 max-w-xl t-lead text-slate-300">
            {p.ages}. Pick a day and time that suits you. {site.trialLength}, hands-on, at {site.address.line1}, {site.address.city}.
          </p>
          <div className="anim-up d3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={bookHref} className={`${btnPrimary} px-8 py-4`}><CalendarDays className="h-4 w-4" aria-hidden="true" /> Book a free class</Link>
            <a href={site.phoneHref} className={`${btnGhostDark} px-8 py-4`}><Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Other programs */}
      <section className="bg-white py-28 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="anim-up section-label">Explore more</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            Other <span className="text-[#2563eb]">programs.</span>
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {others.map((o, i) => (
              <Link key={o.slug} href={`/programs/${o.slug}`} className={`anim-up d${i + 1} group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-[#0a1530]`}>
                <Image src={o.hero} alt={o.heroAlt} fill className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.05]" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1530] via-[#0a1530]/40 to-transparent" />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#fbbf24]"><ProgramIcon name={o.icon} className="h-4 w-4" /> {o.tag} · {o.ages}</p>
                  <h3 className="t-h3 mt-2 text-white">{o.title}</h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/75">{o.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] transition-all group-hover:gap-2.5">View program <Arrow className="h-3 w-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <RevealObserver />
    </main>
  );
}
