import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import { programs } from "@/lib/programs";
import { createHash } from "crypto";
import { fmtTime, site, slotsFor } from "@/lib/site";

const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/** Meta Conversions API — server-side copy of the browser "Lead" event (same event_id, so Meta de-duplicates).
 *  Runs only when the visitor accepted cookies and META_PIXEL_ID + META_CAPI_TOKEN are set. Never blocks a booking. */
async function sendMetaLead(opts: { eventId: string; email: string; phone: string; program: string; ip?: string | null; ua?: string | null; fbp?: string; fbc?: string; url?: string }) {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID, token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;
  const digits = opts.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `1${digits}` : digits;
  const body = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: opts.eventId,
      action_source: "website",
      event_source_url: opts.url,
      user_data: {
        em: [sha(opts.email)],
        ...(phone ? { ph: [sha(phone)] } : {}),
        ct: [sha("fredericton")], st: [sha("nb")], country: [sha("ca")],
        ...(opts.ip ? { client_ip_address: opts.ip } : {}),
        ...(opts.ua ? { client_user_agent: opts.ua } : {}),
        ...(opts.fbp ? { fbp: opts.fbp } : {}),
        ...(opts.fbc ? { fbc: opts.fbc } : {}),
      },
      custom_data: { content_name: opts.program },
    }],
    ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
  };
  try {
    await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.error("Meta CAPI error:", err);
  }
}

const clean = (v: unknown, max = 500) => sanitizeHtml(String(v ?? ""), { allowedTags: [], allowedAttributes: {} }).trim().slice(0, max);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const program = clean(body.program, 40);
    const date = clean(body.date, 10);
    const time = clean(body.time, 5);
    const parentName = clean(body.parentName, 100);
    const email = clean(body.email, 200);
    const phone = clean(body.phone, 40);
    const childName = clean(body.childName, 100);
    const childAge = clean(body.childAge, 5);
    const notes = clean(body.notes, 2000);

    // ── Validation ──
    const programTitle = program === "not-sure" ? "Not sure yet — help me choose" : programs.find((p) => p.slug === program)?.title;
    if (!programTitle) return NextResponse.json({ error: "Please choose a program." }, { status: 400 });
    if (!parentName || !phone) return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return NextResponse.json({ error: "Please pick a day and time." }, { status: 400 });
    const [y, m, d] = date.split("-").map(Number);
    const day = new Date(y, m - 1, d);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (isNaN(day.getTime()) || day <= today) return NextResponse.json({ error: "Please pick a future date." }, { status: 400 });
    if (!slotsFor(day.getDay()).includes(time)) return NextResponse.json({ error: "That time isn't available — please pick another." }, { status: 400 });

    const whenText = `${day.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at ${fmtTime(time)}`;

    // ── Email ──
    const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
      console.error("Missing SMTP environment variables");
      return NextResponse.json({ error: "Online booking is temporarily unavailable." }, { status: 500 });
    }
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });

    const rows: [string, string][] = [
      ["Program", programTitle], ["When", whenText], ["Parent / guardian", parentName], ["Email", email], ["Phone", phone],
      ["Student", childName || "—"], ["Age", childAge || "—"], ["Notes", notes || "—"],
    ];
    const table = rows.map(([k, v]) =>
      `<tr><td style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;white-space:nowrap">${k}</td><td style="padding:10px 14px;font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;white-space:pre-line">${v}</td></tr>`).join("");
    const wrap = (title: string, inner: string) => `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif">
      <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden">
        <div style="background:#0a1530;padding:28px 32px"><p style="margin:0;color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase">RoboFlight</p>
        <h1 style="margin:10px 0 0;color:#fff;font-size:24px">${title}</h1></div>
        <div style="padding:28px 32px">${inner}</div>
        <div style="padding:18px 32px;background:#f8fafc;color:#64748b;font-size:12px">${site.address.full} · ${site.phone} · ${site.email}</div>
      </div></body></html>`;

    await transporter.sendMail({
      from: `"RoboFlight Website" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Free class booking: ${parentName} — ${whenText}`,
      html: wrap("New free class booking", `<table style="width:100%;border-collapse:collapse">${table}</table>`),
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });

    await transporter.sendMail({
      from: `"RoboFlight" <${SMTP_USER}>`,
      to: email,
      subject: `Your free RoboFlight class — ${whenText}`,
      html: wrap(`You're booked, ${parentName}!`, `<p style="color:#334155;font-size:15px;line-height:1.6;margin:0 0 18px">Thanks for booking a free trial class. Here are your details:</p>
        <table style="width:100%;border-collapse:collapse">${rows.slice(0, 2).map(([k, v]) => `<tr><td style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0">${k}</td><td style="padding:10px 14px;font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0">${v}</td></tr>`).join("")}
        <tr><td style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#64748b">Where</td><td style="padding:10px 14px;font-size:15px;color:#0f172a">${site.address.full}</td></tr></table>
        <p style="color:#334155;font-size:15px;line-height:1.6;margin:18px 0 0">Need to change or cancel? Just reply to this email or call ${site.phone}.</p>
        <p style="margin:22px 0 0"><a href="${site.mapLink}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:700;font-size:14px">Get directions</a></p>`),
      text: `Hi ${parentName},\n\nYou're booked for a free RoboFlight trial class.\n\nProgram: ${programTitle}\nWhen: ${whenText}\nWhere: ${site.address.full}\n\nNeed to change or cancel? Reply to this email or call ${site.phone}.\n\n— RoboFlight`,
    });

    if (body.consent === true) {
      await sendMetaLead({
        eventId: clean(body.eventId, 80) || `${Date.now()}`,
        email, phone, program: programTitle,
        ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        ua: request.headers.get("user-agent"),
        fbp: clean(body.fbp, 200) || undefined,
        fbc: clean(body.fbc, 300) || undefined,
        url: clean(body.pageUrl, 500) || undefined,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Failed to book. Please try again later." }, { status: 500 });
  }
}
