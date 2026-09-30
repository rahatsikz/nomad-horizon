/** Running header between sections, like the folio line on a printed page. */
export function Folio({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center justify-between border-t border-ink/20 py-3 font-meta text-[11px] uppercase tracking-[0.22em] text-inkMuted">
      <span>
        <span className="text-terracottaInk">{number}</span>
        <span className="mx-2">—</span>
        {label}
      </span>
      <span className="hidden sm:inline">Nomad Horizon</span>
    </div>
  );
}
