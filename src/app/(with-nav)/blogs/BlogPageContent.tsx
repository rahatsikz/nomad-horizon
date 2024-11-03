"use client";
import { HeaderText } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlogPageContent() {
  const { data, isFetching } = useGetBlogsQuery({});

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <HeaderText
        title='Useful Blogs'
        subtitle="We've got you covered for all your nomadic needs"
      />
      <div className='grid grid-cols-1 xl:grid-cols-2  gap-4'>
        {data?.data?.map((data: any) => (
          <BlogCard key={data?.id} data={data} />
        ))}
      </div>
    </section>
  );
}

function BlogCard({ data }: { data: any }) {
  const router = useRouter();

  return (
    <div className='overflow-hidden min-w-80 h-fit bg-nomadGray shadow-md rounded w-full'>
      <div className='p-6'>
        <div className='grid gap-6 grid-cols-2'>
          <div className='w-full'>
            <h2 className='xl:text-xl text-secondary font-semibold text-balance'>
              {data?.title}
            </h2>
            <p className='text-neutral text-xs tracking-wider mt-1'>
              {data?.author}
            </p>
            <div className='mt-4 text-sm text-balance'>
              <span className=' line-clamp-3 text-neutral'>
                {data?.content}
              </span>
              <button
                className='text-primary'
                onClick={() => router.push(`/blogs/${data?.id}`)}
              >
                Read More
              </button>
            </div>
          </div>
          <div className='w-full'>
            <Image
              sizes='100vw'
              width={100}
              height={100}
              src={data?.image}
              alt={data?.title}
              className='aspect-[4/1] w-full h-full object-cover rounded'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
