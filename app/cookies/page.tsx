import Link from "next/link";
import Logo from "@/components/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | RoboFlight",
  description: "Learn how RoboFlight uses cookies and similar technologies on our website.",
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-950 py-5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo variant="white" size="sm" />
          </Link>
          <Link href="/" className="text-blue-300 hover:text-white text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
            Legal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2025</p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">What Are Cookies?</h2>
              <p className="text-sm leading-relaxed">
                Cookies are small text files placed on your device when you visit our website. They help us provide a
                better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">How We Use Cookies</h2>
              <div className="space-y-3">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Essential Cookies</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Necessary for the website to function correctly, enabling core functionality such as page navigation.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Performance Cookies</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Collect anonymous information about how visitors use our website to help us improve the user experience.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Analytics Cookies</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Third-party analytics tools may place cookies to help us understand traffic and usage patterns.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Managing Cookies</h2>
              <p className="text-sm leading-relaxed mb-3">Most browsers allow you to control cookies. You can view, block, or delete cookies through your browser settings.</p>
              <p className="text-sm leading-relaxed mt-3 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4">
                Please note that disabling cookies may affect the functionality of this and other websites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Changes to This Policy</h2>
              <p className="text-sm leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Contact Us</h2>
              <p className="text-sm leading-relaxed">
                Questions about our use of cookies? Email us at{" "}
                <a href="mailto:info@roboflight.ca" className="text-blue-600 hover:text-blue-700 font-medium">
                  info@roboflight.ca
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-blue-950 py-6 px-4 text-center">
        <p className="text-blue-500 text-xs">
          &copy; {new Date().getFullYear()} RoboFlight. All rights reserved.{" "}
          <Link href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link>
          {" | "}
          <Link href="/cookies" className="hover:text-blue-300 transition-colors">Cookie Policy</Link>
        </p>
      </footer>
    </div>
  );
}
