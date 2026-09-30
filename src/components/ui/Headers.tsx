import { cn } from "@/lib/utils";

/** Section header used inside pages and the dashboard. */
export function HeaderText({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl", className)}>
      <h2 className='font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-fg sm:text-4xl'>
        {title}
      </h2>
      {subtitle && <p className='mt-3 text-fgMuted'>{subtitle}</p>}
    </div>
  );
}

export function DashboardHeaderText({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className='mb-6 max-w-xl'>
      <h2 className='font-display text-2xl font-extrabold uppercase tracking-[-0.02em] text-fg'>
        {title}
      </h2>
      {subtitle && <p className='mt-1 text-sm text-fgMuted'>{subtitle}</p>}
    </div>
  );
}

/**
 * Opening title card for inner pages: label, huge Syne title, standfirst.
 * Includes the top offset for the fixed navbar and a soft amber glow.
 */
export function PageHero({
  label,
  title,
  accent,
  subtitle,
  aside,
  className,
}: {
  label: string;
  title: string;
  /** Optional word(s) set in Instrument Serif italic after the title */
  accent?: string;
  subtitle?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative isolate overflow-hidden pb-12 pt-32 lg:pb-16 lg:pt-40", className)}>
      <div aria-hidden='true' className='nh-glow absolute -right-[20vw] -top-[30vw] -z-10 size-[60vw]' />
      <div className='nh-container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
        <div className='nh-fade-up'>
          <p className='nh-label flex items-center gap-4 text-amberText'>
            <span aria-hidden='true' className='h-px w-10 bg-amber' />
            {label}
          </p>
          <h1 className='mt-5 font-display text-[clamp(2rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]'>
            {title}
            {accent && (
              <>
                {" "}
                <span className='font-accent font-normal normal-case italic tracking-[-0.01em] text-amberText'>
                  {accent}
                </span>
              </>
            )}
          </h1>
        </div>
        {(subtitle || aside) && (
          <div
            className='nh-fade-up flex max-w-md flex-col gap-6 lg:items-end lg:text-right'
            style={{ animationDelay: "150ms" }}
          >
            {subtitle && <p className='text-lg font-light leading-relaxed text-fgMuted'>{subtitle}</p>}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
