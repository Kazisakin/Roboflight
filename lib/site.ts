/* ──────────────────────────────────────────────────────────────
   RoboFlight — business info used across the site.
   Edit this one file to update hours, address, phone, etc.
   ────────────────────────────────────────────────────────────── */

export const site = {
  name: "RoboFlight",
  url: "https://roboflight.ca",
  email: "info@roboflight.ca",
  phone: "(506) 897-1311",
  phoneHref: "tel:+15068971311",
  address: {
    line1: "50 Crowther Ln, Suite 140",
    city: "Fredericton",
    region: "NB",
    postal: "E3C 0J1",
    full: "50 Crowther Ln Ste 140, Fredericton, NB E3C 0J1",
  },
  mapEmbed: "https://www.google.com/maps?q=50+Crowther+Ln+Ste+140,+Fredericton,+NB+E3C+0J1&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=50+Crowther+Ln+Ste+140,+Fredericton,+NB+E3C+0J1",
  timeZone: "America/Moncton", // Atlantic time (Fredericton)
  /** Exact map pin (right-click the spot in Google Maps to copy). Leave null to skip. */
  geo: null as null | { lat: number; lng: number },
  /** Towns we serve — used once on the site and in search data. */
  serviceArea: ["Fredericton", "Oromocto", "New Maryland", "Hanwell", "Lincoln", "Nackawic", "Minto", "Harvey", "McAdam"],
  /** Social profiles — leave "" to hide an icon. Filled ones also go into Google's business data. */
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },
  /** How long a free trial class lasts — shown on the booking page. */
  trialLength: "About 1 hour",
};

/**
 * Weekly working hours. 0 = Sunday … 6 = Saturday.
 * `open`/`close` are 24-hour "HH:MM". Use null for closed days.
 * ⚠️ PLACEHOLDER HOURS — replace with RoboFlight's real hours.
 * Booking time slots are generated hourly from these.
 */
export const hours: { day: string; short: string; open: string | null; close: string | null }[] = [
  { day: "Sunday",    short: "Sun", open: null,    close: null },
  { day: "Monday",    short: "Mon", open: "16:00", close: "19:00" },
  { day: "Tuesday",   short: "Tue", open: "16:00", close: "19:00" },
  { day: "Wednesday", short: "Wed", open: "16:00", close: "19:00" },
  { day: "Thursday",  short: "Thu", open: "16:00", close: "19:00" },
  { day: "Friday",    short: "Fri", open: "16:00", close: "19:00" },
  { day: "Saturday",  short: "Sat", open: "10:00", close: "14:00" },
];

export function fmtTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${ap}` : `${h12} ${ap}`;
}

/** Hourly start times for a given weekday (last slot starts 1h before close). */
export function slotsFor(weekday: number): string[] {
  const d = hours[weekday];
  if (!d.open || !d.close) return [];
  const [oh] = d.open.split(":").map(Number);
  const [ch] = d.close.split(":").map(Number);
  const out: string[] = [];
  for (let h = oh; h < ch; h++) out.push(`${String(h).padStart(2, "0")}:00`);
  return out;
}
