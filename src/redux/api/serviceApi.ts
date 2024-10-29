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
    getServices: build.query({
      query: (options: Record<string, any>) => ({
        url: `${SERVICE_URL}`,
        method: "GET",
        params: options,
      }),
      providesTags: [tagTypes.service],
    }),
    getService: build.query({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    updateService: build.mutation({
      query: ({ id, data }) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
