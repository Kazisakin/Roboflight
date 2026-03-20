import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://roboflight.ca"),
  title: "RoboFlight | Robotics, Coding & Circuitry for Kids",
  description:
    "RoboFlight teaches children how to build and program robots, drones, and RC planes. Fostering creativity, problem-solving, and a passion for STEM in New Brunswick, Canada.",
  keywords: ["robotics", "coding", "STEM", "kids", "drones", "RC planes", "New Brunswick", "Canada", "education"],
  authors: [{ name: "Abdur Rahman Chowdhury" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  openGraph: {
    title: "RoboFlight | Robotics, Coding & Circuitry for Kids",
    description: "RoboFlight teaches children how to build and program robots, drones, and RC planes in New Brunswick, Canada.",
    type: "website",
    url: "https://roboflight.ca",
    siteName: "RoboFlight",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RoboFlight — Robotics, Coding & Circuitry for Kids" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoboFlight | Robotics, Coding & Circuitry for Kids",
    description: "RoboFlight teaches children how to build and program robots, drones, and RC planes in New Brunswick, Canada.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <CookieConsent />
        <CustomCursor />
      </body>
    </html>
  );
}
