import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourOperator: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};

const tourOperatorSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: ((state, action) => {
      state.tourOperator = action.payload.tourOperator;
      state.token = action.payload.token;
    }),
  },
});

export const { login } = tourOperatorSlice.actions;
export default tourOperatorSlice.reducer;
