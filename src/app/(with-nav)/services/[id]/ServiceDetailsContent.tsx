"use client";
import { StarIcon } from "@/assets/svgs/heroIcons";
import { Button } from "@/components/ui/Button";
import { HeaderText } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useGetReviewsQuery } from "@/redux/api/reviewApi";
import { useGetServiceQuery } from "@/redux/api/serviceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addingToCart } from "@/redux/slice/cart/cartSlice";
import Image from "next/image";
import React from "react";

export default function ServiceDetailsContent({ id }: { id: string }) {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { data: service, isFetching } = useGetServiceQuery(id);
  const { data: userReviews, isFetching: isFetchingReviews } =
    useGetReviewsQuery({
      serviceId: id,
    });

  const totalRating =
    userReviews?.data.reduce(
      (total: number, review: any) => total + review.rating,
      0
    ) || 0;
  const averageRating = Math.floor(totalRating / userReviews?.data.length) || 0;

  if (isFetching || isFetchingReviews) {
    return <LoadingComponent />;
  }

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <HeaderText
        title={`${service?.data?.serviceName}`}
        subtitle="Details and Reviews about Service you're looking for"
      />
      <div className='flex flex-col lg:flex-row gap-8'>
        <figure className='h-auto lg:w-2/5 self-start'>
          <Image
            src={service?.data?.image as string}
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
            <p className='text-secondary'>{service?.data?.content}</p>
            <p className='text-neutral'>
              Price:{" "}
              <span className='text-primary'>{service?.data?.price} USD</span>
            </p>
            <p className='text-neutral'>
              Availability:{" "}
              <span className='text-primary capitalize'>
                {service?.data?.status}
              </span>
            </p>
            <p className='text-neutral'>
              Service Days:{" "}
              <span className='text-primary capitalize'>
                {service?.data?.schedules.length > 0
                  ? service?.data?.schedules?.map(
                      (schedule: any, idx: number) => (
                        <span key={schedule.daysOfWeek}>
                          {schedule.daysOfWeek}
                          {idx !== service?.data?.schedules?.length - 1
                            ? ", "
                            : ""}
                        </span>
                      )
                    )
                  : "N/A"}
              </span>
            </p>
            <p className='text-neutral'>
              Ratings:{" "}
              {averageRating === 0 ? (
                <span className='text-primary'>No ratings yet</span>
              ) : (
                <span className='text-primary capitalize inline-flex items-center'>
                  <span>{averageRating}</span>
                  <span className='-mt-1'>
                    <StarIcon />
                  </span>
                </span>
              )}
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
      <div className='mt-8 space-y-2'>
        <h2 className='text-2xl font-semibold text-secondary'>User Reviews</h2>
        {userReviews?.data?.length > 0 ? (
          userReviews?.data?.map((review: any, idx: number) => (
            <div key={idx} className='mb-4'>
              <div className='flex gap-4'>
                <h3 className='font-bold text-primary capitalize'>
                  {review?.user?.username}
                </h3>
                <div className='inline-flex'>
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className=''>
                      <StarIcon />
                    </span>
                  ))}
                </div>
              </div>
              <p className='text-neutral'>{review.content}</p>
            </div>
          ))
        ) : (
          <p className='text-neutral'>No reviews yet</p>
        )}
      </div>
    </section>
  );
}
