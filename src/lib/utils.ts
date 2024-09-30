import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function manageFormError(
  obj: Record<string, any>,
  propertyPath: string
) {
  const properties = propertyPath.split(".");
  let value = obj;

  for (const property of properties) {
    if (value[property]) {
      value = value[property];
    } else {
      return undefined;
    }
  }

  return value.message;
}
