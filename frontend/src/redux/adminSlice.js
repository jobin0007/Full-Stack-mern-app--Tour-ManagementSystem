import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: null,
  token: null,
  
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    
    login: (state, action) => {
      state.admin = action.payload.admin
      state.token = action.payload.token
    }

  }
})

export const { register,login} =
adminSlice.actions
export default adminSlice.reducer


