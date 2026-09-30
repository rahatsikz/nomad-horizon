import Link from 'next/link';
import { FitLines } from './FitLines';
import { LiveCounts } from './LiveCounts';

const columnLabels = Array.from({ length: 8 }, (_, i) => String(i + 5).padStart(2, '0'));

const cellDelay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

export function HeroSection() {
  return (
    <section className="relative border-b border-ink">
      <div aria-hidden="true" className="nh-dot-grid absolute inset-0" />

      <div className="nh-container relative">
        <div className="border-x border-ink">
          {/* Row 1 — visible column index */}
          <div className="grid grid-cols-4 md:grid-cols-12">
            <div
              className="nh-cell nh-cell-no-left col-span-4 flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em]"
              style={cellDelay(0)}
            >
              <span aria-hidden="true" className="size-2.5 shrink-0 bg-signal" />
              <span className="nh-wipe" style={cellDelay(650)}>
                Built for the moving life
              </span>
              <span className="ml-auto text-inkMuted">01—04</span>
            </div>
            {columnLabels.map((label, idx) => (
              <div
                key={label}
                aria-hidden="true"
                className="nh-cell hidden px-2 py-3 text-[10px] font-semibold text-inkMuted md:block"
                style={cellDelay(60 + idx * 40)}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Row 2 — headline set to the full measure */}
          <div className="nh-cell nh-cell-no-left px-3 pb-6 pt-8 sm:px-5 lg:px-6 lg:pb-10 lg:pt-12" style={cellDelay(180)}>
            <h1 className="nh-wide font-black leading-[0.84] tracking-[-0.04em]">
              <span className="sr-only">Digital services for nomads worldwide</span>
              <span aria-hidden="true" className="nh-wipe block" style={cellDelay(750)}>
                <FitLines
                  lines={['Digital services', 'for nomads', 'worldwide.']}
                  lineClassNames={[undefined, 'text-inkMuted']}
                />
              </span>
            </h1>
          </div>

          {/* Row 3 — live info strip */}
          <div className="grid grid-cols-2 md:grid-cols-12">
            <LiveCounts />
            <div className="nh-cell col-span-2 flex items-end px-4 py-5 md:col-span-4" style={cellDelay(420)}>
              <p className="nh-wipe max-w-md text-[0.95rem] leading-relaxed" style={cellDelay(1300)}>
                Your ultimate hub for seamless internet connectivity and mobile solutions to expert
                laptop servicing, we ensure you stay productive and worry-free.
              </p>
            </div>
            <div className="nh-cell col-span-2 flex md:col-span-2" style={cellDelay(480)}>
              <Link
                href="/services"
                className="nh-focus nh-wipe group flex w-full items-end justify-between gap-4 bg-signal p-4 text-onSignal hover:bg-ink hover:text-paper"
                style={cellDelay(1400)}
              >
                <span className="nh-semi-wide text-lg font-black uppercase leading-tight">Browse services</span>
                <span aria-hidden="true" className="text-3xl font-light leading-none">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
