import { addTokenToRequest } from "@/lib/utils";
import { Purchase } from "@/views/purchases";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const purchaseService = createApi({
  reducerPath: "purchaseService",
  tagTypes: ["purchase"],
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
    createPurchase: builder.mutation({
      query: ({ data }) => ({
        url: "/purchase/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase"],
    }),
    getPurchases: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/purchase?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Purchase[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["purchase"],
    }),
  }),
});

export const { useCreatePurchaseMutation, useGetPurchasesQuery } =
  purchaseService;
export default purchaseService;
