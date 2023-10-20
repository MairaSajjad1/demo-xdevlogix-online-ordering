import { addTokenToRequest } from "@/lib/utils";
import { Buisness } from "@/views/buisnesses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const buisnessService = createApi({
  reducerPath: "buisnessService",
  tagTypes: ["buisness"],
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
    createBuisness: builder.mutation({
      query: ({ data }) => ({
        url: "/business/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["buisness"],
    }),
    getBuisnesses: builder.query({
      query: () => ({
        url: `/business`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Buisness[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["buisness"],
    }),
  }),
});

export const { useCreateBuisnessMutation, useGetBuisnessesQuery } =
  buisnessService;
export default buisnessService;
