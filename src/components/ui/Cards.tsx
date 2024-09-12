import { CalendarIcon, MapIcon } from "@/assets/svgs/heroIcons";
import { EventProps, ReviewProps, ServiceProps } from "@/types/common";
import Image from "next/image";

export function CardVariantOne({ data }: { data: ServiceProps }) {
  return (
    <div className='overflow-hidden rounded shadow-main'>
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
    <div className='overflow-hidden rounded shadow-main'>
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
      <div className='p-6 bg-nomadGray'>
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
    <div className='overflow-hidden w-full bg-nomadGray shadow-main mx-4'>
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
      <h2 className='text-secondary'>{data?.eventName}</h2>
      <p className='text-neutral'>{data?.description}</p>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <MapIcon />
          <p className='mt-0.5 text-primary'> {data?.location}</p>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarIcon />
          <p className='mt-0.5 text-primary'> {data?.eventDate}</p>
        </div>
      </div>
    </div>
  );
}
