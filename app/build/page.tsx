"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Part SVGs for build phase ─────────────────────────────────────────────
function BatterySVG() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28">
      <rect x="1" y="4" width="36" height="20" rx="4" fill="none" stroke="#ef4444" strokeWidth="2"/>
      <rect x="3" y="7" width="10" height="14" rx="1" fill="#ef4444" opacity="0.4"/>
      <rect x="15" y="7" width="10" height="14" rx="1" fill="#ef4444" opacity="0.4"/>
      <rect x="37" y="10" width="6" height="8" rx="2" fill="#ef4444" opacity="0.6"/>
      <text x="22" y="18" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">9V</text>
    </svg>
  );
}
function ArduinoSVG() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28">
      <rect x="2" y="2" width="40" height="24" rx="3" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="5" y="5" width="34" height="18" rx="2" fill="#1e3a5f" opacity="0.5"/>
      <circle cx="14" cy="14" r="4" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="1.5" fill="#3b82f6"/>
      {[0,1,2,3,4].map(i=><rect key={i} x={25+i*3} y={6} width="1.5" height="4" rx="0.5" fill="#60a5fa" opacity="0.7"/>)}
      {[0,1,2,3,4].map(i=><rect key={i} x={25+i*3} y={18} width="1.5" height="4" rx="0.5" fill="#60a5fa" opacity="0.7"/>)}
      <text x="14" y="26" textAnchor="middle" fill="#3b82f6" fontSize="5" fontFamily="monospace">UNO</text>
    </svg>
  );
}
function DriverSVG() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28">
      <rect x="2" y="2" width="40" height="24" rx="3" fill="none" stroke="#f59e0b" strokeWidth="2"/>
      <rect x="6" y="6" width="32" height="16" rx="2" fill="#451a03" opacity="0.5"/>
      <rect x="10" y="9" width="10" height="10" rx="1" fill="#f59e0b" opacity="0.3"/>
      <rect x="24" y="9" width="10" height="10" rx="1" fill="#f59e0b" opacity="0.3"/>
      {[0,1].map(i=><line key={i} x1={13+i*3} y1={6} x2={13+i*3} y2={2} stroke="#fbbf24" strokeWidth="1.5"/>)}
      {[0,1].map(i=><line key={i} x1={27+i*3} y1={22} x2={27+i*3} y2={26} stroke="#fbbf24" strokeWidth="1.5"/>)}
      <text x="22" y="26" textAnchor="middle" fill="#f59e0b" fontSize="5" fontFamily="monospace">L298N</text>
    </svg>
  );
}
function MotorSVG() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28">
      <circle cx="12" cy="14" r="10" fill="none" stroke="#22c55e" strokeWidth="2"/>
      <circle cx="12" cy="14" r="5" fill="#14532d" opacity="0.6"/>
      <line x1="12" y1="4"  x2="12" y2="24" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
      <line x1="2"  y1="14" x2="22" y2="14" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
      <line x1="22" y1="14" x2="32" y2="14" stroke="#22c55e" strokeWidth="2"/>
      <circle cx="32" cy="14" r="3" fill="#22c55e" opacity="0.7"/>
      <circle cx="36" cy="14" r="10" fill="none" stroke="#22c55e" strokeWidth="2"/>
      <circle cx="36" cy="14" r="5"  fill="#14532d" opacity="0.6"/>
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARTS = [
  { id:"battery",      name:"Battery",   emoji:"🔋", SvgComp:BatterySVG, accent:"red",   color:"#ef4444", hint:"Provides 9V power to the whole circuit. Red wire to VIN, black wire to GND." },
  { id:"arduino",      name:"Arduino",   emoji:"🧠", SvgComp:ArduinoSVG, accent:"blue",  color:"#3b82f6", hint:"The brain — it runs your code and sends signals to the motor driver." },
  { id:"motor-driver", name:"L298N",     emoji:"⚡", SvgComp:DriverSVG,  accent:"amber", color:"#f59e0b", hint:"Motor controller bridge. Receives PWM signals and drives both motors." },
  { id:"motors",       name:"2× Motors", emoji:"🔄", SvgComp:MotorSVG,   accent:"green", color:"#22c55e", hint:"DC drive motors — left wheel on OUT1/2, right wheel on OUT3/4." },
] as const;

const SLOTS = [
  { id:"battery",      label:"Power Supply",    step:1, accepts:"battery"      },
  { id:"arduino",      label:"Microcontroller", step:2, accepts:"arduino"      },
  { id:"motor-driver", label:"Motor Driver",    step:3, accepts:"motor-driver" },
  { id:"motors",       label:"Drive Wheels",    step:4, accepts:"motors"       },
] as const;

const WIRES: [string,string,string][] = [
  ["battery","arduino","#ef4444"],
  ["arduino","motor-driver","#60a5fa"],
  ["motor-driver","motors","#4ade80"],
];

type PartId   = (typeof PARTS)[number]["id"];
type SlotId   = (typeof SLOTS)[number]["id"];
type AccentKey = "red"|"blue"|"amber"|"green";

const ACC: Record<AccentKey,{ bg:string;border:string;text:string;glow:string;solid:string }> = {
  red:   { bg:"bg-red-500/15",   border:"border-red-400",   text:"text-red-300",   glow:"shadow-red-500/25",   solid:"bg-red-500"   },
  blue:  { bg:"bg-blue-500/15",  border:"border-blue-400",  text:"text-blue-300",  glow:"shadow-blue-500/25",  solid:"bg-blue-500"  },
  amber: { bg:"bg-amber-500/15", border:"border-amber-400", text:"text-amber-300", glow:"shadow-amber-500/25", solid:"bg-amber-500" },
  green: { bg:"bg-green-500/15", border:"border-green-400", text:"text-green-300", glow:"shadow-green-500/25", solid:"bg-green-500" },
};

// ─── Build Phase ──────────────────────────────────────────────────────────────
function BuildPhase({ onComplete }:{ onComplete:()=>void }) {
  const [placed,  setPlaced]  = useState<Partial<Record<SlotId,PartId>>>({});
  const [dragging,setDragging]= useState<{id:PartId;x:number;y:number}|null>(null);
  const [hint,    setHint]    = useState("👆 Drag the Battery to the Power Supply slot first!");
  const [flash,   setFlash]   = useState<string|null>(null);
  const [wrong,   setWrong]   = useState<string|null>(null);

  const placedIds = new Set(Object.values(placed));
  const avail     = PARTS.filter(p => !placedIds.has(p.id));
  const count     = Object.keys(placed).length;
  const done      = count === SLOTS.length;

  const startDrag = (e:React.PointerEvent, id:PartId) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging({id,x:e.clientX,y:e.clientY});
    setHint("💡 "+PARTS.find(p=>p.id===id)!.hint);
  };

  const onMove = (e:React.PointerEvent) => {
    if (dragging) setDragging(d=>d?{...d,x:e.clientX,y:e.clientY}:null);
  };

  const onUp = (e:React.PointerEvent) => {
    if (!dragging) return;
    const hits = document.elementsFromPoint(e.clientX,e.clientY);
    let slotId:string|null=null;
    for (const el of hits){ const s=(el as HTMLElement).dataset?.slotId; if(s){slotId=s;break;} }
    if (slotId) {
      const slot = SLOTS.find(s=>s.id===slotId);
      if (slot?.accepts===dragging.id && !placed[slotId as SlotId]) {
        setPlaced(p=>({...p,[slotId!]:dragging.id}));
        setFlash(slotId); setTimeout(()=>setFlash(null),600);
        const rem = SLOTS.length - count - 1;
        const next = SLOTS.find(s=>!placed[s.id]&&s.id!==slotId);
        setHint(rem===0 ? "🎉 Perfect circuit! Hit Start Engine to drive!" : `✅ Nailed it! ${rem} part${rem>1?"s":""} left — next: ${next?.label}`);
      } else {
        setWrong(slotId); setTimeout(()=>setWrong(null),600);
        const correct = SLOTS.find(s=>s.accepts===dragging.id);
        setHint(`❌ Wrong slot! "${PARTS.find(p=>p.id===dragging.id)?.name}" belongs in "${correct?.label}".`);
      }
    }
    setDragging(null);
  };

  return (
    <div className="flex flex-col h-full" onPointerMove={onMove} onPointerUp={onUp}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white font-bold text-xl sm:text-2xl tracking-tight">Build Your Robot Car 🤖</h1>
            <p className="text-white/35 text-xs mt-0.5">Drag each component onto the matching circuit slot</p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <p className="text-2xl font-bold text-cyan-400 tabular-nums">{count}<span className="text-white/20 text-sm font-normal">/{SLOTS.length}</span></p>
            <p className="text-white/25 text-[10px]">placed</p>
          </div>
        </div>
        {/* Progress steps */}
        <div className="flex gap-2 mt-3">
          {SLOTS.map((s)=>{
            const part = PARTS.find(p=>p.id===s.accepts)!;
            const isPlaced = !!placed[s.id];
            const a = ACC[part.accent as AccentKey];
            return (
              <div key={s.id} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${isPlaced ? a.solid : "bg-white/8"}`}/>
                <p className={`text-[9px] font-semibold mt-1 transition-colors ${isPlaced ? a.text : "text-white/20"}`}>
                  {isPlaced ? "✓" : s.step+"."}  {part.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-5 gap-3 min-h-0 pb-5">
        {/* Circuit Board */}
        <div className="relative rounded-2xl overflow-hidden border border-green-900/60"
          style={{ minHeight: "clamp(320px, 55vh, 480px)", background:"linear-gradient(135deg,#052e16 0%,#083720 60%,#052e16 100%)" }}>
          {/* PCB grid */}
          <div className="absolute inset-0 opacity-[0.1]"
            style={{backgroundImage:"linear-gradient(rgba(74,222,128,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.8) 1px,transparent 1px)",backgroundSize:"18px 18px"}}/>
          {/* PCB label */}
          <div className="absolute top-2 left-3 text-green-500/25 text-[8px] font-mono font-bold tracking-widest">RoboFlight PCB v1.0</div>
          <div className="absolute top-2 right-3 text-green-500/25 text-[8px] font-mono">REV-A</div>
          {/* Corner mounting holes */}
          {[[3,5],[97,5],[3,94],[97,94]].map(([x,y],i)=>(
            <div key={i} className="absolute w-3 h-3 rounded-full border border-green-500/20 bg-black/30"
              style={{left:`${x}%`,top:`${y}%`,transform:"translate(-50%,-50%)"}}/>
          ))}

          {/* Wire SVG layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {WIRES.map(([from,to,color])=>{
              const lit = placed[from as SlotId] && placed[to as SlotId];
              const fi  = SLOTS.findIndex(s=>s.id===from);
              const ti  = SLOTS.findIndex(s=>s.id===to);
              const total = SLOTS.length;
              const fy = ((fi+1)/(total+1))*100;
              const ty = ((ti+1)/(total+1))*100;
              return (
                <g key={from+to}>
                  {/* Copper trace background */}
                  <line x1="50%" y1={`${fy}%`} x2="50%" y2={`${ty}%`}
                    stroke="#78350f" strokeWidth="6" opacity="0.4"/>
                  {/* Signal wire */}
                  <line x1="50%" y1={`${fy}%`} x2="50%" y2={`${ty}%`}
                    stroke={lit?color:"#166534"}
                    strokeWidth={lit?"3":"2"}
                    strokeDasharray={lit?"0":"7,5"}
                    opacity={lit?1:0.4}
                    className="transition-all duration-600"/>
                  {/* Glow when lit */}
                  {lit && <line x1="50%" y1={`${fy}%`} x2="50%" y2={`${ty}%`}
                    stroke={color} strokeWidth="6" opacity="0.15" filter="url(#blur)"/>}
                </g>
              );
            })}
            <defs>
              <filter id="blur"><feGaussianBlur stdDeviation="3"/></filter>
            </defs>
          </svg>

          {/* Slots */}
          <div className="absolute inset-0 flex flex-col justify-around py-4 px-5">
            {SLOTS.map(slot=>{
              const pp      = placed[slot.id] ? PARTS.find(p=>p.id===placed[slot.id]) : null;
              const part    = PARTS.find(p=>p.id===slot.accepts)!;
              const a       = ACC[part.accent as AccentKey];
              const isTarget= dragging?.id===slot.accepts && !placed[slot.id];
              const isWrong = wrong===slot.id;
              const isFlash = flash===slot.id;
              const SvgComp = part.SvgComp;
              return (
                <div key={slot.id} className="flex items-center gap-3">
                  {/* Step number */}
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${pp ? `${a.solid} text-white shadow-md ${a.glow}` : "bg-black/30 text-white/20 border border-white/10"}`}>
                    {pp ? "✓" : slot.step}
                  </div>
                  {/* Slot card */}
                  <div data-slot-id={slot.id}
                    className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-default ${
                      pp      ? `${a.bg} ${a.border} shadow-lg ${a.glow} ${isFlash?"scale-[1.03]":""}`
                      :isTarget? `${a.bg} ${a.border} scale-[1.02] shadow-xl ${a.glow}`
                      :isWrong ? "bg-red-500/10 border-red-400 scale-[1.02]"
                      :          "bg-black/20 border-dashed border-green-900/60 hover:border-green-700/50"
                    }`}
                  >
                    {/* Component SVG */}
                    <div className={`flex-shrink-0 ${pp ? "" : "opacity-20"}`}>
                      <SvgComp/>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-bold leading-none mb-0.5 ${pp?a.text:"text-white/25"}`}>
                        {pp ? pp.name : slot.label}
                      </p>
                      <p className={`text-[10px] ${pp ? a.text+" opacity-60" : "text-white/15"}`}>
                        {pp ? "Connected ✓" : "Drop component here"}
                      </p>
                    </div>
                    {isTarget && <span className={`text-xs font-bold ${a.text} animate-pulse flex-shrink-0`}>← Drop!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parts tray */}
        <div className="flex-shrink-0">
          <p className="text-white/25 text-[10px] uppercase tracking-widest font-bold mb-2">🧰 Components Tray</p>
          {avail.length===0
            ? <div className="py-3 text-center text-green-400 text-xs font-semibold">All components installed! 🎉</div>
            : (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {avail.map(part=>{
                  const a = ACC[part.accent as AccentKey];
                  const SvgComp = part.SvgComp;
                  return (
                    <div key={part.id}
                      onPointerDown={e=>startDrag(e,part.id)}
                      className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all active:scale-95 touch-none select-none cursor-grab active:cursor-grabbing ${a.bg} ${a.border} hover:scale-[1.03] shadow-md ${a.glow}`}
                    >
                      <SvgComp/>
                      <div className="text-center">
                        <p className={`text-[11px] font-bold ${a.text}`}>{part.name}</p>
                        <p className="text-white/20 text-[9px] leading-none">drag me ↑</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>

        {/* Hint bar */}
        <div className="flex-shrink-0 flex items-start gap-3 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
          <span className="text-base flex-shrink-0 mt-0.5">💡</span>
          <p className="text-white/55 text-xs leading-relaxed">{hint}</p>
        </div>

        {/* CTA */}
        {done && (
          <button onClick={onComplete}
            className="flex-shrink-0 w-full py-4 rounded-2xl font-bold text-base text-white cursor-pointer shadow-xl shadow-blue-500/30 animate-pulse transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{background:"linear-gradient(135deg,#2563eb,#06b6d4)"}}>
            🚀 Start Engine! Let&apos;s Drive!
          </button>
        )}
      </div>

      {/* Drag ghost */}
      {dragging&&(()=>{
        const p=PARTS.find(x=>x.id===dragging.id);
        const a=p?ACC[p.accent as AccentKey]:null;
        if(!p||!a) return null;
        const SvgComp=p.SvgComp;
        return (
          <div className={`fixed pointer-events-none z-50 flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl border shadow-2xl opacity-95 -translate-x-1/2 -translate-y-1/2 ${a.bg} ${a.border}`}
            style={{left:dragging.x,top:dragging.y}}>
            <SvgComp/>
            <span className={`text-[11px] font-bold ${a.text}`}>{p.name}</span>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Top-Down SVGs ────────────────────────────────────────────────────────────
function TopCarSVG({ angle, stopped }: { angle: number; stopped: boolean }) {
  return (
    <div style={{ transform: `rotate(${angle}deg)`, transition: "transform 0.08s linear", willChange: "transform" }}>
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
const STOP_PX    = 32;   // auto-stop distance (reduced — more forgiving)

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
const SIGNS = [0,200,400].map((y,i)=>({y, label:`KM ${i+1}`}));

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
    // Keyboard controls (arrow keys + WASD)
    const keyMap: Record<string, keyof typeof keysRef.current> = {
      ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right",
      w:"up", s:"down", a:"left", d:"right",
      W:"up", S:"down", A:"left", D:"right",
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const k = keyMap[e.key];
      if (k) { e.preventDefault(); keysRef.current[k] = true; }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = keyMap[e.key];
      if (k) keysRef.current[k] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);

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
        if (Math.abs(ob.worldX - cx) < 22) {
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

    return () => { clearInterval(loop); clearInterval(spawnInt); window.removeEventListener("keydown", onKeyDown); window.removeEventListener("keyup", onKeyUp); };
  }, []);

  const press   = (d: keyof typeof keysRef.current) => { keysRef.current[d] = true; };
  const release = (d: keyof typeof keysRef.current) => { keysRef.current[d] = false; };

  const speedKm   = Math.abs(Math.round(speed * 20));
  const sensorPct = Math.max(0, Math.min(100, (sensorDist / SENSOR_PX) * 100));
  const dashOff   = scrollY % 80;
  const grassOff  = scrollY % 40;

  // World-to-screen transform (car always at center)
  const w2sx = (wx: number) => 200 + wx - carXRef.current;

  return (
    <div className="flex flex-col h-full">
      {/* ─── SCENE: fully top-down ─────────────────────── */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden border border-slate-700 flex-shrink-0 relative"
        style={{ height:300, background:"#1a2e1a" }}>

        {/* === Grass background with mowing stripes === */}
        <div className="absolute inset-0" style={{
          background:`repeating-linear-gradient(0deg,
            #1e3a1e 0px, #1e3a1e ${20 - (grassOff % 20)}px,
            #22422a ${20 - (grassOff % 20)}px, #22422a ${40 - (grassOff % 20)}px)`
        }}/>

        {/* === Grass detail patches (stationary texture) === */}
        {[30,90,160,230,290,370].map((x,i)=>(
          <div key={'gp'+i} className="absolute rounded-full bg-green-900/20 pointer-events-none"
            style={{ left: x, top: ((i * 44 - scrollY * 0.8) % 280 + 280) % 280, width: 8 + (i%3)*4, height: 5 + (i%3)*3 }}/>
        ))}

        {/* === Road surface === */}
        <div className="absolute top-0 bottom-0 bg-slate-700"
          style={{ left: `calc(50% - ${ROAD_HALF}px + ${-carXRef.current * 0.08}px)`, width: ROAD_HALF * 2 }}>

          {/* Road texture (asphalt grain via repeating dots) */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage:"radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize:"8px 8px" }}/>

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
              left: `calc(50% - 18px + ${carXOff - carXRef.current * 0.08}px)`,
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
                background: `radial-gradient(circle at 38% 33%, #16a34a, #14532d 70%)`,
                boxShadow: `${t.r*0.25}px ${t.r*0.35}px ${t.r*0.5}px rgba(0,0,0,0.55)`,
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
              style={{ right: `calc(50% + ${ROAD_HALF + 6}px)`, top: sy - 10 }}>
              <div className="w-1.5 h-8 bg-slate-500 rounded-full"/>
              <div className="px-1.5 py-0.5 bg-green-800 border border-green-600 rounded text-[8px] font-bold text-green-300 whitespace-nowrap">
                {s.label}
              </div>
            </div>
          );
        })}

        {/* === Car (always centered) === */}
        <div className="absolute" style={{ left: `calc(50% - 18px + ${(carXOff - carXRef.current * 0.08)}px)`, top: 120 }}>
          <TopCarSVG angle={carAngle} stopped={stopped}/>
        </div>

        {/* === Speed motion lines (fast) === */}
        {speedKm > 40 && [0,1,2,3].map(i => (
          <div key={i} className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: 20 + i * 12,
              background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.07),transparent)",
              animation: `speedLine ${0.4 - i*0.04}s linear infinite`,
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
          <span className={`text-[10px] font-bold ${sensorDist < 80 ? "text-red-400 animate-pulse" : "text-green-400"}`}>
            {sensorDist > 300 ? "Road clear" : sensorDist + " cm"}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-150"
            style={{ width:`${sensorPct}%`, background: sensorPct<40?"#ef4444":sensorPct<65?"#f59e0b":"#22c55e" }}/>
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
            <p className={`font-bold text-xs mt-0.5 ${s.c}`}>{s.val}</p>
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
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${t.color}`}/>
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
      <style>{`
        @keyframes speedLine { from{opacity:0.5;transform:translateY(-100%)} to{opacity:0;transform:translateY(100%)} }
      `}</style>
    </div>
  );
}


// ─── Cookie helpers ───────────────────────────────────────────────────────────
const COOKIE = "rf_trial_used";
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find(r => r.startsWith(name + "="))?.split("=")[1] ?? null;
}
function setCookie(name: string, days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=1; expires=${exp}; path=/; SameSite=Lax`;
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
          <Link href="/#contact"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/30 cursor-pointer mb-3"
            style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}>
            Start Learning With Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BuildPage() {
  const [phase,   setPhase]   = useState<"build" | "drive">("build");
  // AD GATE DISABLED FOR TESTING

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
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${phase === p ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/20" : "text-white/20"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${phase === p ? "bg-cyan-400" : "bg-white/15"}`} />
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

      {/* Ad Gate — disabled for testing */}
    </div>
  );
}
