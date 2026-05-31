"use client";

/* ─────────────────────────────────────────────
   FLYING DRONE  (Hero)
   Colourful filled drone + animated propellers
   + dashed curved trail that draws itself in
───────────────────────────────────────────── */
export function FlyingDrone() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Drone body */}
      <div className="absolute" style={{ top: "13%", right: "9%", animation: "fly-across 10s ease-in-out infinite" }}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          {/* Arms */}
          {[[22,22,34,34],[68,22,56,34],[22,68,34,56],[68,68,56,56]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round"/>
          ))}
          {/* Body */}
          <rect x="30" y="30" width="30" height="30" rx="8" fill="#1e40af" stroke="#38bdf8" strokeWidth="2"/>
          <rect x="36" y="36" width="18" height="18" rx="4" fill="#1d4ed8"/>
          <circle cx="45" cy="45" r="5" fill="#22d3ee"/>
          <circle cx="45" cy="45" r="2.5" fill="white" opacity="0.9"/>
          {/* Propeller hubs + spinning blades */}
          {[[22,22],[68,22],[22,68],[68,68]].map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5"/>
              <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: "spin-prop 0.25s linear infinite", animationDelay: `${i*0.06}s` }}>
                <ellipse cx={cx} cy={cy} rx="9" ry="2.5" fill="#7dd3fc" opacity="0.85"/>
                <ellipse cx={cx} cy={cy} rx="9" ry="2.5" fill="#bae6fd" opacity="0.5"
                  transform={`rotate(90 ${cx} ${cy})`}/>
              </g>
              <circle cx={cx} cy={cy} r="2.5" fill="white"/>
            </g>
          ))}
          {/* LED glow */}
          <circle cx="45" cy="45" r="8" fill="#22d3ee" opacity="0.15"/>
        </svg>
      </div>

      {/* Small secondary drone — bottom left (hidden on mobile/tablet) */}
      <div className="absolute hidden lg:block" style={{ bottom: "18%", left: "6%", animation: "drift 8s ease-in-out infinite", animationDelay: "2s", opacity: 0.6 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {[[12,12,19,19],[36,12,29,19],[12,36,19,29],[36,36,29,29]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/>
          ))}
          <rect x="16" y="16" width="16" height="16" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5"/>
          <circle cx="24" cy="24" r="4" fill="#38bdf8" opacity="0.9"/>
          {[[12,12],[36,12],[12,36],[36,36]].map(([cx,cy],i) => (
            <g key={i} style={{ transformOrigin: `${cx}px ${cy}px`, animation: "spin-prop 0.3s linear infinite", animationDelay: `${i*0.07}s` }}>
              <ellipse cx={cx} cy={cy} rx="6" ry="1.8" fill="#bae6fd" opacity="0.8"/>
              <ellipse cx={cx} cy={cy} rx="6" ry="1.8" fill="#e0f2fe" opacity="0.4" transform={`rotate(90 ${cx} ${cy})`}/>
              <circle cx={cx} cy={cy} r="1.8" fill="white"/>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOWING LIGHTBULB  (CTA / Testimonials)
   Warm golden fill + radiating rays + orbit ring
───────────────────────────────────────────── */
export function FloatingLightbulb({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none hidden lg:block ${className}`}
      style={{ animation: "drift 7s ease-in-out infinite" }}>
      <svg width="110" height="130" viewBox="0 0 110 130" fill="none">
        <defs>
          <radialGradient id="bulbOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="bulbFill" x1="55" y1="10" x2="55" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a"/>
            <stop offset="60%" stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#d97706"/>
          </linearGradient>
        </defs>

        {/* Outer glow */}
        <circle cx="55" cy="48" r="40" fill="url(#bulbOuter)"
          style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }}/>

        {/* Ray lines */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 55 + 36 * Math.cos(rad);
          const y1 = 48 + 36 * Math.sin(rad);
          const x2 = 55 + 48 * Math.cos(rad);
          const y2 = 48 + 48 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#fde68a" strokeWidth="2" strokeLinecap="round" opacity="0.6"
              style={{ animation: `glow-pulse 2.5s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}/>
          );
        })}

        {/* Bulb glass */}
        <path d="M55 10 C38 10 26 22 26 38 C26 50 33 59 40 65 L40 78 L70 78 L70 65 C77 59 84 50 84 38 C84 22 72 10 55 10Z"
          fill="url(#bulbFill)" opacity="0.95"/>
        {/* Shine */}
        <path d="M41 22 C41 22 45 18 52 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>

        {/* Base segments */}
        <rect x="38" y="79" width="34" height="7" rx="3" fill="#d97706"/>
        <rect x="40" y="87" width="30" height="7" rx="3" fill="#b45309"/>
        <rect x="43" y="95" width="24" height="7" rx="3" fill="#92400e"/>

        {/* Filament */}
        <path d="M46 55 L50 45 L55 50 L60 40 L64 50" stroke="white" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.7" fill="none"/>

        {/* Dashed orbit ring */}
        <ellipse cx="55" cy="48" rx="48" ry="16" stroke="#fde68a" strokeWidth="1.2"
          strokeDasharray="5 5" opacity="0.3"
          style={{ animation: "spin-slow 10s linear infinite" }}/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WIREFRAME CRYSTAL GEM  (Pricing / Arduino)
   Multi-face gem with glowing cyan edges
───────────────────────────────────────────── */
export function FloatingCrystal({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none hidden lg:block ${className}`}
      style={{ animation: "drift2 9s ease-in-out infinite" }}>
      <div className="relative">
        <svg width="80" height="96" viewBox="0 0 80 96" fill="none">
          <defs>
            <linearGradient id="gemTop" x1="40" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="gemBot" x1="40" y1="40" x2="40" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2"/>
            </linearGradient>
          </defs>

          {/* Top crown faces */}
          <polygon points="40,2 68,28 52,28" fill="url(#gemTop)" stroke="#7dd3fc" strokeWidth="1.5" strokeLinejoin="round"/>
          <polygon points="40,2 28,28 12,28" fill="url(#gemTop)" stroke="#bae6fd" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
          <polygon points="40,2 68,28 28,28" fill="white" opacity="0.06" stroke="#e0f2fe" strokeWidth="1" strokeLinejoin="round"/>

          {/* Belt */}
          <polygon points="12,28 28,28 20,46 4,40" fill="#0ea5e9" opacity="0.15" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/>
          <polygon points="28,28 52,28 60,46 20,46" fill="#38bdf8" opacity="0.12" stroke="#7dd3fc" strokeWidth="1.5" strokeLinejoin="round"/>
          <polygon points="52,28 68,28 76,40 60,46" fill="#0ea5e9" opacity="0.15" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/>

          {/* Lower pavilion */}
          <polygon points="4,40 20,46 40,94" fill="url(#gemBot)" stroke="#60a5fa" strokeWidth="1.5" strokeLinejoin="round"/>
          <polygon points="20,46 60,46 40,94" fill="url(#gemBot)" stroke="#93c5fd" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9"/>
          <polygon points="60,46 76,40 40,94" fill="url(#gemBot)" stroke="#60a5fa" strokeWidth="1.5" strokeLinejoin="round"/>

          {/* Sparkles */}
          <circle cx="40" cy="2" r="2.5" fill="white" opacity="0.9"/>
          <circle cx="40" cy="94" r="2" fill="#38bdf8" opacity="0.7"/>
          {[[-6,-6],[6,-6],[0,8]].map(([dx,dy],i) => (
            <line key={i} x1={40+dx} y1={2+dy} x2={40+dx+(i===2?0:dx*2)} y2={2+dy+(i===2?dy*2:0)}
              stroke="white" strokeWidth="1" opacity="0.5"/>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING ROBOT  (new — for Courses/About)
   Cute cartoon robot that bounces
───────────────────────────────────────────── */
export function FloatingRobot({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none hidden lg:block ${className}`}
      style={{ animation: "drift 8s ease-in-out infinite" }}>
      <svg width="72" height="96" viewBox="0 0 72 96" fill="none">
        <defs>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee"/>
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Antenna */}
        <line x1="36" y1="8" x2="36" y2="18" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="36" cy="6" r="4" fill="#22d3ee"
          style={{ animation: "glow-pulse 2s ease-in-out infinite" }}/>

        {/* Head */}
        <rect x="16" y="18" width="40" height="32" rx="8" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="2"/>
        {/* Eyes */}
        <circle cx="27" cy="32" r="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5"/>
        <circle cx="45" cy="32" r="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5"/>
        <circle cx="27" cy="32" r="3.5" fill="#22d3ee"
          style={{ animation: "glow-pulse 2s ease-in-out infinite" }}/>
        <circle cx="45" cy="32" r="3.5" fill="#22d3ee"
          style={{ animation: "glow-pulse 2s ease-in-out infinite", animationDelay: "0.3s" }}/>
        <circle cx="28.5" cy="30.5" r="1.2" fill="white" opacity="0.8"/>
        <circle cx="46.5" cy="30.5" r="1.2" fill="white" opacity="0.8"/>
        {/* Mouth */}
        <path d="M26 42 Q36 47 46 42" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none"/>

        {/* Neck */}
        <rect x="30" y="50" width="12" height="6" rx="2" fill="#1e40af"/>

        {/* Body */}
        <rect x="12" y="56" width="48" height="32" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2"/>
        {/* Chest panel */}
        <rect x="22" y="62" width="28" height="18" rx="5" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5"/>
        {/* LEDs */}
        {[28, 36, 44].map((x, i) => (
          <circle key={i} cx={x} cy="71" r="2.5" fill={i === 1 ? "#22d3ee" : "#3b82f6"}
            style={{ animation: "glow-pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.4}s` }}/>
        ))}

        {/* Arms */}
        <rect x="2" y="58" width="10" height="22" rx="5" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5"/>
        <rect x="60" y="58" width="10" height="22" rx="5" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5"/>
        {/* Hands */}
        <circle cx="7" cy="82" r="5" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1.5"/>
        <circle cx="65" cy="82" r="5" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1.5"/>

        {/* Legs */}
        <rect x="20" y="88" width="12" height="7" rx="3" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5"/>
        <rect x="40" y="88" width="12" height="7" rx="3" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKETCHY ICON SETS  (all dark-blue sections)
   Animated, varied sizes, mix of colours
───────────────────────────────────────────── */
type Variant = "education" | "robotics" | "math";

const ICONS: Record<Variant, Array<{ x: string; y: string; rot: string; delay: string; dur: string; scale?: number; color: string; node: React.ReactNode }>> = {
  /* 4 icons per set — top-left, top-right, bottom-left, bottom-right */
  education: [
    {
      x: "4%", y: "8%", rot: "-12deg", delay: "0s", dur: "3.5s", color: "white",
      node: (
        <svg width="44" height="50" viewBox="0 0 44 50" fill="none" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
          <path d="M22 4 C22 4 22 8 22 8 C14 9 8 15 8 24 L8 36 L4 40 L40 40 L36 36 L36 24 C36 15 30 9 22 8"/>
          <line x1="16" y1="40" x2="16" y2="44"/><line x1="28" y1="40" x2="28" y2="44"/>
          <path d="M16 44 Q22 48 28 44"/>
        </svg>
      ),
    },
    {
      x: "87%", y: "9%", rot: "18deg", delay: "0.6s", dur: "3.8s", color: "#bae6fd",
      node: (
        <svg width="52" height="46" viewBox="0 0 52 46" fill="none" stroke="#bae6fd" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
          <polygon points="4,42 48,42 4,4"/>
          <line x1="4" y1="30" x2="16" y2="30"/><line x1="4" y1="18" x2="10" y2="18"/>
          <line x1="16" y1="42" x2="16" y2="35"/><line x1="28" y1="42" x2="28" y2="37"/><line x1="38" y1="42" x2="38" y2="39"/>
        </svg>
      ),
    },
    {
      x: "7%", y: "76%", rot: "22deg", delay: "1.1s", dur: "4.2s", color: "#7dd3fc",
      node: (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#7dd3fc" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.28">
          <circle cx="22" cy="22" r="7"/>
          <path d="M22 4 L24 12 L28 10 L30 17 L37 17 L35 22 L40 27 L33 28 L33 35 L27 32 L22 38 L17 32 L11 35 L11 28 L4 27 L9 22 L7 17 L14 17 L16 10 L20 12 Z"/>
        </svg>
      ),
    },
    {
      x: "84%", y: "74%", rot: "8deg", delay: "1.6s", dur: "4s", color: "white",
      node: (
        <svg width="50" height="42" viewBox="0 0 50 42" fill="none" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.22">
          <rect x="3" y="4" width="44" height="34" rx="3"/>
          <line x1="25" y1="4" x2="25" y2="38"/>
          <line x1="9" y1="13" x2="21" y2="13"/><line x1="9" y1="20" x2="21" y2="20"/>
          <line x1="29" y1="13" x2="41" y2="13"/><line x1="29" y1="20" x2="41" y2="20"/>
        </svg>
      ),
    },
  ],

  robotics: [
    {
      x: "5%", y: "10%", rot: "-10deg", delay: "0s", dur: "3.8s", color: "#bae6fd",
      node: (
        <svg width="52" height="48" viewBox="0 0 52 48" fill="none" stroke="#bae6fd" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
          <rect x="10" y="8" width="32" height="32" rx="3"/>
          <rect x="17" y="15" width="18" height="18" rx="2"/>
          <line x1="10" y1="18" x2="4" y2="18"/><line x1="10" y1="24" x2="4" y2="24"/><line x1="10" y1="30" x2="4" y2="30"/>
          <line x1="42" y1="18" x2="48" y2="18"/><line x1="42" y1="24" x2="48" y2="24"/><line x1="42" y1="30" x2="48" y2="30"/>
          <line x1="20" y1="8" x2="20" y2="4"/><line x1="26" y1="8" x2="26" y2="4"/><line x1="32" y1="8" x2="32" y2="4"/>
          <line x1="20" y1="40" x2="20" y2="44"/><line x1="26" y1="40" x2="26" y2="44"/><line x1="32" y1="40" x2="32" y2="44"/>
        </svg>
      ),
    },
    {
      x: "84%", y: "8%", rot: "22deg", delay: "0.7s", dur: "4.2s", color: "white",
      node: (
        <svg width="38" height="56" viewBox="0 0 38 56" fill="none" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.28">
          <path d="M19 4 C10 10 8 22 8 30 L12 30 L12 42 L26 42 L26 30 L30 30 C30 22 28 10 19 4Z"/>
          <circle cx="19" cy="22" r="5"/>
          <path d="M8 34 L4 48 L12 42"/>
          <path d="M30 34 L34 48 L26 42"/>
          <path d="M15 42 L13 52 L19 48 L25 52 L23 42"/>
        </svg>
      ),
    },
    {
      x: "7%", y: "75%", rot: "0deg", delay: "1.2s", dur: "4.4s", color: "#e0f2fe",
      node: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="#e0f2fe" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.25">
          <circle cx="26" cy="26" r="5"/>
          <ellipse cx="26" cy="26" rx="22" ry="9"/>
          <ellipse cx="26" cy="26" rx="22" ry="9" transform="rotate(60 26 26)"/>
          <ellipse cx="26" cy="26" rx="22" ry="9" transform="rotate(120 26 26)"/>
        </svg>
      ),
    },
    {
      x: "83%", y: "78%", rot: "-4deg", delay: "1.8s", dur: "4s", color: "#7dd3fc",
      node: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7dd3fc" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
          <rect x="8" y="12" width="32" height="26" rx="5"/>
          <circle cx="18" cy="23" r="4"/><circle cx="30" cy="23" r="4"/>
          <path d="M16 33 Q24 37 32 33" strokeLinejoin="round"/>
          <line x1="24" y1="12" x2="24" y2="8"/><circle cx="24" cy="6" r="2.5"/>
          <line x1="8" y1="25" x2="4" y2="25"/><line x1="40" y1="25" x2="44" y2="25"/>
        </svg>
      ),
    },
  ],

  math: [],
};

export function SketchyIcons({ variant = "education" }: { variant?: Variant }) {
  const icons = ICONS[variant] || ICONS.education;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {icons.map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: item.x,
            top: item.y,
            transform: `rotate(${item.rot}) scale(${item.scale ?? 1})`,
            animation: `icon-bob ${item.dur} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.node}
        </div>
      ))}
    </div>
  );
}
