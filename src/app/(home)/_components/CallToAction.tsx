'use client';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { ArrowPictogram, CheckInPictogram } from './Pictograms';

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="nh-container pt-20 lg:pt-28">
      <div className="grid overflow-hidden rounded-xl bg-sign text-onSign lg:grid-cols-12">
        <div className="flex gap-5 p-6 sm:p-10 lg:col-span-8 lg:p-12">
          <CheckInPictogram className="hidden size-20 shrink-0 sm:block lg:size-28" />
          <div>
            <p className="font-sign text-sm font-bold uppercase tracking-[0.16em]">Your next chapter starts here</p>
            <h2 className="mt-3 font-sign text-[clamp(2.4rem,5.4vw,5rem)] font-extrabold leading-[0.9]">
              Ready to Elevate Your Nomadic Lifestyle?
            </h2>
            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed">
              Join Nomad Horizon today and unlock essential services to stay connected, productive, and
              on the move wherever your journey takes you.
            </p>
          </div>
        </div>
        <div className="flex items-end border-t-[3px] border-onSign p-6 sm:p-10 lg:col-span-4 lg:border-l-[3px] lg:border-t-0 lg:p-12">
          <Link
            href={user.accessToken ? '/services' : '/register'}
            className="group flex w-full items-center justify-between gap-4 rounded-md bg-onSign px-6 py-5 font-sign text-2xl font-bold uppercase tracking-[0.04em] text-sign focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-onSign"
          >
            {user.accessToken ? 'Explore Services' : 'Register Now'}
            <ArrowPictogram className="size-8 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
