import { addTokenToRequest } from "@/lib/utils";
import { TypeOfService } from "@/views/typeofservices";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const typeOfServiceService = createApi({
  reducerPath: "typeOfServiceService",
  tagTypes: ["typeOfService"],
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
  // refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    createTypeOfService: builder.mutation({
      query: ({ data }) => ({
        url: "/types-of-service/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["typeOfService"],
    }),
    getTypeOfService: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/test/type?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: TypeOfService[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["typeOfService"],
    }),
    updateTypeOfService: builder.mutation({
      query: ({ data }) => ({
        url: `/types-of-service/update/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["typeOfService"],
    }),
    deleteTypeOfService: builder.mutation({
      query: ({ id }) => ({
        url: `/types-of-service/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["typeOfService"],
    }),
  }),
});

export const {
  useCreateTypeOfServiceMutation,
  useGetTypeOfServiceQuery,
  useUpdateTypeOfServiceMutation,
  useDeleteTypeOfServiceMutation,
} = typeOfServiceService;
export default typeOfServiceService;
