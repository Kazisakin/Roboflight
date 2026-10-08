import Image from "next/image";
import { Code2, Cpu, Wrench } from "lucide-react";
import Frame from "@/components/Frame";
import { DarkEyebrow } from "@/components/ui";

/** Navy band: headline + icon list on one side, framed photo collage on the other. */
export default function PhotoBand({
  image, image2, eyebrow, line1, line2, body,
}: { image: string; image2: string; eyebrow: string; line1: string; line2: string; body?: string }) {
  const points = [
    { Icon: Wrench, t: "Build", d: "Assemble chassis, motors and wheels by hand." },
    { Icon: Cpu, t: "Wire", d: "Connect boards, drivers and sensors on real circuits." },
    { Icon: Code2, t: "Code", d: "Write Arduino code and watch it come alive." },
  ];
  return (
    <section className="relative overflow-hidden bg-[#0a1530] py-28 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <Frame tone="dark" offset="bl" className="anim-up aspect-[4/3] w-[88%]">
            <Image src={image} alt="Students driving their robot cars in the competition ring" fill className="object-cover" sizes="(max-width: 1024px) 90vw, 45vw" />
          </Frame>
          <div className="anim-up d2 absolute -bottom-10 right-0 w-[44%]">
            <Frame tone="dark" offset="tr" className="aspect-square">
              <Image src={image2} alt="Students assembling electronics from their kits" fill className="object-cover" sizes="(max-width: 1024px) 45vw, 22vw" />
            </Frame>
          </div>
        </div>

        <div>
          <DarkEyebrow className="anim-up">{eyebrow}</DarkEyebrow>
          <h2 className="t-h2 anim-up d1 mt-6 text-white">
            {line1}
            <br />
            <span className="text-[#38bdf8]">{line2}</span>
          </h2>
          {body && <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-300">{body}</p>}
          <ul className="mt-10 space-y-5">
            {points.map(({ Icon, t, d }, i) => (
              <li key={t} className={`anim-up d${i + 2} flex items-start gap-4`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] ring-1 ring-[#38bdf8]/25">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-white">{t}</span>
                  <span className="mt-0.5 block text-sm text-slate-300">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
