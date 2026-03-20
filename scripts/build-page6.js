const fs = require('fs');
const path = require('path');

const current = fs.readFileSync(path.join(__dirname, '..', 'app', 'build', 'page.tsx'), 'utf8');

// New DrivePhase + supporting components
const newDriveSection = `
// ─── Top-Down SVGs ────────────────────────────────────────────────────────────
function TopCarSVG({ angle, stopped }: { angle: number; stopped: boolean }) {
  return (
    <div style={{ transform: \`rotate(\${angle}deg)\`, transition: "transform 0.08s linear", willChange: "transform" }}>
      <svg width="36" height="60" viewBox="0 0 36 60">
        {/* Shadow */}
        <ellipse cx="20" cy="52" rx="14" ry="5" fill="black" opacity="0.25" />
        {/* Body */}
        <rect x="3" y="6"  width="30" height="48" rx="8" fill={stopped ? "#dc2626" : "#2563eb"} />
        {/* Windshield */}
        <rect x="7" y="10" width="22" height="13" rx="4" fill="#bae6fd" opacity="0.9" />
        {/* Rear window */}
        <rect x="7" y="42" width="22" height="9"  rx="3" fill="#bae6fd" opacity="0.5" />
        {/* Headlights */}
        <rect x="5"  y="6"  width="7" height="5" rx="2" fill="#fef08a" />
        <rect x="24" y="6"  width="7" height="5" rx="2" fill="#fef08a" />
        {/* Taillights */}
        <rect x="5"  y="50" width="7" height="5" rx="2" fill="#ef4444" />
        <rect x="24" y="50" width="7" height="5" rx="2" fill="#ef4444" />
        {/* Wheels */}
        <rect x="0"  y="10" width="5" height="13" rx="2" fill="#0f172a" />
        <rect x="31" y="10" width="5" height="13" rx="2" fill="#0f172a" />
        <rect x="0"  y="37" width="5" height="13" rx="2" fill="#0f172a" />
        <rect x="31" y="37" width="5" height="13" rx="2" fill="#0f172a" />
        {/* Sensor arc when stopped */}
        {stopped && <path d="M 18 6 Q 2 -8 18 -20 Q 34 -8 18 6 Z" fill="#ef4444" opacity="0.35" />}
        {/* LED */}
        <circle cx="12" cy="27" r="2" fill="#22d3ee" opacity="0.7" />
        <circle cx="18" cy="27" r="2" fill="#22d3ee" opacity="0.7" />
        <circle cx="24" cy="27" r="2" fill="#22d3ee" opacity="0.7" />
      </svg>
    </div>
  );
}

type ObsKind = "cone" | "rock" | "barrel";
type Obs = { id: number; worldX: number; worldY: number; kind: ObsKind };

function ObsSVG({ kind }: { kind: ObsKind }) {
  if (kind === "cone") return (
    <svg width="22" height="26" viewBox="0 0 22 26">
      <ellipse cx="11" cy="24" rx="9" ry="2.5" fill="#c2410c" opacity="0.4"/>
      <polygon points="11,1 20,23 2,23" fill="#f97316"/>
      <rect x="2" y="18" width="18" height="3.5" rx="1.5" fill="#fdba74"/>
    </svg>
  );
  if (kind === "rock") return (
    <svg width="30" height="22" viewBox="0 0 30 22">
      <ellipse cx="15" cy="16" rx="13" ry="8" fill="#374151"/>
      <ellipse cx="11" cy="12" rx="9" ry="6"  fill="#4b5563"/>
      <ellipse cx="9"  cy="9"  rx="4" ry="3"  fill="#6b7280" opacity="0.5"/>
    </svg>
  );
  return (
    <svg width="24" height="28" viewBox="0 0 24 28">
      <ellipse cx="12" cy="26" rx="10" ry="2.5" fill="#92400e" opacity="0.35"/>
      <rect x="2" y="6"  width="20" height="20" rx="4" fill="#92400e"/>
      <rect x="4" y="8"  width="16" height="16" rx="3" fill="#b45309"/>
      <rect x="2" y="2"  width="20" height="8"  rx="3" fill="#a16207"/>
      <line x1="12" y1="1" x2="12" y2="27" stroke="#fbbf24" strokeWidth="1.5" opacity="0.45"/>
      <line x1="2"  y1="6" x2="22" y2="6"  stroke="#fbbf24" strokeWidth="1.5" opacity="0.35"/>
    </svg>
  );
}

// ─── D-Pad Button ─────────────────────────────────────────────────────────────
function DPadBtn({ label, dir, onDown, onUp }: { label:string; dir:string; onDown:()=>void; onUp:()=>void }) {
  return (
    <button
      className="w-[60px] h-[60px] rounded-2xl flex flex-col items-center justify-center gap-0.5 select-none touch-none cursor-pointer transition-all duration-75 shadow-lg active:scale-90"
      style={{ background:"linear-gradient(160deg,#334155,#1e293b)", border:"2px solid #475569", boxShadow:"0 4px 12px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.08)" }}
      onPointerDown={e => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); onDown(); }}
      onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp}
    >
      <span className="text-lg text-white leading-none">{label}</span>
      <span className="text-white/25 text-[8px] font-bold uppercase tracking-wide">{dir}</span>
    </button>
  );
}

// ─── Scene constants ──────────────────────────────────────────────────────────
const ROAD_HALF  = 100;  // half road width in px
const LANE_W_PX  = 66;   // lane width
const TREE_BAND  = 560;  // vertical repeat band for trees
const SENSOR_PX  = 120;  // sensor range in world px
const STOP_PX    = 52;   // auto-stop distance

// Pre-computed tree positions (world x relative to road center, world y in 0–BAND)
const TREES = [
  // left grass
  {x:-128,y:30, r:17},{x:-170,y:105,r:13},{x:-145,y:190,r:20},{x:-200,y:265,r:15},
  {x:-125,y:340,r:18},{x:-175,y:415,r:14},{x:-148,y:490,r:21},{x:-195,y:65, r:12},
  {x:-230,y:155,r:16},{x:-210,y:310,r:19},{x:-132,y:455,r:15},{x:-165,y:530,r:17},
  // right grass
  {x:128, y:55, r:16},{x:172,y:130,r:14},{x:140,y:215,r:22},{x:195,y:290,r:15},
  {x:130, y:365,r:17},{x:178,y:440,r:13},{x:152,y:515,r:20},{x:215,y:90, r:18},
  {x:235, y:180,r:14},{x:205,y:335,r:16},{x:145,y:480,r:12},{x:180,y:555,r:19},
  // extra scatter
  {x:-260,y:220,r:14},{x:-245,y:390,r:12},{x:250,y:240,r:15},{x:240,y:410,r:13},
];

// Road signs: just kilometer markers on the right shoulder
const SIGNS = [0,200,400].map((y,i)=>({y, label:\`KM \${i+1}\`}));

let drvObsId = 0;

// ─── Drive Phase ──────────────────────────────────────────────────────────────
function DrivePhase({ onReset }: { onReset: () => void }) {
  const [scrollY,    setScrollY]    = useState(0);
  const [carXOff,   setCarXOff]    = useState(0);    // car X offset from road center (px)
  const [carAngle,  setCarAngle]    = useState(0);    // visual steering lean (deg)
  const [speed,     setSpeed]       = useState(0);
  const [obstacles, setObstacles]   = useState<Obs[]>([]);
  const [sensorDist,setSensorDist]  = useState(999);
  const [stopped,   setStopped]     = useState(false);
  const [distance,  setDistance]    = useState(0);
  const [skid,      setSkid]        = useState<{x:number;y:number;a:number}[]>([]);

  const scrollYRef  = useRef(0);
  const carXRef     = useRef(0);
  const speedRef    = useRef(0);
  const angleRef    = useRef(0);
  const obsRef      = useRef<Obs[]>([]);
  const distRef     = useRef(0);
  const skidRef     = useRef<{x:number;y:number;a:number}[]>([]);
  const keysRef     = useRef({ up:false, down:false, left:false, right:false });

  const SCENE_H = 300;

  useEffect(() => {
    // Obstacle spawner
    const KINDS: ObsKind[] = ["cone","rock","barrel","cone","rock"];
    const spawnInt = setInterval(() => {
      if (Math.abs(speedRef.current) < 0.3) return;
      const lanes = [-LANE_W_PX, 0, LANE_W_PX];
      const lx = lanes[Math.floor(Math.random() * 3)];
      const newObs: Obs = {
        id: drvObsId++,
        worldX: lx,
        worldY: scrollYRef.current + SCENE_H * 0.6,
        kind:   KINDS[Math.floor(Math.random() * KINDS.length)],
      };
      obsRef.current = [...obsRef.current.slice(-8), newObs];
      setObstacles([...obsRef.current]);
    }, 2000);

    // Game loop ~30fps
    const loop = setInterval(() => {
      const k   = keysRef.current;
      const MAX = 5, ACC = 0.32, FRIC = 0.16, TURN = 4.5;

      let spd = speedRef.current;
      let ang = angleRef.current;
      let cx  = carXRef.current;

      // Speed
      if (k.up)        spd = Math.min(spd + ACC, MAX);
      else if (k.down) spd = Math.max(spd - ACC, -MAX * 0.45);
      else {           spd *= (1 - FRIC); if (Math.abs(spd) < 0.04) spd = 0; }

      // Steering (move car left/right, also lean visually)
      if (Math.abs(spd) > 0.1) {
        const dir = spd > 0 ? 1 : -1;
        if (k.left)  { cx = Math.max(cx - TURN * dir, -ROAD_HALF + 20); ang = Math.max(ang - 4, -18); }
        if (k.right) { cx = Math.min(cx + TURN * dir,  ROAD_HALF - 20); ang = Math.min(ang + 4,  18); }
        if (!k.left && !k.right) ang *= 0.75; // return to center
      } else { ang *= 0.6; }

      // Skid marks when turning fast
      if (Math.abs(ang) > 12 && Math.abs(spd) > 2) {
        skidRef.current = [...skidRef.current.slice(-20), { x: cx, y: scrollYRef.current, a: ang }];
        setSkid([...skidRef.current]);
      }

      // Sensor - find closest obstacle in lane
      let minDist = 999;
      for (const ob of obsRef.current) {
        const dy = ob.worldY - scrollYRef.current; // positive = ahead
        if (dy < 0 || dy > SENSOR_PX) continue;
        if (Math.abs(ob.worldX - cx) < 38) {
          minDist = Math.min(minDist, dy);
        }
      }
      setSensorDist(Math.round(minDist));

      // Auto-stop
      if (minDist < STOP_PX && spd > 0) { spd = 0; setStopped(true); }
      else setStopped(false);

      // Clamp
      spd = Math.round(spd * 1000) / 1000;

      // Update world
      scrollYRef.current += spd;
      carXRef.current     = cx;
      speedRef.current    = spd;
      angleRef.current    = ang;
      distRef.current    += Math.abs(spd) * 5;

      setScrollY(scrollYRef.current);
      setCarXOff(cx);
      setCarAngle(ang);
      setSpeed(spd);
      setDistance(Math.round(distRef.current));
    }, 33);

    return () => { clearInterval(loop); clearInterval(spawnInt); };
  }, []);

  const press   = (d: keyof typeof keysRef.current) => { keysRef.current[d] = true; };
  const release = (d: keyof typeof keysRef.current) => { keysRef.current[d] = false; };

  const speedKm   = Math.abs(Math.round(speed * 20));
  const sensorPct = Math.max(0, Math.min(100, (sensorDist / SENSOR_PX) * 100));
  const dashOff   = scrollY % 80;
  const grassOff  = scrollY % 40;

  // World-to-screen transform (car always at center)
  const w2sx = (wx: number) => 200 + wx - carXRef.current;
  const w2sy = (wy: number) => 150 - (wy - scrollY);

  return (
    <div className="flex flex-col h-full">
      {/* ─── SCENE: fully top-down ─────────────────────── */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden border border-slate-700 flex-shrink-0 relative"
        style={{ height:300, background:"#1a2e1a" }}>

        {/* === Grass background with mowing stripes === */}
        <div className="absolute inset-0" style={{
          background:\`repeating-linear-gradient(0deg,
            #1e3a1e 0px, #1e3a1e \${20 - (grassOff % 20)}px,
            #22422a \${20 - (grassOff % 20)}px, #22422a \${40 - (grassOff % 20)}px)\`
        }}/>

        {/* === Grass detail patches (stationary texture) === */}
        {[30,90,160,230,290,370].map((x,i)=>(
          <div key={'gp'+i} className="absolute rounded-full bg-green-900/20 pointer-events-none"
            style={{ left: x, top: ((i * 44 - scrollY * 0.8) % 280 + 280) % 280, width: 8 + (i%3)*4, height: 5 + (i%3)*3 }}/>
        ))}

        {/* === Road surface === */}
        <div className="absolute top-0 bottom-0 bg-slate-700"
          style={{ left: \`calc(50% - \${ROAD_HALF}px + \${-carXRef.current * 0.08}px)\`, width: ROAD_HALF * 2 }}>

          {/* Road texture (asphalt grain) */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize:"200px 200px" }}/>

          {/* Shoulder lines (solid white) */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-white opacity-70"/>
          <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-white opacity-70"/>

          {/* Lane divider left */}
          {[...Array(8)].map((_,i)=>(
            <div key={'ldl'+i} className="absolute bg-white/50 rounded-full"
              style={{ left: ROAD_HALF - LANE_W_PX - 1.5, width:3, height:28,
                top: (i * 80) - (dashOff % 80) - 20 }}/>
          ))}
          {/* Lane divider right */}
          {[...Array(8)].map((_,i)=>(
            <div key={'ldr'+i} className="absolute bg-white/50 rounded-full"
              style={{ left: ROAD_HALF + LANE_W_PX - 1.5, width:3, height:28,
                top: (i * 80) - (dashOff % 80) - 20 }}/>
          ))}
          {/* Center yellow double line */}
          <div className="absolute top-0 bottom-0 bg-yellow-400/70" style={{ left: ROAD_HALF - 2, width:2 }}/>
          <div className="absolute top-0 bottom-0 bg-yellow-400/70" style={{ left: ROAD_HALF + 0, width:2 }}/>

          {/* Skid marks */}
          {skid.slice(-10).map((s,i)=>(
            <div key={i} className="absolute rounded-full bg-slate-900/50 pointer-events-none"
              style={{
                left: s.x + ROAD_HALF - 4,
                top:  150 - (s.y - scrollY) - 4,
                width: 8, height: 8,
                opacity: (i / 10) * 0.4,
              }}/>
          ))}

          {/* Obstacles */}
          {obstacles.map(ob => {
            const sx = ob.worldX - carXRef.current + ROAD_HALF - 11;
            const sy = 150 - (ob.worldY - scrollY) - 13;
            if (sy < -40 || sy > 320) return null;
            return (
              <div key={ob.id} className="absolute pointer-events-none"
                style={{ left: sx, top: sy }}>
                <ObsSVG kind={ob.kind}/>
              </div>
            );
          })}
        </div>

        {/* === Sensor beam === */}
        {speed > 0 && (
          <div className="absolute pointer-events-none"
            style={{
              left: \`calc(50% - 18px + \${carXOff - carXRef.current * 0.08}px)\`,
              top: 150 - 66 - Math.min(sensorDist, SENSOR_PX) * 0.9,
              width: 36,
              height: Math.min(sensorDist, SENSOR_PX) * 0.9,
              background: sensorDist < 80
                ? "linear-gradient(to top, rgba(239,68,68,0.25), transparent)"
                : "linear-gradient(to top, rgba(34,211,238,0.12), transparent)",
            }}/>
        )}

        {/* === Trees (top-down circles) === */}
        {TREES.map((t, i) => {
          const sx = w2sx(t.x);
          const rawY = ((t.y - scrollY % TREE_BAND + TREE_BAND) % TREE_BAND);
          const sy = rawY - TREE_BAND / 2 + 150;
          if (sx < -t.r*3 || sx > 420 || sy < -t.r*3 || sy > 330) return null;
          return (
            <div key={i} className="absolute rounded-full pointer-events-none"
              style={{
                left: sx - t.r, top: sy - t.r, width: t.r*2, height: t.r*2,
                background: \`radial-gradient(circle at 38% 33%, #16a34a, #14532d 70%)\`,
                boxShadow: \`\${t.r*0.25}px \${t.r*0.35}px \${t.r*0.5}px rgba(0,0,0,0.55)\`,
              }}>
              <div className="absolute rounded-full bg-green-900/50"
                style={{ left:"32%", top:"30%", width:"28%", height:"28%" }}/>
            </div>
          );
        })}

        {/* === Road signs === */}
        {SIGNS.map((s, i) => {
          const sy = 150 - (s.y - scrollY % 600);
          if (sy < -20 || sy > 320) return null;
          return (
            <div key={i} className="absolute flex items-center gap-1 pointer-events-none"
              style={{ right: \`calc(50% + \${ROAD_HALF + 6}px)\`, top: sy - 10 }}>
              <div className="w-1.5 h-8 bg-slate-500 rounded-full"/>
              <div className="px-1.5 py-0.5 bg-green-800 border border-green-600 rounded text-[8px] font-bold text-green-300 whitespace-nowrap">
                {s.label}
              </div>
            </div>
          );
        })}

        {/* === Car (always centered) === */}
        <div className="absolute" style={{ left: \`calc(50% - 18px + \${(carXOff - carXRef.current * 0.08)}px)\`, top: 120 }}>
          <TopCarSVG angle={carAngle} stopped={stopped}/>
        </div>

        {/* === Speed motion lines (fast) === */}
        {speedKm > 40 && [0,1,2,3].map(i => (
          <div key={i} className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: 20 + i * 12,
              background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.07),transparent)",
              animation: \`speedLine \${0.4 - i*0.04}s linear infinite\`,
            }}/>
        ))}

        {/* === HUD === */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          {/* Speed */}
          <div className="bg-black/55 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-white/10">
            <p className="text-white font-black text-xl leading-none tabular-nums">{speedKm}</p>
            <p className="text-white/35 text-[9px] font-bold">km/h</p>
          </div>
          {/* Obstacle warning */}
          {stopped && (
            <div className="bg-red-600/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 border border-red-400/30 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0"/>
              <p className="text-white text-xs font-bold">⛔ Obstacle — Auto Stop</p>
            </div>
          )}
          {/* Distance */}
          <div className="bg-black/55 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-white/10">
            <p className="text-cyan-400 font-black text-sm leading-none tabular-nums">{distance}m</p>
            <p className="text-white/35 text-[9px] font-bold">dist</p>
          </div>
        </div>
      </div>

      {/* ─── Sensor bar ─────────────────────────────────── */}
      <div className="mx-4 mt-3 bg-slate-800/80 rounded-2xl px-4 py-3 border border-white/6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-wide">📡 Ultrasonic Sensor (HC-SR04)</span>
          </div>
          <span className={\`text-[10px] font-bold \${sensorDist < 80 ? "text-red-400 animate-pulse" : "text-green-400"}\`}>
            {sensorDist > 300 ? "Road clear" : sensorDist + " cm"}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-150"
            style={{ width:\`\${sensorPct}%\`, background: sensorPct<40?"#ef4444":sensorPct<65?"#f59e0b":"#22c55e" }}/>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-red-400/50 text-[8px]">STOP</span>
          <span className="text-amber-400/50 text-[8px]">WARN</span>
          <span className="text-green-400/50 text-[8px]">CLEAR</span>
        </div>
      </div>

      {/* ─── Stats row ──────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-2 mx-4 mt-2">
        {[
          { label:"Speed",   val: speedKm + " km/h",  c:"text-cyan-400" },
          { label:"Motor L", val: speed>0?(keysRef.current.left?"60%":"100%"):"0%",  c:"text-blue-400" },
          { label:"Motor R", val: speed>0?(keysRef.current.right?"60%":"100%"):"0%", c:"text-blue-400" },
          { label:"Sensor",  val: sensorDist>300?"Clear":sensorDist+"cm", c: sensorDist<80?"text-red-400":"text-green-400" },
        ].map(s => (
          <div key={s.label} className="bg-slate-800/60 rounded-xl p-2 text-center border border-white/6">
            <p className="text-white/25 text-[9px] font-semibold uppercase tracking-wide">{s.label}</p>
            <p className={\`font-bold text-xs mt-0.5 \${s.c}\`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* ─── D-Pad ──────────────────────────────────────── */}
      <div className="flex items-start gap-6 sm:gap-10 mx-4 mt-3 mb-4">
        {/* D-Pad */}
        <div className="flex flex-col items-center gap-1.5">
          <DPadBtn label="▲" dir="Forward" onDown={()=>press("up")}    onUp={()=>release("up")} />
          <div className="flex gap-1.5">
            <DPadBtn label="◀" dir="Left"    onDown={()=>press("left")}  onUp={()=>release("left")} />
            <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center"
              style={{ background:"#0f172a", border:"2px solid #1e293b" }}>
              <div className="w-5 h-5 rounded-full bg-slate-700/50"/>
            </div>
            <DPadBtn label="▶" dir="Right"   onDown={()=>press("right")} onUp={()=>release("right")} />
          </div>
          <DPadBtn label="▼" dir="Reverse"  onDown={()=>press("down")}  onUp={()=>release("down")} />
        </div>

        {/* Arduino info panel */}
        <div className="flex-1">
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/6 h-full">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-wide mb-3">⚙ Arduino Behavior</p>
            <div className="space-y-2">
              {[
                { color:"bg-cyan-400",  label:"Hold ▲ — speed ramps up (PWM 0→255)" },
                { color:"bg-amber-400", label:"◀▶ — differential motor steering" },
                { color:"bg-red-400",   label:"Sensor < 10cm — motors auto-stop" },
                { color:"bg-green-400", label:"Release — friction slows motor" },
              ].map(t => (
                <div key={t.label} className="flex items-start gap-2">
                  <div className={\`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 \${t.color}\`}/>
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
      <style>{\`
        @keyframes speedLine { from{opacity:0.5;transform:translateY(-100%)} to{opacity:0;transform:translateY(100%)} }
      \`}</style>
    </div>
  );
}

`;

// Replace from "// ─── Top-down Car SVG" to before "// ─── Cookie helpers"
const cookieMarker = '\n// ─── Cookie helpers';
const topCarMarker = '\n// ─── Top-down Car SVG';

const topCarStart  = current.indexOf(topCarMarker);
const cookieStart  = current.indexOf(cookieMarker);

if (topCarStart === -1 || cookieStart === -1) {
  console.error('Markers not found:', { topCarStart, cookieStart });
  process.exit(1);
}

const before = current.substring(0, topCarStart);
const after   = current.substring(cookieStart);
const output  = before + newDriveSection + after;

fs.writeFileSync(path.join(__dirname, '..', 'app', 'build', 'page.tsx'), output, 'utf8');
console.log('Drive phase → fully top-down done!');
