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

  const monthLabel = `${onDisplayDate.toLocaleString("default", {
    month: "long",
  })} ${onDisplayDate.getFullYear()}`;

  return (
    <div className='w-full rounded-2xl border border-fg/10 bg-raised p-5 text-fg md:w-80'>
      <div className='mb-4 flex items-center justify-between'>
        <button
          onClick={goToPrevMonth}
          type='button'
          aria-label='Previous month'
          className='flex size-9 items-center justify-center rounded-full border border-fg/20 transition-colors hover:border-amber hover:text-amberText focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber'
        >
          ←
        </button>
        <span aria-live='polite' className='font-display text-sm font-bold uppercase tracking-[0.02em]'>
          {monthLabel}
        </span>
        <button
          onClick={goToNextMonth}
          type='button'
          aria-label='Next month'
          className='flex size-9 items-center justify-center rounded-full border border-fg/20 transition-colors hover:border-amber hover:text-amberText focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber'
        >
          →
        </button>
      </div>
      {/* Display the days of the week */}
      <div className='mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-fgMuted'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} aria-hidden='true'>
            {day.slice(0, 2)}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {/* Adding empty cells before the first day of the month */}
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx}></div> // Empty div to represent an empty space
        ))}

        {/* Display the days of the month */}
        {daysInMonth.map((day) => {
          const past = isPastDate(day);
          const selected = isDateSelected(day) || (isToday(day) && !selectedDate);
          return (
            <button
              key={day}
              type='button'
              disabled={past}
              aria-pressed={selected}
              aria-label={`${day} ${monthLabel}`}
              className={cn(
                "flex aspect-square w-full items-center justify-center rounded-full text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber",
                past
                  ? "cursor-not-allowed text-fgMuted/40"
                  : "hover:bg-amber/20 hover:text-fg",
                isToday(day) && !selected && "ring-1 ring-amber/70",
                selected && "bg-amber font-semibold text-onAmber hover:bg-amber hover:text-onAmber"
              )}
              onClick={() => !past && handleDayClick(day)} // Disable click for past dates
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
