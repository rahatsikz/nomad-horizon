"use client";
import { Button } from "@/components/ui/Button";
import Calendar from "@/components/ui/Calendar";
import { cn } from "@/lib/utils";
import { ScheduleTimeProps } from "@/types/common";
import React, { useState } from "react";

export default function BookingPageContent({ id }: { id: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<ScheduleTimeProps | null>(
    null
  );

  // date pick handler
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // time pick handler
  const handleTimeClick = (time: ScheduleTimeProps) => {
    setSelectedTime(time);
  };

  // ! will implement booking api call here
  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      console.log(selectedDate.getDate(), selectedTime, id);
    }
  };

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
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
                    {selectedTime.start_time} - {selectedTime.end_time}
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
}: {
  onTimeClick: (time: ScheduleTimeProps) => void;
  selectedTime: ScheduleTimeProps | null;
}) => {
  const availableHours = 12;
  const eachSession = 90; // Session length in minutes
  const startHour = 10; // Starting time (10:00 AM)

  const totalSession = (availableHours * 60) / eachSession;

  const formatTime = (time: Date) => {
    return `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const schedule = Array.from({ length: totalSession }).map((_, idx) => {
    const startTime = new Date();
    // Set the starting time of the first session
    startTime.setHours(startHour);
    startTime.setMinutes(0);

    // Add the required session time to the startTime based on the index
    startTime.setMinutes(startTime.getMinutes() + eachSession * idx);

    const endTime = new Date(startTime.getTime() + eachSession * 60000); // Add session duration

    return {
      id: idx.toString(),
      start_time: formatTime(startTime),
      end_time: formatTime(endTime),
      available: idx % 2 === 0,
    };
  });

  return (
    <>
      <div className='dark:border-neutral border-l md:border-r h-8 ml-14'></div>
      {schedule.map((item, idx) => (
        <div key={idx} className='relative w-full'>
          <div className='absolute top-0 left-0 text-secondary'>
            {item.start_time}
          </div>
          <div className='dark:border-neutral border-l md:border-r border-t h-16 ml-14'>
            {item.available ? (
              <div
                className={cn(
                  "text-secondary w-full flex items-center justify-center h-full cursor-pointer",
                  {
                    "bg-primary": Number(selectedTime?.id) === Number(item.id),
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
