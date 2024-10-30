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
    // customer specific Bookings
    myBookings: build.query({
      query: () => ({
        url: `${BOOKING_URL}/my-bookings`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking, tagTypes.user],
    }),
    // Cancel Booking
    cancelBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/cancel-booking/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // Get All Bookings
    getAllBookings: build.query({
      query: (args: Record<string, any>) => ({
        url: `${BOOKING_URL}/all-bookings`,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.booking],
    }),
    // adjust bookings
    adjustBooking: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_URL}/adjust-booking/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // update booking status
    updateBookingStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_URL}/update-booking-status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // delete booking
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/delete-booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useMyBookingsQuery,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useAdjustBookingMutation,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} = bookingApi;
