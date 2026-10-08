/* Client-side tracking helpers. Every call is a no-op until the visitor accepts
   cookies AND the matching ID is set in the environment (see .env.example). */

type Params = Record<string, string | number | boolean | undefined>;
type W = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  __rfConsent?: boolean;
};

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const ADS_BOOK_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOK_LABEL || "";
export const ADS_CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

const w = () => (typeof window === "undefined" ? null : (window as W));

export const hasConsent = () => !!w()?.__rfConsent;

/** Generic event → GA4 (and Meta custom event when the pixel is on). */
export function track(event: string, params: Params = {}) {
  const win = w();
  if (!win) return;
  win.gtag?.("event", event, params);
}

/** A random id shared by browser + server events so Meta can de-duplicate them. */
export const newEventId = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** Primary conversion: a free class was booked. */
export function trackBooking({ program, eventId, email, phone }: { program: string; eventId: string; email?: string; phone?: string }) {
  const win = w();
  if (!win) return;
  // Enhanced conversions: Google hashes these in the browser before sending.
  if (hasConsent() && (email || phone)) {
    win.gtag?.("set", "user_data", { ...(email ? { email } : {}), ...(phone ? { phone_number: phone } : {}) });
  }
  win.gtag?.("event", "book_free_class", { program });
  if (ADS_ID && ADS_BOOK_LABEL) win.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_BOOK_LABEL}`, transaction_id: eventId });
  win.fbq?.("track", "Lead", { content_name: program }, { eventID: eventId });
}

export function trackContact() {
  const win = w();
  win?.gtag?.("event", "contact_form_submit");
  win?.fbq?.("track", "Contact");
}

/** Read Meta's browser cookies so the server event can be matched to the ad click. */
export function metaCookies() {
  if (typeof document === "undefined") return {};
  const get = (n: string) => document.cookie.split("; ").find((c) => c.startsWith(n + "="))?.split("=")[1];
  return { fbp: get("_fbp"), fbc: get("_fbc") };
}
