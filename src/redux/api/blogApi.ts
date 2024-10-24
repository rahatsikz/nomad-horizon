import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BLOG_URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBlogs: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const { useAddBlogsMutation } = blogApi;
