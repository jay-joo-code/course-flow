import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TokenState } from "src/types";

const initialState: TokenState = {
  token: ''
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload
    },

    resetToken: (state) => {
      state.token = ''
    }
  },
})

export const { setToken, resetToken } = tokenSlice.actions

export default tokenSlice.reducer
