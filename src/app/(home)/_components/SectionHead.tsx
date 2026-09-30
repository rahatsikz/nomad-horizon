/** Table-style section header: index cell, expanded title, note cell. */
export function SectionHead({
  index,
  title,
  note,
  aside,
}: {
  index: string;
  title: React.ReactNode;
  note?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="grid grid-cols-12 border-b border-ink">
      <p className="col-span-2 border-r border-ink px-3 py-4 text-sm font-bold md:col-span-1">{index}</p>
      <h2 className="nh-wide col-span-10 px-4 py-4 text-[clamp(1.9rem,4.8vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.035em] md:col-span-7">
        {title}
      </h2>
      <div className="col-span-12 flex flex-col justify-between gap-4 border-t border-ink px-4 py-4 md:col-span-4 md:border-l md:border-t-0">
        {note && <p className="max-w-sm text-sm leading-relaxed text-inkMuted">{note}</p>}
        {aside}
      </div>
    </header>
  );
}
