"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/useInView";

interface FormData {
  name: string;
  email: string;
  phone: string;
  courses: string[];
  message: string;
}

const courseOptions = [
  { id: "basic-robotics",   label: "Basic Robotics",   icon: "⚙" },
  { id: "quadcopter-drone", label: "Quadcopter Drone", icon: "✦" },
  { id: "rc-plane",         label: "RC Plane Making",  icon: "▲" },
];

const info = [
  {
    label: "Email",
    value: "info@roboflight.ca",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "New Brunswick, Canada",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Partner Schools",
    value: "McAdam HS · Harvey HS · UNB",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", courses: [], message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCourseToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(id) ? prev.courses.filter((c) => c !== id) : [...prev.courses, id],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", courses: [], message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Enrol your child <span className="text-blue-600">today</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Interested in one of our programs? Fill in the form and we&apos;ll be in touch within one business day.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Info panel */}
          <div className={`lg:col-span-2 transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-slate-700 text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-blue-600 rounded-2xl text-white">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="font-semibold text-sm mb-1">Safe & Secure</p>
                  <p className="text-blue-200 text-xs leading-relaxed">Your personal information is kept private and never shared. We follow Canadian privacy law (PIPEDA).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-150 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 p-5 sm:p-8">

              {status === "success" && (
                <div className="mb-6 p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800 text-sm">Message sent!</p>
                    <p className="text-emerald-600 text-xs mt-0.5">We&apos;ll get back to you within one business day.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 sm:p-5 bg-red-50 border border-red-200 rounded-2xl">
                  <p className="font-semibold text-red-800 text-sm">Failed to send</p>
                  <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Full Name <span className="text-blue-500 normal-case tracking-normal">*</span>
                    </label>
                    <input
                      id="name" type="text" required placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                    <input
                      id="phone" type="tel" placeholder="+1 (506) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email Address <span className="text-blue-500 normal-case tracking-normal">*</span>
                  </label>
                  <input
                    id="email" type="email" required placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Program Interest</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {courseOptions.map((course) => {
                      const checked = formData.courses.includes(course.id);
                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => handleCourseToggle(course.id)}
                          className={`flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 p-3 sm:p-3.5 rounded-xl border-2 text-left sm:text-center transition-all duration-200 cursor-pointer active:scale-95 ${
                            checked
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-100 bg-slate-50 text-slate-500 hover:border-blue-200"
                          }`}
                        >
                          <span className="text-xl sm:text-lg flex-shrink-0">{course.icon}</span>
                          <span className={`text-xs sm:text-[11px] font-semibold ${checked ? "text-blue-700" : "text-slate-600"}`}>{course.label}</span>
                          {checked && (
                            <span className="ml-auto sm:ml-0 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
                  <textarea
                    id="message" rows={4}
                    placeholder="Tell us about your child's age, experience level, or any questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-300 text-sm bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-slate-400 text-[11px]">
                  By submitting you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms" className="underline hover:text-slate-600">Terms of Service</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
