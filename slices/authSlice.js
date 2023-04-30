import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  profile: {},

}

export const authSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth , setUserProfile} = authSlice.actions

export default authSlice.reducer