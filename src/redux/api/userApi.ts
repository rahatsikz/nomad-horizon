import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllCustomers: build.query({
      query: () => ({
        url: `${USER_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllAdmins: build.query({
      query: () => ({
        url: `${USER_URL}/admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    createAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-admin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllCustomersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
} = authApi;
