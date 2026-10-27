"use client";

import { ReactNode, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Smooth-scroll only on mouse/trackpad devices; touch keeps native momentum.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(!reduced.matches && fine.matches);
    update();
    reduced.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
