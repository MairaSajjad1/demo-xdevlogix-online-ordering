import { addTokenToRequest } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const permissionService = createApi({
  reducerPath: "permissionService",
  tagTypes: ["permission"],
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
    getPermissions: builder.query({
      query: ({ buisnessId, roleId, perPage }) => ({
        url: `/permission?business_id=${buisnessId}&role_id=${roleId}&per_page=${perPage}`,
        method: "GET",
      }),
      providesTags: ["permission"],
    }),

    getSinglePermission: builder.query({
      query: ({ buisnessId, roleId, permissionId }) => ({
        url: `/get-assign-permission?business_id=${buisnessId}&role_id=${roleId}&permission_id=${permissionId}`,
        method: "GET",
      }),
      providesTags: ["permission"],
    }),

    updatePermission: builder.mutation({
      query: ({  data }) => ({
        url: `/permission/edit/${data?.role_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["permission"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetSinglePermissionQuery,
  useUpdatePermissionMutation,
} = permissionService;

export default permissionService;
