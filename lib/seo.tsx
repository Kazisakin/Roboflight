/* Structured data (JSON-LD) for Google. Built from lib/site.ts and lib/programs.ts
   so the facts Google reads always match what's on the page. */
import { hours, site } from "@/lib/site";
import type { Program } from "@/lib/programs";

const abs = (path = "/") => new URL(path, site.url).toString();
const sameAs = () => Object.values(site.social).filter(Boolean);

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function businessSchema() {
  const open = hours
    .map((h, i) => ({ ...h, i }))
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayNames.at(h.i)}`,
      opens: h.open,
      closes: h.close,
    }));
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": abs("/#business"),
    name: site.name,
    url: site.url,
    logo: abs("/web-app-manifest-512x512.png"),
    image: [abs("/og/home.jpg"), abs("/photos/kids-robotics-coding-class-fredericton.jpg"), abs("/photos/robot-car-competition-kids.jpg")],
    knowsAbout: ["Robotics", "Arduino", "Coding for kids", "Electronics", "Drones", "RC planes", "STEM education"],
    description:
      "Hands-on robotics, coding, drone and RC plane classes for kids in Fredericton, New Brunswick. Kits included, free trial class.",
    telephone: "+1-506-897-1311",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: "CA",
    },
    ...(site.geo ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
    hasMap: site.mapLink,
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name: `${name}, NB` })),
    openingHoursSpecification: open,
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

export function courseSchema(p: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": abs(`/programs/${p.slug}#course`),
    name: `${p.title} for Kids (${p.ages})`,
    description: p.short,
    url: abs(`/programs/${p.slug}`),
    image: p.hero,
    educationalLevel: "Beginner",
    inLanguage: "en-CA",
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: `Kids and teens, ${p.ages.toLowerCase()}` },
    coursePrerequisites: "No prior experience needed",
    teaches: p.learn.map((l) => l.title),
    provider: { "@type": "EducationalOrganization", "@id": abs("/#business"), name: site.name, url: site.url },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", repeatCount: 1 },
      location: {
        "@type": "Place",
        name: site.name,
        address: { "@type": "PostalAddress", streetAddress: site.address.line1, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postal, addressCountry: "CA" },
      },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: site.url,
    name: site.name,
    alternateName: ["Robo Flight", "RoboFlight Fredericton"],
    inLanguage: "en-CA",
    publisher: { "@id": abs("/#business") },
  };
}

/** The programs as an ordered list — helps Google show them together. */
export function programListSchema(list: Program[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RoboFlight programs",
    itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/programs/${p.slug}`), name: p.title })),
  };
}

export function articleSchema(a: { slug: string; title: string; description: string; image: string; published: string; updated: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": abs(`/blog/${a.slug}#article`),
    mainEntityOfPage: abs(`/blog/${a.slug}`),
    headline: a.title,
    description: a.description,
    image: abs(a.image),
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: "en-CA",
    author: { "@type": "Organization", "@id": abs("/#business"), name: site.name, url: site.url },
    publisher: { "@type": "Organization", "@id": abs("/#business"), name: site.name, logo: { "@type": "ImageObject", url: abs("/web-app-manifest-512x512.png") } },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** Renders one or more JSON-LD objects. Safe to use in server components. */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
