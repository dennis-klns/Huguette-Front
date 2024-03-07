import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    addresses: [],
    firstname: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
    },
    addAddresses: (state, action) => {
      state.value.addresses.push(action.payload);
    },
  },
});

export const { login, logout, addAddresses } = userSlice.actions;
export default userSlice.reducer;
