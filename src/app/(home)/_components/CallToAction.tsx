'use client';
import { useAppSelector } from '@/redux/hooks';
import { Button } from '../../../components/ui/Button';
import { useRouter } from 'next/navigation';

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);
  const { push } = useRouter();

  return (
    <section className="group relative isolate overflow-hidden rounded-2xl border border-nomadGray bg-[radial-gradient(circle_at_15%_0%,rgba(118,171,174,0.3),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(34,40,49,0.14),transparent_45%),rgb(var(--nomad-gray))] px-5 py-14 text-center shadow-main transition duration-500 hover:-translate-y-1 sm:px-8 lg:py-20">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[18px] border-nomadGray transition duration-700 group-hover:rotate-12 group-hover:scale-110" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Your next chapter starts here
        </p>
        <h2 className="text-3xl font-bold leading-tight text-secondary sm:text-5xl dark:text-white">
          Ready to Elevate Your Nomadic Lifestyle?
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-2xl text-base leading-relaxed text-neutral sm:text-lg">
          Join Nomad Horizon today and unlock essential services to stay connected, productive, and
          on the move wherever your journey takes you.
        </p>
        <Button
          variant="solid"
          className="px-7 py-2.5 font-semibold shadow-[0_12px_24px_-12px_rgba(118,171,174,0.9)] hover:shadow-none"
          onClick={() => push(user.accessToken ? '/services' : '/register')}
        >
          {user.accessToken ? 'Explore Services' : 'Register Now'}
        </Button>
      </div>
    </section>
  );
}
