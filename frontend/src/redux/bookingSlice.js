import { createSlice } from "@reduxjs/toolkit";

const initialState = {


    tourId: null,
    tourOperatorId: null,
    userId: null,
    userName: null,
    userMobileNumber: null,
    start_date: null,
    end_date: null,
    total_price: null,
    loading: false,
    error: null,
    message: null,
};

const tourSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        createBooking: (state, action) => {
            state.tourId= action.payload.tourId,
            state.tourOperatorId=action.payload.tourOperatorId,
            state.userId= action.payload.userId,
            state.userName=action.payload.userName,
            state.userMobileNumber= action.payload.userMobileNumber,
            state.start_date= action.payload.start_date,
            state.end_date= action.payload.end_date,
            state.total_price= action.payload.total_price
                           
        },        
  }
});

export const { createBooking } =
    tourSlice.actions;
export default tourSlice.reducer;
