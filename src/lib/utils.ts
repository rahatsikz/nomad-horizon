import { instance as axiosInstance } from "@/axios/axiosInstance";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function manageFormError(
  obj: Record<string, any>,
  propertyPath: string
) {
  const properties = propertyPath?.split(".");
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

export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/new-access-token`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const formatSelectedDateLikeIso = (date: Date | null) => {
  let isoDate = "";
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
  }
  return isoDate;
};

export const formatISODatetoHumanReadable = (date: string) => {
  const formatedDate = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return formatedDate;
};

export const convertTo12HourFormat = (time24: string) => {
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time24.split(":").map(Number);

  // Determine if it's AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // If hours is 0 or 12, set to 12

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};

export const formatDateTime = (isoString: string) => {
  const dateAndTime = new Date(isoString);

  const date = formatISODatetoHumanReadable(isoString);

  const time = dateAndTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Converts to 12-hour format with AM/PM
  });

  // Return formatted date and time
  return `${date} at ${time}`;
};
