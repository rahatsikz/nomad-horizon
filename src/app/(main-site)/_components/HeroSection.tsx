import Image from 'next/image';
import Link from 'next/link';
import { FilmStrip } from './FilmStrip';

// Syne 800 in caps runs ~0.9–1.07em per glyph, so the poster is set as four short lines
const headlineLines: { text: string; serif?: boolean }[][] = [
  [{ text: 'Digital' }],
  [{ text: 'services' }],
  [{ text: 'for' }, { text: 'nomads', serif: true }],
  [{ text: 'worldwide' }],
];

export function HeroSection() {
  let letterIndex = 0;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-20 overflow-hidden bg-film">
        <Image
          src="https://images.pexels.com/photos/31415635/pexels-photo-31415635.jpeg"
          alt="A desert highway winding through sand dunes at sunset"
          fill
          priority
          sizes="100vw"
          className="nh-kenburns object-cover object-[50%_55%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-canvas from-[18%] via-canvas/75 via-[48%] to-canvas/0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-canvas/70 to-transparent"
      />
      <div aria-hidden="true" className="nh-vignette absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="nh-glow absolute -right-[20vw] -top-[25vw] -z-10 size-[70vw]"
      />

      <div className="nh-container pb-10 pt-32 lg:pb-12">
        <p
          className="nh-label nh-fade-up flex items-center gap-4 text-fg"
          style={{ animationDelay: '900ms' }}
        >
          <span className="h-px w-12 bg-amber" />
          Built for the moving life
        </p>

        <h1 className="mt-6 font-display text-[clamp(1.9rem,8.2vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
          <span className="sr-only">Digital services for nomads worldwide</span>
          <span aria-hidden="true">
            {headlineLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block whitespace-nowrap">
                {line.map((word) => (
                  <span
                    key={word.text}
                    className={
                      word.serif
                        ? 'ml-[0.12em] font-accent font-normal normal-case italic tracking-[-0.02em] text-amberText'
                        : undefined
                    }
                  >
                    {word.text.split('').map((char, charIdx) => (
                      <span
                        key={charIdx}
                        className="nh-letter"
                        style={{ animationDelay: `${1000 + letterIndex++ * 32}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        <div
          className="nh-fade-up mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end"
          style={{ animationDelay: '1900ms' }}
        >
          <p className="nh-label hidden text-fgMuted lg:col-span-4 lg:block">
            Now showing
            <br />
            Wherever you land next
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:col-span-7 lg:col-start-6">
            <p className="max-w-md text-lg leading-relaxed text-fg/85">
              Your ultimate hub for seamless internet connectivity and mobile solutions to expert
              laptop servicing, we ensure you stay productive and worry-free.
            </p>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-amber px-7 py-4 font-text text-sm font-medium text-onAmber transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(var(--nh-amber)/0.55)]"
            >
              Explore services
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <FilmStrip />
    </section>
  );
}
