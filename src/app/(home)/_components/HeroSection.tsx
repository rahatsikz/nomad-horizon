import Link from 'next/link';
import {
  ArrowPictogram,
  BaggagePictogram,
  NewspaperPictogram,
  PlanePictogram,
  ServicesPictogram,
} from './Pictograms';

const directions = [
  { label: 'Services', href: '/services', Pictogram: ServicesPictogram, rotate: 'rotate-0' },
  { label: 'Departures', href: '#departures', Pictogram: PlanePictogram, rotate: 'rotate-90' },
  { label: 'Blogs', href: '/blogs', Pictogram: NewspaperPictogram, rotate: '-rotate-45' },
  { label: 'Cart', href: '/cart', Pictogram: BaggagePictogram, rotate: 'rotate-180' },
];

export function HeroSection() {
  return (
    <section className="relative isolate pb-4 pt-8 lg:pt-12">
      <PlanePictogram className="nh-pictogram-bg pointer-events-none absolute -right-[12vw] -top-[8vw] -z-10 size-[58vw] rotate-45" />

      <div className="nh-container">
        {/* gate sign */}
        <p className="nh-drop-in inline-flex items-stretch overflow-hidden rounded-md bg-board text-white">
          <span className="flex items-center bg-sign px-3 font-sign text-2xl font-extrabold leading-none text-onSign">NH</span>
          <span className="flex items-center gap-2 px-4 py-2 font-sign text-base font-semibold uppercase tracking-[0.08em] sm:text-lg">
            Gate NH <span className="text-sign">—</span> Built for the moving life
          </span>
        </p>

        {/* main wayfinding panel */}
        <div className="nh-slide-in mt-4 grid overflow-hidden rounded-lg bg-sign text-onSign lg:grid-cols-12" style={{ animationDelay: '120ms' }}>
          <div className="p-6 sm:p-10 lg:col-span-8 lg:p-12">
            <div className="flex items-start gap-3 sm:gap-6">
              <ArrowPictogram className="mt-[0.4em] size-12 shrink-0 -rotate-45 sm:size-20 lg:size-24" />
              <h1 className="font-sign text-[clamp(3.1rem,8vw,8.5rem)] font-extrabold leading-[0.86] tracking-[-0.01em]">
                Digital services for nomads worldwide
              </h1>
            </div>
            <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed sm:ml-[6.5rem] lg:ml-[7.5rem]">
              Your ultimate hub for seamless internet connectivity and mobile solutions to expert laptop
              servicing, we ensure you stay productive and worry-free.
            </p>
          </div>

          <nav aria-label="Directions" className="border-t-[3px] border-onSign lg:col-span-4 lg:border-l-[3px] lg:border-t-0">
            <ul className="flex h-full flex-col">
              {directions.map(({ label, href, Pictogram, rotate }) => (
                <li key={label} className="flex-1 border-b-[3px] border-onSign last:border-b-0">
                  <Link
                    href={href}
                    className="group flex h-full items-center gap-4 px-6 py-4 font-sign text-2xl font-bold uppercase tracking-[0.03em] transition-colors hover:bg-onSign hover:text-sign focus-visible:bg-onSign focus-visible:text-sign focus-visible:outline-none lg:px-8"
                  >
                    <Pictogram className="size-8 shrink-0" />
                    <span className="flex-1">{label}</span>
                    <ArrowPictogram
                      className={`size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${rotate}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
