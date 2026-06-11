import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-accent-cyan">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
        This route doesn&apos;t resolve.
      </h1>
      <p className="mt-4 max-w-sm text-text-secondary">
        The page you&apos;re looking for compiled to nothing. Let&apos;s get you home.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent-primary px-7 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(108,99,255,0.5)]"
      >
        Back to base
      </Link>
    </main>
  );
}
