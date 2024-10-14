"use client";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/Button";
import Calendar from "@/components/ui/Calendar";
import { HeaderText } from "@/components/ui/Headers";
import { cn, formatSelectedDateLikeIso } from "@/lib/utils";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useGetScheduleQuery } from "@/redux/api/scheduleApi";
import { useGetServiceQuery } from "@/redux/api/serviceApi";
import { ScheduleTimeProps } from "@/types/common";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookingPageContent({ id }: { id: string }) {
  // service data fetching
  const { data: service, isLoading } = useGetServiceQuery(id);

  // calendar and time picker state
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<ScheduleTimeProps | null>(
    null
  );

  // schedule data fetching
  const {
    data: schedule,
    error,
    isFetching,
  } = useGetScheduleQuery({
    serviceId: id,
    date: formatSelectedDateLikeIso(selectedDate),
  });

  // booking post api hook
  const [addBooking] = useAddBookingMutation();

  // reset time picker on date change
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // date pick handler
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // time pick handler
  const handleTimeClick = (time: ScheduleTimeProps) => {
    setSelectedTime(time);
  };

  // booking handler
  const handleBooking = async () => {
    const bookingDate = formatSelectedDateLikeIso(selectedDate);

    try {
      const response = await addBooking({
        date: bookingDate,
        serviceId: id,
        startTime: selectedTime?.sessionStarts,
        endTime: selectedTime?.sessionEnds,
      }).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <HeaderText
        title={service?.data?.serviceName}
        subtitle='Book your desired service on your preferred date and time'
      />
      <div className='border dark:border-neutral rounded-lg'>
        {/* topbar */}
        <div className='w-full h-fit md:h-20 border-b dark:border-neutral sticky top-[94px] left-0 bg-nomadGray rounded-tr-md rounded-tl-md z-[2]'>
          <div className='flex items-center justify-between  h-full px-8 py-4'>
            {selectedDate && (
              <div>
                <p className='text-lg text-secondary'>
                  {selectedDate.getDate()}{" "}
                  {selectedDate.toLocaleString("default", { month: "short" })}{" "}
                  {selectedDate.getFullYear()}
                </p>
                <p className='text-neutral'>
                  {selectedDate.toLocaleString("default", { weekday: "long" })}
                </p>
              </div>
            )}

            <div className='flex gap-2 md:gap-4 md:items-center md:flex-row flex-col md:divide-x-2'>
              {selectedTime && (
                <div className=''>
                  <p className='md:text-lg text-sm text-secondary'>
                    {selectedTime.sessionStarts} - {selectedTime.sessionEnds}
                  </p>
                </div>
              )}
              <div className='md:pl-4'>
                <Button
                  variant='solid'
                  disabled={!selectedTime}
                  className='max-md:text-sm'
                  onClick={handleBooking}
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* booking content */}
        <div className='flex md:flex-row flex-col-reverse gap-8 md:items-center'>
          <div className='flex-1 md:pl-8 pl-4'>
            <TimeTable
              onTimeClick={handleTimeClick}
              selectedTime={selectedTime}
              serviceSchedule={schedule?.data}
              isFetching={isFetching}
              isError={error}
            />
          </div>
          <div className='md:pr-8'>
            <Calendar
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const TimeTable = ({
  onTimeClick,
  selectedTime,
  serviceSchedule,
  isFetching,
  isError,
}: {
  onTimeClick: (time: any) => void;
  selectedTime: ScheduleTimeProps | null;
  serviceSchedule: ScheduleTimeProps[];
  isFetching: boolean;
  isError: any;
}) => {
  // loading while fetching schedule data
  if (isFetching) {
    return <Loading />;
  }

  // if there is no schedule data
  if (isError?.status === 400) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <p className='text-secondary max-md:py-4'>{isError?.data?.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className='dark:border-neutral border-l md:border-r h-8 ml-14'></div>
      {serviceSchedule.map((item: ScheduleTimeProps, idx: number) => (
        <div key={idx} className='relative w-full'>
          <div className='absolute top-0 left-0 text-secondary'>
            {item.sessionStarts}
          </div>
          <div className='dark:border-neutral border-l md:border-r border-t h-16 ml-14'>
            {item.available ? (
              <div
                className={cn(
                  "text-secondary w-full flex items-center justify-center h-full cursor-pointer",
                  {
                    "bg-primary":
                      selectedTime?.sessionStarts === item.sessionStarts,
                  }
                )}
                onClick={() => onTimeClick(item)}
              >
                Available to book
              </div>
            ) : (
              <div className='text-neutral cursor-not-allowed w-full flex items-center justify-center h-full'>
                Not Available to Book
              </div>
            )}
          </div>
        </div>
      ))}
      <div className='dark:border-neutral border-t border-l md:border-r h-8 ml-14'></div>
    </>
  );
};
