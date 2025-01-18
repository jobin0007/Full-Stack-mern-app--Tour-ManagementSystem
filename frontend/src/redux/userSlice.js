import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    }

  }
})

export const { register,login} =
userSlice.actions
export default userSlice.reducer
