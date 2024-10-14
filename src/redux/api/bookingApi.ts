import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const { useAddBookingMutation } = bookingApi;
