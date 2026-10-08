import { Bot, Drone, Plane, type LucideProps } from "lucide-react";

const map = { bot: Bot, drone: Drone, plane: Plane };

export default function ProgramIcon({ name, ...props }: { name: keyof typeof map } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}

/** Tailwind classes for each accent: icon tile bg/fg + age label colour. */
export const accentCls = {
  blue:  { tile: "bg-[#2563eb]/10 text-[#2563eb]",  age: "text-[#2563eb]",  tileDark: "bg-[#2563eb] text-white" },
  cyan:  { tile: "bg-[#22d3ee]/15 text-[#0891b2]",  age: "text-[#0891b2]",  tileDark: "bg-[#22d3ee] text-[#0a1530]" },
  amber: { tile: "bg-[#fbbf24]/20 text-[#b45309]",  age: "text-[#d97706]",  tileDark: "bg-[#fbbf24] text-[#0a1530]" },
} as const;
