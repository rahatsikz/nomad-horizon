'use client';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Reveal } from './Reveal';

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="relative isolate overflow-hidden border-y border-fg/10 bg-raised py-24 lg:py-36">
      <div aria-hidden="true" className="nh-glow absolute -bottom-[30vw] -right-[15vw] -z-10 size-[65vw]" />
      <Reveal className="nh-container grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="nh-label text-amberText">Your next chapter starts here</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,6.6vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
            Ready to Elevate Your{' '}
            <span className="font-accent font-normal normal-case italic tracking-[-0.01em] text-amberText">Nomadic</span>{' '}
            Lifestyle?
          </h2>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-4">
          <p className="text-lg leading-relaxed text-fgMuted">
            Join Nomad Horizon today and unlock essential services to stay connected, productive, and
            on the move wherever your journey takes you.
          </p>
          <Link
            href={user.accessToken ? '/services' : '/register'}
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-amber px-8 py-4 text-sm font-medium text-onAmber transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgb(var(--nh-amber)/0.5)]"
          >
            {user.accessToken ? 'Explore Services' : 'Register Now'}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
