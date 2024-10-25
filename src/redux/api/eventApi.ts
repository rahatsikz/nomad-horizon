import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const EVENT_URL = "/events";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addEvent: build.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const { useAddEventMutation } = eventApi;
