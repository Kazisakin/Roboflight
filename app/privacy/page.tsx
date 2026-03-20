import Link from "next/link";
import Logo from "@/components/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RoboFlight",
  description: "Learn how RoboFlight collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
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
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">Legal</span>
          <h1 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2025</p>
          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Overview</h2>
              <p className="text-sm leading-relaxed">
                RoboFlight (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or contact us about our programs. We operate in compliance with Canadian privacy laws, including PIPEDA.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Information We Collect</h2>
              <div className="space-y-3">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Contact Information</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Name, email address, and phone number when you submit our contact form or sign up for a program.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Usage Data</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Anonymous information about how you interact with our website, including pages visited and time on page.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Device Information</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Browser type, operating system, and IP address collected automatically when you access our website.</p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Children&apos;s Privacy</h2>
              <p className="text-sm leading-relaxed bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-800">
                RoboFlight programs are designed for children. We do not knowingly collect personal information directly from children under the age of 13. All registrations are handled through parents or guardians. If you believe we have inadvertently collected information from a child without parental consent, please contact us immediately.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Data Security</h2>
              <p className="text-sm leading-relaxed">We implement appropriate technical and organisational measures to protect your information. Your data is stored securely and is never sold or rented to third parties.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Your Rights</h2>
              <p className="text-sm leading-relaxed">You may access, correct, or request deletion of your personal information at any time by contacting us. We will respond within five business days.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-blue-900 mb-3">Contact Us</h2>
              <p className="text-sm leading-relaxed">
                Questions about this policy? Email us at{" "}
                <a href="mailto:info@roboflight.ca" className="text-blue-600 hover:text-blue-700 font-medium">info@roboflight.ca</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <footer className="bg-blue-950 py-6 px-4 text-center">
        <p className="text-blue-500 text-xs">
          &copy; {new Date().getFullYear()} RoboFlight. All rights reserved.{" "}
          <Link href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link>
          {" · "}
          <Link href="/cookies" className="hover:text-blue-300 transition-colors">Cookie Policy</Link>
        </p>
      </footer>
    </div>
  );
}
