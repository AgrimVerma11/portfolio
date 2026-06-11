/** Custom AV monogram lettermark. */
export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="av-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="60%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#E8A87C" />
        </linearGradient>
      </defs>
      {/* A — open apex, crossbar doubles as the V's entry stroke */}
      <path
        d="M6 32L15 8h2l8 24"
        stroke="url(#av-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 22h10"
        stroke="url(#av-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* V — shares the A's descending stroke rhythm */}
      <path
        d="M23 8l6.5 24L36 8"
        stroke="url(#av-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}
