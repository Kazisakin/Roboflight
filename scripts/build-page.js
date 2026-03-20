const fs = require('fs');

const page = `"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARTS = [
  { id: "battery",      name: "Battery",    emoji: "🔋", hint: "Powers the whole robot. Connect + to Arduino VIN and − to GND." },
  { id: "arduino",      name: "Arduino",    emoji: "🧠", hint: "The brain! Your code runs here and controls everything else." },
  { id: "motor-driver", name: "L298N",      emoji: "⚡", hint: "Motor controller — receives signals from Arduino and drives both wheels." },
  { id: "motors",       name: "2× Motors",  emoji: "🔄", hint: "Two DC motors. Left wheel on OUT1/2, right wheel on OUT3/4." },
];

const SLOTS = [
  { id: "battery",      label: "Power",       accepts: "battery",      x: 50, y: 9 },
  { id: "arduino",      label: "Brain",       accepts: "arduino",      x: 50, y: 36 },
  { id: "motor-driver", label: "Motor Ctrl",  accepts: "motor-driver", x: 50, y: 63 },
  { id: "motors",       label: "Wheels",      accepts: "motors",       x: 50, y: 88 },
];

const WIRES: [string, string, string][] = [
  ["battery",      "arduino",      "#ef4444"],
  ["arduino",      "motor-driver", "#22d3ee"],
  ["motor-driver", "motors",       "#f59e0b"],
];

// ─── SVG assets ───────────────────────────────────────────────────────────────
function CarSVG({ spinning, avoiding }: { spinning: boolean; avoiding: boolean }) {
  return (
    <svg width="130" height="72" viewBox="0 0 130 72"
      style={{ transform: spinning ? undefined : avoiding ? "translateY(-10px)" : undefined, transition: avoiding ? "transform 0.3s" : undefined }}
      className={spinning ? "animate-spin" : ""}
    >
      <rect x="10" y="28" width="110" height="34" rx="10" fill="#2563eb" />
      <rect x="30" y="12" width="70" height="26" rx="8" fill="#1d4ed8" />
      <rect x="37" y="16" width="24" height="18" rx="4" fill="#7dd3fc" opacity="0.9" />
      <rect x="69" y="16" width="24" height="18" rx="4" fill="#7dd3fc" opacity="0.9" />
      <rect x="113" y="34" width="9" height="8" rx="2" fill="#fef08a" />
      <rect x="8" y="34" width="7" height="8" rx="2" fill="#ef4444" />
      <line x1="65" y1="28" x2="65" y2="62" stroke="#1e40af" strokeWidth="1.5" />
      <circle cx="34" cy="63" r="11" fill="#1e293b" />
      <circle cx="34" cy="63" r="6" fill="#475569" />
      <circle cx="96" cy="63" r="11" fill="#1e293b" />
      <circle cx="96" cy="63" r="6" fill="#475569" />
      <line x1="96" y1="57" x2="96" y2="69" stroke="#94a3b8" strokeWidth="2" />
      <line x1="90" y1="63" x2="102" y2="63" stroke="#94a3b8" strokeWidth="2" />
      <line x1="92" y1="57" x2="100" y2="69" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="100" y1="57" x2="92" y2="69" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="34" y1="57" x2="34" y2="69" stroke="#94a3b8" strokeWidth="2" />
      <line x1="28" y1="63" x2="40" y2="63" stroke="#94a3b8" strokeWidth="2" />
      <line x1="30" y1="57" x2="38" y2="69" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="38" y1="57" x2="30" y2="69" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="95" y1="12" x2="95" y2="2" stroke="#22d3ee" strokeWidth="2" />
      <circle cx="95" cy="1" r="3" fill="#22d3ee" />
      <rect x="48" y="30" width="34" height="14" rx="4" fill="#1e40af" opacity="0.5" />
      <circle cx="55" cy="37" r="3" fill="#22d3ee" opacity="0.6" />
      <circle cx="65" cy="37" r="3" fill="#22d3ee" opacity="0.6" />
      <circle cx="75" cy="37" r="3" fill="#22d3ee" opacity="0.6" />
    </svg>
  );
}

function TreeSVG({ h = 1 }: { h?: number }) {
  return (
    <svg width={40 * h} height={60 * h} viewBox="0 0 40 60" style={{ flexShrink: 0 }}>
      <rect x="16" y="44" width="8" height="16" fill="#92400e" />
      <polygon points="20,2 38,44 2,44" fill="#14532d" />
      <polygon points="20,14 34,44 6,44" fill="#166534" />
    </svg>
  );
}

function CloudSVG() {
  return (
    <svg width="90" height="44" viewBox="0 0 90 44">
      <ellipse cx="45" cy="30" rx="40" ry="15" fill="white" opacity="0.85" />
      <ellipse cx="30" cy="24" rx="20" ry="15" fill="white" opacity="0.85" />
      <ellipse cx="58" cy="22" rx="18" ry="13" fill="white" opacity="0.85" />
    </svg>
  );
}

// ─── Joystick ─────────────────────────────────────────────────────────────────
function Joystick({ onChange }: { onChange: (x: number, y: number) => void }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const active = useRef(false);
  const R = 42;

  const move = useCallback((cx: number, cy: number) => {
    if (!baseRef.current) return;
    const r = baseRef.current.getBoundingClientRect();
    let dx = cx - (r.left + r.width / 2);
    let dy = cy - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy);
    if (d > R) { dx = (dx / d) * R; dy = (dy / d) * R; }
    setDot({ x: dx, y: dy });
    onChange(dx / R, dy / R);
  }, [onChange]);

  return (
    <div
      ref={baseRef}
      className="relative w-28 h-28 rounded-full bg-white/8 border-2 border-white/15 flex items-center justify-center touch-none select-none flex-shrink-0"
      onPointerDown={e => { active.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); move(e.clientX, e.clientY); }}
      onPointerMove={e => { if (active.current) move(e.clientX, e.clientY); }}
      onPointerUp={() => { active.current = false; setDot({ x: 0, y: 0 }); onChange(0, 0); }}
      onPointerCancel={() => { active.current = false; setDot({ x: 0, y: 0 }); onChange(0, 0); }}
    >
      <div className="absolute w-full h-px bg-white/8" />
      <div className="absolute w-px h-full bg-white/8" />
      <div className="absolute inset-4 rounded-full border border-white/8" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 112 112">
        <text x="56" y="16" textAnchor="middle" fill="white" fontSize="10">▲</text>
        <text x="56" y="106" textAnchor="middle" fill="white" fontSize="10">▼</text>
        <text x="12" y="60" textAnchor="middle" fill="white" fontSize="10">◀</text>
        <text x="100" y="60" textAnchor="middle" fill="white" fontSize="10">▶</text>
      </svg>
      <div
        className="absolute w-11 h-11 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40"
        style={{ transform: \`translate(\${dot.x}px, \${dot.y}px)\`, transition: active.current ? "none" : "transform 0.2s" }}
      />
    </div>
  );
}

// ─── Build Phase ──────────────────────────────────────────────────────────────
function BuildPhase({ onComplete }: { onComplete: () => void }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<{ id: string; x: number; y: number } | null>(null);
  const [hint, setHint] = useState("👆 Drag a part from the tray to its slot on the board!");
  const [flash, setFlash] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);

  const placedIds = new Set(Object.values(placed));
  const avail = PARTS.filter(p => !placedIds.has(p.id));
  const done = Object.keys(placed).length === SLOTS.length;
  const pct = (Object.keys(placed).length / SLOTS.length) * 100;

  const startDrag = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging({ id, x: e.clientX, y: e.clientY });
    setHint(PARTS.find(p => p.id === id)?.hint ?? "");
  };

  const onMove = (e: React.PointerEvent) => {
    if (dragging) setDragging(d => d ? { ...d, x: e.clientX, y: e.clientY } : null);
  };

  const onUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const hits = document.elementsFromPoint(e.clientX, e.clientY);
    let slotId: string | null = null;
    for (const el of hits) { const s = (el as HTMLElement).dataset?.slotId; if (s) { slotId = s; break; } }
    if (slotId) {
      const slot = SLOTS.find(s => s.id === slotId);
      if (slot?.accepts === dragging.id && !placed[slotId]) {
        setPlaced(p => ({ ...p, [slotId]: dragging.id }));
        setFlash(slotId); setTimeout(() => setFlash(null), 500);
        const remaining = SLOTS.length - Object.keys(placed).length - 1;
        setHint(remaining > 0 ? \`✅ Nice! \${remaining} more to go!\` : "🎉 All parts placed! Hit Start Engine!");
      } else {
        setWrong(slotId); setTimeout(() => setWrong(null), 500);
        const correct = SLOTS.find(s => s.accepts === dragging.id);
        setHint(\`❌ Wrong slot! "\${PARTS.find(p=>p.id===dragging.id)?.name}" goes in the "\${correct?.label}" slot.\`);
      }
    }
    setDragging(null);
  };

  return (
    <div className="flex flex-col h-full" onPointerMove={onMove} onPointerUp={onUp}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg sm:text-xl">Build Your Robot Car</h1>
          <p className="text-white/40 text-xs mt-0.5">Drag each part to its slot on the circuit board</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-cyan-400 font-bold text-2xl tabular-nums">{Object.keys(placed).length}<span className="text-white/25 text-sm font-normal">/{SLOTS.length}</span></p>
        </div>
      </div>

      {/* Progress */}
      <div className="mx-4 h-1.5 bg-white/8 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: \`\${pct}%\` }} />
      </div>

      {/* Board + tray */}
      <div className="flex flex-1 gap-3 px-4 pb-3 min-h-0 flex-col sm:flex-row">

        {/* Circuit board */}
        <div className="relative flex-1 bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden min-h-64 sm:min-h-0">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          {/* Wires */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {WIRES.map(([from, to, color]) => {
              const f = SLOTS.find(s => s.id === from), t = SLOTS.find(s => s.id === to);
              if (!f || !t) return null;
              const lit = placed[from] && placed[to];
              return <line key={\`\${from}-\${to}\`} x1={\`\${f.x}%\`} y1={\`\${f.y + 5}%\`} x2={\`\${t.x}%\`} y2={\`\${t.y - 5}%\`} stroke={lit ? color : "#334155"} strokeWidth={lit ? "2.5" : "1.5"} strokeDasharray={lit ? "0" : "5,4"} opacity={lit ? 1 : 0.35} className="transition-all duration-500" />;
            })}
          </svg>

          {/* Slots */}
          {SLOTS.map(slot => {
            const pp = placed[slot.id] ? PARTS.find(p => p.id === placed[slot.id]) : null;
            const isTarget = dragging && SLOTS.find(s => s.id === slot.id)?.accepts === dragging.id && !placed[slot.id];
            return (
              <div
                key={slot.id}
                data-slot-id={slot.id}
                className={\`absolute flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-200 \${
                  pp ? \`border-green-400/60 bg-green-400/10 \${flash === slot.id ? "scale-110" : ""}\`
                  : isTarget ? "border-cyan-400 bg-cyan-400/15 scale-105 shadow-lg shadow-cyan-400/20"
                  : wrong === slot.id ? "border-red-400/60 bg-red-400/10"
                  : "border-dashed border-white/20 bg-white/4 hover:border-white/30"
                }\`}
                style={{ left: \`\${slot.x}%\`, top: \`\${slot.y}%\`, transform: \`translate(-50%,-50%)\`, width: "clamp(76px,28%,116px)", height: "clamp(46px,10%,60px)" }}
              >
                {pp ? (
                  <>
                    <span className="text-lg leading-none">{pp.emoji}</span>
                    <span className="text-[10px] font-semibold text-green-300 mt-0.5 leading-none">{pp.name}</span>
                    <span className="text-green-400 text-xs">✓</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl opacity-15">{PARTS.find(p=>p.id===slot.accepts)?.emoji}</span>
                    <span className="text-[10px] text-white/20 mt-0.5">{slot.label}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Parts tray */}
        <div className="sm:w-32 flex sm:flex-col flex-row gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 flex-shrink-0 sm:justify-start">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold hidden sm:block mb-1">Parts</p>
          {avail.length === 0 && <p className="text-white/30 text-xs py-2 whitespace-nowrap sm:text-center">All placed! 🎉</p>}
          {avail.map(part => (
            <div
              key={part.id}
              onPointerDown={e => startDrag(e, part.id)}
              className="flex-shrink-0 flex sm:flex-row items-center gap-2 px-3 py-2.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/12 active:scale-95 touch-none select-none cursor-grab active:cursor-grabbing transition-all"
            >
              <span className="text-xl">{part.emoji}</span>
              <span className="text-white text-xs font-medium whitespace-nowrap">{part.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="mx-4 mb-3 px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl flex gap-2 items-start">
        <span className="text-base flex-shrink-0">💡</span>
        <p className="text-white/60 text-xs leading-relaxed">{hint}</p>
      </div>

      {/* CTA */}
      {done && (
        <div className="px-4 pb-4">
          <button onClick={onComplete} className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xl shadow-blue-500/30 animate-pulse">
            🚀 Start Engine! Let&apos;s Drive!
          </button>
        </div>
      )}

      {/* Drag ghost */}
      {dragging && (() => {
        const p = PARTS.find(x => x.id === dragging.id);
        return p ? (
          <div className="fixed pointer-events-none z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-700 border border-white/25 shadow-xl opacity-90 -translate-x-1/2 -translate-y-1/2" style={{ left: dragging.x, top: dragging.y }}>
            <span className="text-lg">{p.emoji}</span>
            <span className="text-white text-xs font-semibold">{p.name}</span>
          </div>
        ) : null;
      })()}
    </div>
  );
}

// ─── Drive Phase ──────────────────────────────────────────────────────────────
function DrivePhase({ onReset }: { onReset: () => void }) {
  const [speed, setSpeed]       = useState(0);
  const [joy,   setJoy]         = useState({ x: 0, y: 0 });
  const [carX,  setCarX]        = useState(0);
  const [scanning,  setScanning]  = useState(false);
  const [spinning,  setSpinning]  = useState(false);
  const [honk,      setHonk]      = useState(false);
  const [avoiding,  setAvoiding]  = useState(false);
  const [distance,  setDistance]  = useState(120);
  const [sensor,    setSensor]    = useState("Clear");

  useEffect(() => { setCarX(joy.x * 90); }, [joy]);

  useEffect(() => {
    if (speed === 0) { setSensor("Clear"); return; }
    const t = setInterval(() => {
      const d = Math.floor(Math.random() * 160 + 20);
      setDistance(d);
      setSensor(d < 35 ? "⚠ Close!" : "Clear");
    }, 1400);
    return () => clearInterval(t);
  }, [speed]);

  const dirLabel = () => {
    if (joy.y < -0.3) return "Forward";
    if (joy.y > 0.3)  return "Reverse";
    if (joy.x > 0.3)  return "Right";
    if (joy.x < -0.3) return "Left";
    return speed > 0 ? "Forward" : "Stop";
  };

  const doScan  = () => { setScanning(true);  setTimeout(() => setScanning(false), 1600); };
  const doAvoid = () => { setAvoiding(true);  setTimeout(() => setAvoiding(false), 900); };
  const doSpin  = () => { setSpinning(true);  setTimeout(() => setSpinning(false), 700); };
  const doHonk  = () => { setHonk(true);      setTimeout(() => setHonk(false), 700); };

  const roadDur  = speed > 0 ? Math.max(0.18, 2.2 - speed * 0.19) : 99;
  const treeDur  = roadDur * 2.5;

  return (
    <div className="flex flex-col h-full">
      {/* Inline keyframes */}
      <style>{\`
        @keyframes roadScroll  { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes treesScroll { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes scanPulse   { 0%,100% { opacity:.7; transform:scale(1) } 50% { opacity:0; transform:scale(2.2) } }
      \`}</style>

      {/* Scene */}
      <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0" style={{ height: "clamp(180px, 35vw, 240px)" }}>
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-200" />
        {/* Clouds */}
        <div className="absolute top-3 left-8 animate-float" style={{ animationDuration:"8s" }}><CloudSVG /></div>
        <div className="absolute top-2 right-12 animate-float" style={{ animationDuration:"10s", animationDelay:"2s" }}><CloudSVG /></div>
        {/* Grass */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-green-600" />
        {/* Trees */}
        <div className="absolute bottom-[70px] flex gap-20 pointer-events-none" style={{ animation: \`treesScroll \${treeDur}s linear infinite\`, animationPlayState: speed > 0 ? "running":"paused", width:"300%" }}>
          {[...Array(14)].map((_,i) => <div key={i} style={{ flexShrink:0 }}><TreeSVG h={0.75 + (i%4)*0.12} /></div>)}
        </div>
        {/* Road */}
        <div className="absolute bottom-0 inset-x-0 h-[70px] bg-slate-700" />
        {/* Dashes */}
        <div className="absolute bottom-[26px] inset-x-0 overflow-hidden h-5 flex items-center">
          <div className="flex gap-8" style={{ animation: \`roadScroll \${roadDur}s linear infinite\`, animationPlayState: speed>0?"running":"paused", width:"300%" }}>
            {[...Array(36)].map((_,i) => <div key={i} className="flex-shrink-0 w-14 h-3 rounded-full bg-amber-400" />)}
          </div>
        </div>
        {/* Car */}
        <div
          className="absolute bottom-[58px] left-1/2"
          style={{ transform: \`translateX(calc(-50% + \${carX}px))\`, transition: spinning ? "transform 0.6s" : "transform 0.12s" }}
        >
          <CarSVG spinning={spinning} avoiding={avoiding} />
          {honk && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-yellow-400 text-slate-900 text-xs font-black rounded-full whitespace-nowrap animate-bounce">📣 BEEP!</div>
          )}
          {scanning && (
            <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-1 w-20 h-20 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400" style={{ animation:"scanPulse 1.5s ease-out infinite" }} />
              <div className="absolute inset-3 rounded-full border border-cyan-300" style={{ animation:"scanPulse 1.5s ease-out 0.3s infinite" }} />
            </div>
          )}
        </div>
        {/* Speed label */}
        {speed > 0 && (
          <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {speed * 12} km/h
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mx-4 mt-3">
        {[
          { label: "Speed",     val: speed.toString() },
          { label: "Direction", val: dirLabel() },
          { label: "Distance",  val: speed > 0 ? \`\${distance} cm\` : "— cm" },
          { label: "Sensor",    val: sensor },
        ].map(s => (
          <div key={s.label} className="bg-white/5 rounded-xl p-2 sm:p-3 text-center border border-white/8">
            <p className="text-white/35 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide">{s.label}</p>
            <p className="text-white font-semibold text-xs sm:text-sm mt-0.5 truncate">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Speed slider */}
      <div className="mx-4 mt-3 flex items-center gap-3">
        <span className="text-white/35 text-xs w-10 flex-shrink-0">Speed</span>
        <input type="range" min={0} max={10} value={speed} onChange={e => setSpeed(+e.target.value)} className="flex-1 accent-cyan-400 cursor-pointer h-1" style={{ accentColor:"#22d3ee" }} />
        <span className="text-white font-bold text-sm w-5 text-right">{speed}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 sm:gap-5 mx-4 mt-3 mb-4">
        <Joystick onChange={(x,y) => setJoy({x,y})} />
        <div className="flex-1 grid grid-cols-2 gap-2">
          {([
            { label:"Scan",  emoji:"📡", fn:doScan,  on:scanning },
            { label:"Avoid", emoji:"↩",  fn:doAvoid, on:avoiding },
            { label:"Spin",  emoji:"🔃", fn:doSpin,  on:spinning },
            { label:"Horn",  emoji:"📣", fn:doHonk,  on:honk     },
          ] as { label:string; emoji:string; fn:()=>void; on:boolean }[]).map(b => (
            <button
              key={b.label}
              onClick={b.fn}
              className={\`py-3 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 cursor-pointer \${b.on ? "bg-cyan-400/20 border-cyan-400/60 text-cyan-300 shadow-md shadow-cyan-400/10" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"}\`}
            >
              <span className="text-lg leading-none">{b.emoji}</span>
              <span className="text-[11px]">{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="px-4 pb-5 mt-auto">
        <button onClick={onReset} className="text-white/25 hover:text-white/50 text-xs transition-colors cursor-pointer flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
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
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0">
        <Link href="/" className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
        {/* Phase dots */}
        <div className="flex items-center gap-2">
          <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold transition-all \${phase==="build" ? "bg-cyan-400/15 text-cyan-300" : "text-white/25"}\`}>
            <span className={\`w-1.5 h-1.5 rounded-full \${phase==="build" ? "bg-cyan-400" : "bg-white/20"}\`} />
            Build
          </div>
          <div className="w-6 h-px bg-white/10" />
          <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold transition-all \${phase==="drive" ? "bg-cyan-400/15 text-cyan-300" : "text-white/25"}\`}>
            <span className={\`w-1.5 h-1.5 rounded-full \${phase==="drive" ? "bg-cyan-400" : "bg-white/20"}\`} />
            Drive
          </div>
        </div>
        <span className="text-white/25 text-xs">Arduino Car</span>
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

fs.writeFileSync('c:/Users/kazim/OneDrive/Desktop/GIT/Roboflight/app/build/page.tsx', page, 'utf8');
console.log('Build page done');
