'use client';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { CompassMark } from './HomeNavbar';
import { Topo } from './Topo';

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-passport text-passportInk">
        <Topo variant="band" animate={false} className="absolute inset-0 -z-10 size-full opacity-40" />
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-center lg:p-16">
          <div className="lg:col-span-8">
            <p className="font-ticket text-[10px] uppercase tracking-[0.2em] opacity-80 sm:text-[11px]">
              Your next chapter starts here
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
              Ready to Elevate Your Nomadic Lifestyle?
            </h2>
            <p className="mt-5 max-w-2xl font-text text-lg leading-relaxed opacity-90 sm:text-xl">
              Join Nomad Horizon today and unlock essential services to stay connected, productive, and
              on the move wherever your journey takes you.
            </p>
            <Link
              href={user.accessToken ? '/services' : '/register'}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 font-display text-lg font-bold text-onSignal transition-transform hover:-translate-y-0.5"
            >
              {user.accessToken ? 'Explore Services' : 'Register Now'}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* passport cover emblem */}
          <div aria-hidden="true" className="hidden flex-col items-center gap-4 text-center lg:col-span-4 lg:flex">
            <p className="font-ticket text-xs uppercase tracking-[0.5em]">Passport</p>
            <CompassMark className="size-32" />
            <p className="font-display text-xl font-extrabold uppercase tracking-[0.2em]">Nomad Horizon</p>
            <span className="mt-2 h-8 w-12 rounded-sm border-2 border-current opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
