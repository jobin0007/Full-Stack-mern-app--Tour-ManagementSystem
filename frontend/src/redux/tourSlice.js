import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tour: [],
  loading: false,
  error: null,
  message: null,
};

const tourSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    getAllTours: (state, action) => {
      state.tour = action.payload;
      state.loading = false;
    },
  }
});

export const { getAllTours} =
  tourSlice.actions;
export default tourSlice.reducer;
