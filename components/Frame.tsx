/**
 * Photo frame: an inset "mat" border plus an offset outline behind it.
 * `tone="dark"` for navy sections, `light` for white/slate sections.
 */
export default function Frame({
  children, tone = "light", className = "", offset = "br",
}: { children: React.ReactNode; tone?: "light" | "dark"; className?: string; offset?: "br" | "bl" | "tr" | "tl" }) {
  const pos = { br: "translate-x-4 translate-y-4", bl: "-translate-x-4 translate-y-4", tr: "translate-x-4 -translate-y-4", tl: "-translate-x-4 -translate-y-4" }[offset];
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 rounded-[28px] border-2 ${pos} ${tone === "dark" ? "border-[#38bdf8]/40" : "border-[#2563eb]/25"}`} />
      <div className={`relative h-full rounded-[28px] p-2 ${tone === "dark" ? "bg-white/10 ring-1 ring-white/15 backdrop-blur" : "bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200"}`}>
        <div className="relative h-full overflow-hidden rounded-[22px] bg-[#0a1530]">{children}</div>
      </div>
    </div>
  );
}
