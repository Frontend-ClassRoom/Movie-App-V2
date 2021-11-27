import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account } from '~/constants/account';

const BASE_URL = 'https://nest-test-server.herokuapp.com';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userAccount: Account) => ({
        url: '/signin',
        method: 'POST',
        body: userAccount,
      }),
    }),
    signup: builder.mutation({
      query: (userAccount: Account) => ({
        url: '/signup',
        method: 'POST',
        body: userAccount,
      }),
    }),
    getAllUser: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetAllUserQuery } = authApi;
