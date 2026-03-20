import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "white";
  size?: "sm" | "md" | "lg";
}

const dimensions = {
  sm: { width: 100, height: 40 },
  md: { width: 130, height: 52 },
  lg: { width: 160, height: 64 },
};

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const { width, height } = dimensions[size];

  return (
    <div
      className="flex items-center"
      style={{
        filter: variant === "white" ? "brightness(0) invert(1)" : "none",
      }}
    >
      <Image
        src="/favicon.svg"
        alt="RoboFlight Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
        unoptimized
      />
    </div>
  );
}
