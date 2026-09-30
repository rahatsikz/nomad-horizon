"use client";
import { Button } from "@/components/ui/Button";
import Calendar from "@/components/ui/Calendar";
import { PageHero } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { TimeTable } from "@/components/ui/TimeGrid";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { formatSelectedDateLikeIso } from "@/lib/utils";
import withAuth from "@/lib/withAuth";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useGetScheduleQuery } from "@/redux/api/scheduleApi";
import { useGetServiceQuery } from "@/redux/api/serviceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/slice/cart/cartSlice";
import { ScheduleTimeProps } from "@/types/common";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookingPageContent = ({ id }: { id: string }) => {
  // service data fetching
  const { data: service, isLoading } = useGetServiceQuery(id);
  // redux dispatch
  const dispatch = useAppDispatch();

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

  // user data fetching
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);

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
      // console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(
          removeFromCart({
            user: loggedUser?.data?.id,
            service: id,
          })
        );
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return (
      <div className='pt-32'>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <PageHero
        label='Booking'
        title={service?.data?.serviceName ?? "Book a session"}
        subtitle='Book your desired service on your preferred date and time'
      />

      <section className='nh-container'>
        {/* summary bar */}
        <div className='sticky top-16 z-[2] -mx-4 border-y border-fg/10 bg-canvas/90 px-4 py-4 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-6 lg:top-24'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-wrap items-center gap-x-8 gap-y-2'>
              {selectedDate && (
                <div>
                  <p className='nh-label text-fgMuted'>
                    {selectedDate.toLocaleString("default", { weekday: "long" })}
                  </p>
                  <p className='font-display text-xl font-extrabold uppercase tracking-[-0.02em]'>
                    {selectedDate.getDate()}{" "}
                    {selectedDate.toLocaleString("default", { month: "short" })}{" "}
                    {selectedDate.getFullYear()}
                  </p>
                </div>
              )}
              <div>
                <p className='nh-label text-fgMuted'>Session</p>
                <p className='font-display text-xl font-extrabold tabular-nums tracking-[-0.02em]' aria-live='polite'>
                  {selectedTime
                    ? `${selectedTime.sessionStarts} – ${selectedTime.sessionEnds}`
                    : "Pick a time"}
                </p>
              </div>
            </div>
            <Button
              variant='solid'
              disabled={!selectedTime}
              className='px-8 py-3'
              onClick={handleBooking}
            >
              Book session
            </Button>
          </div>
        </div>

        {/* booking content */}
        <div className='mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16'>
          <div>
            <p className='nh-label mb-4 text-fgMuted'>01 — Choose a date</p>
            <Calendar
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>
          <div>
            <p className='nh-label mb-4 text-fgMuted'>02 — Choose a session</p>
            <TimeTable
              onTimeClick={handleTimeClick}
              selectedTime={selectedTime}
              serviceSchedule={schedule?.data}
              isFetching={isFetching}
              isError={error}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(BookingPageContent);
