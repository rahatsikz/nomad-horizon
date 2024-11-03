import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    getFeedbacks: build.query({
      query: () => ({
        url: `${FEEDBACK_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
  }),
});

export const { useAddFeedbackMutation, useGetFeedbacksQuery } = feedbackApi;
