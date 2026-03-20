"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const images = [
  { src: "/gallery-1.jpg",  alt: "Instructor guiding students on robotics" },
  { src: "/gallery-5.jpg",  alt: "Hands-on robotics session" },
  { src: "/gallery-9.jpg",  alt: "Students building robot components" },
  { src: "/gallery-10.jpg", alt: "Wide classroom robotics session" },
  { src: "/gallery-11.jpg", alt: "Students working on electronics" },
];

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} width={1200} height={800} className="w-full h-full object-contain bg-black" sizes="(max-width: 768px) 100vw, 80vw" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Card({ img, delay, isInView, onClick, extraClass }: { img: typeof images[0]; delay: number; isInView: boolean; onClick: () => void; extraClass?: string }) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden cursor-zoom-in group shadow-xl transition-all duration-700 ${extraClass ?? ""} ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
      <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/25 transition-colors duration-300" />
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-blue-700 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-8 sm:mb-12">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 sm:mb-4 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            We teach children how to{" "}
            <span className="text-cyan-300">build and program robots</span>
          </h2>
          <p className={`text-blue-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things.
          </p>
        </div>

        {/* Mobile: 2-col grid stacked */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`relative rounded-2xl overflow-hidden cursor-zoom-in group shadow-lg h-40 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${i === 2 ? "col-span-2 h-48" : ""}`}
              style={{ transitionDelay: `${i * 80 + 100}ms` }}
              onClick={() => setLightbox(img)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Desktop: 3-col collage — center tall */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[500px] lg:h-[560px]">
          <Card img={images[0]} delay={100} isInView={isInView} onClick={() => setLightbox(images[0])} extraClass="col-start-1 row-start-1" />
          <Card img={images[3]} delay={260} isInView={isInView} onClick={() => setLightbox(images[3])} extraClass="col-start-1 row-start-2" />
          <Card img={images[2]} delay={180} isInView={isInView} onClick={() => setLightbox(images[2])} extraClass="col-start-2 row-start-1 row-span-2" />
          <Card img={images[1]} delay={200} isInView={isInView} onClick={() => setLightbox(images[1])} extraClass="col-start-3 row-start-1" />
          <Card img={images[4]} delay={320} isInView={isInView} onClick={() => setLightbox(images[4])} extraClass="col-start-3 row-start-2" />
        </div>

        <p className="text-center text-blue-200 text-xs mt-6 sm:mt-8">
          Real students, real projects — across New Brunswick schools.
        </p>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  );
}
