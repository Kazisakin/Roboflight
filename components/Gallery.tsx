"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  { src: "/photos/kids-robot-car-kit-robotics-class.jpg",  alt: "Students smiling with their robot car kit",          span: "col-span-2 md:row-span-2" },
  { src: "/photos/girl-driving-robot-car.jpg", alt: "A student driving her robot car in the library",     span: "row-span-2" },
  { src: "/photos/kids-thumbs-up-robotics-class-fredericton.jpg",  alt: "Students giving a thumbs up during a session",       span: "" },
  { src: "/photos/university-students-building-robots-fredericton.jpg",  alt: "University students building robots together",       span: "" },
  { src: "/photos/robot-car-competition-kids.jpg", alt: "Students driving robot cars in the competition ring", span: "col-span-2" },
  { src: "/photos/student-wiring-robot-car-school-program.jpg",  alt: "A student wiring a robot car in class",              span: "col-span-2" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="gallery" className="scroll-mt-32 border-t border-slate-200 bg-slate-50 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="anim-up section-label">In the classroom</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            Real students.
            <br />
            <span className="text-[#2563eb]">Real projects.</span>
          </h2>
          <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
            Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things.
          </p>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpen(i)}
              className={`anim-up d${(i % 4) + 1} group relative cursor-zoom-in overflow-hidden rounded-2xl bg-[#0a1530] ${img.span}`}
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-[#0a1530]/0 transition group-hover:bg-[#0a1530]/20" />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0a1530]/95 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[open].src} alt={images[open].alt} fill className="object-contain" sizes="90vw" />
          </div>
          <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-slate-400">{images[open].alt} · {open + 1} / {images.length}</p>
        </div>
      )}
    </section>
  );
}
