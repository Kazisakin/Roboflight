import Image from "next/image";
import { MapPin } from "lucide-react";

const schools = [
  { name: "McAdam High School", location: "McAdam, NB",      description: "Bringing robotics and drone education to students in the McAdam community.", logo: "/mcadam-school.png", dark: false },
  { name: "Harvey High School", location: "Harvey, NB",      description: "Empowering Harvey students with hands-on coding and electronics skills.",      logo: "/harvey-school.jpeg", dark: false },
  { name: "RoboFlight UNB",     location: "Fredericton, NB", description: "University of New Brunswick campus hub for advanced robotics and innovation.",  logo: "/unb_logo_white.png", dark: true },
];

export default function Schools() {
  return (
    <section className="bg-white py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="anim-up section-label">Where we teach</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            Partner schools
            <br />
            across <span className="text-[#2563eb]">New Brunswick.</span>
          </h2>
          <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
            RoboFlight is active in schools across the province, bringing STEM education where it matters most.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {schools.map((s, i) => (
            <article key={s.name} className={`anim-up d${i + 1} flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-[#2563eb]/40`}>
              <div className="flex items-center justify-between">
                <div className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border ${s.dark ? "border-[#0a1530] bg-[#0a1530]" : "border-slate-200 bg-white"}`}>
                  <div className="relative h-10 w-10">
                    <Image src={s.logo} alt={`${s.name} logo`} fill className="object-contain" sizes="40px" unoptimized />
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                </span>
              </div>
              <h3 className="t-h3 mt-6 text-[#0f172a]">{s.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><MapPin className="h-3.5 w-3.5 text-[#2563eb]" aria-hidden="true" />{s.location}</p>
              <p className="mt-4 t-body text-slate-600">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
