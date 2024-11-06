"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { formatISODatetoHumanReadable } from "@/lib/utils";
import { useGetBlogQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function SoloBlogContent({ id }: { id: string }) {
  const { back } = useRouter();
  const { data, isFetching } = useGetBlogQuery(id);

  if (isFetching) {
    return <LoadingComponent />;
  }

  const { title, content, author, image, createdAt } = data?.data;

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <Image
        src={image}
        width={100}
        height={100}
        alt={title}
        sizes='100vw'
        className='w-full object-cover md:aspect-[4/1] aspect-[4/3] rounded h-full'
      />
      <div className='space-y-2 my-4 w-fit'>
        <h2 className='text-xl text-secondary font-medium'>{title}</h2>
        <div className='flex items-center justify-between gap-2 w-full'>
          <small className='text-sm text-neutral'> {author} </small>
          <h6 className='text-sm text-neutral'>
            Posted at {formatISODatetoHumanReadable(createdAt)}
          </h6>
        </div>
      </div>
      <p className='mb-8 text-secondary'>{content}</p>
      <button
        className='text-primary hover:text-neutral'
        onClick={() => back()}
      >
        Back to previous page
      </button>
    </section>
  );
}
