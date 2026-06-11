import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#080810",
          secondary: "#0E0E1A",
          surface: "#14141F",
        },
        accent: {
          primary: "#6C63FF",
          warm: "#E8A87C",
          cyan: "#00D4FF",
        },
        text: {
          primary: "#F0EEF8",
          secondary: "#8A8AA0",
          muted: "#3A3A52",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #6C63FF 0%, #00D4FF 50%, #E8A87C 100%)",
        "gradient-violet-cyan": "linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)",
      },
      keyframes: {
        "orb-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -30px) scale(1.08)" },
          "66%": { transform: "translate(-30px, 25px) scale(0.95)" },
        },
        "orb-drift-alt": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%": { transform: "translate(-50px, 35px) scale(1.05)" },
          "70%": { transform: "translate(25px, -40px) scale(0.92)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "chevron-nudge": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(6px)", opacity: "0.4" },
        },
      },
      animation: {
        "orb-drift": "orb-drift 18s ease-in-out infinite",
        "orb-drift-alt": "orb-drift-alt 22s ease-in-out infinite",
        shimmer: "shimmer 3.5s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        bob: "bob 4s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        "chevron-nudge": "chevron-nudge 1.8s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
