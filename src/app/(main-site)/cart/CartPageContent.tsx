"use client";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/slice/cart/cartSlice";
import { ServiceProps } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CartPageContent() {
  const { cart } = useAppSelector((state) => state.cart);
  const { data: serviceData, isLoading } = useGetServicesQuery({});

  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);

  if (cart.filter((item) => item.user === loggedUser?.data?.id)?.length === 0) {
    return (
      <>
        <PageHero label='Your itinerary' title='Your' accent='Cart' />
        <section className='nh-container'>
          <div className='flex min-h-[22rem] flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-fg/20 px-6 py-16 text-center'>
            <p className='nh-label text-amberText'>Nothing booked yet</p>
            <h2 className='font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]'>
              Your cart is empty
            </h2>
            <p className='max-w-md text-fgMuted'>
              Add a service and it will wait here until you pick a date and a session.
            </p>
            <Link
              href='/services'
              className='group mt-2 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-medium text-onAmber transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(var(--nh-amber)/0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber'
            >
              Explore services
              <span aria-hidden='true' className='transition-transform duration-300 group-hover:translate-x-1'>
                →
              </span>
            </Link>
          </div>
        </section>
      </>
    );
  }

  const cartItem = cart
    ?.map((item) =>
      serviceData?.data?.data?.find(
        (data: any) =>
          data?.id === item.service && loggedUser?.data?.id === item.user
      )
    )
    .filter(Boolean) as ServiceProps[];

  if (isLoading) {
    return (
      <div className='pt-32'>
        <LoadingComponent />
      </div>
    );
  }

  const estimatedTotal = cartItem.reduce((sum, item) => sum + (item?.price ?? 0), 0);

  return (
    <>
      <PageHero
        label='Your itinerary'
        title='Your'
        accent='Cart'
        subtitle='Ready to complete your order?'
      />
      <section className='nh-container grid gap-12 lg:grid-cols-12'>
        <ol className='space-y-4 lg:col-span-8'>
          {cartItem?.map((data, idx) => (
            <CartCard key={data?.id} data={data} index={idx} loggedUser={loggedUser} />
          ))}
        </ol>

        <aside className='lg:col-span-4'>
          <div className='sticky top-28 rounded-2xl border border-fg/10 bg-raised p-7'>
            <p className='nh-label text-fgMuted'>Summary</p>
            <dl className='mt-6 space-y-3 text-sm'>
              <div className='flex justify-between'>
                <dt className='text-fgMuted'>Services</dt>
                <dd>{String(cartItem.length).padStart(2, "0")}</dd>
              </div>
              <div className='flex items-baseline justify-between border-t border-fg/10 pt-4'>
                <dt className='text-fgMuted'>Estimated total</dt>
                <dd className='font-display text-4xl font-extrabold tracking-[-0.03em]'>${estimatedTotal}</dd>
              </div>
            </dl>
            <p className='mt-6 text-sm leading-relaxed text-fgMuted'>
              Each service is booked on its own — choose &ldquo;Book now&rdquo; to pick a date and session.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

const CartCard = ({
  data,
  index,
  loggedUser,
}: {
  data: ServiceProps | undefined;
  index: number;
  loggedUser: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <li className='group grid overflow-hidden rounded-2xl border border-fg/10 bg-raised/50 transition-colors hover:border-fg/20 sm:grid-cols-[11rem_1fr]'>
      <Link href={`/services/${data?.id}`} className='relative block aspect-[16/9] overflow-hidden bg-film sm:aspect-auto'>
        {data?.image && (
          <Image
            src={data.image}
            alt={data?.serviceName ?? ""}
            fill
            sizes='(min-width: 640px) 11rem, 100vw'
            className='object-cover brightness-90 transition duration-700 group-hover:scale-105 group-hover:brightness-100'
          />
        )}
      </Link>
      <div className='flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='nh-label text-fgMuted'>
            {String(index + 1).padStart(2, "0")} · ${data?.price} USD
          </p>
          <h3 className='mt-2 font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.02em]'>
            {data?.serviceName}
          </h3>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Button
            variant='outline'
            className='border-danger/60 text-danger hover:border-danger hover:bg-danger hover:text-onDanger'
            onClick={() =>
              dispatch(
                removeFromCart({
                  user: loggedUser?.data?.id,
                  service: data?.id as string,
                })
              )
            }
          >
            Remove
          </Button>
          <Button
            variant='solid'
            onClick={() => router.push(`/booking/${data?.id}`)}
          >
            Book now →
          </Button>
        </div>
      </div>
    </li>
  );
};
