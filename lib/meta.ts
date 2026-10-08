import type { Metadata } from "next";

/** Page metadata with canonical URL + matching Open Graph / Twitter cards. */
export function pageMeta({ title, description, path, image = "/og/home.jpg", noindex = false }:
  { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "RoboFlight",
      locale: "en_CA",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
