import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { addTokenToRequest } from "@/lib/utils";
import { Order } from "@/views/dashboard";

const orderService = createApi({
  reducerPath: "orderService",
  tagTypes: ["Order"],
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
    createOrder: builder.mutation({
      query: ({ data }) => ({
        url: "/orders/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query({
      query: ({ buisnessId , perPage }) => {
        return {
          url: `/orders/check?business_id=${buisnessId}&user_type=admin&per_page=${perPage}&order_status=Complete`,
          method: "GET",
        };
      },

      transformResponse: ({ data }: { data: Order[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["Order"],
    }),
    
  }),
});

export const {useCreateOrderMutation, useGetOrdersQuery } = orderService;

export default orderService;
