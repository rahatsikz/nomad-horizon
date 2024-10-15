import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const NOTIFICATION_URL = "/notifications";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotification: build.query({
      query: () => ({
        url: `${NOTIFICATION_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification, tagTypes.booking],
    }),
  }),
});

export const { useGetNotificationQuery } = notificationApi;
