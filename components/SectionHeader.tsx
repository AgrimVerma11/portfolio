import SplitText from "@/components/SplitText";

type SectionHeaderProps = {
  label: string;
  title: string;
  className?: string;
};

/** `// label` in mono + large display heading with character stagger. */
export default function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="mb-3 font-mono text-sm tracking-wider text-accent-primary/80">
        <span className="text-text-muted">{"//"}</span> {label}
      </p>
      <SplitText
        as="h2"
        text={title}
        className="font-display text-4xl font-semibold leading-tight text-text-primary sm:text-5xl"
      />
    </div>
  );
}
