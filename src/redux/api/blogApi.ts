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
    getBlogs: build.query({
      query: (args: Record<string, any>) => ({
        url: `${BLOG_URL}`,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.blog],
    }),
    getBlog: build.query({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    updateBlog: build.mutation({
      query: ({ id, data }) => ({
        url: `${BLOG_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useAddBlogsMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
