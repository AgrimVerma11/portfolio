"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  /** seconds between each character */
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Splits text into characters that stagger in from below with a blur dissolve.
 * Words are kept whole so lines never break mid-word.
 */
export default function SplitText({
  text,
  className,
  stagger = 0.025,
  delay = 0,
  as = "span",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  let charIndex = 0;
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "0.7em", opacity: 0, filter: "blur(6px)" },
                  visible: {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                      delay: delay + i * stagger,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
