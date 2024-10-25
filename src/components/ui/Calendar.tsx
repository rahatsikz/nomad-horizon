"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

type CalendarProps = {
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
};

export default function Calendar({ onDateClick, selectedDate }: CalendarProps) {
  const [onDisplayDate, setOnDisplayDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [startDay, setStartDay] = useState(0);

  const today = new Date();

  // Calculate days in the current month and the start day (first weekday)
  useEffect(() => {
    const daysArray = [];
    // Get the number of days in a month
    const days = new Date(
      onDisplayDate.getFullYear(),
      onDisplayDate.getMonth() + 1,
      0 // zero as parameter to get the last day of the month
    ).getDate();

    const firstDay = new Date(
      onDisplayDate.getFullYear(),
      onDisplayDate.getMonth(),
      1 // one as parameter to get the first day of the month
    ).getDay(); // Get the weekday (0 = Sunday, 6 = Saturday) of the first day of the month

    setStartDay(firstDay); // Store the starting day

    for (let day = 1; day <= days; day++) {
      daysArray.push(day);
    }
    setDaysInMonth(daysArray);
  }, [onDisplayDate]);

  // Change month
  const goToPrevMonth = () => {
    setOnDisplayDate(
      new Date(onDisplayDate.getFullYear(), onDisplayDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setOnDisplayDate(
      new Date(onDisplayDate.getFullYear(), onDisplayDate.getMonth() + 1)
    );
  };

  // Select date
  const handleDayClick = (day: number) => {
    const selected = new Date(
      onDisplayDate.getFullYear(),
      onDisplayDate.getMonth(),
      day
    );
    onDateClick(selected);
  };

  // check if date is today
  const isToday = (day: number) => {
    if (
      day === today.getDate() &&
      onDisplayDate.getMonth() === today.getMonth() &&
      onDisplayDate.getFullYear() === today.getFullYear()
    ) {
      return true;
    }

    return false;
  };

  // check if date is already gone
  const isPastDate = (day: number) => {
    // If the year is before the current year, it's a past date
    if (onDisplayDate.getFullYear() < today.getFullYear()) {
      return true;
    }

    // If the year is the same, but the month is before the current month, it's a past date
    if (
      onDisplayDate.getFullYear() === today.getFullYear() &&
      onDisplayDate.getMonth() < today.getMonth()
    ) {
      return true;
    }

    // If the year and month are the same, and the day is before today, it's a past date
    if (
      onDisplayDate.getFullYear() === today.getFullYear() &&
      onDisplayDate.getMonth() === today.getMonth() &&
      day < today.getDate()
    ) {
      return true;
    }

    // Otherwise, it's a future date
    return false;
  };

  // check if date is selected
  const isDateSelected = (day: number) => {
    if (
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === onDisplayDate.getMonth() &&
      selectedDate.getFullYear() === onDisplayDate.getFullYear()
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className='md:w-72 py-4 bg-nomadGray text-secondary w-full'>
      <div className='flex justify-between mb-2 px-4'>
        <button onClick={goToPrevMonth} type='button'>
          &lt;
        </button>
        <span>
          {onDisplayDate.toLocaleString("default", { month: "long" })}{" "}
          {onDisplayDate.getFullYear()}
        </span>
        <button onClick={goToNextMonth} type='button'>
          &gt;
        </button>
      </div>
      {/* Display the days of the week */}
      <div className='grid grid-cols-7 gap-1.5 bg-mainBg px-4 text-neutral'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className='text-center font-medium'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-1.5 px-4'>
        {/* Adding empty cells before the first day of the month */}
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx}></div> // Empty div to represent an empty space
        ))}

        {/* Display the days of the month */}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={cn(
              "text-center hover:bg-primary hover:text-secondary cursor-pointer rounded-full size-8 flex items-center justify-center",
              {
                "text-neutral opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral":
                  isPastDate(day),
              },
              { "bg-primary text-white": isToday(day) && !selectedDate },
              { "bg-primary text-white": isDateSelected(day) }
            )}
            onClick={() => !isPastDate(day) && handleDayClick(day)} // Disable click for past dates
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
