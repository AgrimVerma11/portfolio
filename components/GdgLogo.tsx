/** Google Developer Groups bracket mark — the four Google colors, rounded strokes. */
export default function GdgLogo({ className = "h-4 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" fill="none" className={className} aria-hidden="true" role="img">
      {/* left bracket */}
      <path d="M17 4.5L7 12" stroke="#EA4335" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M7 12l10 7.5" stroke="#4285F4" strokeWidth="4.5" strokeLinecap="round" />
      {/* right bracket */}
      <path d="M31 4.5L41 12" stroke="#34A853" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M41 12l-10 7.5" stroke="#F9AB00" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
