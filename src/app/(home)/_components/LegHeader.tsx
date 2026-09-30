import { cn } from '@/lib/utils';

/** Section header styled like an itinerary leg: ticket label, big title, serif standfirst. */
export function LegHeader({
  leg,
  label,
  title,
  subtitle,
  className,
  children,
}: {
  leg: string;
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn('grid gap-6 lg:grid-cols-12 lg:items-end', className)}>
      <div className="lg:col-span-7">
        <p className="flex items-center gap-3 font-ticket text-[10px] uppercase tracking-[0.18em] text-inkMuted sm:text-[11px]">
          <span className="shrink-0 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-ground">Leg {leg}</span>
          {label}
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right">
        {subtitle && (
          <p className="max-w-md font-text text-lg leading-snug text-inkMuted">{subtitle}</p>
        )}
        {children}
      </div>
    </header>
  );
}
