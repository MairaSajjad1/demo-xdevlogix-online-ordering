import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTokenToRequest } from '@/lib/utils';

const passwordService = createApi({
  reducerPath: 'passwordService',
  tagTypes: ['forget'],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://demo.onlineorder.crossdevlogix.com/api",
    prepareHeaders: async (headers, { getState }) => {
      headers.set('Accept', 'application/json');
      await addTokenToRequest(headers, { getState });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/customer/forgot',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['forget'],
    }),
  }),
});

export const { useForgetPasswordMutation } = passwordService;
export default passwordService;

