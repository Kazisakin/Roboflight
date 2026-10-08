import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramIcon, { accentCls } from "@/components/ProgramIcon";
import { Arrow, btnPrimary } from "@/components/ui";
import { articles, getArticle, type Block } from "@/lib/blog";
import { pageMeta } from "@/lib/meta";
import { programs } from "@/lib/programs";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const m = pageMeta({ title: a.title.length > 46 ? a.title : `${a.title} | RoboFlight`, description: a.description, path: `/blog/${a.slug}`, image: `/og/blog-${a.slug}.jpg` });
  return { ...m, openGraph: { ...m.openGraph, type: "article", publishedTime: a.published, modifiedTime: a.updated } };
}

/** Swap {{ages:slug}} for the program's current age rule. */
const fill = (t: string) => t.replace(/\{\{ages:([a-z-]+)\}\}/g, (_, slug: string) => programs.find((p) => p.slug === slug)?.ages.toLowerCase() ?? "");
const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" });
const words = (body: Block[]) => body.reduce((n, b) => n + (b.type === "list" ? b.items.join(" ") : b.text).split(/\s+/).length, 0);

function renderBlock(b: Block, i: number) {
  if (b.type === "h2") return <h2 key={i} className="t-h2 mt-14 text-[#0f172a]" style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)" }}>{b.text}</h2>;
  if (b.type === "list") return (
    <ul key={i} className="mt-6 space-y-3">
      {b.items.map((it) => (
        <li key={it} className="flex gap-3 text-[1.0625rem] leading-[1.75] text-slate-700">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />{fill(it)}
        </li>
      ))}
    </ul>
  );
  if (b.type === "tip") return (
    <aside key={i} className="mt-8 flex gap-4 rounded-2xl border border-[#2563eb]/20 bg-[#2563eb]/[0.05] p-6">
      <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#2563eb]" aria-hidden="true" />
      <p className="text-[1.0625rem] leading-[1.7] text-[#0f172a]">{fill(b.text)}</p>
    </aside>
  );
  return <p key={i} className="mt-6 text-[1.0625rem] leading-[1.8] text-slate-700 sm:text-lg">{fill(b.text)}</p>;
}

export default async function ArticlePage({ params }: Params) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const related = programs.filter((p) => a.related.includes(p.slug));
  const more = articles.filter((x) => x.slug !== a.slug);
  const minutes = Math.max(3, Math.round(words(a.body) / 220));

  return (
    <main className="overflow-x-clip bg-white">
      <JsonLd data={[
        articleSchema({ ...a, image: a.image }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Parent guides", path: "/blog" }, { name: a.title, path: `/blog/${a.slug}` }]),
      ]} />
      <Navbar />
      <article>
        <header className="bg-slate-50 pb-12 pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-[#2563eb]">Home</Link><span>/</span>
              <Link href="/blog" className="hover:text-[#2563eb]">Parent guides</Link>
            </nav>
            <h1 className="t-display text-[#0f172a]" style={{ fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)" }}>{a.title}</h1>
            <p className="t-lead mt-6 text-slate-600">{a.description}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              RoboFlight · <time dateTime={a.published}>{fmt(a.published)}</time> · {minutes} min read
            </p>
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-3xl bg-[#0a1530]">
            <Image src={a.image} alt={a.imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 900px" />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          {a.body.map(renderBlock)}

          {/* Related programs */}
          <div className="mt-16 rounded-3xl bg-[#0a1530] p-8 sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#fbbf24]">Programs in Fredericton</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/programs/${p.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.1]">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentCls[p.accent].tileDark}`}><ProgramIcon name={p.icon} className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{p.title}</span>
                    <span className="block text-xs text-slate-300">{p.ages}</span>
                  </span>
                </Link>
              ))}
            </div>
            <Link href={related[0] ? `/book?program=${related[0].slug}` : "/book"} className={`${btnPrimary} mt-8`}>Book a free class <Arrow /></Link>
          </div>
        </div>
      </article>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="t-h3 text-[#0f172a]">More parent guides</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((m) => (
              <Link key={m.slug} href={`/blog/${m.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#2563eb]/40">
                <p className="t-h3 text-[#0f172a] group-hover:text-[#2563eb]">{m.title}</p>
                <p className="t-body mt-2 text-slate-600">{m.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
