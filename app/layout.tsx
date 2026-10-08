import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a1530",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://roboflight.ca"),
  title: {
    default: "Robotics & Coding Classes for Kids, Fredericton | RoboFlight",
    template: "%s | RoboFlight",
  },
  description:
    "Hands-on robotics, coding, drone and RC plane classes for kids in Fredericton, NB. Small groups, kits included. Book a free trial class.",
  applicationName: "RoboFlight",
  keywords: ["robotics classes Fredericton", "coding for kids Fredericton", "STEM classes Fredericton", "drone class for kids", "RC plane class", "Arduino for kids", "after school programs Fredericton", "New Brunswick"],
  authors: [{ name: "RoboFlight" }],
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Robotics & Coding Classes for Kids, Fredericton | RoboFlight",
    description: "Hands-on robotics, coding, drone and RC plane classes for kids in Fredericton, NB. Book a free trial class.",
    type: "website",
    url: "/",
    siteName: "RoboFlight",
    locale: "en_CA",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "RoboFlight — robotics & coding classes for kids in Fredericton" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics & Coding Classes for Kids, Fredericton | RoboFlight",
    description: "Hands-on robotics, coding, drone and RC plane classes for kids in Fredericton, NB.",
    images: ["/og/home.jpg"],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={manrope.variable}>
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${manrope.className} antialiased`}>
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
