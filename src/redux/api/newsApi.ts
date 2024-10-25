import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const NEWS_URL = "/news";

export const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNews: build.mutation({
      query: (data) => ({
        url: `${NEWS_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.news],
    }),
  }),
});

export const { useAddNewsMutation } = newsApi;
