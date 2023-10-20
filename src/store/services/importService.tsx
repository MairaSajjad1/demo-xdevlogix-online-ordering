import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTokenToRequest } from '@/lib/utils';

const importService = createApi({
  reducerPath: 'importService',
  tagTypes: ['import'],
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
    importData: builder.mutation({
      query: (data) => ({
        url: '/import',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['import'],
    }),
  }),
});

export const { useImportDataMutation } = importService;
export default importService;

