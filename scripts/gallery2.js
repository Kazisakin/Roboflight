const fs = require('fs');

// Layout from screenshot: 3-column grid
// Col 1: 2 stacked images | Col 2: 1 tall image (row-span-2) | Col 3: 2 stacked images
// All images have large rounded corners

const gallery = `"use client";

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
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-full object-contain bg-black"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
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

export default function Gallery() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const imgClass = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500";

  const card = (img: typeof images[0], delay: number, extraClass?: string) => (
    <div
      className={\`relative rounded-3xl overflow-hidden cursor-zoom-in group shadow-xl transition-all duration-700 \${extraClass ?? ""} \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
      style={{ transitionDelay: \`\${delay}ms\` }}
      onClick={() => setLightbox(img)}
    >
      <Image src={img.src} alt={img.alt} fill className={imgClass} sizes="(max-width: 768px) 50vw, 33vw" />
      <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/25 transition-colors duration-300 rounded-3xl" />
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-blue-700 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <h2 className={\`text-2xl sm:text-3xl font-black text-white mb-4 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            We teach children how to{" "}
            <span className="text-cyan-300">build and program robots</span>
          </h2>
          <p className={\`text-blue-100 text-sm max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things.
          </p>
        </div>

        {/* Collage grid: 3 cols, 2 rows — center image spans both rows */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[560px]">
          {/* Col 1 top */}
          {card(images[0], 100, "col-start-1 row-start-1")}
          {/* Col 1 bottom */}
          {card(images[3], 260, "col-start-1 row-start-2")}
          {/* Col 2 — tall center, spans both rows */}
          {card(images[2], 180, "col-start-2 row-start-1 row-span-2")}
          {/* Col 3 top */}
          {card(images[1], 200, "col-start-3 row-start-1")}
          {/* Col 3 bottom */}
          {card(images[4], 320, "col-start-3 row-start-2")}
        </div>

        <p className="text-center text-blue-200 text-xs mt-8">
          Real students, real projects — across New Brunswick schools.
        </p>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
`;

fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Gallery.tsx', gallery, 'utf8');
console.log('Gallery done');
