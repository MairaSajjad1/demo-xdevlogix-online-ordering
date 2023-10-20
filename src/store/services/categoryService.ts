import { addTokenToRequest } from "@/lib/utils";
import { Category } from "@/views/categories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "categoryService",
  tagTypes: ["category"],
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
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getCategories: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/categories?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Category[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["category"],
    }),
    updateCategories: builder.mutation({
      query: ({ data }) => ({
        url: `/categories/update/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/categories/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery ,useUpdateCategoriesMutation ,useDeleteCategoryMutation } =
  categoryService;
export default categoryService;
