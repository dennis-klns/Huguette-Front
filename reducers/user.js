import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
<<<<<<< HEAD
    email: null,
    addresses: [], //transformer en objet avec, possiblement, nom des adresses personnalisé
=======
    addresses: [],
    firstname: null,
>>>>>>> fbbbd3cb2a6ce9dca63d940ea31890325e4c8d5f
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
