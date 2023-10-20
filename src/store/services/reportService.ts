import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { addTokenToRequest } from "@/lib/utils";
import { Order } from "@/views/dashboard";

const reportService = createApi({
  reducerPath: "reportService",
  tagTypes: ["report"],
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
    getOrders: builder.query({
      query: ({ buisnessId, customerId, perPage }) => {
        return {
          url: `/order/report?business_id=${buisnessId}&customer_id=${customerId}&per_page=${perPage}`,
          method: "GET",
        };
      },

      transformResponse: ({ data }: { data: Order[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["report"],
    }),
  }),
});

export const { useGetOrdersQuery } = reportService;

export default reportService;
