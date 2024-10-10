import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const { useAddServiceMutation } = serviceApi;
