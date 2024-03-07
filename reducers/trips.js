import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    departure: null,
    arrival: null,
  },
};

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addDeparture: (state, action) => {
      state.value.departure = action.payload
    },
    addArrival: (state, action) => {
      state.value.arrival = action.payload
    }
  },
});

export const { addDeparture, addArrival } = tripsSlice.actions;
export default tripsSlice.reducer;
