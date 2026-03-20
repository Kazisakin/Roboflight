"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const steps = [
  {
    id: 1,
    title: "Gather Your Parts",
    emoji: "🧰",
    color: "from-blue-500 to-blue-600",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    description: "Collect all the components you need before you start building.",
    parts: ["Arduino Uno board", "L298N motor driver", "2× DC motors", "Chassis kit", "4× wheels", "Battery pack (9V)", "Jumper wires"],
    tip: "Lay everything out on your desk first so nothing gets lost!",
  },
  {
    id: 2,
    title: "Assemble the Chassis",
    emoji: "🔧",
    color: "from-cyan-500 to-cyan-600",
    lightColor: "bg-cyan-50 border-cyan-200",
    textColor: "text-cyan-700",
    description: "Mount the motors onto the chassis and attach the wheels securely.",
    parts: ["Screw motors to chassis frame", "Attach wheels to motor shafts", "Mount battery pack underneath", "Secure chassis with screws"],
    tip: "Make sure all screws are tight — loose parts can cause your car to drive crooked.",
  },
  {
    id: 3,
    title: "Wire the Motor Driver",
    emoji: "⚡",
    color: "from-indigo-500 to-indigo-600",
    lightColor: "bg-indigo-50 border-indigo-200",
    textColor: "text-indigo-700",
    description: "Connect the L298N motor driver to control both DC motors.",
    parts: ["Connect Motor A wires to OUT1 & OUT2", "Connect Motor B wires to OUT3 & OUT4", "Connect battery +/– to motor driver power pins", "Connect ENA and ENB pins to Arduino"],
    tip: "Double-check polarity on your motor wires — reversing them just reverses the motor direction.",
  },
  {
    id: 4,
    title: "Connect to Arduino",
    emoji: "🔌",
    color: "from-blue-600 to-blue-700",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    description: "Wire the motor driver control pins to your Arduino Uno.",
    parts: ["IN1 → Arduino pin 2", "IN2 → Arduino pin 3", "IN3 → Arduino pin 4", "IN4 → Arduino pin 5", "GND → Arduino GND"],
    tip: "Use different coloured jumper wires for each motor to avoid confusion.",
  },
  {
    id: 5,
    title: "Upload the Code",
    emoji: "💻",
    color: "from-cyan-600 to-cyan-700",
    lightColor: "bg-cyan-50 border-cyan-200",
    textColor: "text-cyan-700",
    description: "Write and upload a simple sketch to make your car move.",
    parts: ["Open Arduino IDE on your computer", "Connect Arduino via USB cable", "Copy the starter code below", "Click Upload and watch it go!"],
    tip: "Start with just moving forward — then add turns once it works!",
    code: `void setup() {
  // Motor A
  pinMode(2, OUTPUT); // IN1
  pinMode(3, OUTPUT); // IN2
  // Motor B
  pinMode(4, OUTPUT); // IN3
  pinMode(5, OUTPUT); // IN4
}

void loop() {
  // Move Forward
  digitalWrite(2, HIGH);
  digitalWrite(3, LOW);
  digitalWrite(4, HIGH);
  digitalWrite(5, LOW);
  delay(2000);

  // Stop
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);
  digitalWrite(5, LOW);
  delay(1000);
}`,
  },
  {
    id: 6,
    title: "Test and Drive!",
    emoji: "🚗",
    color: "from-blue-700 to-blue-800",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    description: "Power up your car, test it on a flat surface, and have fun!",
    parts: ["Disconnect USB, connect battery pack", "Place on flat surface", "Switch on and watch it move", "Tweak delays to change speed"],
    tip: "If a motor spins the wrong way, swap its two wires on the motor driver.",
  },
];

const parts = [
  { name: "Arduino Uno", qty: "×1", color: "bg-blue-100 text-blue-700" },
  { name: "L298N Driver", qty: "×1", color: "bg-indigo-100 text-indigo-700" },
  { name: "DC Motors", qty: "×2", color: "bg-cyan-100 text-cyan-700" },
  { name: "Chassis Kit", qty: "×1", color: "bg-blue-100 text-blue-700" },
  { name: "Wheels", qty: "×4", color: "bg-sky-100 text-sky-700" },
  { name: "9V Battery", qty: "×1", color: "bg-indigo-100 text-indigo-700" },
  { name: "Jumper Wires", qty: "×20", color: "bg-cyan-100 text-cyan-700" },
  { name: "USB Cable", qty: "×1", color: "bg-blue-100 text-blue-700" },
];

export default function BuildPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  const step = steps[activeStep];
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const totalItems = steps.reduce((acc, s) => acc + s.parts.length, 0);
  const progress = Math.round((activeStep / (steps.length - 1)) * 100);
  const allStepChecked = step.parts.every((_, i) => checked[`${step.id}-${i}`]);

  const toggleCheck = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyCode = () => {
    if (step.code) {
      navigator.clipboard.writeText(step.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const goNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((p) => p + 1);
      setShowCode(false);
    }
  };

  const goPrev = () => {
    if (activeStep > 0) {
      setActiveStep((p) => p - 1);
      setShowCode(false);
    }
  };

  // Celebrate when last step all checked
  useEffect(() => {
    if (activeStep === steps.length - 1 && allStepChecked && !celebrating) {
      setCelebrating(true);
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["bg-blue-400", "bg-cyan-400", "bg-indigo-400", "bg-sky-400"][Math.floor(Math.random() * 4)],
      }));
      setParticles(newParticles);
      setTimeout(() => {
        setCelebrating(false);
        setParticles([]);
      }, 3000);
    }
  }, [allStepChecked, activeStep, celebrating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
      {/* Animated background dots */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Celebration particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`fixed w-3 h-3 rounded-full ${p.color} opacity-80 animate-bounce pointer-events-none z-50`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 py-4 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo variant="white" size="sm" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-blue-300 text-xs font-medium hidden sm:block">
              {totalChecked} / {totalItems} tasks done
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400/20 border border-cyan-400/30 rounded-full mb-4">
            <span className="text-cyan-300 text-xs font-bold tracking-wide uppercase">Kids Workshop</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Build Your Own{" "}
            <span className="text-cyan-400">Arduino Robot Car</span>
          </h1>
          <p className="text-blue-300 text-sm max-w-lg mx-auto">
            Follow these interactive steps, check off each task as you go, and build your very first robot car!
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white/10 rounded-2xl p-4 mb-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-semibold">Overall Progress</span>
            <span className="text-cyan-400 text-xs font-black">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-700 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Step pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveStep(i); setShowCode(false); }}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border-2 ${
                i === activeStep
                  ? "bg-white text-blue-900 border-white shadow-lg scale-105"
                  : i < activeStep
                  ? "bg-cyan-400/20 text-cyan-300 border-cyan-400/30"
                  : "bg-white/5 text-blue-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {i < activeStep ? (
                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${i === activeStep ? "bg-blue-700 text-white" : "bg-white/10 text-blue-300"}`}>
                  {s.id}
                </span>
              )}
              <span className="hidden sm:block">{s.title}</span>
              <span className="sm:hidden">{s.id}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Parts sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Parts You Need</h3>
              <div className="flex flex-col gap-2">
                {parts.map((p) => (
                  <div key={p.name} className={`flex items-center justify-between px-3 py-2 rounded-xl ${p.color} bg-opacity-20`}>
                    <span className="text-xs font-semibold text-white">{p.name}</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full bg-white/20 text-white`}>{p.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main step card */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              {/* Step header */}
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r ${step.color} mb-5 shadow-lg`}>
                <span className="text-2xl" role="img" aria-label={step.title}>{step.emoji}</span>
                <div>
                  <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wide">Step {step.id} of {steps.length}</p>
                  <p className="text-white font-black text-sm">{step.title}</p>
                </div>
              </div>

              <p className="text-blue-200 text-sm leading-relaxed mb-5">{step.description}</p>

              {/* Checklist */}
              <p className="text-white text-xs font-bold uppercase tracking-wide mb-3">
                {step.id === 5 ? "Instructions" : "Your Checklist"}
              </p>
              <div className="flex flex-col gap-2.5 mb-5">
                {step.parts.map((item, i) => {
                  const key = `${step.id}-${i}`;
                  const done = checked[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer active:scale-95 ${
                        done
                          ? "border-cyan-400/50 bg-cyan-400/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        done ? "bg-cyan-400 border-cyan-400" : "border-white/30"
                      }`}>
                        {done && (
                          <svg className="w-3.5 h-3.5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-all ${done ? "text-cyan-300 line-through" : "text-white"}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tip box */}
              <div className="flex items-start gap-3 p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl mb-5">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-amber-200 text-xs font-medium leading-relaxed">{step.tip}</p>
              </div>

              {/* Code block */}
              {step.code && (
                <div className="mb-5">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-xs font-bold transition-colors cursor-pointer mb-3"
                  >
                    <svg className={`w-4 h-4 transition-transform duration-300 ${showCode ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {showCode ? "Hide" : "Show"} starter code
                  </button>
                  {showCode && (
                    <div className="relative">
                      <pre className="bg-blue-950/80 text-cyan-300 text-[11px] p-5 rounded-xl overflow-x-auto font-mono leading-relaxed border border-white/10">
                        {step.code}
                      </pre>
                      <button
                        onClick={copyCode}
                        className="absolute top-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer active:scale-95"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={goPrev}
                  disabled={activeStep === 0}
                  className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {activeStep === steps.length - 1 ? (
                  <div className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black transition-all ${allStepChecked ? "bg-cyan-400 text-blue-900 shadow-lg shadow-cyan-400/30 animate-pulse" : "bg-white/10 text-blue-300"}`}>
                    {allStepChecked ? "You did it!" : `${step.parts.filter((_, i) => checked[`${step.id}-${i}`]).length}/${step.parts.length} done`}
                  </div>
                ) : (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white text-xs font-black rounded-xl transition-all shadow-lg cursor-pointer active:scale-95"
                  >
                    Next Step
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-blue-400 text-xs mb-3">Want to build this in person with an expert instructor?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-black text-sm rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30 hover:scale-105 active:scale-95"
          >
            Join a Robotics Class
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
