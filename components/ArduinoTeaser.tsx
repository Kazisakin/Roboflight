import Link from "next/link";
import { Code2, Package, Trophy, Wrench } from "lucide-react";
import { Arrow, linkBrand } from "@/components/ui";

const steps = [
  { Icon: Package, title: "Gather parts",    description: "Unbox the kit — Arduino Uno, L298N motor driver, DC motors, wheels and chassis." },
  { Icon: Wrench, title: "Build & wire",    description: "Assemble the chassis, mount the motors, and wire every connection on the board." },
  { Icon: Code2, title: "Upload code",     description: "Write real Arduino code, upload it, and watch the robot respond for the first time." },
  { Icon: Trophy, title: "Drive & compete", description: "Test, tune, and take your robot into the ring against your classmates." },
];

export default function ArduinoTeaser() {
  return (
    <section className="bg-white py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="anim-up section-label">How a build works</p>
            <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
              From first wire
              <br />
              to <span className="text-[#2563eb]">first drive.</span>
            </h2>
            <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
              Four stages, one goal: a working robot car your child built and coded themselves. Try every step in our interactive builder.
            </p>
          </div>
          <Link href="/build" className={`anim-up d2 ${linkBrand}`}>Open the robot builder <Arrow /></Link>
        </div>

        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className={`anim-up d${i + 1} relative`}>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-12 top-6 hidden h-px w-[calc(100%-3rem)] bg-slate-200 lg:block" />
              )}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#2563eb]">
                <s.Icon className="h-5 w-5" aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2563eb] text-[9px] font-bold text-white">{i + 1}</span>
              </div>
              <h3 className="t-h3 mt-6 text-[#0f172a]">{s.title}</h3>
              <p className="mt-3 t-body text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
