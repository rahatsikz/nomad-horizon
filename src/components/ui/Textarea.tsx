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
      <div className='mb-2 flex justify-between'>
        <label htmlFor={name} className='nh-label text-fgMuted'>
          {label}
        </label>
        <small className='text-xs text-danger'>{errorMessage}</small>
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
            className='w-full resize-none rounded-lg border border-fg/20 bg-raised/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fgMuted/70 hover:border-fg/35 focus:border-amber focus:ring-1 focus:ring-amber'
            autoComplete='off'
            rows={rows}
          ></textarea>
        )}
      />
    </div>
  );
};

export default Textarea;
