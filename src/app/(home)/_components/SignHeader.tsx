/** Section header styled as a terminal direction sign: pictogram tile, zone label, title. */
export function SignHeader({
  Pictogram,
  zone,
  title,
  subtitle,
  tone = 'dark',
}: {
  Pictogram: (p: { className?: string }) => React.ReactElement;
  zone: string;
  title: string;
  subtitle?: string;
  tone?: 'dark' | 'sign';
}) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-4">
        <span
          className={
            tone === 'sign'
              ? 'flex size-14 shrink-0 items-center justify-center rounded-md bg-sign text-onSign'
              : 'flex size-14 shrink-0 items-center justify-center rounded-md bg-board text-sign'
          }
        >
          <Pictogram className="size-8" />
        </span>
        <div>
          <p className="font-sign text-sm font-semibold uppercase tracking-[0.16em] text-inkMuted">{zone}</p>
          <h2 className="font-sign text-[clamp(2.3rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.005em]">{title}</h2>
        </div>
      </div>
      {subtitle && <p className="max-w-md text-base leading-relaxed text-inkMuted md:text-right">{subtitle}</p>}
    </header>
  );
}
