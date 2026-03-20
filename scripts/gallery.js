const fs = require('fs');

const gallery = `"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const images = [
  { src: "/gallery-1.jpg",  alt: "Students working on robotics projects", span: "col-span-2 row-span-2" },
  { src: "/gallery-5.jpg",  alt: "Hands-on robotics session at school",   span: "col-span-1 row-span-1" },
  { src: "/gallery-8.jpg",  alt: "Student concentrating on circuitry",    span: "col-span-1 row-span-1" },
  { src: "/gallery-9.jpg",  alt: "Group session building robot components", span: "col-span-1 row-span-2" },
  { src: "/gallery-10.jpg", alt: "Students testing their completed robot", span: "col-span-1 row-span-1" },
  { src: "/gallery-11.jpg", alt: "Classroom coding and electronics",       span: "col-span-1 row-span-1" },
  { src: "/gallery-12.jpg", alt: "Instructor guiding students",            span: "col-span-2 row-span-1" },
  { src: "/gallery-13.jpg", alt: "Students celebrating robot builds",      span: "col-span-1 row-span-1" },
];

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <Image src={src} alt={alt} width={1200} height={800} className="w-full h-full object-contain bg-black" sizes="(max-width: 768px) 100vw, 80vw" />
        <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors cursor-pointer" aria-label="Close">
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

  return (
    <section className="py-20 bg-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref} className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-white/10 text-cyan-300 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 border border-white/15">
            In the Classroom
          </span>
          <h2 className={\`text-2xl sm:text-3xl font-black text-white mb-3 transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            We teach children how to{" "}
            <span className="text-cyan-400">build and program robots</span>
          </h2>
          <p className={\`text-blue-300 text-sm max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-100 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}>
            Students stay engaged in a process that fosters resilience, problem-solving, and a passion for doing hard things.
          </p>
        </div>

        {/* Collage grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[520px]">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={\`\${img.span} relative rounded-2xl overflow-hidden cursor-zoom-in group transition-all duration-700 \${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}\`}
              style={{ transitionDelay: \`\${i * 80 + 100}ms\` }}
              onClick={() => setLightbox(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-blue-400 text-xs mt-8">Real students, real projects — across New Brunswick schools.</p>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  );
}
`;

fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/components/Gallery.tsx', gallery, 'utf8');
console.log('Gallery done');
