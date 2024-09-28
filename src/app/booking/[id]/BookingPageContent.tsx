"use client";
import Calendar from "@/components/ui/Calendar";
import React, { useEffect, useState } from "react";

export default function BookingPageContent({ id }: { id: string }) {
  console.log(id);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate);
    }
  }, [selectedDate]);

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <div>
        <Calendar onDateClick={handleDateClick} selectedDate={selectedDate} />
      </div>
    </section>
  );
}
