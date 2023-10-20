import { addTokenToRequest } from "@/lib/utils";
import { Variation } from "@/views/variations";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const variationService = createApi({
  reducerPath: "variationService",
  tagTypes: ["variation"],
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
    createVariation: builder.mutation({
      query: ({ data }) => ({
        url: "/variation/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),
    getVariations: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/variation?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Variation[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["variation"],
    }),
    updateVariation: builder.mutation({
      query: ({ data }) => ({
        url: `/variation/update/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    deleteVariation : builder.mutation({
      query: ({ id }) => ({
        url: `/variation/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["variation"],
    }),
  }),
});

export const { useCreateVariationMutation, useGetVariationsQuery ,useUpdateVariationMutation , useDeleteVariationMutation} =
  variationService;
export default variationService;
