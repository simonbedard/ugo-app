import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isApiRunning: null,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setApiRunning: (state, action) => {
      state.isApiRunning = action
    },
  },
})

// Action creators are generated for each case reducer function
export const { setApiRunning } = globalSlice.actions

export default globalSlice.reducer