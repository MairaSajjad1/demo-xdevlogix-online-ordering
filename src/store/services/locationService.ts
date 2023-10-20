import { addTokenToRequest } from "@/lib/utils";
import { Location } from "@/views/locations";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const locationService = createApi({
  reducerPath: "locationService",
  tagTypes: ["location"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://demo.onlineorder.crossdevlogix.com/api",

    prepareHeaders: async (headers, { getState }) => {
      headers.set("Accept", "application/json");
      await addTokenToRequest(headers, { getState });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createLocation: builder.mutation({
      query: ({ data }) => ({
        url: "/locations/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["location"],
    }),
    getLocations: builder.query({
      query: ({ buisnessId }) => ({
        url: `/locations?business_id=${buisnessId}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Location[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["location"],
    }),
    updateLocation: builder.mutation({
      query: ({ data }) => ({
        url: `/location/update/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["location"],
    }),
    deleteLocation: builder.mutation({
      query: ({ id }) => ({
        url: `/location/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["location"],
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationsQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationService;
export default locationService;
