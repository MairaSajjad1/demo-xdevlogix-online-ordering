import { addTokenToRequest } from "@/lib/utils";
import { User } from "@/views/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userService = createApi({
  reducerPath: "userService",
  tagTypes: ["user"],
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
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: "/customer/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getUsers: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/customers?business_id=${buisnessId}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: User[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["user"],
    }),
    updateUsers: builder.mutation({
      query: ({ data }) => ({
        url: `/customer/update/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery, useUpdateUsersMutation, } = userService;
export default userService;
