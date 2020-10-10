import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CountState } from "src/types";

const initialState: CountState = {
  count: 0
}

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },

    decrement: (state) => {
      state.count -= 1
    },

    set: (state, action) => {
      state.count = 0
    },

    reset: (state) => {
      state.count = 0
    },
  },
})

export const { increment, decrement, reset } = countSlice.actions

export default countSlice.reducer
