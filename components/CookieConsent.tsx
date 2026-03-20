"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          {/* Text */}
          <div className="flex-1">
            <p className="text-white text-sm font-semibold mb-0.5">We use cookies</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              We use cookies to improve your experience on our site. By continuing, you agree to our{" "}
              <Link href="/cookies" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">Cookie Policy</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">Privacy Policy</Link>.
            </p>
          </div>
          {/* Actions */}
          <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={decline}
              className="flex-1 sm:flex-none px-4 py-2 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-xs font-medium transition-all cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
