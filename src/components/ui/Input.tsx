"use client";
import { manageFormError } from "@/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  type: "number" | "text" | "email" | "password" | "search";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onchange?: (value: string) => void;
};

const Input = ({
  name,
  type,
  label,
  placeholder,
  disabled,
  onchange,
}: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = manageFormError(errors, name);

  return (
    <div>
      <div className='flex justify-between'>
        <label htmlFor={name} className='nh-label mb-2 text-fgMuted'>
          {label}
        </label>
        <small className='text-xs text-danger'>{errorMessage}</small>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            min={type === "number" ? 0 : undefined}
            max={type === "number" ? 360 : undefined}
            value={field.value || onchange ? field.value : ""}
            placeholder={placeholder}
            onChange={(e) =>
              onchange
                ? onchange(e.target.value)
                : field.onChange(e.target.value)
            }
            className='h-11 w-full rounded-lg border border-fg/20 bg-raised/60 px-4 text-sm text-fg outline-none transition-colors placeholder:text-fgMuted/70 hover:border-fg/35 focus:border-amber focus:ring-1 focus:ring-amber disabled:cursor-not-allowed disabled:text-fgMuted'
            autoComplete='off'
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default Input;
