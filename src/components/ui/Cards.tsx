import { ServiceProps } from "@/types/common";
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
