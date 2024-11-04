"use client";
import { DashboardHeaderText } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { cn, formatISODatetoHumanReadable } from "@/lib/utils";
import { useGetFeedbacksQuery } from "@/redux/api/feedbackApi";
import React from "react";

export default function FeedbackPageContents() {
  const { data: feedbacks, isFetching } = useGetFeedbacksQuery({});

  if (isFetching) {
    return <LoadingComponent />;
  }

  const allFeedbacks = feedbacks?.data?.map((data: any) => ({
    id: data?.id,
    username: data?.user?.username,
    content: data?.content,
    totalBooking: data?.user?.bookings?.length,
    createdAt: formatISODatetoHumanReadable(data?.createdAt),
  }));

  return (
    <section className='px-4 py-8'>
      <div className='flex justify-center'>
        <DashboardHeaderText title='Latest Feedbacks from Users' />
      </div>
      <div
        className={cn(
          "grid gap-4 mt-1",
          allFeedbacks?.length > 2
            ? "grid-cols-1 lg:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-2"
        )}
      >
        {allFeedbacks?.map((data: any) => (
          <FeedbackCard key={data?.id} data={data} />
        ))}
      </div>
    </section>
  );
}

function FeedbackCard({ data }: { data: any }) {
  return (
    <div className='w-full overflow-hidden border dark:border-neutral rounded-lg p-4'>
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <div>
            <h2 className='text-primary text-xl'>{data?.username}</h2>
            <p className='text-neutral text-sm'>
              {data?.totalBooking > 0
                ? data?.totalBooking + " Bookings made"
                : "No Bookings yet"}
            </p>
          </div>
          <p className='text-neutral text-sm'>Posted at {data?.createdAt}</p>
        </div>
        <p className='text-secondary line-clamp-5'>{data?.content}</p>
      </div>
    </div>
  );
}
