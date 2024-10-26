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
    getEvents: build.query({
      query: (args: Record<string, any>) => ({
        url: `${EVENT_URL}`,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.event],
    }),
    getEvent: build.query({
      query: (id) => ({
        url: `${EVENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.event],
    }),
    updateEvent: build.mutation({
      query: ({ id, data }) => ({
        url: `${EVENT_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.event],
    }),

    deleteEvent: build.mutation({
      query: (id) => ({
        url: `${EVENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
