"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    id: 1,
    title: "Gather Your Parts",
    description: "Collect all the components you need before you start building.",
    parts: ["Arduino Uno board", "L298N motor driver", "2× DC motors", "Chassis kit", "4× wheels", "Battery pack (9V)", "Jumper wires"],
    color: "bg-blue-500",
    tip: "Lay everything out on your desk first so nothing gets lost!",
  },
  {
    id: 2,
    title: "Assemble the Chassis",
    description: "Mount the motors onto the chassis and attach the wheels securely.",
    parts: ["Screw motors to chassis frame", "Attach wheels to motor shafts", "Mount battery pack underneath", "Secure chassis with screws"],
    color: "bg-cyan-500",
    tip: "Make sure all screws are tight — loose parts can cause your car to drive crooked.",
  },
  {
    id: 3,
    title: "Wire the Motor Driver",
    description: "Connect the L298N motor driver to control both DC motors.",
    parts: ["Connect Motor A wires to OUT1 & OUT2", "Connect Motor B wires to OUT3 & OUT4", "Connect battery +/– to motor driver power pins", "Connect ENA and ENB pins to Arduino"],
    color: "bg-indigo-500",
    tip: "Double-check polarity on your motor wires — reversing them just reverses the motor direction.",
  },
  {
    id: 4,
    title: "Connect to Arduino",
    description: "Wire the motor driver control pins to your Arduino Uno.",
    parts: ["IN1 → Arduino pin 2", "IN2 → Arduino pin 3", "IN3 → Arduino pin 4", "IN4 → Arduino pin 5", "GND → Arduino GND"],
    color: "bg-blue-600",
    tip: "Use different coloured jumper wires for each motor to avoid confusion.",
  },
  {
    id: 5,
    title: "Upload the Code",
    description: "Write and upload a simple sketch to make your car move.",
    parts: ["Open Arduino IDE on your computer", "Connect Arduino via USB cable", "Copy the starter code below", "Click Upload and watch it go!"],
    color: "bg-cyan-600",
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
    description: "Power up your car, test it on a flat surface, and have fun!",
    parts: ["Disconnect USB, connect battery pack", "Place on flat surface", "Switch on and watch it move", "Tweak delays to change speed"],
    color: "bg-blue-700",
    tip: "If a motor spins the wrong way, swap its two wires on the motor driver.",
  },
];

const parts = [
  { name: "Arduino Uno", qty: "×1", icon: "⬛" },
  { name: "L298N Motor Driver", qty: "×1", icon: "🔲" },
  { name: "DC Motors", qty: "×2", icon: "⚙" },
  { name: "Chassis Kit", qty: "×1", icon: "🔧" },
  { name: "Wheels", qty: "×4", icon: "⬤" },
  { name: "9V Battery", qty: "×1", icon: "▬" },
  { name: "Jumper Wires", qty: "×20", icon: "〰" },
  { name: "USB Cable", qty: "×1", icon: "—" },
];

export default function ArduinoCar() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const step = steps[activeStep];
  const progress = Math.round(((activeStep) / (steps.length - 1)) * 100);

  const toggleCheck = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const copyCode = () => {
    if (step.code) {
      navigator.clipboard.writeText(step.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100/40 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Try It Yourself
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-black text-blue-900 mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Build Your Own{" "}
            <span className="text-cyan-500">Arduino Robot Car</span>
          </h2>
          <p
            className={`text-gray-400 text-sm max-w-lg mx-auto transition-all duration-700 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Follow these interactive steps to build and program your very first robot car. Check off each task as you go!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Parts list + step nav */}
          <div className="flex flex-col gap-4">
            {/* Parts checklist */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-4">Parts You Need</h3>
              <div className="grid grid-cols-2 gap-2">
                {parts.map((part) => (
                  <div key={part.name} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <span className="text-base w-5 text-center select-none">{part.icon}</span>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-700 leading-tight">{part.name}</p>
                      <p className="text-[10px] text-gray-400">{part.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step navigation */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-4">Steps</h3>
              <div className="flex flex-col gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      i === activeStep
                        ? "bg-blue-700 text-white"
                        : "hover:bg-slate-50 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                        i === activeStep
                          ? "bg-white text-blue-700"
                          : i < activeStep
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {i < activeStep ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </span>
                    <span className={`text-xs font-semibold ${i === activeStep ? "text-white" : "text-gray-700"}`}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Active step detail */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Progress bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500">Progress</span>
                <span className="text-xs font-bold text-blue-700">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Step card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex-1">
              {/* Step header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-black text-sm">{step.id}</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-blue-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
                  {step.id === 5 ? "Instructions" : "Checklist"}
                </p>
                <div className="flex flex-col gap-2">
                  {step.parts.map((item, i) => {
                    const key = `${step.id}-${i}`;
                    const done = checked[key];
                    return (
                      <label
                        key={key}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          done
                            ? "border-green-200 bg-green-50"
                            : "border-gray-100 hover:border-blue-200 hover:bg-blue-50"
                        }`}
                        onClick={() => toggleCheck(key)}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          done ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`}>
                          {done && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs font-medium ${done ? "text-green-700 line-through" : "text-gray-700"}`}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Tip box */}
              <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl mb-5">
                <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-amber-800 font-medium leading-relaxed">{step.tip}</p>
              </div>

              {/* Code block for step 5 */}
              {step.code && (
                <div>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-600 transition-colors cursor-pointer mb-3"
                  >
                    <svg className={`w-3.5 h-3.5 transition-transform ${showCode ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {showCode ? "Hide" : "Show"} starter code
                  </button>
                  {showCode && (
                    <div className="relative">
                      <pre className="bg-blue-950 text-cyan-300 text-[11px] p-4 rounded-xl overflow-x-auto font-mono leading-relaxed">
                        {step.code}
                      </pre>
                      <button
                        onClick={copyCode}
                        className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold rounded-lg transition-all cursor-pointer"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="text-xs text-gray-400">Step {activeStep + 1} of {steps.length}</span>
                <button
                  onClick={() => setActiveStep((p) => Math.min(steps.length - 1, p + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Next Step
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs mb-3">
            Want to build this in person with an expert instructor?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            Join a Robotics Class
          </button>
        </div>
      </div>
    </section>
  );
}
