'use client';
import { CalendarIcon, MapIcon, RightArrowIcon } from '@/assets/svgs/heroIcons';
import { BlogProps, EventProps, NewsProps, ReviewProps, ServiceProps } from '@/types/common';
import Image from 'next/image';
import { Button } from './Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addingToCart } from '@/redux/slice/cart/cartSlice';
import loginImage from '@/assets/images/Login-amico.png';
import { usePathname, useRouter } from 'next/navigation';
import { cn, formatISODatetoHumanReadable } from '@/lib/utils';
import { useLoggedUserInfo } from '@/hooks/useLoggedUser';
import toast from 'react-hot-toast';
import Link from 'next/link';

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

export function CardVariantThree({ data }: { data: ServiceProps }) {
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

  // console.log(loggedUser);

  const router = useRouter();

  return (
    <div className="flex flex-col overflow-hidden bg-nomadGray rounded text-secondary shadow-main sm:flex-row">
      {/*   Image  */}
      <figure className="h-auto flex-1">
        <Image
          src={data?.image}
          width={200}
          height={200}
          sizes="100vw"
          alt="card image"
          className="object-cover aspect-auto h-full w-full"
          priority={true}
        />
      </figure>
      {/*   Body */}
      <div className="flex-1 px-6 sm:px-0 flex flex-col justify-between gap-4 max-sm:py-6">
        <>
          <div className="space-y-3 sm:mx-6 pt-6">
            <h3 className="text-xl font-medium">{data?.serviceName}</h3>
            <p className="text-neutral line-clamp-3">{data?.content}</p>
          </div>
          <div className="text-sm text-neutral sm:mx-6">
            <span>Price: </span>
            <span className="text-primary">{data?.price} USD</span>
          </div>
        </>
        <div className="sm:flex flex-col max-sm:space-y-4 gap-4 items-end w-full">
          <Button
            variant="solid"
            className="max-sm:w-full sm:px-2 sm:py-1 text-sm sm:rounded-tr-none sm:rounded-br-none"
            onClick={() => router.push(`/services/${data?.id}`)}
          >
            <span className="hidden sm:inline">
              <RightArrowIcon />
            </span>
            <span className="sm:hidden">Details</span>
          </Button>
          <Button
            variant="solid"
            disabled={isAlreadyAdded}
            className="max-sm:w-full px-3 text-sm sm:rounded-bl-none sm:rounded-tr-none"
            onClick={handleAddToCart}
          >
            {isAlreadyAdded ? 'Added to cart' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AuthLayoutCard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <section
      className={cn('flex min-h-screen bg-lightPrimary text-secondary', {
        'flex-row-reverse': pathname !== '/login',
      })}
    >
      <div className="2xl:w-1/3 w-1/2 bg-mainBg max-lg:w-full">{children}</div>
      <div className="self-center flex-1 max-lg:hidden">
        <div className="w-fit mx-auto">
          <Image
            src={loginImage.src}
            alt="login image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ height: 'auto' }}
            className="object-cover mx-auto w-2/5 lg:max-2xl:w-3/5"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
