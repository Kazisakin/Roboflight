"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, School, Send, ShieldCheck } from "lucide-react";
import { trackContact } from "@/lib/track";

interface FormData {
  name: string;
  email: string;
  phone: string;
  courses: string[];
  message: string;
}

const courseOptions = [
  { id: "basic-robotics",   label: "Basic Robotics" },
  { id: "quadcopter-drone", label: "Quadcopter Drone" },
  { id: "rc-plane",         label: "RC Plane Making" },
];

const info = [
  { label: "Email & phone", value: "info@roboflight.ca · (506) 897-1311", Icon: Mail },
  { label: "Location", value: "50 Crowther Ln, Suite 140, Fredericton, NB E3C 0J1", Icon: MapPin },
  { label: "Response time", value: "Within 1 business day", Icon: Clock },
  { label: "Partner Schools", value: "McAdam HS · Harvey HS · UNB", Icon: School },
];

export default function Contact() {
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
        trackContact();
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

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-slate-400 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10";
  const label = "block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500";

  return (
    <section id="contact" className="scroll-mt-32 border-t border-slate-200 bg-slate-50 py-28 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-20 lg:px-8">
        {/* Left — intro + details */}
        <div>
          <p className="anim-up section-label">Get in touch</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            Have a question?
            <br />
            <span className="text-[#2563eb]">Get in touch.</span>
          </h2>
          <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
            Send us a message and we&apos;ll reply within one business day. Ready to try a class? <Link href="/book" className="font-semibold text-[#2563eb] underline-offset-4 hover:underline">Book a free class</Link>.
          </p>

          <dl className="anim-up d3 mt-10">
            {info.map((item) => (
              <div key={item.label} className="flex items-start gap-4 border-t border-slate-200 py-5 last:border-b">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]"><item.Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-[#0f172a]">{item.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="anim-up d4 mt-8 flex max-w-md items-start gap-2 text-xs leading-relaxed text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            Your personal information is kept private and never shared. We follow Canadian privacy law (PIPEDA).
          </p>
        </div>

        {/* Right — form */}
        <div className="anim-up d2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
            {status === "success" && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">Message sent!</p>
                <p className="mt-0.5 text-xs text-emerald-700">We&apos;ll get back to you within one business day.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-800">Failed to send</p>
                <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className={label}>Full name <span className="text-[#2563eb]">*</span></label>
                  <input id="name" type="text" required placeholder="Jane Smith" value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className={input} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className={label}>Phone</label>
                  <input id="phone" type="tel" placeholder="+1 (506) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={input} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className={label}>Email address <span className="text-[#2563eb]">*</span></label>
                <input id="email" type="email" required placeholder="jane@example.com" value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className={input} />
              </div>

              <fieldset className="space-y-2">
                <legend className={label}>Program interest</legend>
                <div className="flex flex-wrap gap-2 pt-2">
                  {courseOptions.map((course) => {
                    const checked = formData.courses.includes(course.id);
                    return (
                      <button
                        key={course.id}
                        type="button"
                        aria-pressed={checked}
                        onClick={() => handleCourseToggle(course.id)}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition ${
                          checked ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
                        }`}
                      >
                        {checked ? "✓ " : ""}{course.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="space-y-2">
                <label htmlFor="message" className={label}>Message</label>
                <textarea id="message" rows={4} value={formData.message}
                  placeholder="Tell us about your child's age, experience level, or any questions you have..."
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className={`${input} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : <>Send message <Send className="h-4 w-4" aria-hidden="true" /></>}
              </button>

              <p className="text-center text-[11px] text-slate-500">
                By submitting you agree to our{" "}
                <a href="/privacy" className="underline hover:text-[#0f172a]">Privacy Policy</a>{" "}and{" "}
                <a href="/terms" className="underline hover:text-[#0f172a]">Terms of Service</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
