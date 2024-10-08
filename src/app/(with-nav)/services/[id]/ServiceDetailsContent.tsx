"use client";
import { StarIcon } from "@/assets/svgs/heroIcons";
import { Button } from "@/components/ui/Button";
import { HeaderText } from "@/components/ui/Headers";
import { dummyServices } from "@/constant/global";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addingToCart } from "@/redux/slice/cart/cartSlice";
import Image from "next/image";
import React from "react";

export default function ServiceDetailsContent({ id }: { id: string }) {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const service = dummyServices.find((data) => data.id === id);

  const dummyReview = [
    {
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      rating: 4,
      name: "John Doe",
    },
    {
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      rating: 5,
      name: "Mary Doe",
    },
    {
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      rating: 3,
      name: "Nary Doe",
    },
  ];

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <HeaderText
        title={`${service?.serviceName}`}
        subtitle="Details and Reviews about Service you're looking for"
      />
      <div className='flex flex-col lg:flex-row gap-8'>
        <figure className='h-auto lg:w-2/5 self-start'>
          <Image
            src={service?.image as string}
            width={100}
            height={100}
            sizes='100vw'
            style={{ width: "100%", height: "auto" }}
            alt='service image'
            className='object-cover aspect-[9/3] lg:aspect-[6/3] 2xl:aspect-[9/3]'
            priority={true}
          />
        </figure>
        <div className='lg:w-3/5 flex flex-col lg:justify-between max-lg:gap-4'>
          <div className='space-y-0.5'>
            <p className='text-secondary'>{service?.content}</p>
            <p className='text-neutral'>
              Price: <span className='text-primary'>{service?.price} USD</span>
            </p>
            <p className='text-neutral'>
              Availability:{" "}
              <span className='text-primary capitalize'>{service?.status}</span>
            </p>
            <p className='text-neutral'>
              Duration: <span className='text-primary capitalize'>2 hours</span>
            </p>
            <p className='text-neutral'>
              Ratings:{" "}
              <span className='text-primary capitalize inline-flex items-center'>
                <span>4.5</span>
                <span className='-mt-1'>
                  <StarIcon />
                </span>
              </span>
            </p>
          </div>
          <Button
            variant='solid'
            disabled={cart?.includes(id)}
            className='max-md:w-full px-3 text-sm'
            onClick={() => dispatch(addingToCart(id))}
          >
            {cart?.includes(id) ? "Added to cart" : "Add to cart"}
          </Button>
        </div>
      </div>
      <div className='mt-8 space-y-4'>
        <h2 className='text-2xl font-semibold text-secondary'>User Reviews</h2>
        {dummyReview.map((review) => (
          <div key={review.name} className='mb-4'>
            <div className='flex gap-4'>
              <h3 className='font-bold text-primary'>{review.name}</h3>
              <div className='inline-flex'>
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className=''>
                    <StarIcon />
                  </span>
                ))}
              </div>
            </div>
            <p className='text-neutral'>{review.review}</p>
            <div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
