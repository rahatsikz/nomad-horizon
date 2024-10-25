"use client";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import { Controller, useFormContext } from "react-hook-form";
import {
  formatISODatetoHumanReadable,
  formatSelectedDateLikeIso,
  manageFormError,
} from "@/lib/utils";

type DateProps = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function DatePicker({
  name,
  label,
  placeholder,
  disabled,
}: DateProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = manageFormError(errors, name);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  return (
    <div ref={panelRef}>
      <div className='flex justify-between'>
        <label htmlFor={name} className='text-sm text-secondary mb-1'>
          {label}
        </label>
        <small className='text-red-400'>{errorMessage}</small>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <input
              {...field}
              id={name}
              placeholder={placeholder}
              value={
                field.value ? formatISODatetoHumanReadable(field.value) : ""
              }
              className='h-10 w-full bg-transparent text-secondary rounded border dark:border-neutral px-4 text-sm  outline-none transition-all autofill:bg-transparent focus:border-primary focus:outline-none disabled:text-neutral disabled:cursor-not-allowed'
              autoComplete='off'
              disabled={disabled}
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <div className='absolute z-10'>
              {showCalendar && (
                <Calendar
                  onDateClick={(selectedDate) => {
                    field.onChange(formatSelectedDateLikeIso(selectedDate));
                  }}
                  selectedDate={new Date(field.value)}
                />
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
