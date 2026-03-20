const fs = require('fs');
const path = require('path');

const page = `"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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

// ─── Joystick ─────────────────────────────────────────────────────────────────
function Joystick({ onChange }: { onChange:(x:number,y:number)=>void }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [dot,setDot]     = useState({x:0,y:0});
  const [active,setAct]  = useState(false);
  const isActive = useRef(false);
  const R = 48;

  const move = useCallback((cx:number,cy:number) => {
    if (!baseRef.current) return;
    const r = baseRef.current.getBoundingClientRect();
    let dx = cx-(r.left+r.width/2), dy = cy-(r.top+r.height/2);
    const d = Math.hypot(dx,dy);
    if (d>R){ dx=(dx/d)*R; dy=(dy/d)*R; }
    setDot({x:dx,y:dy});
    onChange(dx/R,dy/R);
  },[onChange]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-white/30 text-[9px] uppercase tracking-widest font-bold">Joystick</span>
      <div ref={baseRef}
        className="relative rounded-full bg-slate-800 border-2 border-slate-700 touch-none select-none flex-shrink-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]"
        style={{width:128,height:128}}
        onPointerDown={e=>{ isActive.current=true; setAct(true); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); move(e.clientX,e.clientY); }}
        onPointerMove={e=>{ if(isActive.current) move(e.clientX,e.clientY); }}
        onPointerUp={()=>{ isActive.current=false; setAct(false); setDot({x:0,y:0}); onChange(0,0); }}
        onPointerCancel={()=>{ isActive.current=false; setAct(false); setDot({x:0,y:0}); onChange(0,0); }}
      >
        <span className="absolute top-2    left-1/2 -translate-x-1/2 text-white/20 text-sm select-none">▲</span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/20 text-sm select-none">▼</span>
        <span className="absolute left-2   top-1/2  -translate-y-1/2 text-white/20 text-sm select-none">◀</span>
        <span className="absolute right-2  top-1/2  -translate-y-1/2 text-white/20 text-sm select-none">▶</span>
        <div className="absolute inset-5 rounded-full border border-slate-700/60"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full shadow-xl"
            style={{
              background: active ? "radial-gradient(circle at 35% 35%,#67e8f9,#06b6d4)" : "radial-gradient(circle at 35% 35%,#64748b,#334155)",
              boxShadow: active ? "0 4px 20px rgba(34,211,238,0.5)" : "0 4px 12px rgba(0,0,0,0.6)",
              transform:\`translate(\${dot.x}px,\${dot.y}px)\`,
              transition: isActive.current ? "background 0.1s,box-shadow 0.1s" : "transform 0.2s,background 0.1s",
            }}
          />
        </div>
      </div>
    </div>
  );
}

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
        setHint(rem===0 ? "🎉 Perfect circuit! Hit Start Engine to drive!" : \`✅ Nailed it! \${rem} part\${rem>1?"s":""} left — next: \${next?.label}\`);
      } else {
        setWrong(slotId); setTimeout(()=>setWrong(null),600);
        const correct = SLOTS.find(s=>s.accepts===dragging.id);
        setHint(\`❌ Wrong slot! "\${PARTS.find(p=>p.id===dragging.id)?.name}" belongs in "\${correct?.label}".\`);
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
                <div className={\`h-1.5 rounded-full transition-all duration-500 \${isPlaced ? a.solid : "bg-white/8"}\`}/>
                <p className={\`text-[9px] font-semibold mt-1 transition-colors \${isPlaced ? a.text : "text-white/20"}\`}>
                  {isPlaced ? "✓" : s.step+"."}  {part.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-5 gap-3 min-h-0 pb-5">
        {/* Circuit Board */}
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-green-900/60 min-h-52"
          style={{background:"linear-gradient(135deg,#052e16 0%,#083720 60%,#052e16 100%)"}}>
          {/* PCB grid */}
          <div className="absolute inset-0 opacity-[0.1]"
            style={{backgroundImage:"linear-gradient(rgba(74,222,128,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.8) 1px,transparent 1px)",backgroundSize:"18px 18px"}}/>
          {/* PCB label */}
          <div className="absolute top-2 left-3 text-green-500/25 text-[8px] font-mono font-bold tracking-widest">RoboFlight PCB v1.0</div>
          <div className="absolute top-2 right-3 text-green-500/25 text-[8px] font-mono">REV-A</div>
          {/* Corner mounting holes */}
          {[[3,5],[97,5],[3,94],[97,94]].map(([x,y],i)=>(
            <div key={i} className="absolute w-3 h-3 rounded-full border border-green-500/20 bg-black/30"
              style={{left:\`\${x}%\`,top:\`\${y}%\`,transform:"translate(-50%,-50%)"}}/>
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
                  <line x1="50%" y1={\`\${fy}%\`} x2="50%" y2={\`\${ty}%\`}
                    stroke="#78350f" strokeWidth="6" opacity="0.4"/>
                  {/* Signal wire */}
                  <line x1="50%" y1={\`\${fy}%\`} x2="50%" y2={\`\${ty}%\`}
                    stroke={lit?color:"#166534"}
                    strokeWidth={lit?"3":"2"}
                    strokeDasharray={lit?"0":"7,5"}
                    opacity={lit?1:0.4}
                    className="transition-all duration-600"/>
                  {/* Glow when lit */}
                  {lit && <line x1="50%" y1={\`\${fy}%\`} x2="50%" y2={\`\${ty}%\`}
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
                  <div className={\`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300 \${pp ? \`\${a.solid} text-white shadow-md \${a.glow}\` : "bg-black/30 text-white/20 border border-white/10"}\`}>
                    {pp ? "✓" : slot.step}
                  </div>
                  {/* Slot card */}
                  <div data-slot-id={slot.id}
                    className={\`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-default \${
                      pp      ? \`\${a.bg} \${a.border} shadow-lg \${a.glow} \${isFlash?"scale-[1.03]":""}\`
                      :isTarget? \`\${a.bg} \${a.border} scale-[1.02] shadow-xl \${a.glow}\`
                      :isWrong ? "bg-red-500/10 border-red-400 scale-[1.02]"
                      :          "bg-black/20 border-dashed border-green-900/60 hover:border-green-700/50"
                    }\`}
                  >
                    {/* Component SVG */}
                    <div className={\`flex-shrink-0 \${pp ? "" : "opacity-20"}\`}>
                      <SvgComp/>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={\`text-xs font-bold leading-none mb-0.5 \${pp?a.text:"text-white/25"}\`}>
                        {pp ? pp.name : slot.label}
                      </p>
                      <p className={\`text-[10px] \${pp ? a.text+" opacity-60" : "text-white/15"}\`}>
                        {pp ? "Connected ✓" : "Drop component here"}
                      </p>
                    </div>
                    {isTarget && <span className={\`text-xs font-bold \${a.text} animate-pulse flex-shrink-0\`}>← Drop!</span>}
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
                      className={\`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all active:scale-95 touch-none select-none cursor-grab active:cursor-grabbing \${a.bg} \${a.border} hover:scale-[1.03] shadow-md \${a.glow}\`}
                    >
                      <SvgComp/>
                      <div className="text-center">
                        <p className={\`text-[11px] font-bold \${a.text}\`}>{part.name}</p>
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
          <div className={\`fixed pointer-events-none z-50 flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl border shadow-2xl opacity-95 -translate-x-1/2 -translate-y-1/2 \${a.bg} \${a.border}\`}
            style={{left:dragging.x,top:dragging.y}}>
            <SvgComp/>
            <span className={\`text-[11px] font-bold \${a.text}\`}>{p.name}</span>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Obstacle types ───────────────────────────────────────────────────────────
type Obstacle = { id:number; pct:number; type:"cone"|"rock"|"barrel"; lane:number };
let obsIdCounter = 0;

function ObstacleSVG({ type }:{ type:Obstacle["type"] }) {
  if (type==="cone") return (
    <svg width="24" height="30" viewBox="0 0 24 30">
      <polygon points="12,2 22,28 2,28" fill="#f97316"/>
      <rect x="1" y="24" width="22" height="4" rx="2" fill="#fb923c"/>
      <rect x="4" y="16" width="16" height="3" rx="1" fill="white" opacity="0.7"/>
    </svg>
  );
  if (type==="rock") return (
    <svg width="32" height="24" viewBox="0 0 32 24">
      <ellipse cx="16" cy="16" rx="14" ry="8" fill="#475569"/>
      <ellipse cx="12" cy="12" rx="10" ry="6" fill="#64748b"/>
      <ellipse cx="10" cy="10" rx="5" ry="3" fill="#94a3b8" opacity="0.5"/>
    </svg>
  );
  return (
    <svg width="28" height="32" viewBox="0 0 28 32">
      <rect x="4" y="8" width="20" height="22" rx="3" fill="#78350f"/>
      <rect x="6" y="10" width="16" height="18" rx="2" fill="#92400e"/>
      <rect x="8" y="2" width="12" height="10" rx="2" fill="#b45309"/>
      <line x1="14" y1="0" x2="14" y2="28" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/>
      <line x1="4" y1="8" x2="24" y2="8" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

// ─── Road Scene ───────────────────────────────────────────────────────────────
function CarSVG({ spinning, flashing }:{ spinning:boolean; flashing:boolean }) {
  return (
    <svg width="150" height="84" viewBox="0 0 150 84">
      <rect x="8"  y="34" width="134" height="38" rx="13" fill={flashing?"#ef4444":"#1d4ed8"}/>
      <rect x="32" y="14" width="82"  height="30" rx="10" fill={flashing?"#dc2626":"#2563eb"}/>
      <rect x="40" y="18" width="26"  height="20" rx="5"  fill="#bae6fd" opacity="0.9"/>
      <rect x="84" y="18" width="26"  height="20" rx="5"  fill="#bae6fd" opacity="0.9"/>
      <rect x="138" y="40" width="9"  height="9"  rx="3"  fill="#fef08a"/>
      <rect x="3"   y="40" width="9"  height="9"  rx="3"  fill="#fca5a5"/>
      <circle cx="40"  cy="73" r="12" fill="#0f172a"/>
      <circle cx="40"  cy="73" r="6"  fill="#334155"/>
      <circle cx="110" cy="73" r="12" fill="#0f172a"/>
      <circle cx="110" cy="73" r="6"  fill="#334155"/>
      <line x1="110" y1="67" x2="110" y2="79" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="104" y1="73" x2="116" y2="73" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="40"  y1="67" x2="40"  y2="79" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="34"  y1="73" x2="46"  y2="73" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="107" y1="14" x2="107" y2="3" stroke="#22d3ee" strokeWidth="2.5"/>
      <circle cx="107" cy="2" r="3.5" fill="#22d3ee"/>
      <circle cx="60"  cy="43" r="3.5" fill="#22d3ee" opacity="0.7"/>
      <circle cx="75"  cy="43" r="3.5" fill="#22d3ee" opacity="0.7"/>
      <circle cx="90"  cy="43" r="3.5" fill="#22d3ee" opacity="0.7"/>
    </svg>
  );
}
function TreeSVG({h=1}:{h?:number}) {
  return (
    <svg width={36*h} height={55*h} viewBox="0 0 36 55" style={{flexShrink:0}}>
      <rect x="14" y="40" width="8" height="15" fill="#78350f"/>
      <polygon points="18,2 34,40 2,40" fill="#14532d"/>
      <polygon points="18,12 30,40 6,40"  fill="#166534"/>
    </svg>
  );
}
function CloudSVG({s=1}:{s?:number}) {
  return (
    <svg width={90*s} height={44*s} viewBox="0 0 90 44">
      <ellipse cx="45" cy="30" rx="40" ry="15" fill="white" opacity="0.9"/>
      <ellipse cx="28" cy="24" rx="20" ry="14" fill="white" opacity="0.9"/>
      <ellipse cx="60" cy="22" rx="18" ry="13" fill="white" opacity="0.9"/>
    </svg>
  );
}

// ─── Drive Phase ──────────────────────────────────────────────────────────────
function DrivePhase({ onReset }:{ onReset:()=>void }) {
  const [speed,    setSpeed]   = useState(0);
  const [joy,      setJoy]     = useState({x:0,y:0});
  const [carX,     setCarX]    = useState(0);
  const [scanning, setScanning]= useState(false);
  const [spinning, setSpinning]= useState(false);
  const [honk,     setHonk]    = useState(false);
  const [avoiding, setAvoiding]= useState(false);
  const [carY,     setCarY]    = useState(0);
  const [sensor,   setSensor]  = useState("Clear");
  const [obstacles,setObstacles]= useState<Obstacle[]>([]);
  const [score,    setScore]   = useState(0);
  const [hit,      setHit]     = useState(false);
  const [warnObs,  setWarnObs] = useState(false);

  const speedRef   = useRef(speed);
  const avoidRef   = useRef(avoiding);
  const carYRef    = useRef(carY);
  speedRef.current = speed;
  avoidRef.current = avoiding;
  carYRef.current  = carY;

  const handleJoy = useCallback((x:number,y:number)=>{
    setJoy({x,y});
    setCarX(x*100);
  },[]);

  // Obstacle game loop
  useEffect(()=>{
    const tick = setInterval(()=>{
      const spd = speedRef.current;
      if (spd===0) return;
      setObstacles(prev=>{
        const step = spd * 1.2;
        const updated = prev.map(o=>({...o,pct:o.pct-step}));
        // Check collision
        for (const o of updated) {
          if (o.pct>42&&o.pct<58) {
            if (!avoidRef.current) {
              setHit(true); setTimeout(()=>setHit(false),600);
            } else {
              if (o.pct>49&&o.pct<51) {
                setScore(s=>s+1);
              }
            }
          }
          if (o.pct<36&&o.pct>34) {
            setSensor(avoidRef.current?"Clear":"⚠ Obstacle!");
          }
        }
        // Warn when obstacle is close
        const close = updated.find(o=>o.pct>50&&o.pct<70);
        setWarnObs(!!close);
        if (close) setSensor("⚠ Obstacle!");
        else setSensor("Clear");
        return updated.filter(o=>o.pct>-15);
      });
    },100);

    // Spawn obstacles
    const TYPES:Obstacle["type"][] = ["cone","rock","barrel"];
    const spawn = setInterval(()=>{
      if (speedRef.current===0) return;
      setObstacles(prev=>[...prev,{
        id:++obsIdCounter,
        pct:105,
        type:TYPES[Math.floor(Math.random()*TYPES.length)],
        lane:0,
      }]);
    }, Math.max(2200,5000-speed*250));

    return ()=>{ clearInterval(tick); clearInterval(spawn); };
  },[speed]);

  // Avoid = jump
  const doAvoid = () => {
    if (avoiding) return;
    setAvoiding(true);
    setCarY(-52);
    setTimeout(()=>{ setCarY(0); setAvoiding(false); },900);
  };

  const doScan  = ()=>{ setScanning(true);  setTimeout(()=>setScanning(false),  1800); };
  const doSpin  = ()=>{ setSpinning(true);  setTimeout(()=>setSpinning(false),   800); };
  const doHonk  = ()=>{ setHonk(true);      setTimeout(()=>setHonk(false),       800); };

  const roadDur = speed>0 ? Math.max(0.14,2.3-speed*0.20) : 99;
  const treeDur = roadDur*2.8;

  const dirLabel = ()=>{
    if (joy.y<-0.25) return "⬆ Forward";
    if (joy.y> 0.25) return "⬇ Reverse";
    if (joy.x> 0.25) return "➡ Right";
    if (joy.x<-0.25) return "⬅ Left";
    return speed>0 ? "⬆ Forward" : "— Stop";
  };

  return (
    <div className="flex flex-col h-full">
      <style>{\`
        @keyframes roadScroll  { to{transform:translateX(-33.33%)} }
        @keyframes treesScroll { to{transform:translateX(-33.33%)} }
        @keyframes scanPulse   { 0%,100%{opacity:.8;transform:scale(1)} 50%{opacity:0;transform:scale(2.4)} }
        @keyframes carShake    { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
      \`}</style>

      {/* Score bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs font-semibold">Obstacles avoided:</span>
          <span className="text-cyan-400 font-bold text-sm">{score}</span>
        </div>
        {warnObs && <span className="text-red-400 text-xs font-bold animate-pulse">⚠ OBSTACLE AHEAD — Press Avoid!</span>}
      </div>

      {/* Road scene */}
      <div className="relative mx-4 mt-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0" style={{height:"clamp(180px,36vw,250px)"}}>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200"/>
        <div className="absolute top-3 left-6  animate-float" style={{animationDuration:"9s"}}><CloudSVG s={0.9}/></div>
        <div className="absolute top-2 right-8 animate-float" style={{animationDuration:"12s",animationDelay:"3s"}}><CloudSVG s={0.7}/></div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-green-700 to-green-600"/>
        {/* Trees */}
        <div className="absolute pointer-events-none flex gap-14"
          style={{bottom:"80px",animation:\`treesScroll \${treeDur}s linear infinite\`,animationPlayState:speed>0?"running":"paused",width:"300%",willChange:"transform"}}>
          {[...Array(18)].map((_,i)=><div key={i} style={{flexShrink:0}}><TreeSVG h={0.7+(i%5)*0.1}/></div>)}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[82px] bg-gradient-to-t from-slate-600 to-slate-700"/>
        <div className="absolute bottom-[82px] inset-x-0 h-px bg-amber-400/40"/>
        {/* Road dashes */}
        <div className="absolute bottom-7 inset-x-0 overflow-hidden h-4 flex items-center">
          <div className="flex gap-6"
            style={{animation:\`roadScroll \${roadDur}s linear infinite\`,animationPlayState:speed>0?"running":"paused",width:"300%",willChange:"transform"}}>
            {[...Array(42)].map((_,i)=><div key={i} className="flex-shrink-0 w-12 h-2.5 rounded-full bg-amber-400"/>)}
          </div>
        </div>

        {/* Obstacles on road */}
        {obstacles.map(o=>(
          <div key={o.id}
            className="absolute pointer-events-none"
            style={{bottom:"76px",left:\`\${o.pct}%\`,transform:"translateX(-50%)",transition:"none",zIndex:10}}>
            <ObstacleSVG type={o.type}/>
          </div>
        ))}

        {/* Car */}
        <div className="absolute bottom-14 left-1/2 transition-none" style={{
          transform:\`translateX(calc(-50% + \${carX}px)) translateY(\${carY}px)\`,
          transition: spinning?"transform 0.6s":"transform 0.1s, background 0s",
          animation: hit?"carShake 0.4s ease-in-out":(spinning?"spin 0.6s linear":"none"),
          zIndex:20
        }}>
          <CarSVG spinning={spinning} flashing={hit}/>
          {honk&&<div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-black rounded-full whitespace-nowrap animate-bounce shadow-lg">📣 BEEP!</div>}
          {scanning&&(
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 h-24 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400" style={{animation:"scanPulse 1.6s ease-out infinite"}}/>
              <div className="absolute inset-4 rounded-full border border-cyan-300" style={{animation:"scanPulse 1.6s ease-out 0.35s infinite"}}/>
            </div>
          )}
        </div>
        {/* Speed HUD */}
        {speed>0&&<div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          {speed*12} km/h
        </div>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mx-4 mt-3">
        {[
          {label:"Speed",    val:speed>0?\`\${speed}/10\`:"0",           color:"text-cyan-400"},
          {label:"Direction",val:dirLabel(),                             color:"text-blue-400"},
          {label:"Score",    val:\`\${score} ✓\`,                        color:"text-green-400"},
          {label:"Sensor",   val:sensor, color:sensor.includes("⚠")?"text-red-400 animate-pulse":"text-emerald-400"},
        ].map(s=>(
          <div key={s.label} className="bg-slate-800/80 rounded-xl p-2 text-center border border-white/6">
            <p className="text-white/30 text-[9px] font-semibold uppercase tracking-wide">{s.label}</p>
            <p className={\`font-bold text-xs sm:text-sm mt-0.5 truncate \${s.color}\`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Speed slider */}
      <div className="mx-4 mt-2 bg-slate-800/80 rounded-xl px-4 py-2.5 border border-white/6 flex items-center gap-3">
        <span className="text-white/40 text-xs font-semibold w-12 flex-shrink-0">Speed</span>
        <input type="range" min={0} max={10} value={speed}
          onChange={e=>setSpeed(+e.target.value)}
          className="flex-1 h-2 cursor-pointer rounded-full" style={{accentColor:"#22d3ee"}}/>
        <span className="text-cyan-400 font-bold text-sm w-4 text-right">{speed}</span>
      </div>

      {/* Controls */}
      <div className="flex items-start gap-3 mx-4 mt-2 mb-4">
        <Joystick onChange={handleJoy}/>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {([
            {label:"Scan",  emoji:"📡",fn:doScan,  on:scanning,from:"from-blue-600/40",  border:"border-blue-400/50",  text:"text-blue-300"},
            {label:"Avoid", emoji:"🦘", fn:doAvoid, on:avoiding,from:"from-green-600/40", border:"border-green-400/50", text:"text-green-300", hot:warnObs},
            {label:"Spin",  emoji:"🔃",fn:doSpin,  on:spinning,from:"from-purple-600/40",border:"border-purple-400/50",text:"text-purple-300"},
            {label:"Horn",  emoji:"📣",fn:doHonk,  on:honk,    from:"from-yellow-600/40",border:"border-yellow-400/50",text:"text-yellow-300"},
          ] as {label:string;emoji:string;fn:()=>void;on:boolean;from:string;border:string;text:string;hot?:boolean}[]).map(b=>(
            <button key={b.label} onClick={b.fn}
              className={\`py-3 rounded-xl border font-semibold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer bg-gradient-to-b to-white/3 \${b.on||(b.hot&&!b.on)?b.from+" "+b.border+" "+b.text+(b.hot?" scale-[1.05] shadow-lg shadow-green-500/20 animate-pulse":""): "from-white/5 border-white/10 text-white/50 hover:border-white/20 hover:from-white/8"}\`}>
              <span className="text-xl leading-none">{b.emoji}</span>
              <span className="text-[11px] font-bold">{b.label}</span>
              {b.label==="Avoid"&&<span className="text-[9px] opacity-60">jump over</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tip + Reset */}
      <div className="px-4 pb-5 flex items-center justify-between">
        <p className="text-white/20 text-[10px]">💡 Press Avoid when obstacle warning appears</p>
        <button onClick={onReset} className="text-white/20 hover:text-white/50 text-xs transition-colors cursor-pointer flex items-center gap-1 group">
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Rebuild
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BuildPage() {
  const [phase,setPhase] = useState<"build"|"drive">("build");

  return (
    <div className="min-h-screen flex flex-col" style={{background:"linear-gradient(160deg,#0f172a 0%,#0c1a2e 50%,#0f172a 100%)"}}>
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-white/2 backdrop-blur-sm flex-shrink-0">
        <Link href="/" className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Home
        </Link>
        <div className="flex items-center gap-2">
          {(["build","drive"] as const).map((p,i)=>(
            <div key={p} className="flex items-center gap-2">
              {i>0&&<div className="w-8 h-px bg-white/10"/>}
              <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all \${phase===p?"bg-cyan-400/15 text-cyan-300 border border-cyan-400/20":"text-white/20"}\`}>
                <span className={\`w-1.5 h-1.5 rounded-full \${phase===p?"bg-cyan-400":"bg-white/15"}\`}/>
                {p}
              </div>
            </div>
          ))}
        </div>
        <span className="text-white/20 text-[10px] font-bold uppercase tracking-wide">Arduino Car</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {phase==="build"
          ?<BuildPhase onComplete={()=>setPhase("drive")}/>
          :<DrivePhase onReset={()=>setPhase("build")}/>}
      </div>
    </div>
  );
}
`;

const outPath = path.join(__dirname, '..', 'app', 'build', 'page.tsx');
fs.writeFileSync(outPath, page, 'utf8');
console.log('Build page v3 written →', outPath);
