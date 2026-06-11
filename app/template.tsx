"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Curtain wipe on route entry — a dark panel that lifts to reveal the page. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] bg-bg-secondary"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          style={{ transformOrigin: "top" }}
        />
      )}
      {children}
    </>
  );
}
