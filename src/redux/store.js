import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { contactsApi } from './contactsApi';
import { authReducer } from './authSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistContactsConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

export const persistedContactsReducer = persistReducer(
  persistContactsConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: persistedContactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
  ],
});

export const persistor = persistStore(store);
