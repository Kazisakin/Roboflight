import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "It was a terrific way to engage students in the final weeks of school. Students in Grades 7 and 8 started from scratch on both the coding and circuitry fronts, and they've progressed to the point where they're preparing their robots to compete 'in the ring.' It has been a blast watching students learn through this hands-on endeavor.",
    name: "Matt Clements",
    role: "Principal · McAdam High School",
    tag: "Basic Robotics",
  },
  {
    quote: "I was completely clueless about that stuff. I was soon able to do most of it myself, and I ended up doing about half the programming myself. I thought it was an interesting change from the regular classroom — it was fun!",
    name: "Lauren Messer",
    role: "Grade 8 Student · McAdam High School",
    tag: "Basic Robotics",
  },
  {
    quote: "Thanks to the clear explanations, hands-on projects, and supportive instructors, I was able to build a Robot car by the end of the course — something I never thought I could do. This course transformed my understanding and skills in robotics. I highly recommend it to anyone interested.",
    name: "Tousif Islam",
    role: "Computer Science Student · UNB",
    tag: "Robot Car",
  },
];

function Star() {
  return (
    <svg className="h-4 w-4 text-[#fbbf24]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="stories" className="scroll-mt-32 bg-white py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="anim-up section-label">Student stories</p>
          <h2 className="t-h2 anim-up d1 mt-5 text-[#0f172a]">
            In their own
            <br />
            <span className="text-[#2563eb]">words.</span>
          </h2>
          <p className="anim-up d2 mt-6 max-w-md t-lead text-slate-600">
            Students, parents, and educators who have experienced RoboFlight firsthand.
          </p>
        </div>

        <div role="list" aria-label="Testimonials" className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {testimonials.map((t, i) => (
            <article key={t.name} role="listitem" className={`anim-up d${i + 1} flex w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-7 sm:w-[360px] lg:w-auto`}>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">{[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}</div>
                <Quote className="h-7 w-7 text-[#2563eb]/15" aria-hidden="true" />
              </div>
              <p className="mt-5 flex-1 text-base leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-7 flex items-center gap-4 border-t border-slate-200 pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a1530] text-xs font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">{t.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">{t.tag}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
