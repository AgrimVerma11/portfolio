"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, [data-cursor='hover']";

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setActive(true);
    document.body.dataset.customCursor = "true";

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      delete document.body.dataset.customCursor;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <>
      {/* glowing core dot — tracks the pointer 1:1 */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent-cyan"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 12px 2px rgba(0, 212, 255, 0.55)",
        }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* trailing ring — morphs on interactive targets */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-accent-primary/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: pressed ? 0.8 : hovering ? 1.8 : 1,
          opacity: hovering ? 0.9 : 0.5,
          backgroundColor: hovering ? "rgba(108, 99, 255, 0.08)" : "rgba(108, 99, 255, 0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
