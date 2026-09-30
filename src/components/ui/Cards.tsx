'use client';
import { BlogProps, EventProps, NewsProps, ReviewProps, ServiceProps } from '@/types/common';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addingToCart } from '@/redux/slice/cart/cartSlice';
import { usePathname } from 'next/navigation';
import { cn, formatISODatetoHumanReadable } from '@/lib/utils';
import { useLoggedUserInfo } from '@/hooks/useLoggedUser';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { CalendarIcon, MapIcon, RightArrowIcon } from '../../assets/svgs/heroIcons';

export function CardVariantOne({
  data,
  className,
}: { data: ServiceProps } & React.ComponentProps<'link'>) {
  return (
    <Link
      href={`/services/${data.id}`}
      className={cn('group block h-full animate-service-card-reveal', className)}
    >
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-2xl border border-white/70 bg-secondary shadow-[0_18px_45px_-24px_rgba(34,40,49,0.7)] transition duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_55px_-22px_rgba(34,40,49,0.75)] dark:border-white/10 dark:bg-gray-800 dark:shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] dark:group-hover:shadow-[0_25px_55px_-22px_rgba(0,0,0,0.9)]',
        )}
      >
        <figure className="relative">
          <Image
            src={data?.image}
            width={500}
            height={300}
            alt="card image"
            className="h-72 w-full object-cover transition duration-700 ease-out group-hover:scale-110  dark:brightness-90 sm:h-80"
            sizes="100vw"
            style={{
              width: '100%',
            }}
            priority={true}
          />
          <figcaption className="absolute inset-x-0 bottom-0 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent p-6 pt-20 text-white transition-all duration-500 ease-out group-hover:pt-24 dark:from-gray-950 dark:via-gray-900/95">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-xl font-bold tracking-tight">{data?.serviceName}</h3>
              <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wider text-white">
                {data?.price} USD
              </span>
            </div>
            <span className="mt-3 inline-flex items-center translate-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Explore service <RightArrowIcon />
            </span>
          </figcaption>
        </figure>
      </div>
    </Link>
  );
}

export function CardVariantTwo({
  data,
  className,
}: { data: ServiceProps } & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group relative flex h-full animate-service-card-reveal flex-col overflow-hidden rounded-2xl border border-primary/20 bg-white/70 shadow-[0_18px_45px_-24px_rgba(34,40,49,0.55)] backdrop-blur-sm transition duration-500 ease-out hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_25px_55px_-22px_rgba(34,40,49,0.65)] dark:border-nomadGray dark:bg-gray-800/80 dark:shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] dark:hover:border-primary/70 dark:hover:shadow-[0_25px_55px_-22px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <figure className="relative overflow-hidden">
        <Image
          src={data?.image}
          width={500}
          height={300}
          alt="card image"
          className="h-48 w-full object-cover grayscale-[20%] transition duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 dark:brightness-90 sm:h-56"
          sizes="100vw"
          style={{
            width: '100%',
          }}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-secondary/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md dark:border-primary/40 dark:bg-gray-900/85">
          Coming soon
        </span>
      </figure>
      {/*  Body */}
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <header className="">
          <h3 className="text-xl font-bold tracking-tight text-secondary transition-colors duration-300 group-hover:text-primary dark:text-white">
            {data?.serviceName}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral dark:text-gray-300">
            {data.content}
          </p>
        </header>
        <div className="flex items-center justify-between border-t border-secondary/10 pt-4 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral dark:text-gray-300">
            Launching soon
          </span>
          <span className="text-lg font-bold text-primary">
            {data?.price} <span className="text-xs font-medium">USD</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCard({ data }: { data: ReviewProps }) {
  return (
    <div className="group relative mx-4 w-full overflow-hidden rounded-2xl border border-primary/20 bg-nomadGray  transition duration-500 ease-out hover:-translate-y-1 hover:border-primary/50 dark:border-nomadGray dark:bg-gray-800/80 dark:hover:border-primary/60">
      <div className="testimonial-card-background absolute inset-0" />
      <div className="relative p-7 sm:p-8">
        <figure className="relative z-10 flex min-h-56 flex-col justify-between">
          <blockquote className="relative pl-9 text-lg leading-relaxed text-secondary dark:text-white sm:text-xl">
            <span
              aria-hidden="true"
              className="absolute -left-1 -top-5 font-serif text-7xl leading-none text-primary/60 transition duration-500 group-hover:text-primary"
            >
              &quot;
            </span>
            <p>{data?.review}</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4 border-t border-secondary/10 pt-5 text-sm dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold uppercase text-primary ring-1 ring-primary/30">
              {data?.name?.charAt(0)}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold tracking-wide text-secondary dark:text-white">
                {data?.name}
              </span>
              <cite className="not-italic">
                <span className="text-xs uppercase tracking-[0.16em] text-neutral">
                  {data?.city}
                </span>
              </cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export function EventCard({ data }: { data: EventProps }) {
  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-secondary/10 bg-mainBg/55 p-6 shadow-[0_12px_35px_-28px_rgba(34,40,49,0.7)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-26px_rgba(34,40,49,0.55)] dark:border-white/10 dark:bg-secondary/25 dark:shadow-[0_12px_35px_-25px_rgba(0,0,0,0.8)] dark:hover:border-primary/30 dark:hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]">
      <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/90">
        <span className="h-1.5 w-1.5 rounded-full bg-primary transition group-hover:shadow-[0_0_0_4px_rgba(118,171,174,0.16)]" />
        Featured event
      </div>
      <h2 className="text-xl font-bold tracking-tight text-secondary transition-colors duration-300 group-hover:text-primary dark:text-white">
        {data?.title}
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral">{data?.content}</p>
      <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-secondary/10 pt-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <MapIcon />
          <p className="mt-0.5 text-sm font-semibold text-primary">
            {' '}
            {data?.city}, {data?.country}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <p className="mt-0.5 text-sm font-semibold text-primary">
            {formatISODatetoHumanReadable(data?.date)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function NewsCard({ data, className }: { data: NewsProps } & React.ComponentProps<'div'>) {
  return (
    <article
      className={cn(
        'group w-full overflow-hidden rounded-2xl border border-secondary/10 bg-mainBg/50 p-5 shadow-[0_12px_35px_-28px_rgba(34,40,49,0.65)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-26px_rgba(34,40,49,0.5)] dark:border-white/10 dark:bg-secondary/25 dark:shadow-[0_12px_35px_-25px_rgba(0,0,0,0.8)] dark:hover:border-primary/30 dark:hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]',
        className,
      )}
    >
      <div className="flex flex-col gap-4  h-full">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-secondary transition-colors duration-300 group-hover:text-primary dark:text-white">
            {data?.title}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <CalendarIcon />
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {formatISODatetoHumanReadable(data?.date)}
            </p>
          </div>
        </div>
        <p className="line-clamp-5 text-sm leading-relaxed text-neutral">{data?.content}</p>
      </div>
    </article>
  );
}

export function BlogCard({ data }: { data: BlogProps }) {
  return (
    <article className="group min-w-80 h-fit w-full overflow-hidden rounded-2xl border border-primary/10 bg-nomadGray/80 shadow-[0_12px_35px_-26px_rgba(34,40,49,0.65)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_40px_-25px_rgba(34,40,49,0.5)] dark:border-white/10 dark:bg-secondary/25 dark:shadow-[0_12px_35px_-25px_rgba(0,0,0,0.8)] dark:hover:border-primary/25 dark:hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]">
      <div className="p-5 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Image
            sizes="100vw"
            width={100}
            height={100}
            src={data.image}
            alt="card image"
            className="aspect-video h-full w-full rounded-xl object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="w-full">
            <h2 className="text-xl font-bold tracking-tight text-secondary transition-colors duration-300 group-hover:text-primary dark:text-white">
              {data.title}
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {data.author}
            </p>
            <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-neutral">{data.content}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CardVariantThree({ data, index }: { data: ServiceProps; index?: number }) {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);
  const dispatch = useAppDispatch();

  const isAlreadyAdded = cart.find(
    (item) => item.service === data.id && item.user === loggedUser?.data?.id,
  )
    ? true
    : false;

  const handleAddToCart = () => {
    dispatch(
      addingToCart({
        user: loggedUser?.data?.id,
        service: data?.id,
      }),
    );
    toast.success('Added.. Go to cart to checkout');
  };

  return (
    <article className="group relative flex flex-col overflow-hidden bg-film text-cream">
      <Link
        href={`/services/${data.id}`}
        className="relative block aspect-[4/5] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <Image
          src={data?.image}
          alt={data?.serviceName}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover brightness-[0.62] saturate-[0.85] transition duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-film via-film/45 via-45% to-transparent"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80">
          <span>
            {typeof index === 'number'
              ? `No. ${String(index + 1).padStart(2, '0')}`
              : 'Now showing'}
          </span>
          {data.category && <span>{data.category}</span>}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber">
            ${data?.price} <span className="text-cream/70">USD</span>
          </p>
          <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-3xl">
            {data?.serviceName}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm font-light leading-relaxed text-cream/80">
            {data?.content}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 border-t border-cream/10 px-6 py-4">
        <Link
          href={`/services/${data.id}`}
          className="relative pb-1 text-sm after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-700 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
        >
          Details <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          disabled={isAlreadyAdded}
          onClick={handleAddToCart}
          className={cn(
            'rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
            isAlreadyAdded
              ? 'cursor-not-allowed border-cream/20 text-cream/60'
              : 'border-amber bg-amber text-film hover:bg-transparent hover:text-amber',
          )}
        >
          {isAlreadyAdded ? 'In your cart' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}

const authScenes = {
  login: {
    image: 'https://images.pexels.com/photos/31415635/pexels-photo-31415635.jpeg',
    label: 'Built for the moving life',
    title: 'Welcome back,',
    accent: 'traveller',
  },
  register: {
    image: 'https://images.pexels.com/photos/7893092/pexels-photo-7893092.jpeg',
    label: 'Your next chapter starts here',
    title: 'Every road needs a',
    accent: 'good crew',
  },
};

export function AuthLayoutCard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const scene = isLogin ? authScenes.login : authScenes.register;

  return (
    <section className="relative grid min-h-screen bg-canvas font-light text-fg lg:grid-cols-2">
      <div aria-hidden="true" className="nh-grain" />

      {/* photographic half */}
      <div
        className={cn(
          'relative hidden overflow-hidden bg-film text-cream lg:block',
          !isLogin && 'lg:order-2',
        )}
      >
        <Image
          src={scene.image}
          alt=""
          fill
          priority
          sizes="50vw"
          className="nh-kenburns object-cover object-[50%_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-film via-film/40 to-film/30"
        />
        <div aria-hidden="true" className="nh-vignette absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <Wordmark className="w-fit text-xl text-cream" />
          <div className="nh-fade-up" style={{ animationDelay: '300ms' }}>
            <p className="nh-label flex items-center gap-4 text-amber">
              <span className="h-px w-12 bg-amber" />
              {scene.label}
            </p>
            <p className="mt-6 font-display text-[clamp(2.75rem,4.8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
              {scene.title}{' '}
              <span className="font-accent font-normal normal-case italic tracking-[-0.01em] text-amber">
                {scene.accent}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* form half */}
      <div className="relative isolate flex items-center justify-center overflow-hidden px-4 py-16 sm:px-10">
        <div
          aria-hidden="true"
          className="nh-glow absolute -right-[30vw] -top-[30vw] -z-10 size-[60vw] lg:-right-[20vw]"
        />
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}
