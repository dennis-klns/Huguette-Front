import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, phone: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.phone = action.payload.phone;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.phone = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
