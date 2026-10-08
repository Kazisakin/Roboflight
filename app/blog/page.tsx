import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { Arrow } from "@/components/ui";
import { articles } from "@/lib/blog";
import { pageMeta } from "@/lib/meta";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kids Robotics & STEM Guides for Parents | RoboFlight",
  description: "Practical guides for Fredericton parents: when kids can start robotics, what Arduino is, and how to choose a STEM after-school program.",
  path: "/blog",
  image: "/og/blog.jpg",
});

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" });

export default function BlogIndex() {
  return (
    <main className="overflow-x-clip bg-white">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Parent guides", path: "/blog" }])} />
      <Navbar />
      <section className="border-b border-slate-200 bg-slate-50 pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">Parent guides</p>
          <h1 className="t-display mt-5 max-w-3xl text-[#0f172a]">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Robotics &amp; STEM tips for Fredericton families</span>
            Learn what your
            <br />
            <span className="text-[#2563eb]">kid will build.</span>
          </h1>
        </div>
      </section>
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {articles.map((a, i) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className={`anim-up d${i + 1} group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-[#2563eb]/40`}>
              <div className="relative aspect-[16/10] bg-[#0a1530]">
                <Image src={a.image} alt={a.imageAlt} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500"><time dateTime={a.published}>{fmt(a.published)}</time></p>
                <h2 className="t-h3 mt-3 text-[#0f172a] group-hover:text-[#2563eb]">{a.title}</h2>
                <p className="t-body mt-3 flex-1 text-slate-600">{a.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb]">Read the guide <Arrow className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
      <RevealObserver />
    </main>
  );
}
