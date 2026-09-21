type Props = { id?: string; title: string; meta?: string };

/** Log-style section divider: a heavy ink rule, the title, and a factual count. */
export default function SectionHead({ title, meta }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-3">
      <h2 className="text-xl font-semibold tracking-[-0.01em]">{title}</h2>
      {meta ? (
        <span className="whitespace-nowrap font-mono text-xs text-ink-2">{meta}</span>
      ) : null}
    </div>
  );
}
