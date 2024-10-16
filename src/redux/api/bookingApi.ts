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
    myBookings: build.query({
      query: () => ({
        url: `${BOOKING_URL}/my-bookings`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    cancelBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/cancel-booking/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useMyBookingsQuery,
  useCancelBookingMutation,
} = bookingApi;
