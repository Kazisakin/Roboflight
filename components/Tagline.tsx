"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Gamepad2, Pause, Play } from "lucide-react";
import Frame from "@/components/Frame";
import { DarkEyebrow, btnPrimary } from "@/components/ui";
import { track } from "@/lib/track";

// Free stock footage from Pexels (pexels.com/license) — kids building a robot car.
const VIDEO = "https://videos.pexels.com/video-files/7868197/7868197-hd_1280_720_25fps.mp4";
const VIDEO_SD = "https://videos.pexels.com/video-files/7868197/7868197-sd_960_540_25fps.mp4";
const POSTER = "https://images.pexels.com/videos/7868197/diversity-diy-futuristic-multiethnic-7868197.jpeg?auto=compress&cs=tinysrgb&w=1280";
const KIDS_PHOTO = "https://images.pexels.com/videos/7868253/caucasian-girl-diy-futuristic-project-7868253.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function Tagline() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Load and play only when the video scrolls into view (saves data on mobile, faster page load).
  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.play().then(() => setPlaying(true)).catch(() => {}); }
      else if (!v.paused) { v.pause(); setPlaying(false); }
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); track("video_play", { video: "promise" }); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="promise" className="relative scroll-mt-32 overflow-hidden border-t border-white/10 bg-[#0a1530] py-28 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <div>
          <DarkEyebrow className="anim-up">Our promise</DarkEyebrow>
          <h2 className="t-h2 anim-up d1 mt-6 text-white">
            Build it. Code it.
            <br />
            <span className="text-[#38bdf8]">Watch it take flight.</span>
            <br />
            Every child an innovator.
          </h2>
          <p className="anim-up d2 mt-7 max-w-md t-lead text-slate-300">
            Kids learn best with their hands busy and their imagination switched on. That&apos;s every RoboFlight class.
          </p>
          <div className="anim-up d3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className={`${btnPrimary} px-8 py-4`}>Book a free class <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/build" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/[0.05]">
              <Gamepad2 className="h-4 w-4" aria-hidden="true" /> Try the robot builder
            </Link>
          </div>
        </div>

        <div className="anim-up d2 relative order-first pb-14 sm:pb-0 lg:order-none">
          <Frame tone="dark" offset="br" className="aspect-video">
            <video
              ref={ref}
              className="absolute inset-0 h-full w-full object-cover"
              poster={POSTER}
              muted
              loop
              playsInline
              preload="none"
              aria-label="Kids building and testing a robot car together"
            >
              <source src={VIDEO} type="video/mp4" media="(min-width: 768px)" />
              <source src={VIDEO_SD} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute bottom-4 left-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#0a1530] shadow-lg transition hover:bg-white"
            >
              {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />}
            </button>
          </Frame>

          {/* Kids photo inset */}
          <div className="absolute -bottom-6 right-4 w-[32%] sm:-bottom-16 sm:-right-4 lg:-right-8">
            <Frame tone="dark" offset="tl" className="aspect-[4/5]">
              <Image src={KIDS_PHOTO} alt="A girl building her own robot car" fill className="object-cover" sizes="(max-width: 1024px) 38vw, 18vw" />
            </Frame>
          </div>
        </div>
      </div>
    </section>
  );
}
