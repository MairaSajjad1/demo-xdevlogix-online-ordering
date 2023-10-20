import { addTokenToRequest } from "@/lib/utils";
import { Rider } from "@/views/riders";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const riderService = createApi({
  reducerPath: "riderService",
  tagTypes: ["rider"],
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
    createRider: builder.mutation({
      query: ({ data }) => ({
        url: "/rider/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rider"],
    }),
    getRiders: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/riders?business_id=${buisnessId}&user_type=rider&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Rider[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["rider"],
    }),
    updateRider: builder.mutation({
      query: ({ data }) => ({
        url: `/rider/edit/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rider"],
    }),
    deleteRider: builder.mutation({
      query: ({ id }) => ({
        url: `/rider/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["rider"],
    }),
  }),
});

export const { useCreateRiderMutation, useGetRidersQuery , useUpdateRiderMutation ,  useDeleteRiderMutation } = riderService;
export default riderService;
