"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Slide = { src: string; alt: string; caption?: string };

/** Auto-advancing crossfade slideshow. Pauses on hover; dots to jump. */
export default function Slideshow({ slides, interval = 4500, priority = false, sizes = "(max-width: 1024px) 100vw, 50vw", showCaption = true }:
  { slides: Slide[]; interval?: number; priority?: boolean; sizes?: string; showCaption?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [i, paused, interval, slides.length]);

  return (
    <div className="absolute inset-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, n) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes={sizes}
          priority={priority && n === 0}
          className={`object-cover transition-all duration-[1200ms] ease-out ${n === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a1530]/80 to-transparent" />
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
        {showCaption && slides[i].caption ? (
          <p className="text-xs font-medium text-white/90" aria-live="polite">{slides[i].caption}</p>
        ) : <span />}
        <div className="flex shrink-0 gap-1.5">
          {slides.map((s, n) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show photo ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${n === i ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
