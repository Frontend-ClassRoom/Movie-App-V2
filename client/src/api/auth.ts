import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account } from '~/constants/account';
import { setLogin } from '~/store/slices/user';

const BASE_URL = 'https://nest-test-server.herokuapp.com';

/**
 * https://redux-toolkit.js.org/rtk-query/api/createApi
 */

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userAccount: Account) => ({
        url: '/signin',
        method: 'POST',
        body: userAccount,
      }),
      async onQueryStarted(userAccount, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken },
          } = await queryFulfilled;
          dispatch(setLogin({ userId: userAccount.userId, token: accessToken }));
        } catch (error) {
          console.log('@@ onQueryStarted catch', error);
        }
      },
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
