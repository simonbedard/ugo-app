import { createSlice } from '@reduxjs/toolkit'
import FakeData from "../test/images.json"

const initialState = {
  term: "Interior design",
  payload: FakeData,

}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload
    },
    swapPayload: (state, action) => {
        state.payload = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTerm, swapPayload } = searchSlice.actions

export default searchSlice.reducer