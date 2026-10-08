import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "white";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const markHeight = { sm: 22, md: 26, lg: 32 };

/** Drone mark + wordmark. `dark` = for light backgrounds, `white` = for dark backgrounds. */
export default function Logo({ variant = "dark", size = "md", showTagline = true }: LogoProps) {
  const h = markHeight[size];
  const w = Math.round(h * (582 / 165));
  const onDark = variant === "white";

  return (
    <span className="flex items-center gap-3">
      <Image src="/logo-mark.png" alt="" width={w} height={h} className="object-contain" style={{ width: w, height: h }} priority unoptimized />
      <span className="flex flex-col leading-tight">
        <span className={`text-[15px] font-bold tracking-tight ${onDark ? "text-white" : "text-[#0f172a]"}`}>RoboFlight</span>
        {showTagline && (
          <span className={`text-[11px] font-medium uppercase tracking-[0.18em] ${onDark ? "text-slate-400" : "text-slate-500"}`}>
            Robotics · Coding
          </span>
        )}
      </span>
    </span>
  );
}
