import { createSlice } from '@reduxjs/toolkit';

const formInitialState = {
  name: '',
  phone: '',
  countryDialCode: '+380',
  countryFlag: 'UA',
};

const formSlice = createSlice({
  name: 'form',
  initialState: formInitialState,
  reducers: {
    setNameForm(state, action) {
      return (state.name = action.payload);
    },
    setPhoneForm(state, action) {
      return (state.phone = action.payload);
    },
    setCountryDialCodeForm(state, action) {
      return (state.countryDialCode = action.payload);
    },
    setCountryFlagForm(state, action) {
      return (state.countryFlag = action.payload);
    },
  },
});

export const {
  setNameForm,
  setPhoneForm,
  setCountryDialCodeForm,
  setCountryFlagForm,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
