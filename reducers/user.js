import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    addresses: [],
    firstname: null,
    lastname: null,
    picture: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.picture = action.payload.picture;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
      state.value.lastname = null;
    },
    addAddresses: (state, action) => {
      state.value.addresses.push(action.payload);
    },
    addPicture: (state,action) => {
      state.value.picture = action.payload;
    }
  },
});

export const { login, logout, addAddresses,addPicture } = userSlice.actions;
export default userSlice.reducer;
