'use client';
import { StarIcon } from '@/assets/svgs/heroIcons';
import { Button } from '@/components/ui/Button';
import LoadingComponent from '@/components/ui/LoadingComponent';
import { useLoggedUserInfo } from '@/hooks/useLoggedUser';
import { useGetReviewsQuery } from '@/redux/api/reviewApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addingToCart } from '@/redux/slice/cart/cartSlice';
import { ServiceStatus, type ServiceDetailProps } from '@/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function ServiceDetailsContent({
  id,
  initialService,
}: {
  id: string;
  initialService: ServiceDetailProps;
}) {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { back } = useRouter();
  const { data: userReviews, isFetching: isFetchingReviews } = useGetReviewsQuery({
    serviceId: id,
  });

  const totalRating =
    userReviews?.data.reduce((total: number, review: any) => total + review.rating, 0) || 0;
  const averageRating = Math.floor(totalRating / userReviews?.data.length) || 0;

  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);

  const isAlreadyAdded = cart.find(
    (item) => item.service === id && item.user === loggedUser?.data?.id,
  )
    ? true
    : false;

  const handleAddToCart = () => {
    dispatch(
      addingToCart({
        user: loggedUser?.data?.id,
        service: id,
      }),
    );
    toast.success('Added.. Go to cart to checkout');
  };

  const data = initialService;
  const schedules = data.schedules ?? [];
  const reviews: any[] = userReviews?.data ?? [];
  const isAvailable = data?.status === ServiceStatus.AVAILABLE;

  return (
    <>
      {/* cinematic still */}
      <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-film">
          <Image
            src={data?.image as string}
            alt={data?.serviceName ?? 'Service image'}
            fill
            priority
            sizes="100vw"
            className="nh-kenburns object-cover"
          />
          <div aria-hidden="true" className="nh-vignette absolute inset-0" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-canvas from-[12%] via-canvas/70 via-[45%] to-canvas/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-canvas/70 to-transparent"
        />

        <div className="nh-container pb-12 pt-32">
          <button
            onClick={() => back()}
            className="nh-label nh-fade-up mb-8 flex items-center gap-3 text-fgMuted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
          >
            <span aria-hidden="true">←</span> Back
          </button>
          <p
            className="nh-label nh-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 text-amberText"
            style={{ animationDelay: '100ms' }}
          >
            <span className="h-px w-10 bg-amber" />
            {data?.category ?? 'Service'}
            <span className="text-fgMuted">·</span>
            <span className="text-fgMuted">{isAvailable ? 'Now showing' : 'Coming soon'}</span>
          </p>
          <h1
            className="nh-fade-up mt-5 max-w-5xl font-display text-[clamp(2rem,7.4vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]"
            style={{ animationDelay: '200ms' }}
          >
            {data?.serviceName}
          </h1>
        </div>
      </section>

      <section className="nh-container grid gap-14 pt-6 lg:grid-cols-12 lg:gap-16">
        {/* details */}
        <div className="lg:col-span-7">
          <p className="text-xl font-light leading-relaxed sm:text-2xl">{data?.content}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 sm:grid-cols-2">
            <Fact label="Availability" value={<span className="capitalize">{data?.status}</span>} />
            <Fact
              label="Ratings"
              value={
                averageRating === 0 ? (
                  'No ratings yet'
                ) : (
                  <span className="inline-flex items-center gap-2">
                    {averageRating}
                    <span className="inline-flex" aria-label={`${averageRating} out of 5 stars`}>
                      {[...Array(averageRating)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </span>
                  </span>
                )
              }
            />
          </dl>

          <div className="mt-12">
            <h2 className="nh-label text-fgMuted">Service days</h2>
            {schedules.length > 0 ? (
              <ul className="mt-5 divide-y divide-fg/10 border-y border-fg/10">
                {schedules.map((schedule: any) => (
                  <li
                    key={schedule.daysOfWeek}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-4"
                  >
                    <span className="font-display text-lg font-bold uppercase tracking-[-0.01em]">
                      {schedule.daysOfWeek}
                    </span>
                    <span className="text-fgMuted">
                      {schedule.startTime} – {schedule.endTime}
                      {schedule.eachSessionDuration ? (
                        <span className="ml-3 text-sm">
                          · {schedule.eachSessionDuration} min sessions
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-fgMuted">N/A</p>
            )}
          </div>
        </div>

        {/* booking card */}
        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl border border-fg/10 bg-raised p-7 sm:p-8">
            <p className="nh-label text-fgMuted">Price</p>
            <p className="mt-2 font-display text-6xl font-extrabold tracking-[-0.04em]">
              ${data?.price}
              <span className="ml-2 font-text text-base font-light tracking-normal text-fgMuted">
                USD
              </span>
            </p>
            <p className="mt-4 text-sm text-fgMuted">
              Add it to your cart, then pick a date and a session that suits your timezone.
            </p>
            <Button
              variant="solid"
              disabled={isAlreadyAdded}
              className="mt-8 w-full py-3.5"
              onClick={handleAddToCart}
            >
              {isAlreadyAdded ? 'Added to cart' : 'Add to cart'}
            </Button>
            {isAlreadyAdded && (
              <Link
                href="/cart"
                className="mt-4 block text-center text-sm text-amberText underline decoration-amber/50 underline-offset-4 hover:decoration-amber"
              >
                Go to cart →
              </Link>
            )}
          </div>
        </aside>
      </section>

      {/* User Reviews */}
      <section className="nh-container mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-fg/10 pb-6">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
            User{' '}
            <span className="font-accent font-normal normal-case italic tracking-normal text-amberText">
              Reviews
            </span>
          </h2>
          <p className="nh-label text-fgMuted">{String(reviews.length).padStart(2, '0')} reviews</p>
        </div>
        {isFetchingReviews ? (
          <div className="pt-10">
            <LoadingComponent />
          </div>
        ) : reviews.length > 0 ? (
          <ul className="grid gap-x-12 gap-y-12 pt-10 md:grid-cols-2">
            {reviews.map((review: any, idx: number) => (
              <li key={idx}>
                <figure>
                  <blockquote className="font-accent text-2xl leading-snug sm:text-3xl">
                    <p>
                      <span className="text-amberText">&ldquo;</span>
                      {review.content}
                      <span className="text-amberText">&rdquo;</span>
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-4">
                    <span className="font-display font-bold uppercase">
                      {review?.user?.username}
                    </span>
                    <span className="inline-flex" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pt-10 text-fgMuted">No reviews yet</p>
        )}
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-canvas p-6">
      <dt className="nh-label text-fgMuted">{label}</dt>
      <dd className="mt-3 font-display text-xl font-bold">{value}</dd>
    </div>
  );
}
