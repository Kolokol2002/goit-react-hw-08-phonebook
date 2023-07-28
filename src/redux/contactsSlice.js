import { createSlice } from '@reduxjs/toolkit';
import { useGetContactsQuery } from './contactsApi';

const contactsInitialState = {
  contacts: '',
};

// const contactsData = useGetContactsQuery();

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    setContacts(state, action) {
      return (state.contacts = 'contactsData');
    },
  },
});

export const { setNameForm } = contactsSlice.actions;
export const formReducer = contactsSlice.reducer;
