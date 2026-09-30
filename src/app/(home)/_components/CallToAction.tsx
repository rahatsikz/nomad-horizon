'use client';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <div className="grid gap-10 border-y-2 border-ink py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="font-meta text-[11px] uppercase tracking-[0.26em] text-terracottaInk sm:text-xs">
            Your next chapter starts here
          </p>
          <h2 className="nh-soft mt-5 font-display text-5xl font-light leading-[0.95] tracking-[-0.03em] sm:text-7xl">
            Ready to Elevate Your <em className="nh-wonk font-extrabold italic">Nomadic</em> Lifestyle?
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
          <p className="text-lg leading-relaxed text-inkMuted">
            Join Nomad Horizon today and unlock essential services to stay connected, productive, and
            on the move wherever your journey takes you.
          </p>
          <Link
            href={user.accessToken ? '/services' : '/register'}
            className="group inline-flex w-fit items-center gap-3 bg-terracottaInk px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink"
          >
            {user.accessToken ? 'Explore Services' : 'Register Now'}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
