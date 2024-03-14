import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    addresses: [],
    firstname: null,
    lastname: null,
    picture: null,
    home: {longitude:null, latitude:null, completeAddress:null},
    work: {longitude:null, latitude:null, completeAddress:null},
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
    addHome: (state, action) => {
      state.value.home = action.payload;
    },
    addWork: (state, action) => {
      state.value.home = action.payload;
    },
    addPicture: (state, action) => {
      state.value.picture = action.payload;
    },
    updateFirstname: (state, action) => {
      state.value.firstname = action.payload;
    },
    updateLastname: (state, action) => {
      state.value.lastname = action.payload;
    },
    removePicture: (state) => {
      state.value.picture = null; 
    },
  },
});

export const {
  login,
  logout,
  addAddresses,
  addPicture,
  updateFirstname,
  updateLastname,
  removePicture,
  addHome,
  addWork,
} = userSlice.actions;
export default userSlice.reducer;
