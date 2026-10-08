import { Award, GraduationCap, Layers, Wrench } from "lucide-react";

const features = [
  { Icon: Layers, title: "All in one",         description: "Coding, electronics, and robotics in one program — no juggling multiple courses." },
  { Icon: Wrench, title: "Hands-on building",  description: "Students build real drones, robots, and RC planes they actually take home." },
  { Icon: GraduationCap, title: "Expert instructor",  description: "Learn from a Masters student in Electrical Engineering with a passion for robotics." },
  { Icon: Award, title: "Proven results",     description: "5+ years inspiring 100+ students across New Brunswick with real, measurable outcomes." },
];

export default function Features() {
  return (
    <section className="bg-white py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="anim-up section-label">Why RoboFlight</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            Built for young
            <br />
            <span className="text-[#2563eb]">innovators.</span>
          </h2>
          <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
            Every program we run is held to the same four standards — so every session is exciting, challenging, and rewarding.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={f.title} className={`anim-up d${i + 1} group`}>
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
                  <f.Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="t-h3 mt-6 text-[#0f172a]">{f.title}</h3>
              <p className="mt-4 t-body text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
