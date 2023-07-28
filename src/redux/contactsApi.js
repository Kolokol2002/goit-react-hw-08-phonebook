import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://64be89f75ee688b6250c967a.mockapi.io',
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    addNewContact: builder.mutation({
      query: data => ({
        url: '/contacts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    registerUser: builder.mutation({
      query: data => ({
        url: `/users/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: data => ({
        url: `/users/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/users/current',
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddNewContactMutation,
  useDeleteContactMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetCurrentUserQuery,
} = contactsApi;
