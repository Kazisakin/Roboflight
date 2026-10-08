import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PhotoBand from "@/components/PhotoBand";
import Features from "@/components/Features";
import Courses from "@/components/Courses";
import QuoteBand from "@/components/QuoteBand";
import ArduinoTeaser from "@/components/ArduinoTeaser";
import Hours from "@/components/Hours";
import CTA from "@/components/CTA";
import Schools from "@/components/Schools";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Tagline from "@/components/Tagline";
import Footer from "@/components/Footer";
import AdmissionPopup from "@/components/AdmissionPopup";
import RevealObserver from "@/components/RevealObserver";
import { pageMeta } from "@/lib/meta";
import { JsonLd, businessSchema, courseSchema, programListSchema, websiteSchema } from "@/lib/seo";
import { programs } from "@/lib/programs";

export const metadata = pageMeta({
  title: "Robotics & Coding Classes for Kids, Fredericton | RoboFlight",
  description: "Hands-on robotics, coding, drone and RC plane classes for kids in Fredericton, NB. Small groups, kits included. Book a free trial class.",
  path: "/",
  image: "/og/home.jpg",
});

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <JsonLd data={[websiteSchema(), businessSchema(), programListSchema(programs), ...programs.map(courseSchema)]} />
      <AdmissionPopup />
      <Navbar />
      <Hero />
      <Tagline />
      <Stats />
      <PhotoBand
        image="/photos/robot-car-competition-kids.jpg"
        image2="/photos/students-assembling-robot-electronics.jpg"
        eyebrow="Inside the classroom"
        line1="Real kits. Real code."
        line2="Real robots."
        body="Every session ends with something students built with their own hands — wired, coded, and driving across the classroom floor."
      />
      <Features />
      <Courses />
      <QuoteBand />
      <ArduinoTeaser />
      <Hours />
      <CTA />
      <Schools />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <RevealObserver />
    </main>
  );
}
