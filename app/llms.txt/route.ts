/* /llms.txt — a plain-text summary for AI assistants and AI search (ChatGPT, Perplexity, Google AI).
   Built from the same data as the site, so it never goes out of date. */
import { articles } from "@/lib/blog";
import { programs } from "@/lib/programs";
import { fmtTime, hours, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const hoursLines = [1, 2, 3, 4, 5, 6, 0].map((i) => hours[i]).map((h) => `- ${h.day}: ${h.open && h.close ? `${fmtTime(h.open)}–${fmtTime(h.close)}` : "Closed"}`);
  const body = `# RoboFlight

> RoboFlight is a hands-on robotics, coding, drone and RC plane school for kids in Fredericton, New Brunswick, Canada. Weekly classes, training kits included, free trial class.

- Address: ${site.address.full}
- Phone: ${site.phone}
- Email: ${site.email}
- Serving: ${site.serviceArea.join(", ")} (New Brunswick)
- Book a free trial class: ${u("/book")}

## Programs

${programs.map((p) => `- [${p.title}](${u(`/programs/${p.slug}`)}): ${p.ages}. ${p.short} Students build: ${p.build.toLowerCase()}.`).join("\n")}

## Hours

${hoursLines.join("\n")}

## Pages

- [Home](${u("/")})
- [Book a free class](${u("/book")})
- [Parent FAQ](${u("/faq")})
- [Robotics programs for schools](${u("/schools")})
- [Free online robot car builder](${u("/build")})
- [Parent guides](${u("/blog")})

## Parent guides

${articles.map((a) => `- [${a.title}](${u(`/blog/${a.slug}`)}): ${a.description}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
