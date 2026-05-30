import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import About from "@/components/About";
import Courses from "@/components/Courses";
import ArduinoTeaser from "@/components/ArduinoTeaser";
import Pricing from "@/components/Pricing";
import Schools from "@/components/Schools";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdmissionPopup from "@/components/AdmissionPopup";
import ScrollRocket from "@/components/ScrollRocket";
import CursorTrail from "@/components/CursorTrail";

function Wave({ topColor, bottomColor, flip = false }: { topColor: string; bottomColor: string; flip?: boolean }) {
  return (
    <div style={{ background: bottomColor, marginTop: "-1px", lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "56px", transform: flip ? "scaleX(-1)" : undefined }}
      >
        <path d="M0,0 C360,56 1080,0 1440,40 L1440,0 L0,0 Z" fill={topColor} />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <AdmissionPopup />
      <ScrollRocket />
      <CursorTrail />
      <Navbar />
      <Hero />
      <Stats />
      {/* dark → white */}
      <Wave topColor="#1e3a8a" bottomColor="#ffffff" />
      <Features />
      <About />
      {/* white → light-blue */}
      <Wave topColor="#ffffff" bottomColor="#eff6ff" />
      <Courses />
      {/* light-blue → dark */}
      <Wave topColor="#e0f2fe" bottomColor="#1e1b4b" />
      <ArduinoTeaser />
      <Pricing />
      <Schools />
      <Gallery />
      <CTA />
      <Testimonials />
      {/* dark → white */}
      <Wave topColor="#1e3a8a" bottomColor="#f8fafc" />
      <Contact />
      <Footer />
    </main>
  );
}
