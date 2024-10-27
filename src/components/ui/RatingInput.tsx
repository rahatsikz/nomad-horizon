"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type StarRatingProps = {
  totalStars?: number;
  name: string;
  label: string;
};

export default function RatingInput({
  totalStars = 5,
  name,
  label,
}: StarRatingProps) {
  //   const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { control } = useFormContext();

  return (
    <div className='flex items-center gap-4'>
      <p className='text-sm text-secondary'>{label}</p>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className='flex space-x-1.5'>
            {[...Array(totalStars)].map((_, index) => {
              const starValue = index + 1;
              return (
                <svg
                  key={index}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => field.onChange(starValue)}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill={
                    starValue <= (hover || field.value) ? "#ca8a04" : "gray"
                  }
                  className={cn(
                    "size-6 cursor-pointer transition-colors duration-200"
                  )}
                >
                  <path d='M12 .587l3.668 7.431 8.2 1.2-5.917 5.787 1.398 8.163-7.349-3.863-7.349 3.863 1.398-8.163-5.917-5.787 8.2-1.2z' />
                </svg>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}
