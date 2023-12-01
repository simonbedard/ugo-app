import { createSlice } from '@reduxjs/toolkit'
import FakeData from "../test/images.json"

const initialState = {
  term: "Initial Search terms",
  loading: false,
  payload: FakeData,

}
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    swapPayload: (state, action) => {
        state.payload = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTerm, setLoading, swapPayload } = searchSlice.actions

export default searchSlice.reducer