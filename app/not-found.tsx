import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a1530] px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#fbbf24]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fbbf24]">404 — Page not found</span>
          <span className="h-px w-10 bg-[#fbbf24]" />
        </div>
        <h1 className="t-display mt-6 text-white">
          Lost in<br /><span className="text-[#38bdf8]">space.</span>
        </h1>
        <p className="mt-6 text-base text-slate-300">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
          Back to home
        </Link>
      </div>
    </div>
  );
}
