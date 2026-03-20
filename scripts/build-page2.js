const fs = require('fs');
const path = require('path');

const page = `"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARTS = [
  { id: "battery",      name: "Battery",    emoji: "🔋", color: "#ef4444", accent: "red",    hint: "Provides power! Connect + to VIN and − to GND on the Arduino." },
  { id: "arduino",      name: "Arduino",    emoji: "🧠", color: "#3b82f6", accent: "blue",   hint: "The brain! Your code lives here and controls every component." },
  { id: "motor-driver", name: "L298N",      emoji: "⚡", color: "#f59e0b", accent: "amber",  hint: "Motor controller — amplifies Arduino signals to spin both wheels." },
  { id: "motors",       name: "2× Motors",  emoji: "🔄", color: "#22c55e", accent: "green",  hint: "Drive wheels! Left motor → OUT1/2, right motor → OUT3/4." },
];

const SLOTS: { id: string; label: string; step: number; accepts: string }[] = [
  { id: "battery",      label: "Power Supply",   step: 1, accepts: "battery"      },
  { id: "arduino",      label: "Microcontroller", step: 2, accepts: "arduino"      },
  { id: "motor-driver", label: "Motor Driver",    step: 3, accepts: "motor-driver" },
  { id: "motors",       label: "Drive Wheels",    step: 4, accepts: "motors"       },
];

const WIRES: [string, string, string][] = [
  ["battery",      "arduino",      "#ef4444"],
  ["arduino",      "motor-driver", "#60a5fa"],
  ["motor-driver", "motors",       "#4ade80"],
];

const ACCENT_CLASSES: Record<string, { bg: string; border: string; text: string; glow: string; badge: string }> = {
  red:   { bg: "bg-red-500/15",   border: "border-red-400",   text: "text-red-300",   glow: "shadow-red-500/30",   badge: "bg-red-500" },
  blue:  { bg: "bg-blue-500/15",  border: "border-blue-400",  text: "text-blue-300",  glow: "shadow-blue-500/30",  badge: "bg-blue-500" },
  amber: { bg: "bg-amber-500/15", border: "border-amber-400", text: "text-amber-300", glow: "shadow-amber-500/30", badge: "bg-amber-500" },
  green: { bg: "bg-green-500/15", border: "border-green-400", text: "text-green-300", glow: "shadow-green-500/30", badge: "bg-green-500" },
};

// ─── SVG Car ──────────────────────────────────────────────────────────────────
function CarSVG({ spinning, avoiding }: { spinning: boolean; avoiding: boolean }) {
  return (
    <svg width="160" height="88" viewBox="0 0 160 88"
      style={{ transform: avoiding ? "translateY(-12px)" : undefined, transition: "transform 0.3s" }}
      className={spinning ? "animate-spin" : ""}
    >
      {/* Body */}
      <rect x="8"  y="36" width="144" height="40" rx="14" fill="#1d4ed8" />
      {/* Roof */}
      <rect x="34" y="16" width="88"  height="30" rx="10" fill="#2563eb" />
      {/* Windows */}
      <rect x="42" y="20" width="28"  height="20" rx="5"  fill="#bae6fd" opacity="0.9" />
      <rect x="90" y="20" width="28"  height="20" rx="5"  fill="#bae6fd" opacity="0.9" />
      {/* Headlights */}
      <rect x="146" y="42" width="10" height="9" rx="3" fill="#fef08a" />
      <rect x="4"   y="42" width="10" height="9" rx="3" fill="#fca5a5" />
      {/* Center stripe */}
      <line x1="80" y1="36" x2="80" y2="76" stroke="#1e40af" strokeWidth="2" />
      {/* Front wheel */}
      <circle cx="42"  cy="78" r="13" fill="#0f172a" />
      <circle cx="42"  cy="78" r="7"  fill="#334155" />
      {/* Back wheel */}
      <circle cx="118" cy="78" r="13" fill="#0f172a" />
      <circle cx="118" cy="78" r="7"  fill="#334155" />
      {/* Wheel spokes */}
      <line x1="118" y1="71" x2="118" y2="85" stroke="#94a3b8" strokeWidth="2" />
      <line x1="111" y1="78" x2="125" y2="78" stroke="#94a3b8" strokeWidth="2" />
      <line x1="42"  y1="71" x2="42"  y2="85" stroke="#94a3b8" strokeWidth="2" />
      <line x1="35"  y1="78" x2="49"  y2="78" stroke="#94a3b8" strokeWidth="2" />
      {/* Antenna */}
      <line x1="115" y1="16" x2="115" y2="4" stroke="#22d3ee" strokeWidth="2.5" />
      <circle cx="115" cy="3" r="4" fill="#22d3ee" />
      {/* LED dots */}
      <circle cx="67"  cy="46" r="4" fill="#22d3ee" opacity="0.7" />
      <circle cx="80"  cy="46" r="4" fill="#22d3ee" opacity="0.7" />
      <circle cx="93"  cy="46" r="4" fill="#22d3ee" opacity="0.7" />
    </svg>
  );
}

function TreeSVG({ h = 1 }: { h?: number }) {
  return (
    <svg width={36 * h} height={55 * h} viewBox="0 0 36 55" style={{ flexShrink: 0 }}>
      <rect x="14" y="40" width="8" height="15" fill="#78350f" />
      <polygon points="18,2 34,40 2,40" fill="#14532d" />
      <polygon points="18,12 30,40 6,40"  fill="#166534" />
    </svg>
  );
}

function CloudSVG({ scale = 1 }: { scale?: number }) {
  return (
    <svg width={90 * scale} height={44 * scale} viewBox="0 0 90 44">
      <ellipse cx="45" cy="30" rx="40" ry="15" fill="white" opacity="0.9" />
      <ellipse cx="28" cy="24" rx="20" ry="14" fill="white" opacity="0.9" />
      <ellipse cx="60" cy="22" rx="18" ry="13" fill="white" opacity="0.9" />
    </svg>
  );
}

// ─── Joystick ─────────────────────────────────────────────────────────────────
function Joystick({ onChange }: { onChange: (x: number, y: number) => void }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [dot, setDot]       = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const active = useRef(false);
  const R = 50;

  const move = useCallback((cx: number, cy: number) => {
    if (!baseRef.current) return;
    const r  = baseRef.current.getBoundingClientRect();
    let dx   = cx - (r.left + r.width  / 2);
    let dy   = cy - (r.top  + r.height / 2);
    const d  = Math.hypot(dx, dy);
    if (d > R) { dx = (dx / d) * R; dy = (dy / d) * R; }
    setDot({ x: dx, y: dy });
    onChange(dx / R, dy / R);
  }, [onChange]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Joystick</span>
      <div
        ref={baseRef}
        className="relative rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center touch-none select-none flex-shrink-0 shadow-inner"
        style={{ width: 130, height: 130 }}
        onPointerDown={e => { active.current = true; setPressed(true); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); move(e.clientX, e.clientY); }}
        onPointerMove={e => { if (active.current) move(e.clientX, e.clientY); }}
        onPointerUp={() => { active.current = false; setPressed(false); setDot({ x:0, y:0 }); onChange(0,0); }}
        onPointerCancel={() => { active.current = false; setPressed(false); setDot({ x:0, y:0 }); onChange(0,0); }}
      >
        {/* Direction arrows */}
        <span className="absolute top-2.5  left-1/2 -translate-x-1/2 text-white/25 text-sm select-none">▲</span>
        <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-white/25 text-sm select-none">▼</span>
        <span className="absolute left-2.5  top-1/2  -translate-y-1/2 text-white/25 text-sm select-none">◀</span>
        <span className="absolute right-2.5 top-1/2  -translate-y-1/2 text-white/25 text-sm select-none">▶</span>
        {/* Inner ring */}
        <div className="absolute inset-6 rounded-full border border-slate-700" />
        {/* Thumb */}
        <div
          className={\`absolute w-14 h-14 rounded-full shadow-xl transition-colors \${pressed ? "bg-cyan-400 shadow-cyan-400/40" : "bg-slate-600 shadow-slate-900/60"}\`}
          style={{ transform: \`translate(\${dot.x}px,\${dot.y}px)\`, transition: active.current ? "background-color 0.1s" : "transform 0.2s, background-color 0.1s" }}
        />
      </div>
    </div>
  );
}

// ─── Build Phase ──────────────────────────────────────────────────────────────
function BuildPhase({ onComplete }: { onComplete: () => void }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<{ id: string; x: number; y: number } | null>(null);
  const [hint,    setHint]    = useState("👆 Drag a part onto its matching slot — start with the Battery!");
  const [flash,   setFlash]   = useState<string | null>(null);
  const [wrong,   setWrong]   = useState<string | null>(null);

  const placedIds = new Set(Object.values(placed));
  const avail     = PARTS.filter(p => !placedIds.has(p.id));
  const count     = Object.keys(placed).length;
  const done      = count === SLOTS.length;

  const startDrag = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging({ id, x: e.clientX, y: e.clientY });
    setHint("💡 " + (PARTS.find(p => p.id === id)?.hint ?? ""));
  };

  const onMove = (e: React.PointerEvent) => {
    if (dragging) setDragging(d => d ? { ...d, x: e.clientX, y: e.clientY } : null);
  };

  const onUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const hits = document.elementsFromPoint(e.clientX, e.clientY);
    let slotId: string | null = null;
    for (const el of hits) {
      const s = (el as HTMLElement).dataset?.slotId;
      if (s) { slotId = s; break; }
    }
    if (slotId) {
      const slot = SLOTS.find(s => s.id === slotId);
      if (slot?.accepts === dragging.id && !placed[slotId]) {
        setPlaced(p => ({ ...p, [slotId]: dragging.id }));
        setFlash(slotId); setTimeout(() => setFlash(null), 600);
        const rem = SLOTS.length - count - 1;
        if (rem === 0) setHint("🎉 Amazing! All parts connected — hit Start Engine!");
        else { const next = SLOTS.find(s => !placed[s.id] && s.id !== slotId); setHint(\`✅ Nailed it! \${rem} more to go\${next ? " — next: " + next.label : ""}!\`); }
      } else {
        setWrong(slotId); setTimeout(() => setWrong(null), 600);
        const correct = SLOTS.find(s => s.accepts === dragging.id);
        setHint(\`❌ Wrong slot! Drop "\${PARTS.find(p=>p.id===dragging.id)?.name}" on "\${correct?.label}".\`);
      }
    }
    setDragging(null);
  };

  return (
    <div className="flex flex-col h-full" onPointerMove={onMove} onPointerUp={onUp}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-white font-bold text-xl sm:text-2xl tracking-tight">Build Your Robot Car 🤖</h1>
        <p className="text-white/40 text-xs mt-1">Drag each part onto its slot on the circuit board</p>
        {/* Step indicator */}
        <div className="flex gap-2 mt-3">
          {SLOTS.map((s, i) => {
            const isPlaced = !!placed[s.id];
            const part = PARTS.find(p => p.id === s.accepts);
            const acc = part ? ACCENT_CLASSES[part.accent] : null;
            return (
              <div key={s.id} className="flex-1 flex flex-col items-center gap-1">
                <div className={\`h-1.5 rounded-full w-full transition-all duration-500 \${isPlaced ? (acc ? acc.badge : "bg-white") : "bg-white/10"}\`} />
                <span className={\`text-[9px] font-semibold tracking-wide \${isPlaced ? "text-white/60" : "text-white/20"}\`}>Step {i+1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Board + Tray */}
      <div className="flex flex-col flex-1 px-5 gap-3 min-h-0">

        {/* Circuit Board */}
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/8 min-h-48"
          style={{ background: "linear-gradient(135deg, #0a2818 0%, #0d3321 50%, #0a2818 100%)" }}>
          {/* PCB grid pattern */}
          <div className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: "linear-gradient(rgba(74,222,128,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.6) 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
          {/* Corner pads */}
          {[[4,4],[4,90],[90,4],[90,90]].map(([x,y],i) => (
            <div key={i} className="absolute w-3 h-3 rounded-full border-2 border-green-500/40 bg-amber-700/30"
              style={{ left:\`\${x}%\`, top:\`\${y}%\`, transform:"translate(-50%,-50%)" }} />
          ))}
          {/* "PCB" label */}
          <div className="absolute top-2 left-3 text-green-500/20 text-[9px] font-mono font-bold tracking-widest uppercase">RoboFlight v1.0</div>

          {/* Wire lines between slots */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {WIRES.map(([from, to, color]) => {
              const lit = placed[from] && placed[to];
              const fi = SLOTS.findIndex(s=>s.id===from), ti = SLOTS.findIndex(s=>s.id===to);
              const total = SLOTS.length;
              const fy = ((fi+1)/(total+1))*100, ty = ((ti+1)/(total+1))*100;
              return (
                <line key={from+to}
                  x1="50%" y1={\`\${fy}%\`} x2="50%" y2={\`\${ty}%\`}
                  stroke={lit ? color : "#1e3a1e"}
                  strokeWidth={lit ? "3" : "2"}
                  strokeDasharray={lit ? "0" : "6,5"}
                  opacity={lit ? 1 : 0.5}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Slots */}
          <div className="absolute inset-0 flex flex-col justify-around py-4 px-6">
            {SLOTS.map(slot => {
              const pp     = placed[slot.id] ? PARTS.find(p => p.id === placed[slot.id]) : null;
              const part   = PARTS.find(p => p.id === slot.accepts)!;
              const acc    = ACCENT_CLASSES[part.accent];
              const isTarget = dragging?.id === slot.accepts && !placed[slot.id];
              const isWrong  = wrong === slot.id;
              const isFlash  = flash === slot.id;
              return (
                <div key={slot.id} className="flex items-center gap-3">
                  {/* Step badge */}
                  <div className={\`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold transition-all \${pp ? \`\${acc.badge} text-white shadow-lg \${acc.glow}\` : "bg-white/8 text-white/25"}\`}>
                    {pp ? "✓" : slot.step}
                  </div>
                  {/* Slot */}
                  <div
                    data-slot-id={slot.id}
                    className={\`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 \${
                      pp       ? \`\${acc.bg} \${acc.border} \${isFlash ? "scale-105" : ""} shadow-lg \${acc.glow}\`
                      : isTarget ? \`\${acc.bg} \${acc.border} scale-[1.02] shadow-xl \${acc.glow}\`
                      : isWrong  ? "bg-red-500/10 border-red-400 scale-[1.02]"
                      : "bg-white/3 border-dashed border-white/15 hover:border-white/25"\`
                    }\`}
                  >
                    <span className="text-2xl leading-none flex-shrink-0">{pp ? pp.emoji : <span className="opacity-20">{part.emoji}</span>}</span>
                    <div className="min-w-0">
                      <p className={\`text-xs font-semibold leading-none mb-0.5 \${pp ? acc.text : "text-white/25"}\`}>
                        {pp ? pp.name : slot.label}
                      </p>
                      {!pp && <p className="text-white/15 text-[10px]">Drop here</p>}
                      {pp && <p className={\`text-[10px] \${acc.text} opacity-70\`}>Connected ✓</p>}
                    </div>
                    {isTarget && <div className={\`ml-auto text-xs \${acc.text} font-bold animate-pulse\`}>← Drop!</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parts tray */}
        <div className="flex-shrink-0">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-2">Parts Tray</p>
          {avail.length === 0
            ? <div className="text-center py-3 text-green-400 text-xs font-semibold">All parts placed! 🎉</div>
            : (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {avail.map(part => {
                  const acc = ACCENT_CLASSES[part.accent];
                  return (
                    <div
                      key={part.id}
                      onPointerDown={e => startDrag(e, part.id)}
                      className={\`flex-shrink-0 flex items-center gap-2.5 pl-3 pr-4 py-3 rounded-xl border transition-all active:scale-95 touch-none select-none cursor-grab active:cursor-grabbing \${acc.bg} \${acc.border} hover:scale-[1.03] shadow-md \${acc.glow}\`}
                    >
                      <span className="text-2xl leading-none">{part.emoji}</span>
                      <div>
                        <p className={\`text-xs font-bold \${acc.text}\`}>{part.name}</p>
                        <p className="text-white/25 text-[9px] leading-none mt-0.5">drag me</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>

        {/* Hint */}
        <div className="flex-shrink-0 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
          <span className="text-base flex-shrink-0">💡</span>
          <p className="text-white/55 text-xs leading-relaxed">{hint}</p>
        </div>

        {/* CTA */}
        {done && (
          <button
            onClick={onComplete}
            className="flex-shrink-0 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xl shadow-blue-500/30 animate-pulse mb-1"
          >
            🚀 Start Engine! Let&apos;s Drive!
          </button>
        )}
      </div>

      {/* Drag ghost */}
      {dragging && (() => {
        const p   = PARTS.find(x => x.id === dragging.id);
        const acc = p ? ACCENT_CLASSES[p.accent] : null;
        return p ? (
          <div
            className={\`fixed pointer-events-none z-50 flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl border shadow-2xl opacity-95 -translate-x-1/2 -translate-y-1/2 \${acc?.bg} \${acc?.border}\`}
            style={{ left: dragging.x, top: dragging.y }}
          >
            <span className="text-xl">{p.emoji}</span>
            <span className={\`text-xs font-bold \${acc?.text}\`}>{p.name}</span>
          </div>
        ) : null;
      })()}
    </div>
  );
}

// ─── Drive Phase ──────────────────────────────────────────────────────────────
function DrivePhase({ onReset }: { onReset: () => void }) {
  const [speed,    setSpeed]    = useState(0);
  const [joy,      setJoy]      = useState({ x: 0, y: 0 });
  const [carX,     setCarX]     = useState(0);
  const [scanning, setScanning] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [honk,     setHonk]     = useState(false);
  const [avoiding, setAvoiding] = useState(false);
  const [distance, setDistance] = useState(120);
  const [sensor,   setSensor]   = useState("Clear");

  const handleJoy = useCallback((x: number, y: number) => {
    setJoy({ x, y });
    setCarX(x * 110);
  }, []);

  const roadDur = speed > 0 ? Math.max(0.15, 2.4 - speed * 0.21) : 99;
  const treeDur = roadDur * 2.8;

  const dirLabel = () => {
    if (joy.y < -0.25) return "⬆ Forward";
    if (joy.y >  0.25) return "⬇ Reverse";
    if (joy.x >  0.25) return "➡ Right";
    if (joy.x < -0.25) return "⬅ Left";
    return speed > 0 ? "⬆ Forward" : "— Stop";
  };

  const doScan  = () => { setScanning(true);  setTimeout(() => setScanning(false),  1800); };
  const doAvoid = () => { setAvoiding(true);  setTimeout(() => setAvoiding(false), 1000); };
  const doSpin  = () => { setSpinning(true);  setTimeout(() => setSpinning(false),   800); };
  const doHonk  = () => { setHonk(true);      setTimeout(() => setHonk(false),       800); };

  return (
    <div className="flex flex-col h-full">
      <style>{\`
        @keyframes roadScroll  { to { transform: translateX(-33.33%) } }
        @keyframes treesScroll { to { transform: translateX(-33.33%) } }
        @keyframes scanPulse   { 0%,100%{opacity:.8;transform:scale(1)} 50%{opacity:0;transform:scale(2.4)} }
        @keyframes carBounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      \`}</style>

      {/* Road scene */}
      <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0" style={{ height:"clamp(190px,38vw,260px)" }}>
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200" />
        {/* Clouds */}
        <div className="absolute top-3 left-6  animate-float" style={{ animationDuration:"9s" }}><CloudSVG scale={0.9} /></div>
        <div className="absolute top-2 right-8 animate-float" style={{ animationDuration:"12s", animationDelay:"3s" }}><CloudSVG scale={0.7} /></div>
        <div className="absolute top-5 left-1/2 animate-float" style={{ animationDuration:"7s", animationDelay:"1s" }}><CloudSVG scale={0.6} /></div>
        {/* Grass */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-green-700 to-green-600" />
        {/* Trees */}
        <div className="absolute pointer-events-none flex gap-16" style={{ bottom:"76px", animation:\`treesScroll \${treeDur}s linear infinite\`, animationPlayState:speed>0?"running":"paused", width:"300%", willChange:"transform" }}>
          {[...Array(18)].map((_,i) => <div key={i} style={{ flexShrink:0 }}><TreeSVG h={0.7+(i%5)*0.1} /></div>)}
        </div>
        {/* Road */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-600 to-slate-700" />
        {/* Road edge line */}
        <div className="absolute bottom-20 inset-x-0 h-px bg-amber-400/50" />
        {/* Dashes */}
        <div className="absolute bottom-7 inset-x-0 overflow-hidden h-4 flex items-center">
          <div className="flex gap-7" style={{ animation:\`roadScroll \${roadDur}s linear infinite\`, animationPlayState:speed>0?"running":"paused", width:"300%", willChange:"transform" }}>
            {[...Array(42)].map((_,i) => <div key={i} className="flex-shrink-0 w-12 h-2.5 rounded-full bg-amber-400" />)}
          </div>
        </div>
        {/* Car */}
        <div
          className="absolute bottom-14 left-1/2"
          style={{ transform:\`translateX(calc(-50% + \${carX}px))\`, transition:spinning?"transform 0.6s":"transform 0.1s", animation:avoiding?"carBounce 0.9s ease-in-out":"none" }}
        >
          <CarSVG spinning={spinning} avoiding={avoiding} />
          {honk && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-black rounded-full whitespace-nowrap animate-bounce shadow-lg">
              📣 BEEP!
            </div>
          )}
          {scanning && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 h-24 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400" style={{ animation:"scanPulse 1.6s ease-out infinite" }} />
              <div className="absolute inset-4 rounded-full border border-cyan-300" style={{ animation:"scanPulse 1.6s ease-out 0.35s infinite" }} />
            </div>
          )}
        </div>
        {/* Speed badge */}
        {speed > 0 && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {speed * 12} km/h
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mx-4 mt-3">
        {[
          { label:"Speed",     val: speed > 0 ? \`\${speed}/10\` : "0", color:"text-cyan-400" },
          { label:"Direction", val: dirLabel(),                        color:"text-blue-400" },
          { label:"Distance",  val: speed > 0 ? \`\${distance}cm\` : "—", color:"text-amber-400" },
          { label:"Sensor",    val: sensor,                            color: sensor.includes("⚠") ? "text-red-400 animate-pulse" : "text-green-400" },
        ].map(s => (
          <div key={s.label} className="bg-slate-800/80 rounded-xl p-2 text-center border border-white/6">
            <p className="text-white/30 text-[9px] font-semibold uppercase tracking-wide">{s.label}</p>
            <p className={\`font-bold text-xs sm:text-sm mt-0.5 truncate \${s.color}\`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Speed slider */}
      <div className="mx-4 mt-3 bg-slate-800/80 rounded-xl px-4 py-3 border border-white/6 flex items-center gap-3">
        <span className="text-white/40 text-xs font-semibold w-12 flex-shrink-0">Speed</span>
        <input
          type="range" min={0} max={10} value={speed}
          onChange={e => { const v = +e.target.value; setSpeed(v); if (v===0){setSensor("Clear");} }}
          className="flex-1 h-2 cursor-pointer rounded-full"
          style={{ accentColor:"#22d3ee" }}
        />
        <span className="text-cyan-400 font-bold text-sm w-4 text-right">{speed}</span>
      </div>

      {/* Controls */}
      <div className="flex items-start gap-3 sm:gap-5 mx-4 mt-3 mb-4">
        <Joystick onChange={handleJoy} />
        <div className="flex-1 grid grid-cols-2 gap-2">
          {([
            { label:"Scan",  emoji:"📡", fn:doScan,  on:scanning, color:"from-blue-600/40 to-blue-500/20",   border:"border-blue-400/60",   text:"text-blue-300"   },
            { label:"Avoid", emoji:"↩",  fn:doAvoid, on:avoiding, color:"from-orange-600/40 to-orange-500/20", border:"border-orange-400/60", text:"text-orange-300" },
            { label:"Spin",  emoji:"🔃", fn:doSpin,  on:spinning, color:"from-purple-600/40 to-purple-500/20", border:"border-purple-400/60", text:"text-purple-300" },
            { label:"Horn",  emoji:"📣", fn:doHonk,  on:honk,     color:"from-yellow-600/40 to-yellow-500/20", border:"border-yellow-400/60", text:"text-yellow-300" },
          ] as { label:string; emoji:string; fn:()=>void; on:boolean; color:string; border:string; text:string }[]).map(b => (
            <button
              key={b.label}
              onClick={b.fn}
              className={\`py-3 sm:py-4 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer bg-gradient-to-b \${b.on ? \`\${b.color} \${b.border} \${b.text} scale-[1.03] shadow-lg\` : "from-white/5 to-white/3 border-white/10 text-white/50 hover:border-white/20 hover:from-white/8"}\`}
            >
              <span className="text-xl leading-none">{b.emoji}</span>
              <span className="text-[11px] font-bold">{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="px-4 pb-5 mt-auto">
        <button onClick={onReset} className="text-white/20 hover:text-white/50 text-xs transition-colors cursor-pointer flex items-center gap-1.5 group">
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Rebuild the circuit
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BuildPage() {
  const [phase, setPhase] = useState<"build" | "drive">("build");

  return (
    <div className="min-h-screen flex flex-col" style={{ background:"linear-gradient(160deg,#0f172a 0%,#0c1a2e 50%,#0f172a 100%)" }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 flex-shrink-0 bg-white/2 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        {/* Phase indicator */}
        <div className="flex items-center gap-2">
          {(["build","drive"] as const).map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-px bg-white/10" />}
              <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all \${phase===p ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/20" : "text-white/20"}\`}>
                <span className={\`w-1.5 h-1.5 rounded-full transition-all \${phase===p ? "bg-cyan-400" : "bg-white/15"}\`} />
                {p}
              </div>
            </div>
          ))}
        </div>
        <span className="text-white/20 text-[10px] font-semibold uppercase tracking-wide">Arduino Car</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {phase === "build"
          ? <BuildPhase onComplete={() => setPhase("drive")} />
          : <DrivePhase onReset={() => setPhase("build")} />
        }
      </div>
    </div>
  );
}
`;

const outPath = path.join(__dirname, '..', 'app', 'build', 'page.tsx');
fs.writeFileSync(outPath, page, 'utf8');
console.log('Build page v2 written →', outPath);
