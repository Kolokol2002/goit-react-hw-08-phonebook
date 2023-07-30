import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  userName: null,
  email: null,
  token: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: {
          user: { name, email },
          token,
        },
      }
    ) => {
      state.userName = name;
      state.token = token;
      state.email = email;
      state.isLogin = true;
    },
    setUserInfo: (state, { payload }) => {
      state.userName = payload?.name;
      state.email = payload?.email;
      state.isLogin = true;
    },
    setLogOut: state => {
      state.userName = null;
      state.token = null;
      state.email = null;
      state.isLogin = false;
    },
  },
});

export const { setCredentials, setUserInfo, setLogOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
