import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  userName: null,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.userName = user;
      state.token = token;
    },
    setUserInfo: (state, { payload }) => {
      state.userName = payload?.name;
      state.email = payload?.email;
    },
  },
});

export const { setCredentials, setUserInfo } = authSlice.actions;

export const authReducer = authSlice.reducer;
