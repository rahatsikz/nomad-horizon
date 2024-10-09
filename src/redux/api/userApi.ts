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
  }),
});

export const { useGetUserQuery } = authApi;
