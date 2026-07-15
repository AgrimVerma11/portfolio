type BrowserMockProps = {
  /** label shown in the mock address bar */
  url: string;
};

/** Abstract wireframe of the app inside browser chrome – no fake screenshot needed. */
export default function BrowserMock({ url }: BrowserMockProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-white/10 bg-bg-primary shadow-2xl"
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex-1 rounded-md bg-bg-primary px-3 py-1 font-mono text-[10px] text-text-muted">
          {url}
        </span>
      </div>
      <div className="flex gap-3 p-4">
        {/* sidebar */}
        <div className="hidden w-1/4 space-y-2 sm:block">
          <div className="h-2.5 w-3/4 rounded bg-accent-primary/40" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="h-2 w-4/6 rounded bg-white/10" />
          <div className="mt-4 h-2 w-full rounded bg-white/5" />
          <div className="h-2 w-5/6 rounded bg-white/5" />
        </div>
        {/* opportunity feed */}
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-accent-primary/30" />
            <div className="h-6 w-20 rounded-full bg-white/10" />
            <div className="h-6 w-20 rounded-full bg-white/10" />
          </div>
          {[0.85, 0.7, 0.78].map((w, i) => (
            <div key={i} className="rounded-lg border border-white/5 bg-bg-secondary p-3">
              <div
                className="mb-2 h-2.5 rounded bg-accent-cyan/30"
                style={{ width: `${w * 60}%` }}
              />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="mt-1.5 h-2 rounded bg-white/5" style={{ width: `${w * 100}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
