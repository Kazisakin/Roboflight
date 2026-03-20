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

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <AdmissionPopup />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Courses />
      <ArduinoTeaser />
      <Pricing />
      <Schools />
      <Gallery />
      <CTA />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
