import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Book a Free Robotics Class in Fredericton | RoboFlight",
  description: "Pick a program, day and time for a free, no-obligation trial class at RoboFlight, 50 Crowther Ln, Fredericton. Takes under a minute.",
  path: "/book",
  image: "/og/book.jpg",
});

export default function BookPage() {
  return (
    <main className="overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="border-b border-slate-200 bg-white pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">Free trial class</p>
          <h1 className="t-display mt-5 max-w-3xl text-[#0f172a]">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Free trial robotics class · Fredericton, NB</span>
            Book a free class
            <br />
            <span className="text-[#2563eb]">in under a minute.</span>
          </h1>
          <p className="mt-6 max-w-xl t-lead text-slate-600">
            Choose a program, pick a day and time, and tell us who&apos;s coming. No payment, no obligation — just come build something.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">
            {["100% free", site.trialLength, "All materials provided", `${site.address.city}, ${site.address.region}`].map((t) => (
              <span key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />{t}</span>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <Suspense fallback={<p className="text-slate-500">Loading booking form…</p>}>
          <BookingForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
