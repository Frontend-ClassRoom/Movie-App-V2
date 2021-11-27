import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account } from '~/constants/account';

const BASE_URL = 'https://nest-test-server.herokuapp.com/auth';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userAccount: Account) => ({
        url: '/signin',
        method: 'POST',
        body: userAccount,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
