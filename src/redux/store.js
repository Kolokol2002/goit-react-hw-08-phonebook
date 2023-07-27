import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { contactsSlice } from './contactsSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsSlice.reducerPath]: contactsSlice.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsSlice.middleware,
  ],
});
