"use client";
import { manageFormError } from "@/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
};

const Textarea = ({ name, label, placeholder, rows = 3 }: TextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = manageFormError(errors, name);

  return (
    <div>
      <div className='flex justify-between mb-1'>
        <label htmlFor={name} className='text-sm text-secondary'>
          {label}
        </label>
        <small className='text-red-400'>{errorMessage}</small>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            value={field.value ?? ""}
            className='w-full bg-transparent text-secondary rounded border dark:border-neutral px-4 py-2 text-sm outline-none transition-all autofill:bg-transparent focus:dark:border-primary focus:border-primary focus:outline-none resize-none'
            autoComplete='off'
            rows={rows}
          ></textarea>
        )}
      />
    </div>
  );
};

export default Textarea;
