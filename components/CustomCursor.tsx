"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onHoverIn = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    const targets = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label[class*='cursor'], [class*='cursor-pointer']"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — snaps directly to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full bg-blue-600 transition-all duration-150"
          style={{
            width: hovered ? "6px" : clicked ? "4px" : "6px",
            height: hovered ? "6px" : clicked ? "4px" : "6px",
            opacity: visible ? 1 : 0,
          }}
        />
      </div>

      {/* Ring — trails behind with lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full border transition-all duration-200"
          style={{
            width: hovered ? "44px" : clicked ? "28px" : "32px",
            height: hovered ? "44px" : clicked ? "28px" : "32px",
            borderColor: hovered ? "rgb(6 182 212)" : "rgb(37 99 235)",
            borderWidth: hovered ? "2px" : "1.5px",
            opacity: visible ? (hovered ? 0.7 : 0.4) : 0,
            backgroundColor: hovered ? "rgb(6 182 212 / 0.08)" : "transparent",
          }}
        />
      </div>
    </>
  );
}
