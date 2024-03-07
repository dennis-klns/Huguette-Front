import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tripId: null,
    departure: null,
    arrival: null,
    duration: null,
    distance: null,
    cost: null,
  },
};

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addDeparture: (state, action) => {
      state.value.departure = action.payload;
    },
    addArrival: (state, action) => {
      state.value.arrival = action.payload;
    },
    addDuration: (state, action) => {
      state.value.duration = action.payload;
    },
    addDistance: (state, action) => {
      state.value.distance = action.payload;
    },
    addCost: (state, action) => {
      state.value.cost = action.payload;
    },
    addTripId: (state, action) => {
      state.value.tripId = action.payload;
    },
  },
});

export const {
  addDeparture,
  addArrival,
  addDuration,
  addDistance,
  addCost,
  addTripId,
} = tripsSlice.actions;
export default tripsSlice.reducer;
