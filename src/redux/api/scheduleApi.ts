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
  }),
});

export const { useGetScheduleQuery } = scheduleApi;
