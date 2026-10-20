"use client";

import { useEffect } from "react";

// Page-wide progressive enhancements, all opt-in through data attributes:
// - [data-reveal]: fades/slides in the first time it enters the viewport.
// - [data-glow]: exposes the pointer position as --mx / --my for a spotlight.
// - [data-tilt]: also exposes --rx / --ry for a subtle 3D tilt on hover.
// Without JavaScript every element simply renders in place.
export function Interactions() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealed = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    revealed.forEach((el) => observer.observe(el));

    const onMove = (ev: PointerEvent) => {
      const target = ev.target instanceof Element ? ev.target.closest<HTMLElement>("[data-glow]") : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      target.style.setProperty("--mx", `${x}px`);
      target.style.setProperty("--my", `${y}px`);
      if (!reduceMotion && target.hasAttribute("data-tilt")) {
        target.style.setProperty("--rx", `${((y / rect.height) - 0.5) * -5}deg`);
        target.style.setProperty("--ry", `${((x / rect.width) - 0.5) * 5}deg`);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
