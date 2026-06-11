"use client";

import { useEffect, useState } from "react";

type Options = {
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDelay?: number;
};

/**
 * Cycles through phrases with a type → hold → delete → retype loop.
 * When the user prefers reduced motion, returns the first phrase statically.
 */
export function useTypewriter(
  phrases: readonly string[],
  { typeSpeed = 55, deleteSpeed = 26, holdDelay = 2200 }: Options = {}
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || phrases.length === 0) return;
    const current = phrases[phraseIndex % phrases.length];

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), holdDelay);
    } else if (deleting && text === "") {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, reduced, typeSpeed, deleteSpeed, holdDelay]);

  return reduced ? phrases[0] ?? "" : text;
}
