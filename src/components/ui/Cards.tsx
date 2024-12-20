"use client";
import { CalendarIcon, MapIcon, RightArrowIcon } from "@/assets/svgs/heroIcons";
import {
  BlogProps,
  EventProps,
  NewsProps,
  ReviewProps,
  ServiceProps,
} from "@/types/common";
import Image from "next/image";
import { Button } from "./Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addingToCart } from "@/redux/slice/cart/cartSlice";
import loginImage from "@/assets/images/Login-amico.png";
import { usePathname, useRouter } from "next/navigation";
import { cn, formatISODatetoHumanReadable } from "@/lib/utils";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import toast from "react-hot-toast";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function CardVariantOne({ data }: { data: ServiceProps }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className='overflow-hidden rounded shadow-main'
      data-aos='fade-left'
      data-aos-easing='linear'
      data-aos-duration='1000'
    >
      <figure className='relative'>
        <Image
          src={data?.image}
          width={50}
          height={50}
          alt='card image'
          className='aspect-[4/3] object-cover'
          sizes='100vw'
          style={{
            width: "100%",
            height: "auto",
          }}
          priority={true}
        />
        <figcaption className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white'>
          <h3 className='text-lg font-medium '>{data?.serviceName}</h3>
          <p className='text-sm opacity-75'> {data?.price} USD</p>
        </figcaption>
      </figure>
    </div>
  );
}

export function CardVariantTwo({ data }: { data: ServiceProps }) {
  return (
    <div
      className='overflow-hidden rounded shadow-main bg-nomadGray'
      data-aos='fade-right'
      data-aos-easing='linear'
      data-aos-duration='1000'
    >
      <figure>
        <Image
          src={data?.image}
          width={50}
          height={50}
          alt='card image'
          className='aspect-[9/3] object-cover'
          sizes='100vw'
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </figure>
      {/*  Body */}
      <div className='p-6'>
        <header className=''>
          <h3 className='text-xl font-medium text-secondary'>
            {data?.serviceName}
          </h3>
          <p className='text-sm text-neutral'>{data.content}</p>
        </header>
      </div>
    </div>
  );
}

export function TestimonialCard({ data }: { data: ReviewProps }) {
  return (
    <div className='overflow-hidden w-full bg-nomadGray dark:shadow-main mx-4'>
      <div className='relative p-6'>
        <figure className='relative z-10'>
          <blockquote className='p-6 text-lg leading-relaxed text-secondary'>
            <p>{data?.review}</p>
          </blockquote>
          <figcaption className='flex items-center gap-4 p-6 pt-2 text-sm'>
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-primary'>{data?.name}</span>
              <cite className='not-italic'>
                <span className='text-neutral'>{data?.city}</span>
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
    <div className='overflow-hidden w-full p-6 space-y-3'>
      <h2 className='text-secondary'>{data?.title}</h2>
      <p className='text-neutral line-clamp-3'>{data?.content}</p>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <MapIcon />
          <p className='mt-0.5 text-primary'>
            {" "}
            {data?.city}, {data?.country}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarIcon />
          <p className='mt-0.5 text-primary'>
            {formatISODatetoHumanReadable(data?.date)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function NewsCard({ data }: { data: NewsProps }) {
  return (
    <div className='w-full overflow-hidden border dark:border-neutral rounded-lg p-4'>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <h2 className='text-secondary'>{data?.title}</h2>
          <div className='flex items-center gap-2 mt-0.5 mb-3'>
            <CalendarIcon />
            <p className='mt-0.5 text-primary text-sm'>
              {formatISODatetoHumanReadable(data?.date)}
            </p>
          </div>
        </div>
        <p className='text-neutral line-clamp-5'>{data?.content}</p>
      </div>
    </div>
  );
}

export function BlogCard({ data }: { data: BlogProps }) {
  return (
    <div className='overflow-hidden min-w-80 h-fit bg-nomadGray shadow-md rounded w-full'>
      <div className='p-6'>
        <div className='grid gap-6 grid-cols-2'>
          <Image
            sizes='100vw'
            width={100}
            height={100}
            src={data.image}
            alt='card image'
            className='aspect-video w-full h-full object-cover rounded'
          />
          <div className='w-full'>
            <h2 className='text-xl text-secondary font-semibold'>
              {data.title}
            </h2>
            <p className='text-neutral text-xs tracking-wider mt-1'>
              {data.author}
            </p>
            <p className='text-neutral mt-4 text-sm line-clamp-5'>
              {data.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardVariantThree({ data }: { data: ServiceProps }) {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);
  const dispatch = useAppDispatch();

  const isAlreadyAdded = cart.find(
    (item) => item.service === data.id && item.user === loggedUser?.data?.id
  )
    ? true
    : false;

  const handleAddToCart = () => {
    dispatch(
      addingToCart({
        user: loggedUser?.data?.id,
        service: data?.id,
      })
    );
    toast.success("Added.. Go to cart to checkout");
  };

  // console.log(loggedUser);

  const router = useRouter();

  return (
    <div className='flex flex-col overflow-hidden bg-nomadGray rounded text-secondary shadow-main sm:flex-row'>
      {/*   Image  */}
      <figure className='h-auto flex-1'>
        <Image
          src={data?.image}
          width={200}
          height={200}
          sizes='100vw'
          alt='card image'
          className='object-cover aspect-auto h-full w-full'
          priority={true}
        />
      </figure>
      {/*   Body */}
      <div className='flex-1 px-6 sm:px-0 flex flex-col justify-between gap-4 max-sm:py-6'>
        <>
          <div className='space-y-3 sm:mx-6 pt-6'>
            <h3 className='text-xl font-medium'>{data?.serviceName}</h3>
            <p className='text-neutral line-clamp-3'>{data?.content}</p>
          </div>
          <div className='text-sm text-neutral sm:mx-6'>
            <span>Price: </span>
            <span className='text-primary'>{data?.price} USD</span>
          </div>
        </>
        <div className='sm:flex flex-col max-sm:space-y-4 gap-4 items-end w-full'>
          <Button
            variant='solid'
            className='max-sm:w-full sm:px-2 sm:py-1 text-sm sm:rounded-tr-none sm:rounded-br-none'
            onClick={() => router.push(`/services/${data?.id}`)}
          >
            <span className='hidden sm:inline'>
              <RightArrowIcon />
            </span>
            <span className='sm:hidden'>Details</span>
          </Button>
          <Button
            variant='solid'
            disabled={isAlreadyAdded}
            className='max-sm:w-full px-3 text-sm sm:rounded-bl-none sm:rounded-tr-none'
            onClick={handleAddToCart}
          >
            {isAlreadyAdded ? "Added to cart" : "Add to cart"}
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
      className={cn("flex min-h-screen bg-lightPrimary text-secondary", {
        "flex-row-reverse": pathname !== "/login",
      })}
    >
      <div className='2xl:w-1/3 w-1/2 bg-mainBg max-lg:w-full'>{children}</div>
      <div className='self-center flex-1 max-lg:hidden'>
        <div className='w-fit mx-auto'>
          <Image
            src={loginImage.src}
            alt='login image'
            width={100}
            height={100}
            sizes='100vw'
            style={{ height: "auto" }}
            className='object-cover mx-auto w-2/5 lg:max-2xl:w-3/5'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
