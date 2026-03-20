const fs = require('fs');
const path = require('path');

// Read current file and replace only the DrivePhase + CarSVG + TreeSVG + CloudSVG + Obstacle section
const current = fs.readFileSync(path.join(__dirname, '..', 'app', 'build', 'page.tsx'), 'utf8');

const newDriveSection = `
// ─── Top-down Car SVG ─────────────────────────────────────────────────────────
function TopCarSVG({ stopped }: { stopped: boolean }) {
  return (
    <svg width="48" height="80" viewBox="0 0 48 80">
      {/* Body */}
      <rect x="4" y="8" width="40" height="64" rx="10" fill={stopped ? "#dc2626" : "#2563eb"} />
      {/* Windshield */}
      <rect x="9" y="13" width="30" height="16" rx="5" fill="#bae6fd" opacity="0.9" />
      {/* Rear window */}
      <rect x="9" y="55" width="30" height="12" rx="3" fill="#bae6fd" opacity="0.5" />
      {/* Headlights */}
      <rect x="6"  y="8"  width="10" height="7" rx="2" fill="#fef08a" />
      <rect x="32" y="8"  width="10" height="7" rx="2" fill="#fef08a" />
      {/* Taillights */}
      <rect x="6"  y="66" width="10" height="7" rx="2" fill="#ef4444" />
      <rect x="32" y="66" width="10" height="7" rx="2" fill="#ef4444" />
      {/* Wheels */}
      <rect x="0"  y="14" width="6" height="18" rx="2" fill="#0f172a" />
      <rect x="42" y="14" width="6" height="18" rx="2" fill="#0f172a" />
      <rect x="0"  y="50" width="6" height="18" rx="2" fill="#0f172a" />
      <rect x="42" y="50" width="6" height="18" rx="2" fill="#0f172a" />
      {/* Sensor beam indicator */}
      {stopped && (
        <polygon points="24,0 14,-18 34,-18" fill="#ef4444" opacity="0.5" />
      )}
      {/* Center stripe */}
      <line x1="24" y1="14" x2="24" y2="64" stroke="#1e40af" strokeWidth="1.5" opacity="0.4" />
      {/* LED dots */}
      <circle cx="18" cy="37" r="2.5" fill="#22d3ee" opacity="0.7" />
      <circle cx="24" cy="37" r="2.5" fill="#22d3ee" opacity="0.7" />
      <circle cx="30" cy="37" r="2.5" fill="#22d3ee" opacity="0.7" />
    </svg>
  );
}

function RockSVG() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28">
      <ellipse cx="18" cy="18" rx="16" ry="10" fill="#475569" />
      <ellipse cx="14" cy="14" rx="11" ry="7" fill="#64748b" />
      <ellipse cx="12" cy="12" rx="5" ry="3" fill="#94a3b8" opacity="0.4" />
    </svg>
  );
}
function ConeSVG() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30">
      <ellipse cx="13" cy="27" rx="11" ry="3" fill="#c2410c" opacity="0.4" />
      <polygon points="13,2 23,26 3,26" fill="#f97316" />
      <rect x="2" y="21" width="22" height="4" rx="2" fill="#fdba74" />
    </svg>
  );
}
function BarrelSVG() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32">
      <ellipse cx="14" cy="29" rx="12" ry="3" fill="#92400e" opacity="0.4" />
      <rect x="3" y="8" width="22" height="22" rx="4" fill="#92400e" />
      <rect x="5" y="10" width="18" height="18" rx="3" fill="#b45309" />
      <rect x="3" y="2" width="22" height="10" rx="3" fill="#a16207" />
      <line x1="14" y1="0" x2="14" y2="30" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
      <line x1="3" y1="8"  x2="25" y2="8"  stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

type ObsType = "rock" | "cone" | "barrel";
type Obs = { id: number; lane: number; y: number; type: ObsType };

// ─── D-Pad Button ─────────────────────────────────────────────────────────────
function DPadBtn({
  label, dir, onDown, onUp,
}: { label: string; dir: string; onDown: () => void; onUp: () => void }) {
  return (
    <button
      className="w-16 h-16 rounded-2xl bg-slate-700 border-2 border-slate-600 flex flex-col items-center justify-center gap-0.5 active:bg-slate-600 active:scale-95 select-none touch-none cursor-pointer transition-all shadow-lg shadow-black/40"
      onPointerDown={e => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); onDown(); }}
      onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp}
    >
      <span className="text-xl text-white leading-none">{label}</span>
      <span className="text-white/30 text-[9px] font-bold uppercase tracking-wide">{dir}</span>
    </button>
  );
}

// ─── Drive Phase ──────────────────────────────────────────────────────────────
let obsCounter = 0;

function DrivePhase({ onReset }: { onReset: () => void }) {
  const [speed,    setSpeed]    = useState(0);
  const [angle,    setAngle]    = useState(0);       // car rotation degrees
  const [worldY,   setWorldY]   = useState(0);       // road scroll offset
  const [worldX,   setWorldX]   = useState(0);       // road X offset
  const [obstacles,setObstacles]= useState<Obs[]>([]);
  const [sensorDist,setSensorDist]=useState(999);
  const [stopped,  setStopped]  = useState(false);
  const [distance, setDistance] = useState(0);       // total cm travelled

  const keysRef   = useRef({ up:false, down:false, left:false, right:false });
  const speedRef  = useRef(0);
  const angleRef  = useRef(0);
  const worldYRef = useRef(0);
  const worldXRef = useRef(0);
  const obsRef    = useRef<Obs[]>([]);
  const distRef   = useRef(0);

  // LANES: -1 = left, 0 = center, 1 = right  (each 60px wide)
  const LANE_W  = 64;
  const ROAD_W  = 200; // px, visible road width
  const SENSOR_RANGE = 110; // px in road coords

  useEffect(() => {
    // Obstacle spawner
    const types: ObsType[] = ["rock","cone","barrel","rock","cone"];
    const spawnInt = setInterval(() => {
      if (Math.abs(speedRef.current) < 0.2) return;
      const lane = [-1,0,1][Math.floor(Math.random()*3)];
      obsRef.current = [
        ...obsRef.current.filter(o => o.y > worldYRef.current - 600),
        { id: obsCounter++, lane, y: worldYRef.current - 480, type: types[Math.floor(Math.random()*types.length)] },
      ];
      setObstacles([...obsRef.current]);
    }, 2200);

    // Game loop at 30fps
    const loop = setInterval(() => {
      const k   = keysRef.current;
      const MAX = 5;
      const ACC = 0.35;
      const FRIC = 0.18;
      const TURN = 3.5;

      let spd = speedRef.current;
      let ang = angleRef.current;

      // Acceleration
      if (k.up)   spd = Math.min(spd + ACC, MAX);
      else if (k.down) spd = Math.max(spd - ACC, -MAX * 0.5);
      else { spd -= spd * FRIC; if (Math.abs(spd) < 0.05) spd = 0; }

      // Turning (only when moving)
      if (Math.abs(spd) > 0.15) {
        const dir = spd > 0 ? 1 : -1;
        if (k.left)  ang -= TURN * dir;
        if (k.right) ang += TURN * dir;
      }

      // Sensor: check obstacles ahead (in front cone)
      const rad = (ang * Math.PI) / 180;
      const carLaneX = worldXRef.current;
      let minDist = 999;
      for (const ob of obsRef.current) {
        const obScreenY = ob.y - worldYRef.current; // negative = ahead (below car on screen = behind)
        const obX = ob.lane * LANE_W;
        const relY = -(obScreenY); // positive = ahead
        const relX = obX - carLaneX;
        // Rotate to car's frame
        const fwd  =  relY * Math.cos(rad) + relX * Math.sin(rad);
        const side = -relY * Math.sin(rad) + relX * Math.cos(rad);
        if (fwd > 0 && fwd < SENSOR_RANGE && Math.abs(side) < 40) {
          minDist = Math.min(minDist, fwd);
        }
      }
      setSensorDist(Math.round(minDist));

      // Auto-stop if obstacle within range
      if (minDist < 55 && spd > 0) { spd = 0; setStopped(true); }
      else setStopped(false);

      // Update world position
      const dx = Math.sin(rad) * spd;
      const dy = Math.cos(rad) * spd;
      worldYRef.current += dy;
      worldXRef.current += dx;
      speedRef.current   = spd;
      angleRef.current   = ang;
      distRef.current   += Math.abs(spd) * 4;

      setSpeed(spd);
      setAngle(ang);
      setWorldY(worldYRef.current);
      setWorldX(worldXRef.current);
      setDistance(Math.round(distRef.current));
    }, 33);

    return () => { clearInterval(loop); clearInterval(spawnInt); };
  }, []);

  const press   = (dir: keyof typeof keysRef.current) => { keysRef.current[dir] = true; };
  const release = (dir: keyof typeof keysRef.current) => { keysRef.current[dir] = false; };

  // Road stripe pattern offset
  const stripeOffset = (worldY * 1) % 60;
  const xOffset      = Math.max(-80, Math.min(80, worldX * 0.3));

  const sensorPct = Math.max(0, Math.min(100, (sensorDist / SENSOR_RANGE) * 100));
  const speedKm   = Math.abs(Math.round(speed * 18));

  return (
    <div className="flex flex-col h-full">
      <style>{\`
        @keyframes obsScroll { to { transform: translateY(700px); } }
      \`}</style>

      {/* ── Road scene (top-down tilted) ─────────────────────────── */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 relative bg-green-800"
        style={{ height:"clamp(200px,40vw,280px)" }}>
        {/* Perspective tilt wrapper */}
        <div className="absolute inset-0 overflow-hidden"
          style={{ perspective:"700px" }}>
          <div className="absolute inset-0 overflow-hidden"
            style={{ transform:"rotateX(42deg)", transformOrigin:"center 70%", backfaceVisibility:"hidden" }}>

            {/* Grass */}
            <div className="absolute inset-0" style={{ background:"repeating-linear-gradient(0deg,#166534 0px,#15803d 30px,#166534 60px)" }} />

            {/* Road surface */}
            <div className="absolute top-0 bottom-0"
              style={{ left:\`calc(50% - 100px + \${xOffset}px)\`, width:"200px", background:"#374151" }}>
              {/* Road edge lines */}
              <div className="absolute top-0 bottom-0 left-0 w-2 bg-amber-400 opacity-60" />
              <div className="absolute top-0 bottom-0 right-0 w-2 bg-amber-400 opacity-60" />

              {/* Center dashes */}
              {[...Array(14)].map((_,i) => (
                <div key={i} className="absolute left-1/2 -translate-x-1/2 w-2 rounded-full bg-white opacity-60"
                  style={{ height:24, top: (i * 60) - (stripeOffset % 60) - 60 }} />
              ))}

              {/* Obstacles */}
              {obstacles.map(ob => {
                const screenY = (ob.y - worldYRef.current) * 1 + 350;
                const screenX = ob.lane * LANE_W + 100 - 16;
                if (screenY < -60 || screenY > 700) return null;
                return (
                  <div key={ob.id} className="absolute pointer-events-none"
                    style={{ top: screenY, left: screenX, transform:"translateX(-50%)" }}>
                    {ob.type==="rock"   && <RockSVG/>}
                    {ob.type==="cone"   && <ConeSVG/>}
                    {ob.type==="barrel" && <BarrelSVG/>}
                  </div>
                );
              })}
            </div>

            {/* Car (fixed center) */}
            <div className="absolute" style={{ left:\`calc(50% + \${xOffset}px)\`, top:"55%", transform:"translate(-50%,-50%)" }}>
              <div style={{ transform:\`rotate(\${angle}deg)\`, transition:"transform 0.05s" }}>
                <TopCarSVG stopped={stopped} />
              </div>
            </div>

          </div>
        </div>

        {/* HUD overlays (outside perspective transform) */}
        {stopped && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-red-500/90 text-white text-xs font-bold flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"/>
            ⛔ Obstacle Detected — Auto Stop!
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
          <p className="text-white font-black text-lg leading-none">{speedKm}</p>
          <p className="text-white/40 text-[9px]">km/h</p>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-2 mx-4 mt-3">
        {[
          { label:"Speed",    val: speedKm + " km/h",  color:"text-cyan-400" },
          { label:"Steering", val: angle%360>10||angle%360<-10 ? (keysRef.current.left?"⬅ Left":"➡ Right") : "⬆ Straight", color:"text-blue-400" },
          { label:"Distance", val: distance + " cm",   color:"text-amber-400" },
          { label:"Sensor",   val: sensorDist>300?"Clear":sensorDist+"cm", color: sensorDist<80?"text-red-400 animate-pulse":"text-green-400" },
        ].map(s => (
          <div key={s.label} className="bg-slate-800/80 rounded-xl p-2 text-center border border-white/6">
            <p className="text-white/30 text-[9px] font-semibold uppercase tracking-wide">{s.label}</p>
            <p className={\`font-bold text-xs mt-0.5 truncate \${s.color}\`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* ── Sensor bar ───────────────────────────────────────────── */}
      <div className="mx-4 mt-2 bg-slate-800/80 rounded-xl px-4 py-2.5 border border-white/6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/40 text-[10px] font-bold uppercase tracking-wide">📡 Ultrasonic Sensor</span>
          <span className={\`text-[10px] font-bold \${sensorDist < 80 ? "text-red-400" : "text-green-400"}\`}>
            {sensorDist > 300 ? "No obstacle" : sensorDist + " cm away"}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-200"
            style={{ width:\`\${sensorPct}%\`, background: sensorPct < 40 ? "#ef4444" : sensorPct < 70 ? "#f59e0b" : "#22c55e" }} />
        </div>
      </div>

      {/* ── D-Pad Controls ───────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-8 mx-4 mt-3 mb-4">
        {/* D-Pad */}
        <div className="flex flex-col items-center gap-2">
          <DPadBtn label="▲" dir="Forward" onDown={()=>press("up")}   onUp={()=>release("up")} />
          <div className="flex gap-2">
            <DPadBtn label="◀" dir="Left"    onDown={()=>press("left")} onUp={()=>release("left")} />
            <div className="w-16 h-16 rounded-2xl bg-slate-800/40 border-2 border-slate-700/30 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-slate-600/50" />
            </div>
            <DPadBtn label="▶" dir="Right"   onDown={()=>press("right")}onUp={()=>release("right")} />
          </div>
          <DPadBtn label="▼" dir="Reverse"  onDown={()=>press("down")} onUp={()=>release("down")} />
        </div>

        {/* Info panel */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/6">
            <p className="text-white/50 text-xs font-semibold mb-2">How it works</p>
            <div className="space-y-1.5">
              {[
                { icon:"▲▼", label:"Hold to accelerate — longer = faster" },
                { icon:"◀▶", label:"Steer while moving" },
                { icon:"📡", label:"Sensor auto-stops on obstacle" },
              ].map(t=>(
                <div key={t.label} className="flex items-start gap-2">
                  <span className="text-cyan-400 text-[10px] font-bold w-6 flex-shrink-0 mt-0.5">{t.icon}</span>
                  <span className="text-white/35 text-[10px] leading-relaxed">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="px-4 pb-5">
        <button onClick={onReset} className="text-white/20 hover:text-white/50 text-xs transition-colors cursor-pointer flex items-center gap-1 group">
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Rebuild the circuit
        </button>
      </div>
    </div>
  );
}

`;

// Find and replace everything from CarSVG (second one, the road scene one)
// to the end of old DrivePhase, before the cookie helpers
const cookieMarker = '\n// ─── Cookie helpers';
const carSvgMarker = '\n// ─── Top-down Car SVG';

// Find the start of the old "Road Scene" section
const roadSceneMarker = '\n// ─── Road Scene';
const drivePhaseEnd = current.indexOf(cookieMarker);
const roadSceneStart = current.indexOf(roadSceneMarker);

if (roadSceneStart === -1 || drivePhaseEnd === -1) {
  console.error('Markers not found!');
  console.log('Looking for:', roadSceneMarker);
  console.log('Found at:', roadSceneStart, drivePhaseEnd);
  process.exit(1);
}

const before = current.substring(0, roadSceneStart);
const after  = current.substring(drivePhaseEnd);

const output = before + newDriveSection + after;
fs.writeFileSync(path.join(__dirname, '..', 'app', 'build', 'page.tsx'), output, 'utf8');
console.log('Drive phase rewritten with top-down view + D-pad controls!');
