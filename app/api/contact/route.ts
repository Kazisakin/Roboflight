import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

interface ContactBody {
  name: string;
  email: string;
  phone: string;
  courses: string[];
  message: string;
}

function sanitize(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const phone = sanitize(body.phone || "");
    const message = sanitize(body.message || "");
    const courses = Array.isArray(body.courses)
      ? body.courses.map((c: string) => sanitize(c))
      : [];

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check env vars
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !contactEmail) {
      console.error("Missing SMTP environment variables");
      return NextResponse.json(
        { error: "Server email configuration is incomplete. Please contact us directly." },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Format courses list
    const courseLabels: Record<string, string> = {
      "basic-robotics": "🤖 Basic Robotics",
      "quadcopter-drone": "🚁 Quadcopter Drone",
      "rc-plane": "✈️ RC Plane Making",
    };

    const coursesText =
      courses.length > 0
        ? courses.map((c) => courseLabels[c] || c).join(", ")
        : "None selected";

    // HTML email body
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #f0f4ff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(29,78,216,0.1); }
            .header { background: linear-gradient(135deg, #1d4ed8, #0891b2); padding: 32px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
            .body { padding: 32px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #1e3a5f; background: #f0f4ff; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #3b82f6; }
            .courses { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
            .course-badge { background: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
            .footer { background: #1e3a8a; padding: 20px 32px; text-align: center; }
            .footer p { color: rgba(255,255,255,0.6); margin: 0; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New RoboFlight Inquiry</h1>
              <p>A new contact form submission has been received</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${email}</div>
              </div>
              ${
                phone
                  ? `<div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${phone}</div>
              </div>`
                  : ""
              }
              <div class="field">
                <div class="label">Interested Courses</div>
                <div class="courses">
                  ${
                    courses.length > 0
                      ? courses
                          .map(
                            (c) =>
                              `<span class="course-badge">${courseLabels[c] || c}</span>`
                          )
                          .join("")
                      : '<span class="course-badge">None selected</span>'
                  }
                </div>
              </div>
              ${
                message
                  ? `<div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space:pre-line">${message}</div>
              </div>`
                  : ""
              }
            </div>
            <div class="footer">
              <p>Sent from RoboFlight Contact Form · roboflight.ca</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text fallback
    const textBody = `
New RoboFlight Contact Form Submission
=======================================
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Courses: ${coursesText}
Message: ${message || "Not provided"}

Sent from roboflight.ca
    `.trim();

    // Send email to admin
    await transporter.sendMail({
      from: `"RoboFlight Website" <${smtpUser}>`,
      to: contactEmail,
      subject: `New Inquiry from ${name} — RoboFlight`,
      text: textBody,
      html: htmlBody,
      replyTo: email,
    });

    // Send confirmation email to user
    const confirmHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #f0f4ff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(29,78,216,0.1); }
            .header { background: linear-gradient(135deg, #1d4ed8, #0891b2); padding: 32px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .body { padding: 32px; color: #374151; line-height: 1.6; }
            .highlight { background: #dbeafe; border-radius: 12px; padding: 16px 20px; margin: 16px 0; border-left: 4px solid #3b82f6; }
            .footer { background: #1e3a8a; padding: 20px 32px; text-align: center; }
            .footer p { color: rgba(255,255,255,0.6); margin: 0; font-size: 12px; }
            .btn { display: inline-block; background: #22d3ee; color: #1e3a8a; padding: 12px 28px; border-radius: 30px; font-weight: 700; text-decoration: none; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Thanks for reaching out, ${name}!</h1>
            </div>
            <div class="body">
              <p>Hi ${name},</p>
              <p>Thank you for contacting <strong>RoboFlight</strong>! We've received your inquiry and will get back to you within <strong>1-2 business days</strong>.</p>
              <div class="highlight">
                <strong>Your selected courses:</strong> ${coursesText}
              </div>
              <p>In the meantime, feel free to explore our programs on our website. We're excited to help your child discover the amazing world of robotics, drones, and coding!</p>
              <p>— The RoboFlight Team 🤖✈️🚀</p>
            </div>
            <div class="footer">
              <p>RoboFlight · New Brunswick, Canada · info@roboflight.ca</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"RoboFlight" <${smtpUser}>`,
      to: email,
      subject: "Thanks for contacting RoboFlight! 🚀",
      html: confirmHtml,
      text: `Hi ${name},\n\nThank you for contacting RoboFlight! We've received your inquiry and will get back to you within 1-2 business days.\n\nYour selected courses: ${coursesText}\n\n— The RoboFlight Team`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
