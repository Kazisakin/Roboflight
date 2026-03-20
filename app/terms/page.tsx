import Link from "next/link";
import Logo from "@/components/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RoboFlight",
  description: "Terms and conditions for using RoboFlight programs and website.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the RoboFlight website and enrolling in any RoboFlight program, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, students, parents, and guardians who access or use our services.",
  },
  {
    title: "Description of Services",
    body: "RoboFlight provides hands-on robotics, coding, drone, and electronics education programs for children and students in New Brunswick, Canada. Our services include in-person classes at partner schools, workshops, interactive online resources, and related educational content.",
  },
  {
    title: "Enrolment and Registration",
    body: "Enrolment in RoboFlight programs is subject to availability. All registrations must be completed by a parent or legal guardian for participants under the age of 18. By registering, you confirm that all information provided is accurate and complete. RoboFlight reserves the right to refuse enrolment at its sole discretion.",
  },
  {
    title: "Fees and Payment",
    body: "Program fees are outlined at the time of enrolment. All fees are in Canadian dollars (CAD). Payment is due prior to the start of each program session unless alternative arrangements have been agreed upon in writing. Fees are non-refundable except in circumstances outlined in our Refund Policy.",
  },
  {
    title: "Cancellation and Refund Policy",
    body: "Cancellations made more than 7 days before the program start date are eligible for a full refund. Cancellations made within 7 days of the program start are not eligible for a refund unless RoboFlight cancels the session. If RoboFlight cancels a session, participants will receive a full refund or credit toward a future session.",
  },
  {
    title: "Participant Conduct",
    body: "All participants are expected to behave respectfully toward instructors and fellow students. Disruptive, dangerous, or disrespectful behaviour may result in removal from the program without refund. Parents and guardians are responsible for ensuring their child understands and follows these expectations.",
  },
  {
    title: "Health and Safety",
    body: "RoboFlight takes the safety of all participants seriously. All programs are conducted under the supervision of qualified instructors. Participants must follow all safety instructions at all times. RoboFlight is not liable for injuries resulting from failure to follow safety guidelines.",
  },
  {
    title: "Photography and Media",
    body: "From time to time, RoboFlight may photograph or record sessions for promotional, educational, and social media purposes. By enrolling in a program, you grant RoboFlight permission to use photographs and recordings of the participant in which they may appear, unless you notify us in writing that you do not consent.",
  },
  {
    title: "Intellectual Property",
    body: "All content on the RoboFlight website, including text, graphics, logos, images, and curriculum materials, is the property of RoboFlight and is protected by Canadian copyright law. You may not reproduce, distribute, or create derivative works from our materials without prior written permission.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, RoboFlight shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services. Our total liability to you for any claim shall not exceed the amount paid by you for the relevant program.",
  },
  {
    title: "Privacy",
    body: "Your use of RoboFlight services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. We handle all personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA).",
  },
  {
    title: "Changes to Terms",
    body: "RoboFlight reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated date. Your continued use of our services after changes are posted constitutes acceptance of the updated terms.",
  },
  {
    title: "Governing Law",
    body: "These Terms of Service are governed by and construed in accordance with the laws of the Province of New Brunswick and the federal laws of Canada applicable therein. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of New Brunswick.",
  },
  {
    title: "Contact",
    body: "If you have any questions about these Terms of Service, please contact us at info@roboflight.ca. We will respond within five business days.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-950 py-5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="white" size="sm" /></Link>
          <Link href="/" className="text-blue-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Terms of Service</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2025</p>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <section key={s.title}>
                <h2 className="flex items-start gap-3 text-base font-bold text-blue-900 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xs font-black">{i + 1}</span>
                  {s.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed pl-9">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-blue-950 py-6 px-4 text-center">
        <p className="text-blue-500 text-xs">
          &copy; {new Date().getFullYear()} RoboFlight. All rights reserved.{" "}
          <Link href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link>
          {" | "}
          <Link href="/cookies" className="hover:text-blue-300 transition-colors">Cookie Policy</Link>
          {" | "}
          <Link href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
