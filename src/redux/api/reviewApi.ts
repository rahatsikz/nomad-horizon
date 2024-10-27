import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/reviews";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    getReviews: build.query({
      query: (args: Record<string, any>) => ({
        url: `${REVIEW_URL}`,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApi;
