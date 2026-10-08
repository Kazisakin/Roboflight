import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Free Online Robot Car Builder for Kids | RoboFlight",
  description: "Drag parts onto a circuit board, then drive the robot car you built. A free browser game from RoboFlight, Fredericton's robotics school for kids.",
  path: "/build",
  image: "/og/build.jpg",
});

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return children;
}
