const fs = require('fs');
const path = require('path');

// Read existing page and prepend the ad overlay + cookie logic
const existing = fs.readFileSync(path.join(__dirname, '..', 'app', 'build', 'page.tsx'), 'utf8');

// We'll insert the AdGate component before the BuildPage export and modify BuildPage
const adComponent = `
// ─── Cookie helpers ───────────────────────────────────────────────────────────
const COOKIE = "rf_trial_used";
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find(r => r.startsWith(name + "="))?.split("=")[1] ?? null;
}
function setCookie(name: string, days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = \`\${name}=1; expires=\${exp}; path=/; SameSite=Lax\`;
}

// ─── Ad Gate Modal ────────────────────────────────────────────────────────────
function AdGate({ onContinue, locked }: { onContinue: () => void; locked: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(2,8,23,0.88)", backdropFilter: "blur(12px)" }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: "linear-gradient(160deg,#0f172a 0%,#0d1f3c 100%)" }}>
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4,#2563eb)" }} />

        <div className="px-7 py-7">
          {/* Logo row */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5l1.196 1.196c.78.78.22 2.122-.874 2.122H3.878c-1.094 0-1.654-1.342-.874-2.122L5 14.5" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">RoboFlight</p>
              <p className="text-white/40 text-xs mt-0.5">Robotics &amp; Coding Education</p>
            </div>
            <div className="ml-auto px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-wide">New Brunswick</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-white font-bold text-2xl sm:text-3xl leading-tight tracking-tight mb-2">
            Ready to Build{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#38bdf8,#06b6d4)" }}>
              Real Robots?
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            This is just a demo! In RoboFlight&apos;s real program, your child builds actual drones,
            robot cars, and RC planes — hands-on, in school, guided by experts.
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { val: "100+", label: "Students" },
              { val: "3",    label: "Schools" },
              { val: "NB",   label: "Province" },
            ].map(s => (
              <div key={s.label} className="text-center py-3 rounded-2xl bg-white/4 border border-white/6">
                <p className="text-cyan-400 font-bold text-xl leading-none">{s.val}</p>
                <p className="text-white/35 text-[11px] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Course pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["🔋 Arduino Robots","🚁 Quadcopter Drones","✈ RC Plane Making","💻 Coding Basics"].map(c => (
              <span key={c} className="px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-300 text-xs font-medium">{c}</span>
            ))}
          </div>

          {/* Primary CTA */}
          <a href="/#contact"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/30 cursor-pointer mb-3"
            style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}>
            Start Learning With Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Secondary — only if trial not exhausted */}
          {!locked ? (
            <button onClick={onContinue}
              className="w-full py-3 rounded-2xl border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 text-sm font-medium transition-all cursor-pointer">
              Continue Playing (trial mode)
            </button>
          ) : (
            <p className="text-center text-white/20 text-xs pt-1">
              Your free trial has ended. Enroll to keep building! 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
`;

// Replace the BuildPage export
const newBuildPage = `
// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BuildPage() {
  const [phase,   setPhase]   = useState<"build" | "drive">("build");
  const [showAd,  setShowAd]  = useState(false);
  const [locked,  setLocked]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount: check cookie — if used before, immediately lock
  useEffect(() => {
    if (getCookie(COOKIE)) {
      setShowAd(true);
      setLocked(true);
      return;
    }
    // First visit: show ad after 60 seconds
    timerRef.current = setTimeout(() => {
      setCookie(COOKIE, 7);
      setShowAd(true);
    }, 60_000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleContinue = () => {
    setShowAd(false);
    // After dismissing once, next visit is locked
    setCookie(COOKIE, 7);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#0f172a 0%,#0c1a2e 50%,#0f172a 100%)" }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-white/2 backdrop-blur-sm flex-shrink-0">
        <Link href="/" className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        <div className="flex items-center gap-2">
          {(["build", "drive"] as const).map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-px bg-white/10" />}
              <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all \${phase === p ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/20" : "text-white/20"}\`}>
                <span className={\`w-1.5 h-1.5 rounded-full \${phase === p ? "bg-cyan-400" : "bg-white/15"}\`} />
                {p}
              </div>
            </div>
          ))}
        </div>
        <span className="text-white/20 text-[10px] font-bold uppercase tracking-wide">Arduino Car</span>
      </div>

      {/* Game content */}
      <div className="flex-1 overflow-y-auto">
        {phase === "build"
          ? <BuildPhase onComplete={() => setPhase("drive")} />
          : <DrivePhase onReset={() => setPhase("build")} />}
      </div>

      {/* Ad Gate */}
      {showAd && <AdGate onContinue={handleContinue} locked={locked} />}
    </div>
  );
}
`;

// Inject AdGate component + replace BuildPage
let output = existing;

// Insert AdGate before the last export default
const insertBefore = "// ─── Page ─────────────────────────────────────────────────────────────────────";
output = output.replace(insertBefore, adComponent + insertBefore);

// Replace entire BuildPage function
const buildPageStart = output.lastIndexOf("// ─── Page ─────────────────────────────────────────────────────────────────────");
output = output.substring(0, buildPageStart) + newBuildPage;

fs.writeFileSync(path.join(__dirname, '..', 'app', 'build', 'page.tsx'), output, 'utf8');
console.log('Build page v4 (with ad gate) written!');
