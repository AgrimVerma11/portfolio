"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Quiet cross-fade on route entry. Opacity only, so it is cheap on phones. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
