/* Small shared presentational helpers */

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Eyebrow for dark/photo sections: amber rule + label. */
export function DarkEyebrow({ children, center = false, className = "" }: { children: React.ReactNode; center?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} ${className}`}>
      <span className="h-px w-10 bg-[#fbbf24]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fbbf24]">{children}</span>
      {center && <span className="h-px w-10 bg-[#fbbf24]" />}
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]";
export const btnGhostDark =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/[0.08]";
export const linkBrand =
  "inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#2563eb] transition-all hover:gap-2.5";
