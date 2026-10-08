import { Bot, Cable, Code2, Cpu, Gamepad2, Gauge, Hammer, Plane, Radar, Radio, Ruler, Wind, type LucideProps } from "lucide-react";
import type { LearnIcon as Name } from "@/lib/programs";

const map = { bot: Bot, cable: Cable, code: Code2, radar: Radar, wind: Wind, gauge: Gauge, cpu: Cpu, gamepad: Gamepad2, plane: Plane, ruler: Ruler, hammer: Hammer, radio: Radio };

export default function LearnIcon({ name, ...props }: { name: Name } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}
