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
    getNews: build.query({
      query: (args: Record<string, any>) => ({
        url: `${NEWS_URL}`,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.news],
    }),
    getNewsById: build.query({
      query: (id) => ({
        url: `${NEWS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.news],
    }),
    updateNews: build.mutation({
      query: ({ id, data }) => ({
        url: `${NEWS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.news],
    }),
    deleteNews: build.mutation({
      query: (id) => ({
        url: `${NEWS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.news],
    }),
  }),
});

export const {
  useAddNewsMutation,
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
