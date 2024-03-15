import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tripId: null,
    departure: null,
    arrival: null,
    duration: null,
    distance: null,
    cost: null,
    latitude: null,
    longitude: null,
  },
};

export const tripSlice = createSlice({
  name: "trip",
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
    addLongitude: (state, action) => {
      state.value.longitude = action.payload;
    },
    addLatitude: (state, action) => {
      state.value.latitude = action.payload;
    },
    logoutTrip: (state) => {
      state.value.tripId = null;
      state.value.departure = null;
      state.value.arrival = null;
      state.value.duration = null;
      state.value.distance = null;
      state.value.cost = null;
      state.value.longitude = null;
      state.value.latitude = null;
    },
  },
});

export const {
  addDeparture,
  addArrival,
  addDuration,
  addDistance,
  addLatitude,
  addLongitude,
  addCost,
  addTripId,
  logoutTrip,
} = tripSlice.actions;
export default tripSlice.reducer;
