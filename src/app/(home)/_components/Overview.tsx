import Image from 'next/image';
import { ArrowPictogram, InfoPictogram, LaptopPictogram } from './Pictograms';

export function Overview() {
  return (
    <section className="relative isolate pt-20 lg:pt-28">
      <LaptopPictogram className="nh-pictogram-bg pointer-events-none absolute -right-[6vw] top-0 -z-10 size-[44vw]" />
      <div className="nh-container">
        <div className="grid overflow-hidden rounded-xl bg-board text-white ring-1 ring-black/40 lg:grid-cols-2">
          <div className="flex flex-col gap-8 p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-sign text-onSign">
                <InfoPictogram className="size-9" />
              </span>
              <div>
                <p className="font-sign text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Information</p>
                <p className="font-sign text-2xl font-bold uppercase leading-tight text-sign">Overview</p>
              </div>
            </div>

            <p className="max-w-lg text-lg leading-relaxed text-white/80">
              Focus on your adventures and career without the worry of losing connectivity or facing
              tech issues
            </p>

            <div>
              <p className="font-sign text-sm font-semibold uppercase tracking-[0.16em] text-sign">
                The Nomad Horizon standard
              </p>
              <h2 className="mt-3 font-sign text-[clamp(2.4rem,4.8vw,4.5rem)] font-extrabold leading-[0.92]">
                Your workday should travel as well as you do.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/80">
                We keep nomads and remote teams connected, productive, and ready for whatever comes next.
                From dependable internet to quick device support, the essentials stay within reach.
              </p>
            </div>

            <dl className="mt-auto grid grid-cols-2 gap-3">
              {overviewStats.map((stat) => (
                <div key={stat.label} className="rounded-md bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <dd className="font-sign text-5xl font-extrabold leading-none text-sign">{stat.value}</dd>
                  <dt className="mt-2 font-sign text-sm font-semibold uppercase tracking-[0.12em] text-white/75">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative min-h-[22rem] lg:min-h-full">
            <Image
              src="https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg"
              alt="Remote worker using a laptop outdoors"
              fill
              sizes="(min-width: 1024px) 43rem, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-5 left-5 flex items-center gap-3 rounded-md bg-sign px-4 py-2.5 font-sign text-xl font-bold uppercase text-onSign">
              Work without borders
              <ArrowPictogram className="size-6" />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const overviewStats = [
  { value: '24/7', label: 'Support mindset' },
  { value: '1', label: 'Connected mission' },
];
