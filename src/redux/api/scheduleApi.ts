import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const SCHEDULE_URL = "/schedules";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchedule: build.query({
      query: (args: Record<string, any>) => ({
        url: `${SCHEDULE_URL}`,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.booking],
    }),
    getServiceSchedule: build.query({
      query: (serviceId) => ({
        url: `${SCHEDULE_URL}/${serviceId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.schedule],
    }),
  }),
});

export const { useGetScheduleQuery, useGetServiceScheduleQuery } = scheduleApi;
