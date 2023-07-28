import { createSlice } from '@reduxjs/toolkit';
import { contactsApi, useGetContactsQuery } from './contactsApi';

const contactsInitialState = [];

// const contactsData = useGetContactsQuery();

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder.addMatcher(
      contactsApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        // state.token = payload.token;
        // state.user = payload.user;
        state.push(...payload);
      }
    );
  },
});

// export const { setNameForm } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
