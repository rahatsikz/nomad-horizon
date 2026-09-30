'use client';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="nh-container pt-16 lg:pt-24">
      {/* Signal-orange band: text is always black on orange (6.4:1) */}
      <div className="grid border border-ink bg-signal text-onSignal lg:grid-cols-12">
        <div className="border-b border-black p-5 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em]">Your next chapter starts here</p>
          <h2 className="nh-wide mt-6 text-[clamp(2.1rem,5.6vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.04em]">
            Ready to Elevate Your Nomadic Lifestyle?
          </h2>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:col-span-4">
          <p className="p-5 text-lg leading-relaxed sm:p-8 lg:p-10">
            Join Nomad Horizon today and unlock essential services to stay connected, productive, and
            on the move wherever your journey takes you.
          </p>
          <Link
            href={user.accessToken ? '/services' : '/register'}
            className="nh-focus flex items-center justify-between gap-4 border-t border-black bg-black px-5 py-6 text-white hover:bg-white hover:text-black sm:px-8 lg:px-10"
          >
            <span className="nh-semi-wide text-xl font-black uppercase">
              {user.accessToken ? 'Explore Services' : 'Register Now'}
            </span>
            <span aria-hidden="true" className="text-4xl font-light leading-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
